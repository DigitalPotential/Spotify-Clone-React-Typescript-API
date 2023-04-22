import { Box, Skeleton } from '@mui/material';
import { NavLink } from 'react-router-dom';
import './NavPlaylist.css';

interface PlaylistProps {
	name?: string;
	id?: any;
	loading?: boolean;
}

const NavPlaylist = ({ name, id, loading }: PlaylistProps) => {
	return (
		<NavLink
			className="playlist__navlink"
			to={loading ? '' : `playlist/${id}`}
			style={{ textDecoration: 'none' }}
		>
            <Box
				px={3}
				py={1}
				sx={{
					cursor: 'pointer',
					'&:hover': { color: 'white' },
					transition: 'color 0.2s ease-in-out',
					fontSize: 10
				}}
			>
				{loading? <Skeleton variant='text' sx={{ fontSize: 10 }} /> : name}
			</Box>
        </NavLink>
	);
};

export default NavPlaylist;
