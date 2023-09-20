import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import IconeMike from './components/imagens/logo-mike.png';
import { AppBar, Toolbar } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate, json } from 'react-router-dom';
import { Alert } from '@mui/material'

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="">
        Mike
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const defaultTheme = createTheme();

function Login() {

  const [ email, setEmail ] = useState( "" );
  const [ senha, setSenha ] = useState( "" );
  const [ lembrar, setLembrar ] = useState( false );
  const [ login, setLogin ] = useState( false );
  const [ erro, setErro ] = useState( false );
  
  const navigate = useNavigate(); 
  useEffect( () => {

      if( login ) {
          setEmail( "" );
          setSenha( "" );
          navigate( "/" );
      } 
  }, [ login ] );

  function Autenticar(evento)
  {
      evento.preventDefault() 
      fetch( process.env.REACT_APP_BACKEND + "login" , {
          method: "POST",
          headers: {
              'content-Type': 'application/json'
          },
          body: JSON.stringify(
              {
                  email: email,
                  senha: senha
              }
          )   
      } )
      .then( (resposta) => resposta.json() )
      .then( (json) => { 
          if( json.user ) {
            localStorage.setItem( "usuario" , JSON.stringify( json.user._id ) );
              setLogin( true );
          } else {
            localStorage.removeItem( "usuario" );
              setErro( true );
          }
      } )
      .catch( ( erro ) => { setErro( true ) } )
      
      
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppBar position="relative" sx={{
        height: '63px',
        backgroundColor:'#A3A3A3',
        margin:0
      }}>
        <Toolbar> 
          <Box sx={{
            width: '35%'
          }}>
            <Link href="/">
            <img src={IconeMike} alt="logo" href="./" width={62} height={22}/>
            </Link>
          </Box>
        </Toolbar>
        </AppBar>
      <Grid container component="main" sx={{ height: '100vh' }}>
        
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://portal6.com.br/wp-content/uploads/2022/04/WhatsApp-Image-2022-04-08-at-18.21.43.jpeg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            { erro && ( <Alert severity="warning" sx={{ mt: 2, mb: 2 }}>Revise seus dados e tente novamente</Alert> ) }
            <Box component="form" noValidate onSubmit={Autenticar} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={ (e) => setEmail( e.target.value ) }
                {...erro && ( "error" ) }
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Senha"
                type="password"
                id="password"
                autoComplete="current-password"
                value={senha}
                onChange={ (e) => setSenha( e.target.value ) }
              />
              <FormControlLabel
                control={<Checkbox value={lembrar} color="primary" name="lembrar" onChange={(e) => setLembrar( !lembrar ) }/>}
                label="Lembrar-me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Logar
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="./cadastromui" variant="body2">
                    {"Não tem uma conta? Cadastre-se"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default Login;
