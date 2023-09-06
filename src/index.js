import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "./App";
import {createTheme, ThemeProvider } from '@mui/material/styles';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './Login';
import Cadastro from './Cadastro';
import { GlobalStyles } from '@mui/material';
import Filmes from './Filmes';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/cadastro",
    element: <Cadastro />
  },
  {
    path: "/filmes",
    element: <Filmes />
  }
]);

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1890ff',
      light: '#69c0ff',
      dark: '#096dd9',
    },
    secondary: {
      main: '#8c8c8c',
      light: '#d9d9d9',
      dark: '#262626',
    },
    error: {
      main: '#f5222d',
      dark: '#a8071a',
      light: '#ff7875',
    },
    warning: {
      main: '#faad14',
      light: '#ffd666',
      dark: '#ad6800',
    },
    success: {
      main: '#52c41a',
      light: '#95de64',
      dark: '#237804',
    },
  },
  
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
    <GlobalStyles
          styles={{
            body: { backgroundColor: "#333" },
          }}
        />
    <RouterProvider router={router} />
  </ThemeProvider>
)
