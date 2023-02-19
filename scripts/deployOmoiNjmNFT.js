// global scope, and execute the script.
const hre = require('hardhat');

async function main() {
	const OmoiNjmNFT = await hre.ethers.getContractFactory('OmoiNjmNFT');
	const omoiNjmNFT = await OmoiNjmNFT.deploy();

	await omoiNjmNFT.deployed();

	console.log(`OmoiNjmNFT deployed to: ${omoiNjmNFT.address}`);
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
