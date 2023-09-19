import { Alert, AppBar, Box, Button, Container, TextField, ThemeProvider, Toolbar, Typography, createTheme,  CssBaseline } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import IconeMike from './components/imagens/logo-mike.png';


function CadastroTenis() {;

    const [ titulo, setTitulo ] = useState( "" );
    const [ descricao, setDescricao ] = useState( "" );
    const [ ano, setAno ] = useState( "" );
    const [ duracao, setDuracao ] = useState( "" );
    const [ categoria, setCategoria ] = useState( "" );
    const [ imagem, setImagem ] = useState( "" );
    const [ cadastro, setCadastro ] = useState( false );
    const [ erro, setErro ] = useState( false );
    const defaultTheme = createTheme();
    
function Cadastrar( evento ) {

    evento.preventDefault();

    fetch( process.env.REACT_APP_BACKEND + "filmes", {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify (
        {
            titulo: titulo,
            descricao: descricao,
            ano: ano,
            duracao: duracao,
            categoria: categoria,
            imagem: imagem
        }
    )   
    } )
    .then( (resposta) => resposta.json() )
        .then( (json) => { 

            if( json._id ) {
                setCadastro( true );
                setErro( false );
            } else {
                setErro( true );
                setCadastro( false );
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
            <Link to="/">
            <img src={IconeMike} alt="logo" href="./" width={62} height={22}/>
            </Link>
          </Box>
        </Toolbar>
        </AppBar>
    <Container component="section" maxWidth="xs">
        <Box 
        sx={{ 
            mt: 10,
            mb: 10,
            backgroundColor: "#C4C4C4",
            padding: "50px",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        }}
        >
            <Typography component="h1" variant='h4'>Tênis</Typography>
            { erro && (<Alert severity="warning">Tênis já cadastrado. Tente novamente por favor!</Alert>)}
            { cadastro && ( <Alert severity="success">Obrigado por cadastrar seu Tênis</Alert>)}
            <Box component="form" onSubmit={Cadastrar}>
                <TextField 
                type="text" 
                label="Nome" 
                variant="filled" 
                margin="normal" 
                value={titulo}
                onChange={ (e) => setTitulo( e.target.value ) }
                fullWidth 
                />
                <TextField 
                type="text" 
                label="Descrição" 
                variant="filled" 
                margin="normal" 
                fullWidth 
                value={descricao}
                onChange={ (e) => setDescricao( e.target.value ) }
                />
                <TextField 
                type="number" 
                label="Tamanho" 
                variant="filled" 
                margin="normal" 
                fullWidth 
                value={ano}
                onChange={ (e) => setAno( e.target.value ) }
                />
                <TextField 
                type="text" 
                label="Garantia" 
                variant="filled" 
                margin="normal" 
                fullWidth 
                value={duracao}
                onChange={ (e) => setDuracao( e.target.value ) }
                />
                <TextField 
                type="text" 
                label="Categoria" 
                variant="filled" 
                margin="normal" 
                fullWidth 
                value={categoria}
                onChange={ (e) => setCategoria( e.target.value ) }
                />
                <TextField 
                type="text" 
                label="Imagem" 
                variant="filled" 
                margin="normal" 
                fullWidth 
                value={imagem}
                onChange={ (e) => setImagem( e.target.value ) }
                />


                <Button type="submit" variant="contained" fullWidth sx={ { mt: 2, mb: 2 }} >Cadastrar</Button>
            </Box>
        </Box>
    </Container> 
    </ThemeProvider>
  )
}


export default CadastroTenis;