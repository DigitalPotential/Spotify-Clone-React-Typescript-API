import { Box, Button, Container, Grid, IconButton, Typography } from '@mui/material';
import KeyBoardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PlayerControls from '../PlayerControls/PlayerControls';

const PlayerOverlay = ({
	playerOverlayIsOpen,
	closeOverlay,
	progress,
	is_paused,
	duration,
	player,
	current_track,
	active
}) => {
	return (
		<Box
			id="PlayerOverlay"
			sx={{
				width: '100%',
				height: 'calc(100vh - 75px)',
				backgroundColor: 'background.paper',
				display: { xs: 'block', md: 'none' },
				position: 'fixed',
				top: 0,
				left: 0,
				transition: 'all 0.3s',
				transform: playerOverlayIsOpen ? 'translateY(0px)' : 'translateY(100vh)'
			}}
		>
			<Container sx={{ height: '100%', background: 'linear-gradient(0deg, #121212 0%, #39d47250 100%);' }}>
				<Grid container direction="column" justifyContent="space-between" sx={{ height: '100%' }}>
					<Grid item xs={1} sx={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
						<IconButton onClick={closeOverlay} sx={{ paddingLeft: 0 }}>
							<KeyBoardArrowDownIcon fontSize="large" sx={{ color: 'text.primary' }} />
						</IconButton>
					</Grid>
					<Grid
						item
						xs={5}
						sx={{
							backgroundImage: `url("${current_track?.album.images[0].url}")`,
							backgroundPosition: 'center',
							backgroundSize: 'cover'
						}}
					></Grid>
					<Grid item xs={1}>
						<Typography sx={{ color: 'text.primary', fontSize: '28px' }}>{current_track?.name}</Typography>
						<Typography sx={{ color: 'text.secondary', fontSize: '18px' }}>
							{current_track?.artists[0].name}
						</Typography>
					</Grid>
					<Grid item xs={2}>
                        {active ? (
						<PlayerControls
							progress={progress}
							is_paused={is_paused}
							duration={duration}
							player={player}
						/>
					) : (
						<Box>Please transfer Playback</Box>
					)}
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
};

export default PlayerOverlay;
