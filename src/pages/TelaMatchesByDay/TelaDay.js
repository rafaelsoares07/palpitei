import styled from "styled-components"
import dayjs from "dayjs"

import { useState, useContext, useEffect } from "react"
import axios from "axios"
import Header from "../../components/Header/Header"
import TokenContext from "../../context/tokenContext"

import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Navigate, useNavigate } from "react-router-dom"

import togleBTN from "../../images/icones/togle.png"
import togleClose from "../../images/icones/close.png"

import {Card} from "../TelaMatchesByDay/Card"

import UrlContext from "../../context/urlContext"

export default function TelaInicial() {

    const style = {
        width: '100%',
        bgcolor: 'background.paper'
    };

    const navigate = useNavigate()

    const [togleBtn, setTogleBtn] = useState(false)

    const { token } = useContext(TokenContext)

    const [matches, setMatches] = useState([])

    console.log(matches)

    const URL = useContext(UrlContext)
    console.log(URL)

    const currentDay = dayjs().format("DD-MM-YYYY")
    console.log(currentDay)
    
    const obj = {
        currentDay:currentDay
    }

    const aux = "23-11-2022"

    useEffect(() => { 

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const promisse = axios.get(`${URL}/matches/currentDay/${aux}`,config)
        promisse.then(el => setMatches(el.data))
    }, [])




    return (
        <>
            <Container>

                <AreaPalpites>
                    <Header />
                    <Titulo >
                        <Icon active={togleBtn} >
                            <span onClick={() => setTogleBtn(!togleBtn)}>
                                <img className="open" src={togleBTN} />
                            </span>
                        </Icon>
                        <Itens active={togleBtn} >

                            <span onClick={() => setTogleBtn(!togleBtn)}>
                                <img className="close" src={togleClose}></img>
                            </span>

                            <List sx={style} component="nav" aria-label="mailbox folders">
                                <Divider />
                                <ListItem button>
                                    <ListItemText primary="Fase de Grupo" onClick={() => navigate("/home")} />
                                </ListItem>
                                <Divider />
                                <ListItem button divider>
                                    <ListItemText primary="Fase Mata-Mata" />
                                </ListItem>
                                <ListItem button>
                                    <ListItemText primary="Jogos do Dia" onClick={() => navigate("/matchesByDay")} />
                                </ListItem>
                            </List>
                        </Itens>


                    </Titulo>


                    


                    {
                        matches.length==0? 
                        <p>Não tem nenhuma partida hoje!</p>
                        :
                        matches.map(item => <Card matche={item}/>)
                    }



                </AreaPalpites>

            </Container>
        </>
    )
}

const Container = styled.div`
    width: 100vw;
    background-color: beige;
    min-height: 100vh;
`
const AreaPalpites = styled.div`
    margin: 0 auto;
    max-width: 450px;
    min-height: 100vh;
    background-color: #aa443f;
`
const Titulo = styled.div`
   
   display: flex;
   flex-direction: column;
   align-items: flex-end;

   p{
    background-color: blue;
   }
    
    
`

const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;


  img.open{
    margin-top: 8px;
    margin-right: 10px;
    width: 25px;
    cursor: pointer;
    display:${props => props.active === true ? "none" : "block"};
  }
  
`

const Itens = styled.div`
  
  display: none;
  width: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  display:${props => props.active === true ? "flex" : "none"};


  img.close{
    margin-top: 8px;
    margin-right: 10px;
    width: 25px;
    cursor: pointer;
  }
`