import { Alert, Box, Button, Container, TextField, Typography} from '@mui/material';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

function EditaFilme() {

    const { id } = useParams();

    const [ titulo, setTitulo ] = useState( "" );
    const [ descricao, setDescricao ] = useState( "" );
    const [ ano, setAno ] = useState( "" );
    const [ duracao, setDuracao ] = useState( "" );
    const [ categoria, setCategoria ] = useState( "" );
    const [ imagem, setImagem ] = useState( "" );
    const [ editar, setEditar ] = useState( false );
    const [ erro, setErro ] = useState( false );

    useEffect( () => {
        fetch( process.env.REACT_APP_BACKEND + "filmes/" + id, {
            method: "GET",
            headers: {
                'Content-type': 'application/json'
            },
        } )
        .then( (resposta) => resposta.json() )
        .then( (json) => { 
            if( !json.status ) {
            setTitulo( json.titulo );
            setDescricao( json.descricao );
            setAno( json.ano );
            setDuracao( json.duracao );
            setCategoria( json.categoria );
            setImagem( json.imagem );
            }else {
                setErro( "Filme não encontrado" );
            }
            } )
            .catch( ( erro ) => { setErro( true ) } )
    }, [] );

    function Editar( evento ) {
        evento.preventDefault();

        fetch( process.env.REACT_APP_BACKEND + "filmes", {
            method: "PUT",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify (
            {
                id: id,
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
                    setEditar( true );
                    setErro( false );
                } else {
                    setErro( true );
                    setEditar( false );
                }
    
            } )
            .catch( ( erro ) => { setErro( true ) } )
    }

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
            { erro && (<Alert severity="warning">{erro}</Alert>)}
            { editar && ( <Alert severity="success">Filme editado com sucesso</Alert>)}
        <Box component="form" onSubmit={Editar}>
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
            
        <Button type="submit" variant="contained" fullWidth sx={ { mt: 2, mb: 2 }}>Enviar</Button>

        </Box>
        </Box>
    </Container>
  )
}

export default EditaFilme;