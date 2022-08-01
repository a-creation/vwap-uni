import './App.css';
import { Button } from "@chakra-ui/button"
import { ethers } from "ethers"
import { useState, useEffect } from "react"
import { Divider, Text } from '@chakra-ui/react'
import { Stack, HStack, VStack } from '@chakra-ui/react'
import { createChart } from 'lightweight-charts';
import axios from "axios";
import { CHART_OPTIONS, CHART_OPTIONS2 } from './utils/chart';
import dayjs from 'dayjs'
import { Input, Select } from '@chakra-ui/react'
import io from 'socket.io-client';
import { ProgressBar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


const socket = io(process.env.REACT_APP_SERVER_URL);
const ERC20ABI = require('./utils/abi.json')

function App() {

  const [provider, setProvider] = useState(undefined)
  const [signer, setSigner] = useState(undefined)
  const [address, setAddress] = useState(undefined)
  const [usdcBalance, setUsdcBalance] = useState(undefined)
  const [usdcContract, setUsdcContract] = useState(undefined)
  const [wethBalance, setWethBalance] = useState(undefined)
  const [wethContract, setWethContract] = useState(undefined)
  const [ethBalance, setEthBalance] = useState(undefined)
  const [usdcAmount, setUsdcAmount] = useState("")
  const [wethAmount, setWethAmount] = useState("")
  const [baseCurrency, setBaseCurrency] = useState("USDC")
  const [currentGraph, setCurrentGraph] = useState(0)
  const [averagedData, setAveragedData] = useState([])
  const [transformedData, setTransformedData] = useState([])
  const [ratioData, setRatioData] = useState([])
  const [swapped, setSwapped] = useState(false)
  const [transactions, setTransactions] = useState([])
  const [swapProgress, setSwapProgress] = useState(0)

  const WETH_address = "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6"
  const USDC_address = "0x07865c6E87B9F70255377e024ace6630C1Eaa37F"
  
  useEffect(() => {
    queryUniswapDataAndGraph()

    socket.on('connect', () => {
      console.log('Connected to Websocket server!')
    });

    return () => {
      socket.off('connect');
    };
  }, [])

  useEffect(() => {
    socket.on('tx', (msg) => {
      console.log('received tx', msg)
      const existingTransactions = transactions.slice()
      existingTransactions.push(msg)
      console.log('existingTransactions', existingTransactions)
      setTransactions(existingTransactions)
      console.log('swapProgress', swapProgress)
      let newProgress = swapProgress + 10
      console.log('newProgress', newProgress)
      setSwapProgress(newProgress)
    });

    return () => {
      socket.off('tx');
    };

  }, [transactions, swapProgress])

  useEffect(()=> {
    const onLoad = async () => {
      const provider = await new ethers.providers.Web3Provider(window.ethereum)
      // allTokens.forEach(token => {
      //   new Contract
      // })
      const wethContract = new ethers.Contract(WETH_address, ERC20ABI, provider)
      const usdcContract = new ethers.Contract(USDC_address, ERC20ABI, provider)
      setUsdcContract(usdcContract)
      setWethContract(wethContract)
      setProvider(provider)
    }
    onLoad()
  }, [])

  const queryUniswapDataAndGraph = async () => {

    let res = await axios.get(process.env.REACT_APP_SERVER_URL + "/volumedata")

    let transformedData = res.data.map(ele => {
      return {
        time: Math.floor((new Date(ele.hour)).getTime() / 1000),
        value:  Math.floor(parseFloat(ele.hourly_volume_usdc))
      }
    })
    transformedData.sort((a,b) => {
      if(a.time < b.time) return -1
      else return 1
    })

    const chart = createChart(document.getElementById("innerGraphContainer2"), CHART_OPTIONS)
    const histogramSeries = chart.addHistogramSeries({color: "#c2d1c8"});
    histogramSeries.setData(transformedData);
    chart.timeScale().fitContent()

    setTransformedData(transformedData)

    const [averaged_data, averaged_data_total] = averageData(transformedData)
    const ratio_data = averaged_data.map(ele => {return (ele.value/averaged_data_total)})


    const chart2 = createChart(document.getElementById("innerGraphContainer"), CHART_OPTIONS2)
    const histogramSeries2 = chart2.addHistogramSeries({color: "#c2d1c8"});
    histogramSeries2.setData(averaged_data);
    chart2.timeScale().fitContent()

    console.log('averaged_data_total',averaged_data_total)

    setAveragedData(averaged_data)
    setRatioData(ratio_data)

    let res2 = await axios.get(process.env.REACT_APP_SERVER_URL + "/30dayvolumedata")

    let transformedData2 = res2.data.map(ele => {
      return {
        time: Math.floor((new Date(ele.hour)).getTime() / 1000),
        value:  Math.floor(parseFloat(ele.hourly_volume_usdc))
      }
    })
    transformedData2.sort((a,b) => {
      if(a.time < b.time) return -1
      else return 1
    })

    const [averaged_data_30, averaged_data_total_30] = averageData(transformedData2)


    const chart3 = createChart(document.getElementById("innerGraphContainer3"), CHART_OPTIONS2)
    const histogramSeries3 = chart3.addHistogramSeries({color: "#c2d1c8"});
    histogramSeries3.setData(averaged_data_30);
    chart3.timeScale().fitContent()

  }

  const averageData = (transformedData) => {

    const averaged_data = []
    let averaged_data_total = 0

    for(let i = 0; i < 24; i++) {
      let avg_value = 0
      let counter = 0
      let hour
      if (i.toString().length == 1) hour = "0" + i
      else hour = i
      transformedData.forEach(ele => {
        if(dayjs.unix(ele.time).format('HH:mm') == `${hour}:00`){
          avg_value += ele.value
          counter += 1
        }
      })
      avg_value = avg_value / counter
      averaged_data.push({
        time: 3600*(5+i),
        value: avg_value
      })
      averaged_data_total+= avg_value
    }

    return [averaged_data, averaged_data_total]

  }

  const getSigner = async () => {

    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const address = await signer.getAddress()
    setSigner(signer)
    setAddress(address)

    const usdcbalance = await usdcContract.balanceOf(address)
    const wethbalance = await wethContract.balanceOf(address)

    // console.log(ethers.utils.formatUnits(usdcbalance, 6));
    const ethbalance = await provider.getBalance(address);
    // console.log('ethbalance', Number(ethers.utils.formatEther(ethbalance)))
    setUsdcBalance(Number(ethers.utils.formatUnits(usdcbalance, 6)))
    setWethBalance(Number(ethers.utils.formatEther(wethbalance)))
    setEthBalance(Number(ethers.utils.formatEther(ethbalance)))

  }

  const runSwap = async () => {

    setSwapped(true)

    const res = await axios.post(process.env.REACT_APP_SERVER_URL + "/swap", {
      amount: (baseCurrency == "USDC") ? usdcAmount : wethAmount,
      baseCurrency,
      ratios: JSON.stringify(ratioData)
    })

    console.log('res', res)
    
  }

  const renderGraph = (targetGraph) => {
    if(targetGraph == 1){
      document.getElementById('innerGraphContainer').style.display = "none"
      document.getElementById('innerGraphContainer2').style.display = "flex"
      document.getElementById('innerGraphContainer3').style.display = "none"
    } else if(targetGraph == 0){
      document.getElementById('innerGraphContainer2').style.display = "none"
      document.getElementById('innerGraphContainer3').style.display = "none"
      document.getElementById('innerGraphContainer').style.display = "flex"
    } else {
      document.getElementById('innerGraphContainer2').style.display = "none"
      document.getElementById('innerGraphContainer').style.display = "none"
      document.getElementById('innerGraphContainer3').style.display = "flex"
    }
  }

  const renderTxData = () => {
    const latestTx = transactions[transactions.length - 1]
    console.log('latestTx timestamp', latestTx.timestamp)
    const this_tx = new Date(latestTx.timestamp)
    let next_tx = this_tx.setHours(this_tx.getHours()+1)
    next_tx = (new Date(next_tx)).toString()
    return (<div style={{fontSize:'12px', width: '90%', marginTop:'20px'}}>
      Latest Tx: {transactions[transactions.length-1].tx_hash}
      <div>Transfered Out Amount: {parseFloat(latestTx.transfer_out_amount).toFixed(10)} {baseCurrency}</div>
      <div>Transfered In Amount: {parseFloat(latestTx.transfer_in_amount).toFixed(10)} {baseCurrency == "WETH" ? "USDC" : "WETH"}</div>
      <div>Gas Used: {parseFloat(latestTx.gasUsed).toFixed(10)}</div>
      <div>Next scheduled Transaction: {next_tx}</div>
    </div>)
  }

  return (
    <div className="App">
      <header className="App-header">
        <div style={{display:'flex', flexDirection:'row', justifyContent: 'space-between', width: '80%', marginBottom:'3vh'}}>
          <Text>volume-weighted amm</Text>
          {!address ? (
              <div><Button colorScheme="green" variant="outline">No Wallet Connected</Button>
              <Button colorScheme="green" variant="solid" onClick={getSigner}>Connect Wallet</Button></div>
            ) : (
              <div><Button colorScheme="green" variant="outline" onClick={() => {navigator.clipboard.writeText(address)}}>{address}</Button>
              <Button colorScheme="green" variant="solid" onClick={getSigner}>Connected!</Button></div>
          )}
        </div>
        
        <div style={{display:'flex', flexDirection:'row', justifyContent:'center', height:'80vh', alignItems:'center', flexWrap:'wrap'}}>

          <div style={{display:'flex', flexDirection:'column'}}>
          <div className="tradeContainer" style={{marginRight:'40px'}}>
            <Select variant='filled' width="175px" color="#37383b" onChange={(e) => {setBaseCurrency(e.target.value)}}>
              <option value='USDC'>USDC</option>
              <option value='WETH'>WETH</option>
            </Select>
            <div style={{display:'flex', flexDirection:'row', width:'325px', backgroundColor: 'white', color:'black', borderRadius:'10px', height:'100px', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'flex-start', margin:'40px', paddingLeft:'20px'}}>
              <div style={{fontSize:'15px', color:'black'}}>Amount {baseCurrency} to Swap: </div>
            <Input placeholder='0.0' _placeholder={{fontSize:'20px'}} variant='unstyled' color='black' borderColor="#37a169" backgroundColor='white' width="100px" height='40px' fontSize="20px" onChange={(e) => {if (baseCurrency == "WETH") setWethAmount(e.target.value); else setUsdcAmount(e.target.value) }} value={baseCurrency == "WETH" ? wethAmount : usdcAmount}></Input>
            <div style={{fontSize:'15px', color:'black'}}>Your Balance: {baseCurrency == "WETH" ? wethBalance : usdcBalance}</div>
            </div>
            <Button variant="solid" colorScheme="blackAlpha" width="150px" onClick={runSwap}>Swap for {baseCurrency == "WETH" ? "USDC" : "WETH"}</Button>
          </div>

          {swapped && <div className="progressContainer" style={{fontSize:'17px'}}>  
              Swap Progress:
              <ProgressBar style={{width: '200px'}} now={swapProgress} animated variant="success" />
              {transactions.length !== 0 && renderTxData()}
          </div>}
          </div>
        
          <div style={{display:'flex', flexDirection:'row'}}>
            
            <div id="graphContainer" className="graphContainer">
              <Select variant='flushed' width="90%" color="black" borderColor="transparent" onChange={(e) => {setCurrentGraph(e.target.value); renderGraph(e.target.value)}} style={{marginBottom:'20px'}}>
                <option value='0'>Average Hourly Volume of USDC/ETH UniV3 Pool in USD (over past seven days)</option>
                <option value='1'>Hourly Volume of USDC/ETH UniV3 Pool in USD (past seven days)</option>
                <option value='2'>Average Hourly Volume of USDC/ETH UniV3 Pool in USD (past thirty days)</option>
              </Select>
              <div id="innerGraphContainer"></div>
              <div id="innerGraphContainer2" style={{display: "none"}}></div>
              <div id="innerGraphContainer3" style={{display: "none"}}></div>
            </div>
          </div>
        </div>
        
       
      </header>
    </div>
  );
}

export default App;
