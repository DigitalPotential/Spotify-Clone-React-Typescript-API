import { Box, Grid, Typography, Avatar } from '@mui/material';
import SpotifyWebApi from 'spotify-web-api-node';
import { useEffect, useState } from 'react';
import { ReadyEvent, NotReadyEvent, PlayerStateChangedEvent, ExtendedSpotifyPlayer } from '../../Types/spotify-types';

import PlayerControls from '../PlayerControls/PlayerControls';
import PlayerVolume from '../PlayerVolume/PlayerVolume';
import PlayerOverlay from '../PlayerOverlay/PlayerOverlay';

interface Props {
	spotifyApi: SpotifyWebApi;
	token: string;
}

interface Track {
	name: string;
	artists: { name: string }[];
	album: { name: string; images: { url: string }[] };
	duration_ms: number;
}

const Player = ({ token }: Props) => {
	const [localPlayer, setLocalPlayer] = useState<ExtendedSpotifyPlayer | null>(null);
	const [is_paused, setIsPaused] = useState<boolean>(false);
	const [current_track, setCurrentTrack] = useState<Track | null>(null);
	const [device, setDevice] = useState<string | null>(null);
	const [duration, setDuration] = useState<number | null>(null);
	const [progress, setProgress] = useState<number | null>(null);
	const [active, setActive] = useState<boolean | null>(null);
	const [playerOverlayIsOpen, setPlayerOverlayIsOpen] = useState<boolean>(false);

	useEffect(() => {
		const script = document.createElement('script');
		script.src = 'https://sdk.scdn.co/spotify-player.js';
		script.async = true;

		document.body.appendChild(script);

		window.onSpotifyWebPlaybackSDKReady = () => {
			const player = new window.Spotify.Player({
				name: 'Carlos App',
				getOAuthToken: (cb) => {
					cb(token);
				},
				volume: 0.5
			});

			player.addListener('ready', (data: ReadyEvent) => {
				console.log('Ready with Device ID', data.device_id);
				setDevice(data.device_id);
				setLocalPlayer(player as ExtendedSpotifyPlayer);
			});

			player.addListener('not_ready', (data: NotReadyEvent) => {
				console.log('Device ID has gone offline', data.device_id);
			});

			player.addListener('player_state_changed', (state: PlayerStateChangedEvent) => {
				if (!state || !state.track_window?.current_track) {
					return;
				}

				const duration = state.track_window.current_track.duration_ms / 1000;
				const progress = state.position / 1000;
				setDuration(duration);
				setProgress(progress);
				setIsPaused(state.paused);
				setCurrentTrack(state.track_window.current_track);

				player.getCurrentState().then((state) => {
					!state ? setActive(false) : setActive(true);
				});
			});

			player.connect();
		};
	}, []);

	useEffect(() => {
		const currentPlayer = localPlayer;
		if (!currentPlayer) return;

		async function connect() {
			if (currentPlayer) {
				await currentPlayer.connect();
			}
		}

		connect();

		return () => {
			if (currentPlayer) {
				currentPlayer.disconnect();
			}
		};
	}, [localPlayer]);

	return (
		<Box>
			<Grid
				onClick={() => setPlayerOverlayIsOpen((prevState) => !prevState)}
				container
				px={3}
				sx={{
					backgroundColor: 'background.paper',
					height: 100,
					cursor: { xs: 'pointer', md: 'auto' },
					width: '100%',
					borderTop: '1px solid #292929'
				}}
			>
				<Grid xs={12} md={4} item sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
					<Avatar
						src={current_track?.album.images[0].url}
						alt={current_track?.album.name}
						variant="square"
						sx={{ width: 56, height: 56, marginRight: 2 }}
					/>
					<Box>
						<Typography sx={{ color: 'text.primary', fontSize: 14 }}>{current_track?.name}</Typography>
						<Typography sx={{ color: 'text.secondary', fontSize: 10 }}>
							{current_track?.artists[0].name}
						</Typography>
					</Box>
				</Grid>
				<Grid
					sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center', alignItems: 'center' }}
					md={4}
					item
				>
					{active ? (
						<PlayerControls
							progress={progress}
							is_paused={is_paused}
							duration={duration}
							player={localPlayer}
						/>
					) : (
						<Box>Please transfer Playback</Box>
					)}
				</Grid>
				<Grid
					xs={6}
					md={4}
					item
					sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', justifyContent: 'flex-end' }}
				>
					<PlayerVolume player={localPlayer} />
				</Grid>
			</Grid>
			<PlayerOverlay
				playerOverlayIsOpen={playerOverlayIsOpen}
				closeOverlay={() => setPlayerOverlayIsOpen(false)}
				progress={progress}
				is_paused={is_paused}
				duration={duration}
				player={localPlayer}
				current_track={current_track}
				active={active}
			/>
		</Box>
	);
};

export default Player;
