import { Grid, Typography, Card, CardContent, ListItem, CardHeader  } from '@mui/material';
import {DashboardListItem} from './DashboardListItem';

export const DashboardList = (props) => {
  return (
          <Card>
          <CardHeader title={<Typography variant="h6" sx={{fontWeight:600}}>{props.title}</Typography>} />
            <CardContent>
              
            <Grid container alignItems="center" spacing={2} sx={{maxHeight: 300, overflow: 'auto'}}>
                <ListItem>
                  <Grid container justifyContent="space-between" >
                    <Grid item >
                      <Typography variant="body1" sx={{fontSize:'12px'}}>{props.columnOne}</Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="body1" sx={{fontSize:'12px'}}>{props.columnTwo}</Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                {
                  props.listData ? Object.keys(props.listData).map((val, key) => {
                    return <DashboardListItem  products={val} key={key} sales={props.listData[val]} sx={{padding:'0px'}}/>
                  }) : null
                }
              </Grid>
            </CardContent>
          </Card>
  )
}
