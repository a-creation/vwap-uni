const express = require('express')
const http = require('http');
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require('mongodb');
const { AlphaRouter } = require('@uniswap/smart-order-router')
const { Token, CurrencyAmount, TradeType, Percent } = require('@uniswap/sdk-core')
const { ChainId } = require('@uniswap/sdk')

const { ethers, BigNumber, Contract } = require('ethers')
const JSBI = require('jsbi')
const cron = require('node-cron');
const ERC20ABI = require('./abi.json')
const schedule = require('node-schedule');

require('dotenv').config();

const client = new MongoClient(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const V3_SWAP_ROUTER_ADDRESS = '0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45';
const KECCAK_HASH = '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef';

const web3Provider = new ethers.providers.JsonRpcProvider(process.env.GOERLI_URL)
const router = new AlphaRouter({ chainId: ChainId.GÖRLI, provider: web3Provider })

const WETH = new Token(
  ChainId.GÖRLI,
  '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6',
  18,
  'WETH',
  'Wrapped Ether'
);

const WETH_contract = new ethers.Contract(WETH.address, ERC20ABI, web3Provider)

const USDC = new Token(
  ChainId.GÖRLI,
  '0x07865c6E87B9F70255377e024ace6630C1Eaa37F',
  6,
  'USDC',
  'USD//C'
);

const USDC_contract = new ethers.Contract(USDC.address, ERC20ABI, web3Provider)

const app = express()
const port = 8000
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});


app.use(cors());
app.use(express.json());

const swapTransaction = async (baseToken, quoteToken, baseContract, decimals, swapAmount) => {

  const wei = ethers.utils.parseUnits(swapAmount.toString(), decimals)
  const currencyAmount = CurrencyAmount.fromRawAmount(baseToken, JSBI.BigInt(wei))

  const route = await router.route(
    currencyAmount,
    quoteToken,
    TradeType.EXACT_INPUT,
    {
      recipient: process.env.PUBLIC_KEY,
      slippageTolerance: new Percent(5, 100),
      deadline: Math.floor(Date.now()/1000 +1800),
    }
  )

  console.log(`Quote Exact In: ${route.quote.toFixed(2)}`);
  console.log(`Gas Adjusted Quote In: ${route.quoteGasAdjusted.toFixed(2)}`);
  console.log(`Gas Used USD: ${route.estimatedGasUsedUSD.toFixed(6)}`);

  const transaction = {
    data: route.methodParameters.calldata,
    to: V3_SWAP_ROUTER_ADDRESS,
    value: BigNumber.from(route.methodParameters.value),
    from: process.env.PUBLIC_KEY,
    gasPrice: BigNumber.from(route.gasPriceWei),
    gasLimit: ethers.utils.hexlify(1000000)
  };

  const signer = new ethers.Wallet(process.env.PRIVATE_KEY, web3Provider);
  const approval = await baseContract.connect(signer).approve(V3_SWAP_ROUTER_ADDRESS, wei);
  const tx = await signer.sendTransaction(transaction);
  
  console.log("Transaction!", tx.hash);

  const receipt = await tx.wait(1);

  let transfer_out_amount
  let transfer_in_amount
  receipt.logs.forEach(ele => {

    if(ele.topics[0] == KECCAK_HASH){

      if(ele.topics[1].slice(-40).toLowerCase() == process.env.PUBLIC_KEY.slice(-40).toLowerCase()){
        transfer_out_amount = ethers.utils.formatUnits(parseInt(ele.data, 16).toString(), baseToken.decimals)
      } else if (ele.topics[2].slice(-40).toLowerCase() == process.env.PUBLIC_KEY.slice(-40).toLowerCase()){
        transfer_in_amount = ethers.utils.formatUnits(parseInt(ele.data, 16).toString(), quoteToken.decimals)
      }
    }
  })

  const info = { tx_hash: tx.hash, gasUsed: ethers.utils.formatEther(receipt.gasUsed), transfer_out_amount, transfer_in_amount, timestamp: Date.now() }

  io.emit('tx', info); 

  await client.connect()
  const collection = client.db("uniswap_v3").collection("transaction_history");
  await collection.insertOne(info); 

} 



app.get('/volumedata', async (req, res) => {

  await client.connect()
  const collection = client.db("uniswap_v3").collection("volume_usdc");
  const cursor = await collection.find({});
  const data_arr = await cursor.toArray()
  res.send(data_arr)

})

app.post('/swap', async (req, res) => {

  const totalAmount = req.body.amount
  const baseCurrency = req.body.baseCurrency
  const ratios = JSON.parse(req.body.ratios)
  const date = new Date(Date.now())
  const UTCHour = date.getUTCHours()
  const minute = date.getMinutes()

  if(baseCurrency == "USDC"){
    setOfInputs = [USDC, WETH, USDC_contract, 6, (totalAmount * ratios[UTCHour]).toFixed(6)]
  } else if (baseCurrency == "WETH"){
    console.log('ratios[UTCHour]', ratios[UTCHour], "UTChour", UTCHour)
    setOfInputs = [WETH, USDC, WETH_contract, 18, (totalAmount * ratios[UTCHour]).toFixed(18)]
  }

  await swapTransaction(...setOfInputs)
  
  // PROD CODE
  // Schedule it for every hour for 24 iterations, starting now 
  // const scheduled_txs = cron.schedule(`${minute-1} * * * *`, () => {
  //   // setOfInputs[4] = totalAmount * ratios[]
  //   const date = new Date(Date.now())
  //   const UTCHour = date.getUTCHours()

  //   setOfInputs[4] = totalAmount * ratios[UTCHour]

  //   swapTransaction(...setOfInputs)
    
  // });

  // const stopDate = date.setHours(date.getHours() + 23)

  // const job = schedule.scheduleJob(stopDate, () => {
  //   scheduled_txs.stop()
  // })

  // TESTING CODE: Schedule for every 5th second, stop after 1 minute
  const scheduled_txs = cron.schedule(`*/20 * * * * *`, () => {
    const date = new Date(Date.now())
    const UTCHour = date.getUTCHours()

    setOfInputs[4] = (totalAmount * ratios[UTCHour]).toFixed(setOfInputs[3])

    swapTransaction(...setOfInputs)
    
  });

  const stopDate = date.setMinutes(date.getMinutes() + 2)

  console.log('Start Date:', date)
  console.log('Stop Date:', stopDate)

  const job = schedule.scheduleJob(stopDate, () => {
    scheduled_txs.stop()
  })

  return res.sendStatus(200)

})

io.on('connection', (socket) => {
  console.log('a user connected');
});


server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})