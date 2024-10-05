import { RootState } from "../../../App/store/store";

import { MenuButton } from "../MenuButton/MenuButton";

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Switch from '@mui/material/Switch';


import { getTheme } from "../../../App/theme";

import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import { changeThemeAC } from "../../../App/app-reducer/app-reducer";
import { selectThemeMode } from "../../../App/appSelectors";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";

export const Header = () => {
  const themeMode = useAppSelector(selectThemeMode);

  const dispatch = useAppDispatch();

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