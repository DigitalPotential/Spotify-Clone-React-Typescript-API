import { Avatar, Box, Skeleton, Typography } from '@mui/material';
import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import SpotifyWebApi from 'spotify-web-api-node';
import SongTable from '../components/SongTable/SongTable';

interface Props {
	spotifyApi: SpotifyWebApi;
	token: string;
}

interface PlaylistInfo {
	image: string;
	name: string;
}

interface Status {
	isLoading: boolean;
	isError: Error | null;
}

interface CustomTrackObjectFull extends SpotifyApi.TrackObjectFull {
    contextUri: string;
    position: number;
  }

interface Song extends CustomTrackObjectFull {}

  

const Playlist = ({ spotifyApi, token }: Props) => {
	const [playlistInfo, setPlaylistInfo] = useState<PlaylistInfo | undefined>();
    const [songs, setSongs] = useState<CustomTrackObjectFull[]>([]);
	const [status, setStatus] = useState<Status>({ isLoading: false, isError: null });
	const { id: idParam } = useParams<{ id: string }>();
	const id = idParam ?? '';

	const formatSongData = useCallback(
		(songs: SpotifyApi.PlaylistTrackObject[]) => {
			return songs.map((song, i: number) => {
                const track = song.track as CustomTrackObjectFull;
                track.contextUri = `spotify:playlist:${id}`;
                track.position = i;
                return track;
			});
		},
		[id]
	);

	useEffect(() => {
		const getData = async () => {
			setStatus((prev) => ({ ...prev, isLoading: true }));

			try {
				const playlistDetail = await spotifyApi.getPlaylist(id);
				const playlistData = playlistDetail.body;
				setPlaylistInfo({
					image: playlistData.images[0].url,
					name: playlistData.name
				});

				const { tracks } = playlistData;
				const formattedSongs = formatSongData(tracks.items);
				setSongs(formattedSongs);
			} catch (error) {
				setStatus((prev) => ({ ...prev, isError: error as Error }));
			} finally {
				setStatus((prev) => ({ ...prev, isLoading: false }));
			}
		};

		if (id) {
			getData();
		}
	}, [formatSongData, id, spotifyApi, token]);

	return (
		<Box id="Playlist__page" sx={{ bgcolor: 'background.paper', flex: 1, overflowY: 'auto' }}>
			<Box
				p={{ xs: 3, md: 4 }}
				sx={{
					width: '100%',
					background: 'linear-gradient(0deg, #121212 0%, #1bd76060 100%);',
					display: 'flex',
					justifyContent: 'flex-start',
					alignItems: { xs: 'flex-start', md: 'flex-end', xl: 'center' },
					gap: 3,
					boxSizing: 'border-box',
					flexDirection: { xs: 'column', md: 'row' }
				}}
			>
				{status.isLoading ? (
					<Skeleton
						variant="rectangular"
						sx={{
							width: { sx: '100%', md: 235 },
							height: { sx: '100%', md: 235 }
						}}
					/>
				) : (
					<Avatar
						src={playlistInfo?.image}
						variant="square"
						alt={playlistInfo?.name}
						sx={{
							boxShadow: 15,
							width: { sx: '100%', md: 235 },
							height: { sx: '100%', md: 235 }
						}}
					/>
				)}
				<Box>
					<Typography sx={{ fontSize: 12, fontWeight: 'bold', color: 'text.primary' }}>Playlist</Typography>
					{status.isLoading ? (
						<Skeleton
							variant="text"
							sx={{
								fontSize: { xs: 42, md: 72 },
								width: 200
							}}
						/>
					) : (
						<Typography
							sx={{
								fontSize: { xs: 42, md: 72 },
								fontWeight: 'bold',
								color: 'text.primary'
							}}
						>
							{playlistInfo?.name}
						</Typography>
					)}
				</Box>
			</Box>
			<SongTable songs={songs} loading={status.isLoading} spotifyApi={spotifyApi} />
		</Box>
	);
};

export default Playlist;