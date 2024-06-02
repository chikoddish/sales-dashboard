import { Grid, ListItem, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export const DashboardListItem = ({ products, sales }) => {
  const theme = useTheme()

  return (
    <ListItem sx={{paddingLeft:'10px', paddingTop:'0px', paddingBottom:'0px'}}>
      <Grid container justifyContent="space-between" sx={{backgroundColor : '#D6EFF3', marginBottom:'5px'}} alignItems="center">
        <Grid item style={{width:'75%', alignContent:'center'}} >
          <Typography variant="body1" sx={{fontSize:'12px', color: theme.palette.text.secondary}}>{products}</Typography>
        </Grid>
        <Grid item sx={{backgroundColor : '#8BD0E0' , padding: '8px', width:'25%'}}>
          <Typography variant="body1" sx={{fontSize:'12px', color: theme.palette.text.secondary}}> ${sales?.toFixed(2)}</Typography>
        </Grid>
      </Grid>
    </ListItem>
  );
};