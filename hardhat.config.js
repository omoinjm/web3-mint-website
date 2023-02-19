// require('@nomicfoundation/hardhat-toolbox');
require('@nomiclabs/hardhat-waffle');
require('@nomiclabs/hardhat-etherscan');
const dotenv = require('dotenv');

dotenv.config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
	solidity: '0.8.17',
	defaultNetwork: 'sepolia',
	networks: {
		hardhat: {},
		sepolia: {
			url: process.env.REACT_APP_SEPOLIA_RPC_URL,
			accounts: [process.env.REACT_APP_PRIVATE_KEY],
		},
	},
	etherscan: {
		apiKey: process.env.REACT_APP_ETHERSCAN_KEY,
	},
};
