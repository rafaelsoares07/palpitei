import styled from "styled-components"
import { Link } from "react-router-dom"
import { useState } from "react"

import axios from "axios"


import logo from "../../images/logo_palpitei.png"

export default function SignIn(){

    
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    console.log(email)
    console.log(password)

    const URL = "http://localhost:5001"

    const user = {
        email: email,
        password: password
    }

    const loginUser = (event) =>{
        event.preventDefault();

        const promisse = axios.post(`${URL}/signin`, user)

        promisse.then(el=>console.log(el))
        promisse.catch(loginUserFail)
    }

    const loginUserFail = (error) =>{
        console.log(error)
    }


    return(
        <>
        <Container>
            
            <AreaInputs>
                <img src={logo}/>
                <input type="text" value ={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Digite seu Email"></input>
                <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Digite sua senha"></input>
                <button onClick={loginUser}>Entrar</button>
                <Link to="/cadastro"><p>Ainda não possui uma conta?</p></Link>
            </AreaInputs>

        </Container>
        </>
    )
}

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background-image:linear-gradient(55deg, #e0e094, #f5f5dc);
    
`
const AreaInputs = styled.div`
    margin: 0 auto;
    max-width: 450px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    background: radial-gradient(ellipse farthest-corner at right bottom, #FEDB37 0%, #FDB931 70.7%, #9f7928 30%, #8A6E2F 40%, transparent 70%),
                radial-gradient(ellipse farthest-corner at left top, #FFFFFF 0%, #FFFFAC 0%, #D1B464 25%, #5d4a1f 62.5%, #5d4a1f 100%);

    img{
        margin-top: -25px;
    }

    input{
        width: 260px;
        height: 40px;
        border-radius: 5px;
        border: none;
        margin: 10px;
    }
    
    button{
        margin-top: 10px;
        width: 200px;
        height: 35px;
        cursor: pointer;
        font-size: 16px;
        font-weight: 600;
        border-radius: 5px;
        border: 1px solid gold;
        color: goldenrod;
        background-color:black;
    }

    a{
        margin: 8px;
        text-decoration: none;
        cursor: pointer;
        color:black;
    }
`