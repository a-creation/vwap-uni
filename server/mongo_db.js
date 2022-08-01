const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// This function writes data to MongoDB 

const main = async (volume_usd_thirty_days, volume_usd_seven_days, uniswap_volume_usd_seven_days) => {

  const data_strs = [volume_usd_thirty_days, volume_usd_seven_days, uniswap_volume_usd_seven_days]
  const data_literals = ["volume_usd_thirty_days", "volume_usd_seven_days", "uniswap_volume_usd_seven_days"]

  await client.connect()

  for (let i=0; i<data_strs.length; i++){
    let data_arr = data_strs[i].replace( /\n/g, " " ).split(/\s+/);
    const documents = []

    data_arr.map((ele,idx) => {
      if(ele.length === 10){
        document = {};
        let date = ele.split('-')
        document["hour"] = new Date(Date.UTC(date[0], date[1]-1, date[2], data_arr[idx+1].slice(0,2)))
        document["hourly_volume_usdc"] = data_arr[idx+2]
        documents.push(document)
      }
    })
  
    const collection = client.db("uniswap_v3").collection(data_literals[i]);

    await collection.remove({})
    await collection.insertMany(documents)
  }
  
  client.close()

}

const volume_usd_thirty_days = `
2022-07-26 06:00
15620981.416708538
2022-07-26 05:00
9748522.39891297
2022-07-26 04:00
8901012.457040783
2022-07-26 03:00
25597626.269761372
2022-07-26 02:00
11977515.534878507
2022-07-26 01:00
25669236.286045507
2022-07-26 00:00
47717186.01619016
2022-07-25 23:00
36574188.25181498
2022-07-25 22:00
56108467.743860476
2022-07-25 21:00
19525300.64788135
2022-07-25 20:00
61079530.227779604
2022-07-25 19:00
46706913.811588086
2022-07-25 18:00
16380992.264244426
2022-07-25 17:00
21430298.67127874
2022-07-25 16:00
19854959.393681716
2022-07-25 15:00
22289163.169218693
2022-07-25 14:00
28851977.265653577
2022-07-25 13:00
40896068.120458014
2022-07-25 12:00
23924717.05526876
2022-07-25 11:00
35281847.543792054
2022-07-25 10:00
13689080.699243058
2022-07-25 09:00
9101930.303199086
2022-07-25 08:00
17182152.664921377
2022-07-25 07:00
11871510.147704156
2022-07-25 06:00
12452803.591957003
2022-07-25 05:00
16043273.731919995
2022-07-25 04:00
16381742.296828762
2022-07-25 03:00
28116565.59830724
2022-07-25 02:00
66522123.3973322
2022-07-25 01:00
34140810.5652034
2022-07-25 00:00
46721759.67611283
2022-07-24 23:00
33005436.31703884
2022-07-24 22:00
47570038.85808539
2022-07-24 21:00
26525445.564338543
2022-07-24 20:00
13435644.60390948
2022-07-24 19:00
40607131.67670661
2022-07-24 18:00
9960898.46527258
2022-07-24 17:00
23550387.757912852
2022-07-24 16:00
24962378.86192283
2022-07-24 15:00
16320774.931846807
2022-07-24 14:00
38234466.102426335
2022-07-24 13:00
24449574.643237077
2022-07-24 12:00
18739342.773047034
2022-07-24 11:00
26099461.627401367
2022-07-24 10:00
10876405.482087439
2022-07-24 09:00
11303611.531407142
2022-07-24 08:00
16305697.529318305
2022-07-24 07:00
10459008.250525484
2022-07-24 06:00
14747030.791678159
2022-07-24 05:00
32905014.157403264
2022-07-24 04:00
11767761.18036242
2022-07-24 03:00
10662672.792476926
2022-07-24 02:00
9979486.977234645
2022-07-24 01:00
13600370.132942379
2022-07-24 00:00
20613932.185104176
2022-07-23 23:00
22269549.62586266
2022-07-23 22:00
34813572.30133406
2022-07-23 21:00
8505217.164138433
2022-07-23 20:00
20623483.84576078
2022-07-23 19:00
19960825.04858302
2022-07-23 18:00
27277444.825340506
2022-07-23 17:00
34289782.97219042
2022-07-23 16:00
22704722.204997588
2022-07-23 15:00
20779616.46280913
2022-07-23 14:00
20192575.65143293
2022-07-23 13:00
11727252.53507179
2022-07-23 12:00
36112791.168169945
2022-07-23 11:00
26715009.746325955
2022-07-23 10:00
23459072.310330175
2022-07-23 09:00
18714611.069667265
2022-07-23 08:00
30426441.24992539
2022-07-23 07:00
16895393.39271893
2022-07-23 06:00
27654378.75491496
2022-07-23 05:00
14242801.870661072
2022-07-23 04:00
16087229.47070466
2022-07-23 03:00
13686298.506282084
2022-07-23 02:00
19586636.89956997
2022-07-23 01:00
18309823.681083515
2022-07-23 00:00
23508867.869661424
2022-07-22 23:00
20425632.487647578
2022-07-22 22:00
19559600.616050895
2022-07-22 21:00
21125710.827181287
2022-07-22 20:00
31074016.38321614
2022-07-22 19:00
43970696.53016933
2022-07-22 18:00
18586590.232523434
2022-07-22 17:00
31869216.922691908
2022-07-22 16:00
25934756.986463703
2022-07-22 15:00
30807494.07276204
2022-07-22 14:00
63369981.099611185
2022-07-22 13:00
36668251.568910524
2022-07-22 12:00
15672061.975745142
2022-07-22 11:00
14362572.440849198
2022-07-22 10:00
14855154.697673785
2022-07-22 09:00
25529424.98306909
2022-07-22 08:00
24118158.12545877
2022-07-22 07:00
28497706.852980062
2022-07-22 06:00
19474889.316605035
2022-07-22 05:00
15040264.47923438
2022-07-22 04:00
8606173.862274991
2022-07-22 03:00
18151949.219303556
2022-07-22 02:00
12936802.391881973
2022-07-22 01:00
24343114.483914252
2022-07-22 00:00
16832418.374136146
2022-07-21 23:00
17011836.539470326
2022-07-21 22:00
19004222.137386966
2022-07-21 21:00
19146955.03521841
2022-07-21 20:00
34256927.55696316
2022-07-21 19:00
20880781.223267194
2022-07-21 18:00
18527957.13102325
2022-07-21 17:00
40951216.52323041
2022-07-21 16:00
70809141.7900408
2022-07-21 15:00
22633558.2780655
2022-07-21 14:00
34610128.82232185
2022-07-21 13:00
37102687.0688103
2022-07-21 12:00
38461009.98005522
2022-07-21 11:00
29837036.339888547
2022-07-21 10:00
20910351.512048736
2022-07-21 09:00
28906319.106840987
2022-07-21 08:00
26485521.778991707
2022-07-21 07:00
19097071.58575155
2022-07-21 06:00
27379560.046493463
2022-07-21 05:00
22232056.089561895
2022-07-21 04:00
37426520.72698545
2022-07-21 03:00
33955039.1481685
2022-07-21 02:00
32486357.272634298
2022-07-21 01:00
37974387.719391435
2022-07-21 00:00
23428426.827871192
2022-07-20 23:00
36484392.78410382
2022-07-20 22:00
23971675.494412273
2022-07-20 21:00
48350765.79588393
2022-07-20 20:00
117961569.15016124
2022-07-20 19:00
22029707.17419887
2022-07-20 18:00
20938608.873115066
2022-07-20 17:00
46254048.87289884
2022-07-20 16:00
54109053.543588296
2022-07-20 15:00
54726902.10736791
2022-07-20 14:00
22294529.589768324
2022-07-20 13:00
47750064.949216336
2022-07-20 12:00
36538775.63569916
2022-07-20 11:00
28410840.912990283
2022-07-20 10:00
43391769.96893105
2022-07-20 09:00
15141946.503359413
2022-07-20 08:00
22162557.231276184
2022-07-20 07:00
42790324.1809128
2022-07-20 06:00
18462089.56819914
2022-07-20 05:00
16263222.648194835
2022-07-20 04:00
16160157.113598581
2022-07-20 03:00
32008926.115088396
2022-07-20 02:00
17801655.585307512
2022-07-20 01:00
21034432.372506946
2022-07-20 00:00
43444275.08801628
2022-07-19 23:00
40660995.07840377
2022-07-19 22:00
42429175.51156965
2022-07-19 21:00
26199157.715915382
2022-07-19 20:00
32575925.19001098
2022-07-19 19:00
34669551.51918036
2022-07-19 18:00
32057719.458509162
2022-07-19 17:00
31229370.801896136
2022-07-19 16:00
53840111.37946961
2022-07-19 15:00
79061923.5904405
2022-07-19 14:00
44529976.680772714
2022-07-19 13:00
58379065.501822755
2022-07-19 12:00
27627385.83542421
2022-07-19 11:00
28590246.795484558
2022-07-19 10:00
36121003.591724046
2022-07-19 09:00
21594243.111034
2022-07-19 08:00
33338148.318686247
2022-07-19 07:00
54569267.40675994
2022-07-19 06:00
43857191.26426404
2022-07-19 05:00
38902483.55484904
2022-07-19 04:00
34384950.80769121
2022-07-19 03:00
33363561.111920923
2022-07-19 02:00
43237054.91842491
2022-07-19 01:00
52728447.85374358
2022-07-19 00:00
77915943.25078928
2022-07-18 23:00
63226364.1211375
2022-07-18 22:00
30134745.656476464
2022-07-18 21:00
20700216.833719507
2022-07-18 20:00
35982464.93384436
2022-07-18 19:00
54300224.7579485
2022-07-18 18:00
34813321.51118502
2022-07-18 17:00
44578789.30439992
2022-07-18 16:00
45967642.5225592
2022-07-18 15:00
27260236.764684074
2022-07-18 14:00
25809126.503535423
2022-07-18 13:00
36402518.5294693
2022-07-18 12:00
34205686.29886548
2022-07-18 11:00
33874899.721823014
2022-07-18 10:00
30686480.456293825
2022-07-18 09:00
22096982.118011385
2022-07-18 08:00
45633813.84149471
2022-07-18 07:00
32370206.773637295
2022-07-18 06:00
54048675.94814543
2022-07-18 05:00
41804864.81083969
2022-07-18 04:00
23946993.79419618
2022-07-18 03:00
31681329.868126303
2022-07-18 02:00
41112365.09281612
2022-07-18 01:00
32139938.376471516
2022-07-18 00:00
24997577.858474724
2022-07-17 23:00
41767417.31635691
2022-07-17 22:00
26844744.983654767
2022-07-17 21:00
25749112.74776933
2022-07-17 20:00
15551219.382594619
2022-07-17 19:00
21709239.01934391
2022-07-17 18:00
33970013.596936
2022-07-17 17:00
62173155.57487758
2022-07-17 16:00
20618597.863197435
2022-07-17 15:00
17737151.245173026
2022-07-17 14:00
21552248.427040763
2022-07-17 13:00
52546174.03874065
2022-07-17 12:00
19476747.333840434
2022-07-17 11:00
19227462.139354594
2022-07-17 10:00
25023574.89091005
2022-07-17 09:00
28160762.239162456
2022-07-17 08:00
14279570.517266486
2022-07-17 07:00
18497740.31274411
2022-07-17 06:00
30410750.621629924
2022-07-17 05:00
13368860.829211889
2022-07-17 04:00
13984296.74662103
2022-07-17 03:00
27729569.813833516
2022-07-17 02:00
10737144.420979746
2022-07-17 01:00
28263336.71302675
2022-07-17 00:00
50463882.24833114
2022-07-16 23:00
18922760.04864875
2022-07-16 22:00
18584296.667079456
2022-07-16 21:00
27427633.6408375
2022-07-16 20:00
38734594.8394889
2022-07-16 19:00
26965149.153731838
2022-07-16 18:00
32619245.42598534
2022-07-16 17:00
42904370.25431586
2022-07-16 16:00
84023310.35009438
2022-07-16 15:00
32100846.48666877
2022-07-16 14:00
28272022.330094077
2022-07-16 13:00
21585564.86466021
2022-07-16 12:00
15216440.346844085
2022-07-16 11:00
16935166.084577914
2022-07-16 10:00
8016238.607661411
2022-07-16 09:00
6610176.811373906
2022-07-16 08:00
8247583.757013302
2022-07-16 07:00
6146261.236147008
2022-07-16 06:00
19294625.685503375
2022-07-16 05:00
13614637.646614986
2022-07-16 04:00
16894013.619375266
2022-07-16 03:00
5893865.688305926
2022-07-16 02:00
13357329.867150452
2022-07-16 01:00
18221872.5691011
2022-07-16 00:00
25542632.174439564
2022-07-15 23:00
21803809.554010604
2022-07-15 22:00
8683658.577278538
2022-07-15 21:00
31765917.329447262
2022-07-15 20:00
59036176.17416602
2022-07-15 19:00
29874560.871779904
2022-07-15 18:00
25399462.770692956
2022-07-15 17:00
43993934.19795966
2022-07-15 16:00
51527665.88338048
2022-07-15 15:00
39387995.05375642
2022-07-15 14:00
46854628.95926008
2022-07-15 13:00
80323766.54657969
2022-07-15 12:00
39779595.446116254
2022-07-15 11:00
22080356.758907042
2022-07-15 10:00
13587003.398312723
2022-07-15 09:00
21894205.667081863
2022-07-15 08:00
22722142.09190222
2022-07-15 07:00
23134019.631185427
2022-07-15 06:00
11371782.278603435
2022-07-15 05:00
12265059.407858673
2022-07-15 04:00
20757601.30590784
2022-07-15 03:00
17208128.300638568
2022-07-15 02:00
32078932.38627687
2022-07-15 01:00
13783414.287585715
2022-07-15 00:00
13223765.448174732
2022-07-14 23:00
11677939.840738941
2022-07-14 22:00
12946527.165053703
2022-07-14 21:00
22737381.763503373
2022-07-14 20:00
19698003.543920476
2022-07-14 19:00
19567785.44881143
2022-07-14 18:00
21919305.17435528
2022-07-14 17:00
42013860.84536082
2022-07-14 16:00
22686865.524975304
2022-07-14 15:00
57075205.80789913
2022-07-14 14:00
28842152.21538102
2022-07-14 13:00
22481216.219384436
2022-07-14 12:00
22727281.10685196
2022-07-14 11:00
18319155.6060601
2022-07-14 10:00
9852944.21596877
2022-07-14 09:00
11921566.515452515
2022-07-14 08:00
11033960.705420885
2022-07-14 07:00
12188570.9023817
2022-07-14 06:00
13733677.846656978
2022-07-14 05:00
15715239.783790354
2022-07-14 04:00
11634165.423680093
2022-07-14 03:00
5704026.313561075
2022-07-14 02:00
9388342.908964297
2022-07-14 01:00
11559942.180496693
2022-07-14 00:00
19411478.198198702
2022-07-13 23:00
35877771.07030003
2022-07-13 22:00
16964103.968739033
2022-07-13 21:00
18682057.335975505
2022-07-13 20:00
27475809.297955576
2022-07-13 19:00
20824473.888509996
2022-07-13 18:00
44078077.35044369
2022-07-13 17:00
38156345.17445257
2022-07-13 16:00
26760635.394017816
2022-07-13 15:00
36925512.16720946
2022-07-13 14:00
39053427.45560761
2022-07-13 13:00
43740163.54479334
2022-07-13 12:00
91354333.85010798
2022-07-13 11:00
13428500.698301794
2022-07-13 10:00
8692365.769391784
2022-07-13 09:00
7084191.951779755
2022-07-13 08:00
17690611.53335232
2022-07-13 07:00
22491434.79822232
2022-07-13 06:00
7488053.119021307
2022-07-13 05:00
13038171.352152057
2022-07-13 04:00
5149705.649208123
2022-07-13 03:00
3938219.6434894595
2022-07-13 02:00
8649153.51401351
2022-07-13 01:00
4434669.599161497
2022-07-13 00:00
18878907.21878898
2022-07-12 23:00
17932296.81651774
2022-07-12 22:00
9680422.140410956
2022-07-12 21:00
6266058.451902225
2022-07-12 20:00
13357506.370357258
2022-07-12 19:00
24941103.26169328
2022-07-12 18:00
15175090.255940491
2022-07-12 17:00
18896469.425893415
2022-07-12 16:00
34200557.91554207
2022-07-12 15:00
20327642.27646942
2022-07-12 14:00
25494878.75602321
2022-07-12 13:00
29095159.45377056
2022-07-12 12:00
14611647.345775777
2022-07-12 11:00
16446648.194876602
2022-07-12 10:00
15026684.665405838
2022-07-12 09:00
14524458.93156196
2022-07-12 08:00
13789177.429607673
2022-07-12 07:00
19674804.956386473
2022-07-12 06:00
21114683.563388
2022-07-12 05:00
13793945.490740966
2022-07-12 04:00
17968719.525869645
2022-07-12 03:00
6876703.282141946
2022-07-12 02:00
9390188.340991814
2022-07-12 01:00
18518611.16798795
2022-07-12 00:00
15575484.878293905
2022-07-11 23:00
34963655.98090042
2022-07-11 22:00
35885178.38677574
2022-07-11 21:00
11919825.575965349
2022-07-11 20:00
15770097.16822953
2022-07-11 19:00
14399045.713050809
2022-07-11 18:00
19333561.095768303
2022-07-11 17:00
22346035.975115694
2022-07-11 16:00
24050588.840895668
2022-07-11 15:00
13122102.668759407
2022-07-11 14:00
23416160.221308254
2022-07-11 13:00
39146549.00025791
2022-07-11 12:00
22334240.64413573
2022-07-11 11:00
13201001.58582267
2022-07-11 10:00
6267569.578324953
2022-07-11 09:00
6542353.4985755235
2022-07-11 08:00
49138223.34241458
2022-07-11 07:00
7040298.896984595
2022-07-11 06:00
16175362.615590408
2022-07-11 05:00
8874321.67622593
2022-07-11 04:00
6021732.965029163
2022-07-11 03:00
18707190.86398712
2022-07-11 02:00
8454782.273381148
2022-07-11 01:00
22447457.375354264
2022-07-11 00:00
10718756.174944783
2022-07-10 23:00
5561106.994928239
2022-07-10 22:00
13349390.984149206
2022-07-10 21:00
12584054.67065087
2022-07-10 20:00
13224357.155786408
2022-07-10 19:00
9324065.831979137
2022-07-10 18:00
3819293.8306658696
2022-07-10 17:00
7924951.647646325
2022-07-10 16:00
12772653.403727276
2022-07-10 15:00
15459844.663725834
2022-07-10 14:00
33359330.028665733
2022-07-10 13:00
15574138.91581698
2022-07-10 12:00
6752133.446543845
2022-07-10 11:00
15007957.541473567
2022-07-10 10:00
11390052.680433916
2022-07-10 09:00
7367251.275084197
2022-07-10 08:00
14392591.29518435
2022-07-10 07:00
7338274.273558564
2022-07-10 06:00
9962343.810136763
2022-07-10 05:00
4564909.68988564
2022-07-10 04:00
11049739.048917448
2022-07-10 03:00
7204230.944705681
2022-07-10 02:00
26033463.795995858
2022-07-10 01:00
13718081.618434604
2022-07-10 00:00
13183368.335415158
2022-07-09 23:00
10551176.98724686
2022-07-09 22:00
13332141.396832563
2022-07-09 21:00
4984497.61322793
2022-07-09 20:00
5280725.186659794
2022-07-09 19:00
12686808.285919003
2022-07-09 18:00
12031871.276307762
2022-07-09 17:00
21581731.271732017
2022-07-09 16:00
9332214.583230589
2022-07-09 15:00
9426025.685048422
2022-07-09 14:00
19499629.09973155
2022-07-09 13:00
10656211.289745642
2022-07-09 12:00
16740310.938993214
2022-07-09 11:00
16257107.609355599
2022-07-09 10:00
10200014.197631413
2022-07-09 09:00
11037505.873413283
2022-07-09 08:00
14325863.215856586
2022-07-09 07:00
12315116.34951996
2022-07-09 06:00
8483108.760137603
2022-07-09 05:00
14870057.994842853
2022-07-09 04:00
8947989.791722711
2022-07-09 03:00
33117125.543547556
2022-07-09 02:00
10776258.967102416
2022-07-09 01:00
17970646.30647196
2022-07-09 00:00
41451252.16945448
2022-07-08 23:00
27351575.46387145
2022-07-08 22:00
20583704.47179192
2022-07-08 21:00
21504920.43451001
2022-07-08 20:00
33939926.579196885
2022-07-08 19:00
30759656.889037505
2022-07-08 18:00
24672860.010729354
2022-07-08 17:00
30514408.844315756
2022-07-08 16:00
35540963.96389037
2022-07-08 15:00
59060054.610561274
2022-07-08 14:00
44873471.66561134
2022-07-08 13:00
40759573.15380236
2022-07-08 12:00
54377299.87167983
2022-07-08 11:00
18517730.48875289
2022-07-08 10:00
24123822.389353126
2022-07-08 09:00
36733935.6436972
2022-07-08 08:00
28972474.429933608
2022-07-08 07:00
17334566.424555574
2022-07-08 06:00
30900584.38441498
2022-07-08 05:00
22676767.141597543
2022-07-08 04:00
10146669.354855496
2022-07-08 03:00
7792500.516663354
2022-07-08 02:00
18122348.409797344
2022-07-08 01:00
30254979.995306473
2022-07-08 00:00
10137317.951389832
2022-07-07 23:00
18568743.06726625
2022-07-07 22:00
26630605.577752005
2022-07-07 21:00
12843873.768834285
2022-07-07 20:00
18732325.917473722
2022-07-07 19:00
28948988.70425474
2022-07-07 18:00
17229093.915763672
2022-07-07 17:00
29701659.955526415
2022-07-07 16:00
32604063.715591863
2022-07-07 15:00
24836532.09117276
2022-07-07 14:00
40379311.72134722
2022-07-07 13:00
14210522.652281137
2022-07-07 12:00
18834576.36442322
2022-07-07 11:00
6440085.905125487
2022-07-07 10:00
11905191.694233913
2022-07-07 09:00
11900286.660289038
2022-07-07 08:00
18658509.339652944
2022-07-07 07:00
13528808.486570777
2022-07-07 06:00
17636372.628035717
2022-07-07 05:00
21334083.37967233
2022-07-07 04:00
18682175.861012544
2022-07-07 03:00
15811366.1125308
2022-07-07 02:00
18377035.93486854
2022-07-07 01:00
10148069.953579659
2022-07-07 00:00
10246435.830411907
2022-07-06 23:00
14439029.310203962
2022-07-06 22:00
35784110.2131212
2022-07-06 21:00
20031221.361818787
2022-07-06 20:00
26435922.94644628
2022-07-06 19:00
23142247.190801565
2022-07-06 18:00
61109726.596604586
2022-07-06 17:00
20154279.19543301
2022-07-06 16:00
10713197.891860368
2022-07-06 15:00
20075222.79931171
2022-07-06 14:00
24376901.698900513
2022-07-06 13:00
31708325.290775407
2022-07-06 12:00
29953738.807172474
2022-07-06 11:00
17079546.646232475
2022-07-06 10:00
18826171.92097609
2022-07-06 09:00
22672125.016438358
2022-07-06 08:00
40339559.38838793
2022-07-06 07:00
18526728.77699888
2022-07-06 06:00
23234977.863485742
2022-07-06 05:00
16716649.620562328
2022-07-06 04:00
22961037.623525072
2022-07-06 03:00
21934843.86526101
2022-07-06 02:00
24932066.919932038
2022-07-06 01:00
23369230.36565974
2022-07-06 00:00
23624185.633144293
2022-07-05 23:00
15859227.75688855
2022-07-05 22:00
27306194.147722024
2022-07-05 21:00
25520262.99584174
2022-07-05 20:00
29193127.75630611
2022-07-05 19:00
30077737.671276778
2022-07-05 18:00
22840446.01639598
2022-07-05 17:00
17983665.60207491
2022-07-05 16:00
19393669.603055526
2022-07-05 15:00
23176053.287318565
2022-07-05 14:00
42045918.937618345
2022-07-05 13:00
45068286.37658012
2022-07-05 12:00
33503727.90666636
2022-07-05 11:00
17163659.240092937
2022-07-05 10:00
12885786.156862969
2022-07-05 09:00
22149299.593278736
2022-07-05 08:00
31769303.792383444
2022-07-05 07:00
12544714.467394067
2022-07-05 06:00
23241939.96259715
2022-07-05 05:00
27453221.2286192
2022-07-05 04:00
13290970.210961953
2022-07-05 03:00
19136118.185153473
2022-07-05 02:00
8169925.21871324
2022-07-05 01:00
11337901.274087742
2022-07-05 00:00
20550463.14589362
2022-07-04 23:00
45315736.15005257
2022-07-04 22:00
34836275.98029143
2022-07-04 21:00
16980713.186734255
2022-07-04 20:00
10089012.068351692
2022-07-04 19:00
12545735.793854821
2022-07-04 18:00
14156573.529926201
2022-07-04 17:00
24500578.189678952
2022-07-04 16:00
12226029.043836195
2022-07-04 15:00
53998336.84604432
2022-07-04 14:00
8558313.609346313
2022-07-04 13:00
17885556.559883915
2022-07-04 12:00
29232470.03808531
2022-07-04 11:00
15719302.086471176
2022-07-04 10:00
9219555.24607532
2022-07-04 09:00
10517053.291789498
2022-07-04 08:00
3025538.401995017
2022-07-04 07:00
6851452.709447566
2022-07-04 06:00
4924776.068136906
2022-07-04 05:00
2082708.1274520697
2022-07-04 04:00
5387893.028358379
2022-07-04 03:00
7751527.856009235
2022-07-04 02:00
9852248.096909305
2022-07-04 01:00
5714097.029779725
2022-07-04 00:00
13560889.337915165
2022-07-03 23:00
6006523.3268419625
2022-07-03 22:00
7582632.2543214355
2022-07-03 21:00
11474301.909911323
2022-07-03 20:00
32761309.355746266
2022-07-03 19:00
13843691.825281626
2022-07-03 18:00
6089149.887074672
2022-07-03 17:00
4353626.241528266
2022-07-03 16:00
7545359.245822932
2022-07-03 15:00
6053065.877831064
2022-07-03 14:00
7732293.336912914
2022-07-03 13:00
7456276.059518863
2022-07-03 12:00
9811828.902649704
2022-07-03 11:00
3310356.6284093964
2022-07-03 10:00
2802349.2767475243
2022-07-03 09:00
18136807.126572255
2022-07-03 08:00
12432944.708908735
2022-07-03 07:00
8009682.8065367015
2022-07-03 06:00
9996094.158305863
2022-07-03 05:00
30367506.903084688
2022-07-03 04:00
19073652.84167793
2022-07-03 03:00
4741545.497871817
2022-07-03 02:00
2797629.1314867185
2022-07-03 01:00
9107545.919270676
2022-07-03 00:00
16094759.841600094
2022-07-02 23:00
8531112.151061025
2022-07-02 22:00
9706991.443574648
2022-07-02 21:00
6842204.091870224
2022-07-02 20:00
12478436.943397094
2022-07-02 19:00
10158738.121315151
2022-07-02 18:00
11030529.73870799
2022-07-02 17:00
6001640.301088842
2022-07-02 16:00
12222189.938317742
2022-07-02 15:00
8312950.753140387
2022-07-02 14:00
8174314.34036986
2022-07-02 13:00
7779531.084715904
2022-07-02 12:00
19825669.085234463
2022-07-02 11:00
4935700.869404539
2022-07-02 10:00
8839969.691230932
2022-07-02 09:00
17720134.930239584
2022-07-02 08:00
9613788.791850435
2022-07-02 07:00
8840599.997323602
2022-07-02 06:00
7246699.472543854
2022-07-02 05:00
7781304.63294492
2022-07-02 04:00
12180455.368989177
2022-07-02 03:00
13693654.461873587
2022-07-02 02:00
24334530.78752501
2022-07-02 01:00
18060245.300151255
2022-07-02 00:00
29734931.407630857
2022-07-01 23:00
12132175.885664796
2022-07-01 22:00
13116109.130962132
2022-07-01 21:00
17551076.54845359
2022-07-01 20:00
26313002.469530527
2022-07-01 19:00
14296689.959841631
2022-07-01 18:00
22008978.777588584
2022-07-01 17:00
29726418.622293536
2022-07-01 16:00
19859511.86804359
2022-07-01 15:00
23223036.160017665
2022-07-01 14:00
44321920.22791494
2022-07-01 13:00
50266579.52472579
2022-07-01 12:00
21569822.721439157
2022-07-01 11:00
32162690.4897028
2022-07-01 10:00
34579523.66646495
2022-07-01 09:00
20251138.324169416
2022-07-01 08:00
21410938.510795224
2022-07-01 07:00
27535505.12017792
2022-07-01 06:00
16781776.856055785
2022-07-01 05:00
30428177.53052165
2022-07-01 04:00
38635245.782289974
2022-07-01 03:00
27920858.324097175
2022-07-01 02:00
25142777.97432076
2022-07-01 01:00
57815281.5750471
2022-07-01 00:00
69518636.54549184
2022-06-30 23:00
49162995.269323796
2022-06-30 22:00
20213180.277126104
2022-06-30 21:00
36812350.17375943
2022-06-30 20:00
33960894.86795639
2022-06-30 19:00
20794123.404566552
2022-06-30 18:00
13919177.96153394
2022-06-30 17:00
14096299.68763452
2022-06-30 16:00
27244411.210336804
2022-06-30 15:00
27329560.67917778
2022-06-30 14:00
26460363.330783293
2022-06-30 13:00
36484533.20475304
2022-06-30 12:00
23318150.45145535
2022-06-30 11:00
20650911.027838495
2022-06-30 10:00
11466476.890461389
2022-06-30 09:00
38489157.79464236
2022-06-30 08:00
21407238.658825964
2022-06-30 07:00
20531681.032598466
2022-06-30 06:00
26989717.24700464
2022-06-30 05:00
11701974.960007085
2022-06-30 04:00
11575695.537931211
2022-06-30 03:00
10452202.200640138
2022-06-30 02:00
9277173.847939828
2022-06-30 01:00
18456376.17773604
2022-06-30 00:00
24011657.777877282
2022-06-29 23:00
12010420.809605217
2022-06-29 22:00
12772387.825890709
2022-06-29 21:00
25949264.83863169
2022-06-29 20:00
26795024.46993948
2022-06-29 19:00
45651254.26907848
2022-06-29 18:00
11533030.715765642
2022-06-29 17:00
27023866.5177096
2022-06-29 16:00
16367083.377770822
2022-06-29 15:00
34869736.143199876
2022-06-29 14:00
22109424.539875425
2022-06-29 13:00
38203113.68453683
2022-06-29 12:00
23024125.400714826
2022-06-29 11:00
29774738.9964805
2022-06-29 10:00
20226094.042098988
2022-06-29 09:00
13083683.625574153
2022-06-29 08:00
8785362.45186257
2022-06-29 07:00
17155281.55254113
2022-06-29 06:00
22044901.47652947
2022-06-29 05:00
17113461.3575663
2022-06-29 04:00
8887319.069426782
2022-06-29 03:00
8714648.103108594
2022-06-29 02:00
6455529.715216507
2022-06-29 01:00
5833182.4074583035
2022-06-29 00:00
22503039.218832344
2022-06-28 23:00
12620690.965042332
2022-06-28 22:00
14868963.695081545
2022-06-28 21:00
5047052.143338677
2022-06-28 20:00
21122275.584467813
2022-06-28 19:00
20270416.133548066
2022-06-28 18:00
40859172.781108394
2022-06-28 17:00
13563818.324421458
2022-06-28 16:00
20011940.14334482
2022-06-28 15:00
21116349.654444896
2022-06-28 14:00
24242900.085662402
2022-06-28 13:00
21324446.670335017
2022-06-28 12:00
13255778.528917722
2022-06-28 11:00
13281183.349536117
2022-06-28 10:00
6622377.255698502
2022-06-28 09:00
14128819.309466409
2022-06-28 08:00
14818985.335497629
2022-06-28 07:00
10302749.200034162
2022-06-28 06:00
8141017.499729038
2022-06-28 05:00
4642543.38309223
2022-06-28 04:00
4348840.273504991
2022-06-28 03:00
6024021.245442195
2022-06-28 02:00
16809250.933599975
2022-06-28 01:00
14384614.162038727
2022-06-28 00:00
18668402.83877029
2022-06-27 23:00
8807404.84512325
2022-06-27 22:00
10836867.846209856
2022-06-27 21:00
6956497.03242303
2022-06-27 20:00
6880633.688102098
2022-06-27 19:00
7999956.460601598
2022-06-27 18:00
26598004.47064674
2022-06-27 17:00
17170568.001135685
2022-06-27 16:00
8709779.717438389
2022-06-27 15:00
9262931.580620686
2022-06-27 14:00
20634023.53277942
2022-06-27 13:00
18669809.730184827
2022-06-27 12:00
8731586.021750871
2022-06-27 11:00
11877064.344911914
2022-06-27 10:00
7441266.622670778
2022-06-27 09:00
7713461.712830773
2022-06-27 08:00
7328319.189071716
2022-06-27 07:00
7639545.229035721
2022-06-27 06:00
6302003.571190191
2022-06-27 05:00
6570180.588286572
2022-06-27 04:00
8193933.302202238
2022-06-27 03:00
13295760.22857771
2022-06-27 02:00
8233813.319149598
2022-06-27 01:00
11795602.268860847
2022-06-27 00:00
16872840.391978897
2022-06-26 23:00
24595321.75605329
2022-06-26 22:00
24943691.949014224
2022-06-26 21:00
11611806.091149367
2022-06-26 20:00
9886710.595565315
2022-06-26 19:00
15727874.778848952
2022-06-26 18:00
11763197.50740169
2022-06-26 17:00
8406610.883574024
2022-06-26 16:00
7558790.569321787
2022-06-26 15:00
12234698.451838257
2022-06-26 14:00
8879422.614156414
2022-06-26 13:00
29973349.00774229
2022-06-26 12:00
19755597.458885677
2022-06-26 11:00
14124219.98548862
2022-06-26 10:00
6038599.235477524
2022-06-26 09:00
9194862.513109569
2022-06-26 08:00
2552013.0035422393
`

const volume_usd_seven_days = `2022-07-24 01:00
13600370.132942379
2022-07-24 00:00
20613932.185104176
2022-07-23 23:00
22269549.62586266
2022-07-23 22:00
34813572.30133406
2022-07-23 21:00
8505217.164138433
2022-07-23 20:00
20623483.84576078
2022-07-23 19:00
19960825.04858302
2022-07-23 18:00
27277444.825340506
2022-07-23 17:00
34289782.97219042
2022-07-23 16:00
22704722.204997588
2022-07-23 15:00
20779616.46280913
2022-07-23 14:00
20192575.65143293
2022-07-23 13:00
11727252.53507179
2022-07-23 12:00
36112791.168169945
2022-07-23 11:00
26715009.746325955
2022-07-23 10:00
23459072.310330175
2022-07-23 09:00
18714611.069667265
2022-07-23 08:00
30426441.24992539
2022-07-23 07:00
16895393.39271893
2022-07-23 06:00
27654378.75491496
2022-07-23 05:00
14242801.870661072
2022-07-23 04:00
16087229.47070466
2022-07-23 03:00
13686298.506282084
2022-07-23 02:00
19586636.89956997
2022-07-23 01:00
18309823.681083515
2022-07-23 00:00
23508867.869661424
2022-07-22 23:00
20425632.487647578
2022-07-22 22:00
19559600.616050895
2022-07-22 21:00
21125710.827181287
2022-07-22 20:00
31074016.38321614
2022-07-22 19:00
43970696.53016933
2022-07-22 18:00
18586590.232523434
2022-07-22 17:00
31869216.922691908
2022-07-22 16:00
25934756.986463703
2022-07-22 15:00
30807494.07276204
2022-07-22 14:00
63369981.099611185
2022-07-22 13:00
36668251.568910524
2022-07-22 12:00
15672061.975745142
2022-07-22 11:00
14362572.440849198
2022-07-22 10:00
14855154.697673785
2022-07-22 09:00
25529424.98306909
2022-07-22 08:00
24118158.12545877
2022-07-22 07:00
28497706.852980062
2022-07-22 06:00
19474889.316605035
2022-07-22 05:00
15040264.47923438
2022-07-22 04:00
8606173.862274991
2022-07-22 03:00
18151949.219303556
2022-07-22 02:00
12936802.391881973
2022-07-22 01:00
24343114.483914252
2022-07-22 00:00
16832418.374136146
2022-07-21 23:00
17011836.539470326
2022-07-21 22:00
19004222.137386966
2022-07-21 21:00
19146955.03521841
2022-07-21 20:00
34256927.55696316
2022-07-21 19:00
20880781.223267194
2022-07-21 18:00
18527957.13102325
2022-07-21 17:00
40951216.52323041
2022-07-21 16:00
70809141.7900408
2022-07-21 15:00
22633558.2780655
2022-07-21 14:00
34610128.82232185
2022-07-21 13:00
37102687.0688103
2022-07-21 12:00
38461009.98005522
2022-07-21 11:00
29837036.339888547
2022-07-21 10:00
20910351.512048736
2022-07-21 09:00
28906319.106840987
2022-07-21 08:00
26485521.778991707
2022-07-21 07:00
19097071.58575155
2022-07-21 06:00
27379560.046493463
2022-07-21 05:00
22232056.089561895
2022-07-21 04:00
37426520.72698545
2022-07-21 03:00
33955039.1481685
2022-07-21 02:00
32486357.272634298
2022-07-21 01:00
37974387.719391435
2022-07-21 00:00
23428426.827871192
2022-07-20 23:00
36484392.78410382
2022-07-20 22:00
23971675.494412273
2022-07-20 21:00
48350765.79588393
2022-07-20 20:00
117961569.15016124
2022-07-20 19:00
22029707.17419887
2022-07-20 18:00
20938608.873115066
2022-07-20 17:00
46254048.87289884
2022-07-20 16:00
54109053.543588296
2022-07-20 15:00
54726902.10736791
2022-07-20 14:00
22294529.589768324
2022-07-20 13:00
47750064.949216336
2022-07-20 12:00
36538775.63569916
2022-07-20 11:00
28410840.912990283
2022-07-20 10:00
43391769.96893105
2022-07-20 09:00
15141946.503359413
2022-07-20 08:00
22162557.231276184
2022-07-20 07:00
42790324.1809128
2022-07-20 06:00
18462089.56819914
2022-07-20 05:00
16263222.648194835
2022-07-20 04:00
16160157.113598581
2022-07-20 03:00
32008926.115088396
2022-07-20 02:00
17801655.585307512
2022-07-20 01:00
21034432.372506946
2022-07-20 00:00
43444275.08801628
2022-07-19 23:00
40660995.07840377
2022-07-19 22:00
42429175.51156965
2022-07-19 21:00
26199157.715915382
2022-07-19 20:00
32575925.19001098
2022-07-19 19:00
34669551.51918036
2022-07-19 18:00
32057719.458509162
2022-07-19 17:00
31229370.801896136
2022-07-19 16:00
53840111.37946961
2022-07-19 15:00
79061923.5904405
2022-07-19 14:00
44529976.680772714
2022-07-19 13:00
58379065.501822755
2022-07-19 12:00
27627385.83542421
2022-07-19 11:00
28590246.795484558
2022-07-19 10:00
36121003.591724046
2022-07-19 09:00
21594243.111034
2022-07-19 08:00
33338148.318686247
2022-07-19 07:00
54569267.40675994
2022-07-19 06:00
43857191.26426404
2022-07-19 05:00
38902483.55484904
2022-07-19 04:00
34384950.80769121
2022-07-19 03:00
33363561.111920923
2022-07-19 02:00
43237054.91842491
2022-07-19 01:00
52728447.85374358
2022-07-19 00:00
77915943.25078928
2022-07-18 23:00
63226364.1211375
2022-07-18 22:00
30134745.656476464
2022-07-18 21:00
20700216.833719507
2022-07-18 20:00
35982464.93384436
2022-07-18 19:00
54300224.7579485
2022-07-18 18:00
34813321.51118502
2022-07-18 17:00
44578789.30439992
2022-07-18 16:00
45967642.5225592
2022-07-18 15:00
27260236.764684074
2022-07-18 14:00
25809126.503535423
2022-07-18 13:00
36402518.5294693
2022-07-18 12:00
34205686.29886548
2022-07-18 11:00
33874899.721823014
2022-07-18 10:00
30686480.456293825
2022-07-18 09:00
22096982.118011385
2022-07-18 08:00
45633813.84149471
2022-07-18 07:00
32370206.773637295
2022-07-18 06:00
54048675.94814543
2022-07-18 05:00
41804864.81083969
2022-07-18 04:00
23946993.79419618
2022-07-18 03:00
31681329.868126303
2022-07-18 02:00
41112365.09281612
2022-07-18 01:00
32139938.376471516
2022-07-18 00:00
24997577.858474724
2022-07-17 23:00
41767417.31635691
2022-07-17 22:00
26844744.983654767
2022-07-17 21:00
25749112.74776933
2022-07-17 20:00
15551219.382594619
2022-07-17 19:00
21709239.01934391
2022-07-17 18:00
33970013.596936
2022-07-17 17:00
62173155.57487758
2022-07-17 16:00
20618597.863197435
2022-07-17 15:00
17737151.245173026
2022-07-17 14:00
21552248.427040763
2022-07-17 13:00
52546174.03874065
2022-07-17 12:00
19476747.333840434
2022-07-17 11:00
19227462.139354594
2022-07-17 10:00
25023574.89091005
2022-07-17 09:00
28160762.239162456
2022-07-17 08:00
14279570.517266486
2022-07-17 07:00
18497740.31274411
2022-07-17 06:00
30410750.621629924
2022-07-17 05:00
13368860.829211889
2022-07-17 04:00
13984296.74662103
2022-07-17 03:00
19585216.793819897
`

const uniswap_volume_usd_seven_days = `
2022-07-26 06:00
29516383.936172057
2022-07-26 05:00
17951482.779058944
2022-07-26 04:00
94771810.98881964
2022-07-26 03:00
51810598.42963957
2022-07-26 02:00
19917346.98972365
2022-07-26 01:00
60425052.86622183
2022-07-26 00:00
88647517.93511452
2022-07-25 23:00
75968248.86105548
2022-07-25 22:00
107643464.43666488
2022-07-25 21:00
30563312.885367695
2022-07-25 20:00
99296028.21100256
2022-07-25 19:00
110150541.3304845
2022-07-25 18:00
24521183.793214045
2022-07-25 17:00
31877894.545576744
2022-07-25 16:00
31428029.42170136
2022-07-25 15:00
58564351.454740755
2022-07-25 14:00
42021103.13639363
2022-07-25 13:00
69770258.2370213
2022-07-25 12:00
47518143.88195972
2022-07-25 11:00
55166160.268807024
2022-07-25 10:00
24877347.952216834
2022-07-25 09:00
13725150.96324391
2022-07-25 08:00
33194971.291394684
2022-07-25 07:00
22975084.39877445
2022-07-25 06:00
19816711.264470134
2022-07-25 05:00
36884387.91119671
2022-07-25 04:00
28914835.479245275
2022-07-25 03:00
63137104.03718009
2022-07-25 02:00
118873074.60255988
2022-07-25 01:00
62173888.18067591
2022-07-25 00:00
89512900.86025637
2022-07-24 23:00
64770799.8699956
2022-07-24 22:00
99278693.58722493
2022-07-24 21:00
49955856.474079765
2022-07-24 20:00
24502506.634867508
2022-07-24 19:00
53184225.27981498
2022-07-24 18:00
15411547.89347141
2022-07-24 17:00
52451681.588610485
2022-07-24 16:00
39781879.302424885
2022-07-24 15:00
26026129.2265498
2022-07-24 14:00
77117378.54565208
2022-07-24 13:00
33549725.866943393
2022-07-24 12:00
43051111.73857788
2022-07-24 11:00
49628551.27423056
2022-07-24 10:00
28634357.3359452
2022-07-24 09:00
42788905.853603125
2022-07-24 08:00
28382462.230810165
2022-07-24 07:00
20649761.962541252
2022-07-24 06:00
31449090.530162696
2022-07-24 05:00
62822379.04524736
2022-07-24 04:00
16787200.905262098
2022-07-24 03:00
30468665.52850122
2022-07-24 02:00
26555775.468267083
2022-07-24 01:00
25048202.67739628
2022-07-24 00:00
39484379.96959728
2022-07-23 23:00
32892580.474623904
2022-07-23 22:00
63785115.1953627
2022-07-23 21:00
17183423.645031765
2022-07-23 20:00
36748173.72000551
2022-07-23 19:00
46360633.10770813
2022-07-23 18:00
53435324.63298018
2022-07-23 17:00
56430616.765998855
2022-07-23 16:00
30876979.151385497
2022-07-23 15:00
31071744.46527143
2022-07-23 14:00
30283057.5721847
2022-07-23 13:00
21859729.919242304
2022-07-23 12:00
53283326.94100988
2022-07-23 11:00
42795932.96002307
2022-07-23 10:00
34117947.12403665
2022-07-23 09:00
26228623.623204917
2022-07-23 08:00
50062153.159040906
2022-07-23 07:00
27977200.20878191
2022-07-23 06:00
35743762.11263166
2022-07-23 05:00
28503397.279303834
2022-07-23 04:00
33438593.51611228
2022-07-23 03:00
26839234.51451925
2022-07-23 02:00
33897352.864262365
2022-07-23 01:00
26774833.85631554
2022-07-23 00:00
47746209.58106337
2022-07-22 23:00
48252608.89082405
2022-07-22 22:00
40750659.18519105
2022-07-22 21:00
47910623.3709364
2022-07-22 20:00
42927503.116625555
2022-07-22 19:00
82199467.46877414
2022-07-22 18:00
31336259.11644364
2022-07-22 17:00
48965375.62122721
2022-07-22 16:00
45486718.4419553
2022-07-22 15:00
52517384.172380365
2022-07-22 14:00
86776986.41446559
2022-07-22 13:00
73858776.32449512
2022-07-22 12:00
42227823.39698646
2022-07-22 11:00
23967227.457655285
2022-07-22 10:00
37101036.6735751
2022-07-22 09:00
53986443.6571505
2022-07-22 08:00
54430040.61487916
2022-07-22 07:00
50818380.05333644
2022-07-22 06:00
45822566.1488203
2022-07-22 05:00
27679692.14420975
2022-07-22 04:00
46742247.15522243
2022-07-22 03:00
28129291.484012257
2022-07-22 02:00
21109262.924628302
2022-07-22 01:00
36325490.95044236
2022-07-22 00:00
30734906.384382434
2022-07-21 23:00
31104326.507195212
2022-07-21 22:00
39577290.261150725
2022-07-21 21:00
33237850.636177856
2022-07-21 20:00
64010390.271286465
2022-07-21 19:00
42142653.10482753
2022-07-21 18:00
35020974.82095011
2022-07-21 17:00
74005709.14890961
2022-07-21 16:00
112888878.30587439
2022-07-21 15:00
34070573.926275656
2022-07-21 14:00
67972943.70976819
2022-07-21 13:00
73049099.11759034
2022-07-21 12:00
74075175.42574109
2022-07-21 11:00
60739433.33530262
2022-07-21 10:00
42196532.326081686
2022-07-21 09:00
50444173.43609909
2022-07-21 08:00
37510762.640494354
2022-07-21 07:00
33944081.47276783
2022-07-21 06:00
48022348.81798847
2022-07-21 05:00
32479020.460359436
2022-07-21 04:00
87420850.423251
2022-07-21 03:00
57748978.00359227
2022-07-21 02:00
54444758.24804555
2022-07-21 01:00
61440251.070543796
2022-07-21 00:00
42790270.63207033
2022-07-20 23:00
62664318.11704079
2022-07-20 22:00
45490726.53006781
2022-07-20 21:00
82871515.36325034
2022-07-20 20:00
195162947.57114872
2022-07-20 19:00
35917112.10617699
2022-07-20 18:00
34483475.570055224
2022-07-20 17:00
72203540.32252374
2022-07-20 16:00
87354574.50261548
2022-07-20 15:00
123770006.58800931
2022-07-20 14:00
44162212.51200594
2022-07-20 13:00
88302910.45383856
2022-07-20 12:00
82339314.26521684
2022-07-20 11:00
86294153.60556838
2022-07-20 10:00
100122701.6988905
2022-07-20 09:00
30129356.474099755
2022-07-20 08:00
37419163.63752349
2022-07-20 07:00
65403506.23898943
2022-07-20 06:00
40628756.72012821
2022-07-20 05:00
24689989.992620565
2022-07-20 04:00
36872586.0636634
2022-07-20 03:00
64079336.978602156
2022-07-20 02:00
29112897.253624707
2022-07-20 01:00
37152576.83076766
2022-07-20 00:00
74327350.27836183
2022-07-19 23:00
74638467.2312044
2022-07-19 22:00
68681426.93807888
2022-07-19 21:00
74621997.84632924
2022-07-19 20:00
50568871.79556978
2022-07-19 19:00
68591125.03636675
2022-07-19 18:00
58122894.54781038
2022-07-19 17:00
60878110.235616155
2022-07-19 16:00
101477320.14688307
2022-07-19 15:00
148045125.6699903
2022-07-19 14:00
80379215.72541906
2022-07-19 13:00
94517137.0104489
2022-07-19 12:00
57891379.30441042
2022-07-19 11:00
54084657.81905936
2022-07-19 10:00
67377294.88463788
2022-07-19 09:00
40579285.46660374
2022-07-19 08:00
24051495.88914
`

main(volume_usd_thirty_days, volume_usd_seven_days, uniswap_volume_usd_seven_days)



