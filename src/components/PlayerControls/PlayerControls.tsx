import { Stack, Typography, Slider, Box, IconButton } from '@mui/material';
import { formatTime } from '../../utils/formatTime';
import { PlayArrow, SkipNext, SkipPrevious, Pause } from '@mui/icons-material';
import { useState } from 'react';
import { SpotifyPlayer } from '../../Types/spotify-types';

interface PlayerControlsProps {
    is_paused: boolean;
    duration: number | null;
    progress: number | null;
    player: SpotifyPlayer | null;
  }
  

  const PlayerControls = ({
    is_paused,
    duration,
    progress,
    player,
  }: PlayerControlsProps) => {
	const skipStyle = { width: 28, height: 28 };
	const playStyle = { width: 38, height: 38 };
	return (
		<Stack direction="column" spacing={2} justifyContent="center" alignItems="center" sx={{ width: '100%' }}>
			<Stack spacing={1} direction={'row'} justifyContent={'center'} alignItems={'center'} sx={{ width: '100%' }}>
				<IconButton size="small" sx={{ color: 'text.primary' }}>
					<SkipPrevious sx={skipStyle} />
				</IconButton>
				<IconButton size="small" sx={{ color: 'text.primary' }}>
					{is_paused ? <PlayArrow sx={playStyle} /> : <Pause sx={playStyle} />}
				</IconButton>
				<IconButton size="small" sx={{ color: 'text.primary' }}>
					<SkipNext sx={skipStyle} />
				</IconButton>
			</Stack>
			<Stack spacing={2} direction="row" justifyContent={'center'} alignItems={'center'} sx={{ width: '75%' }}>
            <Typography>{formatTime(progress ?? 0)}</Typography>
            <Slider />
            <Typography>{formatTime(duration ?? 0)}</Typography>
			</Stack>
		</Stack>
	);
};

export default PlayerControls;
