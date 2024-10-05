import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../App/store/store";

import { MenuButton } from "../MenuButton/MenuButton";

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Switch from '@mui/material/Switch';

import { changeThemeAC } from "../../../model/app-reducer/app-reducer";

import { getTheme } from "../../../App/theme";
import { ThemeMode } from "../../../App/App";

import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';

export const Header = () => {
  const themeMode = useSelector<RootState, ThemeMode>(state => state.app.themeMode);

  const dispatch = useDispatch();

  const theme = getTheme(themeMode);

  const changeModeHandler = () => {
    dispatch(changeThemeAC(themeMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <AppBar position="static" sx={{ mb: '30px' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <IconButton color="inherit">
          <MenuIcon />
        </IconButton>
        <div>
          <MenuButton>Login</MenuButton>
          <MenuButton>Logout</MenuButton>
          <MenuButton>Faq</MenuButton>
          <Switch color={'default'} onChange={changeModeHandler} />
        </div>
      </Toolbar>
    </AppBar>
  );
};