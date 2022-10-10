import styled from "styled-components"
import { Link, Navigate, useNavigate} from "react-router-dom"
import { useState, useContext, useEffect} from "react"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from "axios"
import logo from "../../images/logo_palpitei.png"

import TokenContext from "../../context/tokenContext"
import UrlContext from "../../context/urlContext"


export default function SignIn(){

    const navigate = useNavigate()

    //Contexts
    const {token, setToken, setUserLogado, userLogado,permissions,setPermissions} = useContext(TokenContext)


    // Modals Toastify
    const notifyUserNotExists = () => toast.error("Usuaŕio ainda não tem um cadastro")
    const notifyInvalidCredentials = () => toast.error("Credenciais informadas inválidas")
    const notifyErrorEmail = () => toast.warn("Você deve preencher o campo com seu email válido")
    
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    const URL = useContext(UrlContext)

    console.log(URL)

    const user = {
        email: email,
        password: password
    }

    const loginUser = (event) =>{
        event.preventDefault();

        const promisse = axios.post(`${URL}/signin`, user)

        promisse.then(loginUserSucess)
        promisse.catch(loginUserFail)
    }

    const loginUserFail = (error) =>{
        const messageError = error.response.data[0].message
        const statusError = error.response.status

        if (messageError == '"email" must be a valid email') {
            return notifyErrorEmail()
        }
        if(statusError==404){
            return notifyUserNotExists()
        }
        if(statusError==401){
            return notifyInvalidCredentials()
        }
    }

    const loginUserSucess = (response) =>{
        
        setPermissions(response.data.userPermissions)

        setToken(response.data.token)

        const user ={
            id:response.data.userExist.id,
            name:response.data.userExist.name
        }

        setUserLogado(user)

        const localStorageObj = {
            permissions:response.data.userPermissions,
            token:response.data.token,
            userLogado:user
        }

        localStorage.setItem("user",JSON.stringify(localStorageObj))

        if(response.data.userPermissions.length>0){
            navigate("/painel-control")
        }else{
            navigate("/home")
        }
    }

    useEffect(()=>{

        const userLogado = localStorage.getItem("user")

        if(userLogado){
            const user = JSON.parse(userLogado)

            console.log(user)

            setPermissions(user.permissions)
            setToken(user.token)
            setUserLogado(user.userLogado)

            if(user.permissions.length>0){
                navigate("/painel-control")
            }else{
                navigate("/home")
            }
        }
        

    },[])

    return(
        <>
        <Container>
   
            <ToastContainer
                position="top-center"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
            />            
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

    background: radial-gradient(ellipse farthest-corner at right bottom,#b0544f 0%, #A52A2A 70.7%, #9f7928 30%, #8A6E2F 40%, transparent 70%),
                radial-gradient(ellipse farthest-corner at left top, #FFFFFF 0%, #FFFFAC 0%,#D1B464 25%, #5d4a1f 62.5%, #5d4a1f 100%);

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