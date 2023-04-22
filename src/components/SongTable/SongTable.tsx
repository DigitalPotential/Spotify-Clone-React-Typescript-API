import { Box, Divider, Grid } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import SongRow from '../SongRow/SongRow'
import SpotifyWebApi from 'spotify-web-api-node';

interface CustomTrackObjectFull extends SpotifyApi.TrackObjectFull {
    contextUri: string;
    position: number;
  }

interface SongTableProps {
    songs: CustomTrackObjectFull[];
    loading: boolean;
    spotifyApi: SpotifyWebApi;
  }

  const SongTable: React.FC<SongTableProps> = ({ songs, loading, spotifyApi }) => {

    const renderSongs = () => {
        if(loading) {
            return [1, 2, 3, 4, 5].map((e, i) => <SongRow loading={loading} key={i} i={i} images={undefined} /> )
        }

        return songs.map((song, i) => <SongRow 
            album={song.album.name} images={song.album.images} title={song.name} artist={song.artists[0].name} duration={song.duration_ms / 1000} key={i} i={i} position={song.position} contextUri={song.contextUri} spotifyApi={spotifyApi}
        />)
    }

	return (
		<Box
			p={{ xs: 3, md: 4 }}
			sx={{
				flex: 1,
				overflowY: 'auto',
				display: 'flex',
				flexDirection: 'column'
			}}
		>
			<Grid container px={1} p={1} sx={{ widht: '100%', color: 'text.secondary', fontSize:14 }}>
                <Grid item sx={{ width: 35, display: 'flex', alignItems: 'center' }}>
                    #
                </Grid>
                <Grid item sx={{flex: 1, display: 'flex', alignItems: 'center'}}>
                    Title
                </Grid>
                <Grid item xs={3} sx={{ display: { xs: 'none', md: 'flex' } }}>
                    Album
                </Grid>
                <Grid item xs={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <AccessTimeIcon sx={{ widht: 20, height: 20 }} />
                </Grid>
            </Grid>
            <Box pb={2}>
                <Divider sx={{width: '100%', height: 1  }} />
            </Box>
            {renderSongs()}
		</Box>
	);
};

export default SongTable;
