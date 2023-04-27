import { Slider, Stack } from '@mui/material';
import { VolumeDown, VolumeUp, VolumeOff } from '@mui/icons-material';
import { useState } from 'react';

const PlayerVolume = ({ player }) => {
	const [volume, setVolume] = useState<number>(50);

	const handleVolumeChange = async (value) => {
		try {
			await player.setVolume(value / 100);
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<Stack direction={'row'} spacing={2} alignItems="center" sx={{ width: 150, color: 'text.secondary' }}>
			{volume === 0 ? <VolumeOff /> : volume < 50 ? <VolumeDown /> : <VolumeUp />}
			<Slider
				min={0}
				max={100}
				step={1}
				value={volume}
				onChange={(e, v) => setVolume(v)}
				onChangeCommitted={async (e, v) => {
					handleVolumeChange(v);
				}}
			/>
		</Stack>
	);
};

export default PlayerVolume;
