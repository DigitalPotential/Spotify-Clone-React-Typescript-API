import { Box, List, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';
import PlaylistItem from '../components/PlaylistItem/PlaylistItem';


interface Props {
	spotifyApi: SpotifyWebApi;
	token: string;
}

interface PlaylistObjectSimplified extends SpotifyApi.PlaylistObjectSimplified {
}

const Library = ({ spotifyApi, token }: Props) => {
    const [playlists, setPlaylists] = useState<PlaylistObjectSimplified[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function getPlaylists() {
			if (!spotifyApi) return;
			
			if (!spotifyApi.getAccessToken() && token) {
				spotifyApi.setAccessToken(token);
			}

			const playlistData = await spotifyApi.getUserPlaylists();
            setPlaylists(playlistData.body.items);
			setLoading(false);
		}

		getPlaylists();
	}, [spotifyApi, token]);

    const renderPlaylistItems = () => {
        if(loading) {
            return [1, 2, 3, 4, 5, 6, 7].map((_, index) => <PlaylistItem key={index} loading={loading} />)
        }

        return playlists.map((playlist, index) => <PlaylistItem key={index} loading={loading} {...playlist} /> )
    }
    console.log(loading)

	return (
		<Box
			id="Library"
			px={3}
			sx={{
				display: { xs: 'flex', md: 'none' },
				backgroundColor: 'background.default',
				flex: 1,
				flexDirection: 'column',
				overflowY: 'auto'
			}}
		>
			<Typography py={3} sx={{ color: 'text.primary', fontSize: 30}} >
                Ditt Bibliotek
            </Typography>
            <List>
                {renderPlaylistItems()}
            </List>
		</Box>
	);
};

export default Library;
