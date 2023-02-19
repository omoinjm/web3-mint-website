import { Box, Button, Flex, Image, Link, Spacer } from '@chakra-ui/react';
import React from 'react';

const NavBar = ({ accounts, setAccounts }) => {
	const isConnected = Boolean(accounts[0]);

	const Facebook = '/icons/facebook.png';
	const Twitter = '/icons/twitter.png';
	const Email = '/icons/email.png';

	const connectAccount = async () => {
		if (window.ethereum) {
			try {
				const res = await window.ethereum.request({
					method: 'eth_requestAccounts',
				});
				setAccounts(res);
			} catch (err) {
				console.error(err);
				console.log('There was a problem connecting to MetaMask');
			}
		} else {
			console.log('Install MetaMask');
		}
	};

	return (
		<Flex justify="space-between" align="center" padding="30px 30px">
			{/* LEFT side - Socials */}
			<Flex justify="space-around" width="40%" padding="0 75px">
				<Link href="https://www.facebook.com" target="_blank">
					<Image
						src={Facebook}
						boxSize="42px"
						margin="0 15px"
						alt="Facebook Icon"
					/>
				</Link>

				<Link href="https://www.twitter.com" target="_blank">
					<Image
						src={Twitter}
						boxSize="42px"
						margin="0 15px"
						alt="Twitter Icon"
					/>
				</Link>
				<Link href="mailto:n.malaza@proton.me" target="_blank">
					<Image src={Email} boxSize="42px" margin="0 15px" alt="Email Icon" />
				</Link>
			</Flex>

			{/* Right side - Sections and Connect */}
			<Flex justify="space-around" align="center" width="40%" padding="30px">
				<Box margin="0 15px">About</Box>
				<Spacer />
				<Box margin="0 15px">Mint</Box>
				<Spacer />
				<Box margin="0 15px">Team</Box>
				<Spacer />
			</Flex>

			{/* Connect */}
			{isConnected ? (
				<Box margin="0 15px">Connected</Box>
			) : (
				<Button
					backgroundColor="#D6517D"
					borderRadius="5px"
					boxShadow="0px 2px 2px 1px #0F0F0F"
					color="#FFF"
					cursor="pointer"
					fontFamily="inherit"
					padding="15px"
					margin="0 15px"
					onClick={connectAccount}
				>
					Connect
				</Button>
			)}
		</Flex>
	);
};

export default NavBar;
