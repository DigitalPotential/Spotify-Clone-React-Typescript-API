import { Box, Grid, Avatar, Typography, Skeleton } from '@mui/material';
import { formatTime } from '../../utils/formatTime';
import SpotifyWebApi from 'spotify-web-api-node';

interface SongRowProps {
	images?: { url: string }[];
	title?: string;
	artist?: string;
	album?: string;
	duration?: number;
	i?: number;
	loading?: boolean;
    position?: number
    contextUri?: string
    spotifyApi?: SpotifyWebApi
}

const SongRow: React.FC<SongRowProps> = ({ spotifyApi, position=0, contextUri,  images, title, artist, album, duration, i = 0, loading = false }) => {
	const image = images?.length ? images[0].url : undefined;

    const onRowClick = async () => {
        const song = { context_uri: contextUri, offset: {position: position}, position_ms:0 }
        await spotifyApi?.play(song)
    }

	return (
		<Grid
            onClick={onRowClick}
			container
			px={1}
			p={1}
			sx={{
				widht: '100%',
				color: 'text.secondary',
				fontSize: 14,
				cursor: 'pointer',
				'&:hover': { backgroundColor: '#ffffff10' }
			}}
		>
			<Grid item sx={{ width: 35, display: 'flex', alignItems: 'center', fontSize: 16 }}>
				{i + 1}
			</Grid>
			<Grid item sx={{ flex: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
				{/* Title */}
				{loading ? (
					<Skeleton variant="rectangular" width={40} height={40} />
				) : (
					<Avatar src={image} alt={undefined} variant="square" />
				)}
				<Box>
					<Typography sx={{ fontSize: 16, color: 'text.primary' }}>
						{loading ? <Skeleton variant="text" width={130} height={24} /> : title}
					</Typography>
					<Typography sx={{ fontSize: 12, color: 'text.secondary' }}>
						{loading ? <Skeleton variant="text" width={50} height={18} /> : artist}
					</Typography>
				</Box>
			</Grid>
			<Grid item xs={3} sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
				{loading ? <Skeleton variant="text" width={50} height={24} /> : album}
			</Grid>
			<Grid item xs={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
				{loading ? <Skeleton variant="text" width={50} height={24} /> : formatTime(duration ?? 0)}
			</Grid>
		</Grid>
	);
};

export default SongRow;
