const main = async () => {
    const [owner, randomPerson] = await hre.ethers.getSigners();
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    const waveContract = await waveContractFactory.deploy();
    await waveContract.deployed();
    
    console.log("Contract deployed to:", waveContract.address);
    console.log("Contract deployed by:", owner.address);

    // Initialize waveCount & get actual waveCount from the on-chain contract
    let waveCount; 
    waveCount = await waveContract.getTotalWaves();

    // First wave Txn
    let waveTxn = await waveContract.wave();
    await waveTxn.wait();
    // Check the waveCount to see the first wave
    waveCount = await waveContract.getTotalWaves();

    // Another user sends a wave
    waveTxn = await waveContract.connect(randomPerson).wave();
    await waveTxn.wait();
    // Check the waveCount to see the second wave
    waveCount = await waveContract.getTotalWaves();
  };
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0); // exit Node process without error
    } catch (error) {
      console.log(error);
      process.exit(1); // exit Node process while indicating 'Uncaught Fatal Exception' error
    }
    // Read more about Node exit ('process.exit(num)') status codes here: https://stackoverflow.com/a/47163396/7974948
  };
  
  runMain();