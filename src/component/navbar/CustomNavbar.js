import React from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom'


const CustomNavbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
    <AppBar style={{ background: '#E4FF95' }} position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="black"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography style={{margin:'10px'}} >
          <Link style={{color:'#808080'}} to='/' className='Link'>Home</Link>
        </Typography>
        <Typography style={{margin:'10px'}} >
          <Link style={{color:'#808080'}} to='/mytask' className='Link'>My Tasks</Link>
        </Typography>
        <Typography style={{margin:'10px'}}>
          <Link style={{color:'#808080'}} to='/setup' className='Link'>Setup</Link>
        </Typography>
        <Typography style={{margin:'10px'}} >
          <Link style={{color:'#808080', }} to='/admin' className='Link'>Admin</Link>
        </Typography>
             
          <div style={{textAlign: 'center', position: 'absolute', right: 0,  width: '100px'}}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
      </Toolbar>
    </AppBar>
  </Box> 
  )

}

export default CustomNavbar