import { Box, Button } from '@mui/material';
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
		</Box>
	);
};

export default Login;
