import { AppBar, Container, IconButton, Switch, Toolbar } from "@mui/material";
import s from "./Header.module.css";
import { MenuButton } from "@/shared/ui/MenuButton/MenuButton";
import MenuIcon from '@mui/icons-material/Menu';
import { getTheme } from "@/app/theme";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/providers/reduxProvider/store";
import { changeThemeAC, ThemeMode } from "@/app/providers/appProvider/app-reducer";
interface HeaderProps {

};
export const Header = ({ }: HeaderProps) => {
  const dispatch = useDispatch();

  const themeMode = useSelector<RootState, ThemeMode>(state => state.app.themeMode);

  const theme = getTheme(themeMode);

  const changeModeHandler = () => {
    dispatch(changeThemeAC(themeMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <AppBar position="static" sx={{ mb: '30px' }}>
      <Toolbar >
        <Container
          fixed
          sx={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <IconButton color="inherit">
            <MenuIcon />
          </IconButton>
          <div>
            <MenuButton color="inherit">Login</MenuButton>
            <MenuButton color="inherit">Logout</MenuButton>
            <MenuButton
              background={theme.palette.primary.dark}
              color="inherit">Faq</MenuButton>
            <Switch color={'default'} onChange={changeModeHandler} />
          </div>
        </Container>
      </Toolbar>
    </AppBar>
  );
};