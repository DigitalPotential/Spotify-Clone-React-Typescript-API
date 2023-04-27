import { useState, useEffect } from 'react';
import { Box, Divider } from '@mui/material';
import SpotifyWebApi from 'spotify-web-api-node';
import NavItem from '../NavItem/NavItem';
import HomeIcon from '@mui/icons-material/Home';
import NavPlaylist from '../NavPlaylist/NavPlaylist';

interface Props {
	spotifyApi: SpotifyWebApi;
	token: any;
}

interface PlaylistObjectSimplified extends SpotifyApi.PlaylistObjectSimplified {
}

const SideNav = ({ spotifyApi, token }: Props) => {
	const [playlists, setPlaylists] = useState<PlaylistObjectSimplified[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function getPlaylists() {
			if (!spotifyApi) return;
			
			if (!spotifyApi.getAccessToken() && token) {
				spotifyApi.setAccessToken(token);
			}

			const playlistData = await spotifyApi.getUserPlaylists();
			setLoading(false);
			setPlaylists(playlistData.body.items);
		}

		getPlaylists();
	}, [spotifyApi, token]);

	const renderPlaylists = () => {
		if (loading) {
			return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, index) => <NavPlaylist key={index} loading={loading} />);
		}

		return playlists.map((playlist, index) => (
			<NavPlaylist name={playlist.name} id={playlist.id} loading={loading} key={index} />
		));
	};

	return (
		<Box
			sx={{
				backgroundColor: 'background.default',
				width: '230px',
				height: '100%',
				display: { xs: 'none', md: 'flex' },
				flexDirection: 'column'
			}}
		>
			<Box p={3}>
				<img src="/Spotify_Logo.png" alt="" width={'75%'} />
			</Box>
			<NavItem name="home" Icon={HomeIcon} target="/" />
			<Box px={3} py={1}>
				<Divider sx={{ backgroundColor: '#ffffff40' }} />
			</Box>
			<Box sx={{ overflowY: 'auto', flex: 1 }}>{renderPlaylists()}</Box>
		</Box>
	);
};

export default SideNav;
