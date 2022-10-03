import styled from "styled-components"
import axios from "axios"
import { Link, Navigate,useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import logo from "../../images/logo_palpitei.png"

export default function SignUp() {

    //Modals Toastify
    const notifySucessCreateUser = () => toast.success("Usuaŕio criado com sucesso")
    const notifyErrorConfirmPassword = () => toast.error("As senhas precisam ser idênticas")
    const notifyErrorEmail = () => toast.error("Você deve informar um email válido")
    const notifyErrorUserExists = () => toast.error("Você já possui uma conta, faça o login")


    const navigate = useNavigate()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const URL = "http://localhost:5001"

    const user = {
        name: name,
        email: email,
        password: password,
        confirmPassword: confirmPassword
    }

    const createUser = (event) => {
        event.preventDefault();

        const promisse = axios.post(`${URL}/signup`, user)

        promisse.then(createUserSucess)
        promisse.catch(createUserFail)

    }

    const createUserSucess = (response) => {
        console.log(response.data)
        notifySucessCreateUser()
        setTimeout(() => navigate("/"), 2000);
    }

    const createUserFail = (error) => {
        const messageError = error.response.data[0].message
        const statusError = error.response.status

        if (messageError == '"confirmPassword" must be [ref:password]') {
            return notifyErrorConfirmPassword()
        }
        if (messageError == '"email" must be a valid email') {
            return notifyErrorEmail()
        }
        if(statusError==409){
            notifyErrorUserExists()
            return setTimeout(() => navigate("/"), 2000);
        }
    }

    return (
        <>
            <Container>
                
                <AreaInputs>
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
                    <img src={logo} />
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Digite seu Nome"></input>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Digite seu Email"></input>
                    <input className="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Digite sua senha"></input>
                    <input className="password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirme sua Senha"></input>
                    <button onClick={createUser}>Entrar</button>
                    <Link to="/"><p>Já possui uma conta?</p></Link>
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