import { Slider, Stack } from '@mui/material';
import { VolumeDown, VolumeUp, VolumeOff } from '@mui/icons-material';
import { useState } from 'react';

interface PlayerVolumeProps {
    player: {
        setVolume: (value: number) => Promise<void>;
    };
}

const PlayerVolume = ({ player }: PlayerVolumeProps) => {
	const [volume, setVolume] = useState<number>(50);

	const handleVolumeChange = async (value: number) => {
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
				onChange={(e, v) => setVolume(v as number)}
				onChangeCommitted={async (e, v) => {
					handleVolumeChange(v as number);
				}}
			/>
		</Stack>
	);
};

export default PlayerVolume;
