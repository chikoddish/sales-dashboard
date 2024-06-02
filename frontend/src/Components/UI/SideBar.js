import React, { useContext, useEffect, useState } from 'react';
import { CssBaseline, Drawer, AppBar, Toolbar, Typography, Divider, IconButton,  styled, useTheme, Avatar, Box } from '@mui/material';
import { Menu, ChevronLeft, ChevronRight } from '@mui/icons-material';

import SalesIcon from "../../assets/images/vector.png";
import StoreIcon from "../../assets/images/store.png";
import NotificationIcon from "../../assets/images/notification.png";
import SettingsIcon from "../../assets/images/settings.png";
import ThemeIcon from "../../assets/images/lightTheme.png";
import AvatarIcon from "../../assets/images/avatar.png";
import { Link } from 'react-router-dom';

import { ThemeContext } from "../../Pages/ThemeContext"
// import { useTheme } from '@mui/material/styles';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const AppBarStyled = styled(AppBar, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export const Sidebar = () => {
  // const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

    const [themeName, setThemeName] = useState('Dark Theme')
  const { toggleTheme, mode } = useContext(ThemeContext);

  const theme = useTheme()

  useEffect(() => {
    setThemeName(mode === 'light' ? 'Dark Theme' : "Light Theme");
  },[toggleTheme, mode])

  return (
    <div style={{ display: 'flex' }}>
      <CssBaseline />
      <AppBarStyled position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" noWrap>
          Sales Dashboard
          </Typography>
              <IconButton sx={{ marginLeft: 'auto', marginRight: '0' }}>
              <Typography noWrap sx={{ paddingRight: '20px', color: 'white'}}>
          Hello User
          </Typography>
                <Avatar alt="Avatar" src={AvatarIcon} />
              </IconButton>
        </Toolbar>
      </AppBarStyled>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        // variant="persistent"
        anchor="left"
        open={open}
        hideBackdrop
      >
        <DrawerHeader sx={{background: theme.palette.background.default}}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeft /> : <ChevronRight />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <div className="sidebar active" style={{background:theme.palette.background.sidebar}}> 
      <ul>
        <li>
          <Link to="/">
            <img src={SalesIcon} className='side-bar-icon' alt="sales icon"/>
            <span className='nav-item'>Sales Overview</span>
          </Link>
        </li>
        <li>
          <Link to="/">
          <img src={StoreIcon} className='side-bar-icon' alt='Store Icon' />
            <span className='nav-item'>Stores</span>
          </Link>
        </li>
        <li>
          <Link to="/">
            <img src={NotificationIcon} className='side-bar-icon' alt="Notification Icon" />
            <span className='nav-item'>Notifications</span>
          </Link>
        </li>
        <li>
          <Link to="/">
            <img src={SettingsIcon} className='side-bar-icon' alt="Setting Icon" />
            <span className='nav-item'>Settings</span>
          </Link>
        </li>
        <li  onClick={toggleTheme}>
          <Link to="/">
            <img src={ThemeIcon} className='side-bar-icon' alt="Them Icon" />
            <span className='nav-item'>{themeName}</span>
          </Link>
        </li>
      </ul>
    </div>
        {/* <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <Inbox /> : <Mail />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List> */}
        {/* <Sidebar /> */}
        <Divider />

      </Drawer>
      
    </div>
  );
};

// export default SideBar;
