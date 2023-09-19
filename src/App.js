import { AppBar, Box, Button, Container, CssBaseline, ThemeProvider, Toolbar } from "@mui/material";
import { useEffect, useState } from "react";
import Filme from "./components/Filme";
import IconeMike from './components/logo-mike.png';
import { createTheme } from '@mui/material/styles';
import { Link } from "react-router-dom";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';


function App() {

  const [ filmes, setFilmes ] = useState();
  const [ erro, setErro ] = useState();

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
  const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

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
            width: '35%'
          }}>
            <Link to="/">
            <img src={IconeMike} alt="logo" href="./" width={62} height={22}/>
            </Link>
          
          </Box>
        </Toolbar>
        </AppBar>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image="https://source.unsplash.com/random?wallpapers"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Heading
                    </Typography>
                    <Typography>
                      This is a media card. You can use this section to describe the
                      content.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">View</Button>
                    <Button size="small">Edit</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
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
