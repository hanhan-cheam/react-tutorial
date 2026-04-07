'use client';

import * as React from 'react';
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  InputBase,
  Stack,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import SearchIcon from '@mui/icons-material/Search';

const drawerWidth = 240;

export default function SidebarLayout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = React.useState(false);

  const searchButtonContent = (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        //   width: 100,
        px: 2,
        py: 1,
        mx: 2,
        borderRadius: '8px',
        border: '1px solid rgba(0, 0, 0, 0.1)',
        backgroundColor: '#f9f9f9',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
        '&:hover': {
          borderColor: 'rgba(0, 0, 0, 0.2)',
        },
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <SearchIcon sx={{ color: 'text.secondary' }} />
      <InputBase
        fullWidth
        placeholder="Search Menu"
        sx={{
          fontSize: 14,
          color: 'text.primary',
        }}
      />
    </Box>
  );

  const handleDrawerToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const menuItems = [
    { text: 'Calculator', href: '/', icon: <InboxIcon /> },
    { text: 'Previous List', href: '/previous-list', icon: <InboxIcon /> },
    { text: 'Scanner List', href: '/scanner-list', icon: <InboxIcon /> },
  ];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        {searchButtonContent}
      </Typography>
      <Divider />
      <List>
        {menuItems.map(({ text, href, icon }) => (
          <ListItem disablePadding key={text}>
            <ListItemButton href={href}>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          ...(menuOpen && {
            width: { md: `calc(100% - ${drawerWidth}px)` },
            ml: { md: `${drawerWidth}px` },
          }),
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Drawer for mobile */}
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={menuOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            '& .MuiDrawer-paper': { width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Page content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          mt: 8, // height of AppBar
          overflow: 'auto',

          ...(menuOpen && {
            width: { md: `calc(100% - ${drawerWidth}px)` },
            ml: { md: `${drawerWidth}px` },
          }),
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
