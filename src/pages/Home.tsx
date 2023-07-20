import { Box, Button } from '@mui/material';

const Home = () => {
    return (
        <Box 
            sx={{
                flex: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                gap: 4,
                marginTop: '2rem' 
            }}>
            <h1>Spotify Clone</h1>
            <img src="/carlosProfil.png" alt="Carlos Manriquez" style={{ borderRadius: '2rem', maxWidth: '25%', maxHeight: '25%'}} />
            <h1>By Carlos Manriquez</h1>
        </Box>
    )
}

export default Home