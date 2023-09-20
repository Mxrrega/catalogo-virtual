import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import IconeMike from './components/imagens/logo-mike.png';
import Profile from './components/imagens/PhotoCamera.png';
import Banner from './components/imagens/imagem-tenis-home.png';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';


function Copyright() {
  return (
    <Typography variant="body2" color="#fff" align="center">
      {'Copyright © '}
      <Link color="#fff" href="https://img.ifunny.co/images/abf21e3be5d1d5b2b5c8c96190ed15f1ff792cdbf71faa0a00277970c4f762ea_1.jpg">
        Mike Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function Home() {

  const defaultTheme = createTheme();
  const usuario = localStorage.getItem('usuario');
  const settings = ['Sair'];
  const LimparLocal = (event) => {
    localStorage.clear( 'usuario' );
  };

  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppBar position="relative" sx={{
        height: '63px',
        backgroundColor:'#A3A3A3'
      }}>
        <Toolbar>
          
          <Box sx={{
            width: '35%'
          }}>
          <img src={IconeMike} alt="logo" width={62} height={22}/>
          </Box>

          <Box sx={{
            width: '30%',
            textAlign:'center'
          }}>
            <Typography component="h3" variant="h4" color="black" noWrap>
            Mike
          </Typography>
          </Box>
          <Box
            sx={{
              width: '35%',
              textAlign: 'right',
              display: 'inline-block',
            }}
          >
            {usuario ? (
              <>
              <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Abrir opções">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Foto Perfil" src={Profile}/>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center" onClick={LimparLocal}>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
              </>
            ) : (
              <>
              <Link href="./cadastromui" underline="none" color={'black'}>
                {'Criar Conta |'}
              </Link>
              <Link
                href="./loginmui"
                underline="none"
                color={'black'}
                sx={{
                  margin: '6px',
                }}
              >
                {'Entrar'}
              </Link>
            </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <main>

        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Box sx={{
            width: '90%',
            margin:'0 auto'
          }}>
          <img src={Banner} alt="banner" width={'100%'}/>
          </Box>
          
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Mike
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              A Mike é uma loja de tênis que oferece qualidade e estilo a preços acessíveis, 
            com uma variedade de opções inspiradas na Nike para atender a diferentes gostos e necessidades.
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained" href="./app">Tênis cadastrados</Button>
              <Button variant="outlined" href="/cadastrarTenis">Cadastrar tênis</Button>
            </Stack>
          </Container>
        </Box>
      </main>

      <Box sx={{ bgcolor: '#111', 
      p: 6,
      color: '#fff'
      }} 
      component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Mike
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          component="p"
          color="#fff"
        >
          Todos direitos de imagem direcionado à Nike
        </Typography>
        <Copyright />
      </Box>
    </ThemeProvider>
  );
}

export default Home;
