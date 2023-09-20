import { AppBar, Avatar, Box, Button, Container, CssBaseline, ThemeProvider, Toolbar } from "@mui/material";
import { useEffect, useState } from "react";
import IconeMike from './components/imagens/logo-mike.png';
import Profile from './components/imagens/PhotoCamera.png';
import { createTheme } from '@mui/material/styles';
import { Link } from "react-router-dom";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';


function App() {

  const [ produtos, setProdutos ] = useState();
  const [ erro, setErro ] = useState();
  const usuarioConta = localStorage.getItem('usuario');

  useEffect( () => {

    const usuario = localStorage.getItem( "usuario" )

    fetch( process.env.REACT_APP_BACKEND + "produtos/" + usuario, {
            method: "GET",
            headers: {
                'content-Type': 'application/json'
            } 
        } )
        .then( (resposta) => resposta.json() )
        .then( (json) => { setProdutos( json ) } )
        .catch( ( error ) => { setErro( true ) } )
  }, [])

  function Excluir( evento, id ) {
    evento.preventDefault()
        fetch( process.env.REACT_APP_BACKEND + "produtos" , {
            method: "DELETE",
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    id: id,
                    usuario: localStorage.getItem( "usuario" )
                }
            )   
        } )
        .then( (resposta) => resposta.json() )
        .then( (json) => { 
            const novalista = produtos.filter( (produtos)  => produtos._id !== id );
            setProdutos( novalista );
  })
        .catch( ( error ) => { setErro( true ) } )
  }
  
  const defaultTheme = createTheme();

  return (
    <>
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppBar position="relative" sx={{
        height: '63px',
        backgroundColor:'#A3A3A3',
      }}>
        <Toolbar>
          
          <Box sx={{
            width: '50%'
          }}>
            <Link to="/">
            <img src={IconeMike} alt="logo" href="./" width={62} height={22}/>
            </Link>
          </Box>
          <Box sx={{
            width: '50%',
            textAlign: 'right',
          }}>
             {!usuarioConta ? (
              <>
              </>
            ) : (
              <Avatar alt="Foto" src={Profile} sx={{display: 'inline-block'}}/>
            )
          } 
          </Box>
        </Toolbar>
        </AppBar>
        <Box>
        <Container sx={{ py: 8, boxSizing:'border-box' }}>
        <h1>Tênis Cadastrados:</h1>
  <Grid container spacing={2} sx={{
    width: '100%',
    margin: '0 auto',
    justifyContent: 'center',
    
  }}>
    {produtos && (
        produtos.map( (produtos, index) => (
      <Grid item key={produtos._id}  sx={{
        
      }}>
        <Card
          sx={{ height: '100%', display: 'flex', flexDirection: 'column'  }}
        >
          <CardMedia
            component="div"
          />
          <Box sx={ {margin: '0 auto' }}>
          <img src={produtos.imagem} height="360px" width="360px" />
          </Box>
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography gutterBottom component="p" sx={{ fontSize: '16px' }}>
              {produtos.titulo}
            </Typography>
            <Typography sx={{color: "#737373"}}>
            {produtos.categoria}
            </Typography>
            <Typography sx={{mt:1, fontSize: '16px'}}>
              {produtos.descricao}
            </Typography>
          </CardContent>
          <CardActions>
            {usuarioConta ? (
              <Button size="small" href={"/edicao/" + produtos._id}>Editar</Button>
            ) : null}
            <Grid item xs={6}>
            <Button onClick={ (e) => Excluir( e, produtos._id ) }>Excluir</Button>
            </Grid>
          </CardActions>
        </Card>
      </Grid>
    ) )
    )}
  </Grid>
</Container>
        </Box>
        
    </ThemeProvider>
    
     
      
    </>
  );
}

export default App;
