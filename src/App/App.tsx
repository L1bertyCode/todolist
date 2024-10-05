import { useSelector } from 'react-redux';
import { RootState } from './store/store';

import { Header } from '../common/components/Header/Header';
import Main from './Main/Main';

import { getTheme } from './theme';
import { ThemeProvider } from '@mui/material/styles';
import './App.css';
import { CssBaseline } from '@mui/material';



export type ThemeMode = 'dark' | 'light';

const App = () => {
  const themeMode = useSelector<RootState, ThemeMode>(state => state.app.themeMode);
  return (
    <ThemeProvider theme={getTheme(themeMode)}>
      <CssBaseline />
      <Header />
      <Main />

    </ThemeProvider>
  );
};

export default App;