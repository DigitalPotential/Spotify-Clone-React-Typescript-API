import { Box } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import Home from '../../pages/Home';
import SpotifyWebApi from 'spotify-web-api-node';
import SideNav from '../SideNav/SideNav';
import { getAccessTokenFromStorage } from '../../utils/getAccessTokenFromStorage';
import { useState, useEffect } from 'react';
import Playlist from '../../pages/Playlist';
import Player from '../Player/Player';
import MobileNav from '../MobileNav/MobileNav';
import Library from '../../pages/Library';

interface Props {
	spotifyApi: SpotifyWebApi;
}

const Dashboard = ({ spotifyApi }: Props) => {
	const token = getAccessTokenFromStorage();

	useEffect(() => {
		const onMount = async () => {
			await spotifyApi.setAccessToken(token as string);
		};
		if (token) {
			onMount();
		}
	}, []);

	return (
		<Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
			<Box sx={{ flex: 1, overflowY: 'auto', display: 'flex' }}>
				<SideNav spotifyApi={spotifyApi} token={token} />
				<Routes>
					<Route path="playlist/:id" element={<Playlist spotifyApi={spotifyApi} token={token as string} />} />
					<Route path="/library" element={<Library spotifyApi={spotifyApi} token={token as string} />} />
					<Route path="/" element={<Home />} />
				</Routes>
			</Box>
			{token && <Player spotifyApi={spotifyApi} token={token} /> }
			<MobileNav />
		</Box>
	);
};

export default Dashboard;
