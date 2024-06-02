import {Outlet} from "react-router-dom";
import { Container, Grid } from '@mui/material';

import { Sidebar } from './SideBar'

export const MainContainer = () => {
  return (
    <>
    <Container style={{ margin: 0, padding: 0, maxWidth: '100%'}}>
    <Grid container>
        <Grid item xs={12} md={1} style={{ maxWidth: '10%'}}>
        <Sidebar />
        </Grid>
        <Grid item xs={12} md={9} style={{ maxWidth: '100%', marginTop : '80px'}}>
            <Outlet />
        </Grid>
      </Grid>
      </Container>
    </>
  )
}
