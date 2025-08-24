import React, { useState } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAppContext } from '../../context/AppContext'
import { AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, Box, Button, Divider, useMediaQuery } from '@mui/material'
import AssignmentIcon from '@mui/icons-material/Assignment'
import MenuIcon from '@mui/icons-material/Menu'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import GroupIcon from '@mui/icons-material/Group'
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import LogoutIcon from '@mui/icons-material/Logout'

const sidebarLinks = [
  { name: 'Add Tasks', path: '/admin', icon: <AssignmentIcon /> },
  { name: 'Verify Tasks', path: '/admin/verify', icon: <CheckCircleIcon /> },
  { name: 'Add New User', path: '/admin/add-users', icon: <GroupIcon /> }, // Placeholder
]

const drawerWidth = 220

const Admin = () => {
  const { axios, user, setUser, setIsAdmin,darkMode, setDarkMode } = useAppContext()
  const isMobile = useMediaQuery('(max-width:600px)')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const navigate = useNavigate()

  const logout = async () => {
    try {
      const res = await axios.get('/api/users/logout');
      if (res.data.success){
        toast.success(res.data.message);
        setUser(null);
        setIsAdmin(false);
        navigate('/');
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'mainBg.main' }}>
      {/* Sidebar */}
      {isMobile ? (
        <Drawer v
          ariant="temporary"
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{ [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', bgcolor: 'mainBg.white' },
          }}
        >
          <Toolbar sx={{ minHeight: 56, bgcolor: 'mainBg.white' }} />
            <Box sx={{ overflow: 'auto', mt: 2 }}>
              <List>
                {sidebarLinks.map((item) => (
                  <ListItem
                    key={item.name}
                    component={NavLink}
                    to={item.path}
                    end={item.path === '/admin'}
                    onClick={() => setSidebarOpen(false)}
                    sx={({ isActive }) => ({
                      borderRight: isActive ? '4px solid #1976d2' : '4px solid #fff',
                      '&:hover': { bgcolor: ` ${darkMode ? '#213f77ff' : '#a9bfd1ff'}` },
                    })}
                  >
                    <ListItemIcon sx={{ color: 'inherit' }}>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.name} />
                  </ListItem>
                ))}
              </List>
            </Box>
        </Drawer>
      ): (
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', bgcolor: 'mainBg.white'},
          }}
        >
          <Toolbar sx={{ minHeight: 64, bgcolor: 'mainBg.white' }} />
          <Box sx={{ overflow: 'auto', mt: 2 }}>
            {/* Sidebar Links */}
            <List>
              {sidebarLinks.map((item) => (
                <ListItem
                  key={item.name}
                  component={NavLink}
                  to={item.path}
                  end={item.path === '/admin'}
                  sx={({ isActive }) => ({
                    borderRight: isActive ? '4px solid #1976d2' : '4px solid #fff',
                    '&:hover': { bgcolor: ` ${darkMode ? '#213f77ff' : '#a9bfd1ff'}` },
                  })}
                >
                  <ListItemIcon sx={{ color: 'inherit' }}>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
      )}
      {/* Main content */}
      <Box sx={{ flexGrow: 1 }}>
        {/* Top bar */}
        <AppBar position="static" color="inherit" elevation={1} 
        sx={{ zIndex: 1201, bgcolor: 'mainBg.white'}}>
          <Toolbar sx={{ 
            justifyContent: 'space-between',
            flexDirection: {xs: 'row', sm: 'row'},
            minHeight: {xs: 56, sm:64},
            px: { xs: 1, sm: 4 },
            gap: { xs: 1, sm: 2 } }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {isMobile && (
                <IconButton onClick={() => setSidebarOpen(true)} sx={{ mr: 1 }}>
                  <MenuIcon />
                </IconButton>
              )}
              <Typography variant="h5" fontWeight={700} color="mainBg.whiteText"
               sx={{ fontSize: { xs: 20, sm: 32 } }}>
                Admin Panel
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: {xs:1, sm: 2} }}>
              <Typography fontSize={{xs:14, sm:20}} color="mainBg.whiteText" textAlign={'center'}> 
                Hello Admin {user ? user.name : null}
              </Typography>
              {/* Dark mode button */}
              <IconButton sx={{ ml: 1 }} onClick={()=>setDarkMode(!darkMode)} color="inherit">
                {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
              <Button 
              variant="contained" color="primary" startIcon={<LogoutIcon />} onClick={logout}>
                Logout
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
        <Box sx={{ p: 3 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  )
}

export default Admin