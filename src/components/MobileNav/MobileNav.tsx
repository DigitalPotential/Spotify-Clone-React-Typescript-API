import { Box, BottomNavigation, BottomNavigationAction } from '@mui/material';
import { Home, List } from '@mui/icons-material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MobileNav = () => {
    const navigate = useNavigate();
	return (
		<Box sx={{ display: { xs: 'block', md: 'none' } }}>
			<BottomNavigation
				sx={{ backgroundColor = 'background.paper' }}
				showLabels
				value={null}
				onChange={null}
			>
                <BottomNavigationAction label="Home" icon={<Home />} onClick={() => navigate('/')} />
            </BottomNavigation>
		</Box>
	);
};

export default MobileNav;
