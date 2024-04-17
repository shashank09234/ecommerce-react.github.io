import React, {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { MenuItem } from '@mui/material';
import MenuDisplay from './MenuDisplay';

export default function MainMenu() {
  const [isMenuDrawerOpen, setIsMenuDrawerOpen] = useState(false);
  const toggleMenuDrawer = (open) => {
    console.log("In toggle: "+open)
    setIsMenuDrawerOpen(open);
  };

  return (
    <MenuDisplay open={isMenuDrawerOpen} onClose={() => toggleMenuDrawer(false)} anchor="left"  />
    
    
  );
}