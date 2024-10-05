import { RootState } from './store/store';

import { Header } from '../common/components/Header/Header';
import Main from './Main/Main';

import { getTheme } from './theme';
import { ThemeProvider } from '@mui/material/styles';
import './App.css';
import { CssBaseline } from '@mui/material';
import { useAppSelector } from '../common/hooks/useAppSelector';
import { selectThemeMode } from './appSelectors';



export type ThemeMode = 'dark' | 'light';

const App = () => {
  const themeMode = useAppSelector(selectThemeMode);
  return (
    <ThemeProvider theme={getTheme(themeMode)}>
      <CssBaseline />
      <Header />
      <Main />

    </ThemeProvider>
  );
};

export default App;