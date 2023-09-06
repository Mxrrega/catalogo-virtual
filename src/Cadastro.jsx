import { Alert, Box, Button, Container, Grid, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useEffect } from 'react';

function Cadastro() {

    const [ nome, setNome ] = useState( "" );
    const [ email, setEmail ] = useState( "" );
    const [ cpf, setCPF ] = useState( "" );
    const [ telefone, setTelefone ] = useState( "" );
    const [ senha, setSenha ] = useState( "" );
    const [ cadastro, setCadastro ] = useState( false );
    const [ erro, setErro ] = useState( false );
    
function Cadastar( evento ) {

    evento.preventDefault();

    fetch( "http://10.139.75.32:8080/users", {
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
        }}>
            <Typography component="h1" variant='h4'>Cadastrar</Typography>
            
            { erro && ( <Alert severity="warning" sx={{ mt: 2, mb: 2 }}>Desculpe tente novamente</Alert> ) }
            { cadastro && ( <Alert severity="success" sx={{ mt: 2, mb: 2 }}>Obrigado por se Cadastar</Alert> ) }

            <Box component="form" onSubmit={Cadastar}>
               <TextField 
               type="text"
               label="Nome"
               variant="filled" 
               margin="normal"
               value={nome}
               onChange={ (e) => setNome( e.target.value ) }
               fullWidth
               required
               />
               <TextField 
               type="email" 
               label="Email" 
               variant="filled" 
               margin="normal"
               value={email}
               onChange={ (e) => setEmail( e.target.value ) }
               fullWidth 
               required
               /> 
               <TextField
               type="text" 
               label="CPF" 
               variant="filled" 
               margin="normal"
               value={cpf}
               onChange={ (e) => setCPF( e.target.value ) }
               fullWidth 
               required
               /> 
               <TextField
               type="tel" 
               label="Telefone" 
               variant="filled" 
               margin="normal"
               value={telefone}
               onChange={ (e) => setTelefone( e.target.value ) }
               fullWidth 
               required
               /> 
               <TextField 
               type="password" 
               label="Senha" 
               variant="filled" 
               margin="normal" 
               value={senha}
               onChange={ (e) => setSenha( e.target.value ) }
               fullWidth 
               required
               />  
               <Button type="submit" variant="contained" fullWidth sx={ { mt: 2, mb: 2 }} >Cadastrar</Button>
               <Grid container>
                    <Grid item xs>
                        Já possui cadastro?
                    </Grid>
                </Grid>
            </Box>
        </Box>
    </Container>
  )
}

export default Cadastro;