import axios from 'axios'
import styled from "styled-components"
import { useState, useContext, useEffect } from 'react'


import Header from "../../components/Header/Header"
import TogleMenu from "../../components/MenuTogleAdmin/MenuTogleAdmin"

import TokenContext from '../../context/tokenContext'
import UrlContext from '../../context/urlContext'


export default function TelaInserirResultado() {

    const { token } = useContext(TokenContext)

    const [matches, setMatches] = useState([])
    const [group, setGroup] = useState(undefined)
    const [load, setLoad] = useState(true)
    const [matcheInsertResult, setMatcheInsertResult] = useState(undefined)
    const [score1, setScore1] = useState(undefined)
    const [score2, setScore2] = useState(undefined)

    const URL = useContext(UrlContext)

    const config ={
        headers:{
          Authorization:`Bearer ${token}`
        }
    }

    const matchesGroup = matches.filter(el => el.groupName === group)

    let arrayMatches = []
    matchesGroup[0]?.roundOne.map(el => arrayMatches.push(el))
    matchesGroup[0]?.roundTwo.map(el => arrayMatches.push(el))
    matchesGroup[0]?.roundTree.map(el => arrayMatches.push(el))

    const partida = arrayMatches.filter(el => el.id == Number(matcheInsertResult))

    console.log(partida)

    function InsertMatche(){

        
        const objWithWinnerOne = {
            gameScoreTimeOne:score1,
            gameScoreTimeTwo:score2,
            winningTime:partida[0]?.Time1.id
        }
        const objWithWinnerTwo = {
            gameScoreTimeOne:score1,
            gameScoreTimeTwo:score2,
            winningTime:partida[0]?.Time2.id
        }
        const objWithOutWinner = {
            gameScoreTimeOne:score1,
            gameScoreTimeTwo:score2
        }

        if(score1 != undefined && score2 != undefined && partida.length>0){
            if (score1 > score2) {
                console.log("s1>s2")
                console.log(`${URL}/matche/result/${partida[0]?.id}`)

                const promisse = axios.post(`${URL}/matche/result/${partida[0]?.id}`,objWithWinnerOne,config)
                promisse.then(el=>console.log(el))
                promisse.catch(err=>console.log(err))
            }
            else if (score1 < score2) {
                const promisse = axios.post(`${URL}/matche/result/${partida[0]?.id}`,objWithWinnerTwo,config)
                promisse.then(el=>console.log(el))
                promisse.catch(err=>console.log(err))
            }
            else if (score1 === score2) {
                const promisse = axios.post(`${URL}/matche/result/${partida[0]?.id}`,objWithOutWinner,config)
                promisse.then(el=>console.log(el))
                promisse.catch(err=>console.log(err))
            }
        }
        else{
            alert("Preencha todos os dados corretamente")
        }
    
    }
    
    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const promisse = axios.get(`${URL}/matches/groupBy=groups`, config)

        promisse.then(el => setMatches(el.data))
        setLoad(false)
    }, [])


    return (
        <>
            <Container>

                <AreaPalpites>
                    <Header />
                    <TogleMenu />

                    <AreaInputs>
                    <label>Escolha o Grupo: </label>
                    <select name="grupos" id="grupos" onChange={(e) => setGroup(e.target.value)}>
                        {
                            load === true ?
                                null :
                                matches.map(el => <option value={el.groupName}>{el.groupName}</option>)}
                    </select>

                    <label>Escolha a partida: </label>
                    <select name="partidas" id="partidas" onChange={(e) => setMatcheInsertResult(e.target.value)}>
                        {
                            matches.length === 0 ?
                                <option>Escolha um grupo</option> :
                                arrayMatches.map((el, i) => <option key={i} value={el.id}>Time 1: {el.Time1.name} id: {el.Time1.id} || Time 2: {el.Time2.name} id: {el.Time2.id} </option>)
                                }
                    </select>
                    
                    <label>Placar Time 1 </label>
                    <input required value={score1} type="number" placeholder='Placar Time 1' onChange={(e) => setScore1(e.target.value)}></input>
                    
                    <label>Placar Time 2 </label>
                    <input required value={score2} type="number" placeholder='Placar Time 2' onChange={(e) => setScore2(e.target.value)}></input>

                    <button onClick={()=>InsertMatche()}>Cadastrar</button>

                    </AreaInputs>

                </AreaPalpites>

            </Container>
        </>
    )
}

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: pink;
    
`
const AreaPalpites = styled.div`
    margin: 0 auto;
    max-width: 450px;
    height: 100vh;
    background-color: #aa443f;
`
const AreaInputs = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    *{
        margin: 3px;
    }
    
`
