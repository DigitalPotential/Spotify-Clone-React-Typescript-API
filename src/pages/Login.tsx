import { Box, Button, Typography } from '@mui/material';
import { accessUrl } from '../config/config';

const Login = () => {
	return (
		<Box sx={{
            backgroundColor: 'background.paper',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
          }} >
			<img
				src="/Spotify_Logo.png"
				alt="Spotify logo"
				style={{ marginBottom: '300px', width: '70%', maxWidth: '500px' }}
			/>
			<Button color="primary" size="large" variant="contained" href={accessUrl}>
				Login to Spotify
			</Button>
			<Typography sx={{ fontSize: 16, color: 'text.primary', marginTop: '25px' }}>
                I will record a Video demo for this project soon!
            </Typography>
		</Box>
	);
};

export default Login;
