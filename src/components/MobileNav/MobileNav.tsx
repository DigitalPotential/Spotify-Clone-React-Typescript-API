import { Box, BottomNavigation, BottomNavigationAction } from '@mui/material';
import { Home, List } from '@mui/icons-material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MobileNav = () => {
    const navigate = useNavigate();
    const [value, setValue] = useState<number>(0);

	return (
		<Box sx={{ display: { xs: 'block', md: 'none' } }}>
			<BottomNavigation
				sx={{ backgroundColor: 'background.paper' }}
				showLabels
				value={value}
				onChange={(event, newValue) => {setValue(newValue);}}
			>
                <BottomNavigationAction label="Home" icon={<Home />} onClick={() => navigate('/')} />
                <BottomNavigationAction label="Ditt bibliotek" icon={<List />} onClick={() => navigate('/library')} />
            </BottomNavigation>
		</Box>
	);
};

export default MobileNav;
