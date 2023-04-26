import { Stack, Typography, Slider, Box, IconButton } from '@mui/material';
import { formatTime } from '../../utils/formatTime';
import { PlayArrow, SkipNext, SkipPrevious, Pause } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { SpotifyPlayer } from '../../Types/spotify-types';

interface PlayerControlsProps {
	is_paused: boolean;
	duration: number | null;
	progress: number | null;
	player: SpotifyPlayer | null;
}

const PlayerControls = ({ is_paused, duration, progress, player }: PlayerControlsProps) => {
	const [currentProgress, setCurrentProgress] = useState(progress);
	const skipStyle = { width: 28, height: 28 };
	const playStyle = { width: 38, height: 38 };

	useEffect(() => {
		const intervalId = setInterval(() => {
			if (!is_paused && player) {
				setCurrentProgress((prevState) => prevState + 1);
			}
		}, 1000);
		return () => clearInterval(interval);
	}, [is_paused, player]);

	useEffect(() => {
		setCurrentProgress(progress);
	}, [progress]);

	return (
		<Stack direction="column" spacing={2} justifyContent="center" alignItems="center" sx={{ width: '100%' }}>
			<Stack spacing={1} direction={'row'} justifyContent={'center'} alignItems={'center'} sx={{ width: '100%' }}>
				<IconButton
					size="small"
					sx={{ color: 'text.primary' }}
					onClick={() => {
						setCurrentProgress(0);
						player.previousTrack();
					}}
				>
					<SkipPrevious sx={skipStyle} />
				</IconButton>
				<IconButton
					size="small"
					sx={{ color: 'text.primary' }}
					onClick={() => {
						player.togglePlay();
					}}
				>
					{is_paused ? <PlayArrow sx={playStyle} /> : <Pause sx={playStyle} />}
				</IconButton>
				<IconButton
					size="small"
					sx={{ color: 'text.primary' }}
					onClick={() => {
						setCurrentProgress(0);
						player.nextTrack();
					}}
				>
					<SkipNext sx={skipStyle} />
				</IconButton>
			</Stack>
			<Stack spacing={2} direction="row" justifyContent={'center'} alignItems={'center'} sx={{ width: '75%' }}>
				<Typography sx={{ color: 'text.secondary', fontSize: 12 }}>
					{formatTime(setCurrentProgress ?? 0)}
				</Typography>
				<Slider
					max={duration}
					value={currentProgress}
					onChange={(event, value) => {
						setCurrentProgress(value);
					}}
					onChangeCommitted={(event, value) => {
						player.seek(value * 1000);
					}}
					min={0}
					size="medium"
				/>
				<Typography sx={{ color: 'text.secondary', fontSize: 12 }}>{formatTime(duration ?? 0)}</Typography>
			</Stack>
		</Stack>
	);
};

export default PlayerControls;
