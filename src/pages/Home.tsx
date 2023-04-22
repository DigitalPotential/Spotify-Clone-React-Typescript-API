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
            <img src="/carlos-m.png" alt="Carlos Manriquez" style={{ borderRadius: '2rem', maxWidth: '25%', maxHeight: '25%'}} />
            <Button size='large' variant='contained' href='tel:0702117225' >
                Ring Carlos!
            </Button>
        </Box>
    )
}

export default Home