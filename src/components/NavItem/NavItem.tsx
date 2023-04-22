import { Box } from '@mui/material';
import { NavLink } from 'react-router-dom';
import './NavItem.css'

interface navItemProps {
    name: string;
    Icon: any
    target: string
}

const NavItem = ({ name, Icon, target }:navItemProps ) => {
	return (
		<NavLink className='NavLink' to={target} style={{ textDecoration: 'none' }}>
			<Box
				px={3}
				py={1}
				sx={{
					display: 'flex',
					alignItems: 'center',
					fontWeight: 'bold',
					cursor: 'pointer',
					'&:hover': { color: 'white' },
					transition: 'color 0.2s ease-in-out',
					fontSize: 14
				}}
			>
				{Icon && <Icon sx={{ fontSize: 28, marginRight: 1}}  />}
				{name}
			</Box>
		</NavLink>
	);
};

export default NavItem;
