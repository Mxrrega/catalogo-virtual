import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import IconeMike from './components/imagens/logo-mike.png';
import { AppBar, Toolbar, Alert } from '@mui/material';
import { useEffect, useState } from 'react';



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

function Cadastro() {

  
    const [ nome, setNome ] = useState( "" );
    const [ email, setEmail ] = useState( "" );
    const [ cpf, setCPF ] = useState( "" );
    const [ telefone, setTelefone ] = useState( "" );
    const [ senha, setSenha ] = useState( "" );
    const [ cadastro, setCadastro ] = useState( false );
    const [ erro, setErro ] = useState( false );

    function Cadastrar( evento ) {

      evento.preventDefault();
  
      fetch( process.env.REACT_APP_BACKEND + "usuarios", {
          method: "POST",
          headers: {
              'Content-type': 'application/json'
          },
          body: JSON.stringify (
          {
              nome: nome,
              email: email,
              cpf: cpf,
              telefone: telefone,
              senha: senha
          }
      )   
      } )
      .then( (resposta) => resposta.json() )
          .then( (json) => { 
              if( json.cpf ) {
                  setCadastro( true );
                  setErro( false );
              } else {
                  setErro( true );
                  setCadastro( false );
              }
  
          } )
          .catch( ( erro ) => { setErro( true ) } )
  
  }
  
      useEffect( () => {
  
          
          setNome( "" );
          setEmail( "" );
          setCPF( "" );
          setTelefone( "" );
          setSenha( "" );
  
      }, [ cadastro ] );

  return (
    <ThemeProvider theme={defaultTheme}>
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
        <CssBaseline />
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
              Cadastrar
            </Typography>
            { erro && ( <Alert severity="warning" sx={{ mt: 2, mb: 2 }}>Desculpe tente novamente</Alert> ) }
            { cadastro && ( <Alert severity="success" sx={{ mt: 2, mb: 2 }}>Obrigado por se Cadastar</Alert> ) }
            <Box component="form" noValidate onSubmit={Cadastrar} sx={{ mt: 1 }}>
              <TextField
               margin="normal"
               required
               fullWidth
               id="nome"
               label="Nome"
               name="nome"
               autoComplete="nome"
               autoFocus
               value={nome}
               onChange={ (e) => setNome( e.target.value ) }
               />
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
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="cpf"
                label="CPF"
                name="cpf"
                autoComplete="cpf"
                autoFocus
                value={cpf}
                onChange={ (e) => setCPF( e.target.value ) }
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="telefone"
                label="Telefone"
                name="telefone"
                autoComplete="telefone"
                autoFocus
                value={telefone}
               onChange={ (e) => setTelefone( e.target.value ) }
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Cadastrar
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="./loginmui" variant="body2">
                    {"Já tem uma conta? Clique aqui para entrar"}
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

export default Cadastro;
