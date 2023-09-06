import { Autocomplete, Box, Button, Container, TextField, Typography } from '@mui/material';
import React from 'react';
import { useState, useEffect } from 'react';


function Filmes() {

    const categoriasfilmes = [ 
        { label: 'Ação' }, { label: 'Aventura'}, { label: 'Cinema de arte'}, { label: 'Chanchada'}, { label: 'Comédia'}, { label: 'Comédia de ação'},
        { label: 'Comédia de terror'}, { label: 'Comédia dramática'}, { label: 'Comédia romântica'}, { label: 'Dança'}, { label: 'Documentário'},
        { label: 'Docuficção'}, { label: 'Drama'}, { label: 'Espionagem'}, { label: 'Faroeste'}, { label: 'Fantasia'}, { label: 'Fantasia científica'},
        { label: 'Ficção científica'}, { label: 'Filmes com truques'}, { label: 'Filmes de guerra'}, { label: 'Mistério'}, { label: 'Musical'},
        { label: 'Filme policial'}, { label: 'Romance'}, { label: 'Terror'}, { label: 'Thriller'}
    ]

    const [ titulo, setTitulo ] = useState( "" );
    const [ descricao, setDescricao ] = useState( "" );
    const [ ano, setAno ] = useState( "" );
    const [ duracao, setDuracao ] = useState( "" );
    const [ categoria, setCategoria ] = useState( "" );
    const [ imagem, setImagem ] = useState( "" );
    const [ enviar, setEnviar ] = useState( false );
    const [ erro, setErro ] = useState( false );
    
function Enviar( evento ) {

    evento.preventDefault();

    fetch( "http://10.139.75.32:8080/filmes", {
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
            if( json.filme ) {
                setEnviar( true );
                setErro( false );
            } else {
                setErro( true );
                setEnviar( false );
            }

        } )
        .catch( ( erro ) => { setErro( true ) } )

}

    useEffect( () => {

        setTitulo( "" );
        setDescricao( "" );
        setAno( "" );
        setDuracao( "" );
        setCategoria( "" );
        setImagem( "" );

    }, [ enviar ] );
    
  return (
    <Container component="section" maxWidth="xs">
        <Box 
        sx={{ 
            mt: 10,
            backgroundColor: "#C4C4C4",
            padding: "50px",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        }}
        >
            <Typography component="h1" variant='h4'>Filmes</Typography>

            <Box component="form" onSubmit={Enviar}>
                <TextField 
                type="text" 
                label="Titulo" 
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
                label="Ano" 
                variant="filled" 
                margin="normal" 
                fullWidth 
                value={ano}
                onChange={ (e) => setAno( e.target.value ) }
                />
                <TextField 
                type="text" 
                label="Duração" 
                variant="filled" 
                margin="normal" 
                fullWidth 
                value={duracao}
                onChange={ (e) => setDuracao( e.target.value ) }
                />
                <Autocomplete 
                disablePortal
                id="combo-box-demo"
                options={categoriasfilmes}
                renderInput={(params) => <TextField {...params} label="Categoria" />}
                margin="normal"
                variant="filled" 
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


                <Button type="submit" variant="contained" fullWidth sx={ { mt: 2, mb: 2 }} >Enviar</Button>
            </Box>
        </Box>
    </Container> 
  )
}

export default Filmes;