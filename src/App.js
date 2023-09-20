import { AppBar, Avatar, Box, Button, Container, CssBaseline, ThemeProvider, Toolbar } from "@mui/material";
import { useEffect, useState } from "react";
import Filme from "./components/Filme";
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
import Tenis1 from './components/imagens/tenis 1.png';
import Tenis2 from './components/imagens/tenis 2.png';
import Tenis3 from './components/imagens/tenis 3.png';


function App() {

  const [ filmes, setFilmes ] = useState();
  const [ erro, setErro ] = useState();
  const usuario = localStorage.getItem('usuario');

  useEffect( () => {
    fetch( process.env.REACT_APP_BACKEND + "filmes", {
            method: "GET",
            headers: {
                'content-Type': 'application/json'
            } 
        } )
        .then( (resposta) => resposta.json() )
        .then( (json) => { setFilmes( json ) } )
        .catch( ( error ) => { setErro( true ) } )
  }, [])

  function Excluir( evento, id ) {
    evento.preventDefault()
        fetch( process.env.REACT_APP_BACKEND + "filmes" , {
            method: "DELETE",
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    id: id
                }
            )   
        } )
        .then( (resposta) => resposta.json() )
        .then( (json) => { 
            const novalista = filmes.filter( (filme)  => filme._id !== id );
            setFilmes( novalista );
  })
        .catch( ( error ) => { setErro( true ) } )
  }
  
  const defaultTheme = createTheme();
  const cards = [
    {
    id: 1,
    image: Tenis1,
    title: "Tênis Nike Air Force 1 '07 Masculino",
    description: "R$ 799,99",
    editLink: "./edicao/1", 
  },
  {
    id: 2,
    image: Tenis2,
    title: "Tênis Nike Renew Ride 3 Masculino",
    description: "R$ 379,99",
    editLink: "./edicao/1", 
  },
  {
    id: 3,
    image: Tenis3,
    title: "Tênis Jordan MVP Masculino",
    description: "R$ 1.299,99",
    editLink: "./edicao/1", 
  },
    ];

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
             {!usuario ? (
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
        <Container sx={{ py: 8,  }}>
        <h1>Tênis Cadastrados:</h1>
  <Grid container spacing={4} sx={{
    width: '100%',
    margin: '0 auto',
    justifyContent: 'center'
  }}>
    {cards.map((card) => (
      <Grid item key={card.id}  >
        <Card
          sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
        >
          <CardMedia
            component="div"
          />
          <img src={card.image} height="300px" width="300px" />
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography gutterBottom variant="h8" component="h5">
              {card.title}
            </Typography>
            <Typography>
              {card.description}
            </Typography>
          </CardContent>
          <CardActions>
            {usuario ? (
              <Button size="small" href={card.editLink}>Edit</Button>
            ) : null}
          </CardActions>
        </Card>
      </Grid>
    ))}
  </Grid>
</Container>
        </Box>
        
    </ThemeProvider>
    
      <h1>Home</h1>
      <Container sx={{
        display: "flex",
        flexFlow: "row",
        flexWrap: "wrap",
        gap: "2rem"
      }}>
        {filmes && (
        filmes.map( (filme, index) => (
          <Filme 
            imagem={filme.imagem} 
            titulo={filme.titulo}
            descricao={filme.descricao}
            categoria={filme.categoria}
            ano={filme.ano}
            duracao={filme.duracao}
            excluir={ (e) => Excluir( e, filme._id ) }
            id={filme._id}
          />
        ) )
      )}
      
      
      </Container>
      
    </>
  );
}

export default App;
