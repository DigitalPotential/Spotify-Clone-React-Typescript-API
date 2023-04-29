import { Box, Button } from '@mui/material';

const PlayerOverlay = ({ playerOverlayIsOpen, closeOverlay }) => {
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
			Player Overlay
            <Button onClick={closeOverlay}>Close</Button>
		</Box>
	);
};

export default PlayerOverlay;
