import * as React from 'react';
import axios from "axios"
import styled from "styled-components"
import dayjs from "dayjs"

import { useState, useContext, useEffect } from "react"

import Header from "../../components/Header/Header"
import {Card} from "../TelaMatchesByDay/Card"
import TogleMenu from "../../components/MenuTogle/TogleMenu"

import UrlContext from "../../context/urlContext"
import TokenContext from "../../context/tokenContext"

export default function TelaInicial() {

    const { token } = useContext(TokenContext)

    const [matches, setMatches] = useState([])

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
                    <TogleMenu/>

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
