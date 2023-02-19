import { Box, Button, Flex, Input, Text } from '@chakra-ui/react';
import { BigNumber, ethers } from 'ethers';
import React, { useState } from 'react';
import omoiNjmNFT from '../OmoiNjmNFT.json';

const omoiNjmNFTAddress = process.env.REACT_NFT_ADDRESS;

const MainMint = ({ accounts, setAccount }) => {
	const [mintAmmount, setMintAmount] = useState(1);
	const isConnected = Boolean(accounts[0]);

	async function handleMint() {
		if (window.ethereum) {
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const signer = provider.getSigners();
			const contract = new ethers.Contract(
				omoiNjmNFTAddress,
				omoiNjmNFT.abi,
				signer
			);

			try {
				const response = await contract.mint(BigNumber.from(mintAmmount));
				console.log('response: ', response);
			} catch (err) {
				console.log('error: ', err);
			}
		}
	}

	const handleDecrement = () => {
		if (mintAmmount <= 1) return;
		setMintAmount(mintAmmount - 1);
	};

	const handleIncrement = () => {
		if (mintAmmount >= 3) return;
		setMintAmount(mintAmmount + 1);
	};

	return (
		<Flex justify="center" align="center" height="100vh" paddingBottom="150px">
			<Box width="520px">
				<div>
					<Text fontSize="48px" textShadow="0 5px #000000">
						OmoiNjmNFT
					</Text>
					<Text
						fontSize="30px"
						letterSpacing="-5.5%"
						fontFamily="VT323"
						textShadow="0 2px 2px #000000"
					>
						Enter a new era of Web 3.0. Get ahead and be the first to own
						OmoiNjm NFT, interested? Mint OmoiNjm to find out.
					</Text>
				</div>

				{isConnected ? (
					<div>
						<Flex align="center" justify="center">
							<Button
								backgroundColor="#D6517D"
								borderRadius="5px"
								boxShadow="0px 2px 2px 1px #0F0F0F"
								color="#FFF"
								cursor="pointer"
								fontFamily="inherit"
								padding="15px"
								marginTop="10px"
								onClick={handleDecrement}
							>
								-
							</Button>
							<Input
								readOnly
								fontFamily="inherit"
								width="100px"
								height="40px"
								textAlign="center"
								paddingLeft="19px"
								marginTop="10px"
								type="number"
								value={mintAmmount}
							/>
							<Button
								backgroundColor="#D6517D"
								borderRadius="5px"
								boxShadow="0px 2px 2px 1px #0F0F0F"
								color="#FFF"
								cursor="pointer"
								fontFamily="inherit"
								padding="15px"
								marginTop="10px"
								onClick={handleIncrement}
							>
								+
							</Button>
						</Flex>
						<Button
							backgroundColor="#D6517D"
							borderRadius="5px"
							boxShadow="0px 2px 2px 1px #0F0F0F"
							color="#FFF"
							cursor="pointer"
							fontFamily="inherit"
							padding="15px"
							marginTop="10px"
							onClick={handleMint}
						>
							Mint Now
						</Button>
					</div>
				) : (
					<Text color="#D6517D">You must be connected to Mint.</Text>
				)}
			</Box>
		</Flex>
	);
};

export default MainMint;
