import { useEffect, useState, useContext, memo} from "react"
import styled from "styled-components"

import axios from "axios"
import TokenContext from "../../context/tokenContext"


function CardFormat({matche,i}){

    const {token} = useContext(TokenContext)
    
    const [s1, setS1] = useState("")  
    const [s2, setS2] = useState("")
    const [winner, setWinner] = useState("")
    const [isCorrect, setIsCorrect] = useState(undefined)
    const [aux, setAux] = useState(false)


    const URL = "http://localhost:5001"

    const config ={
        headers:{
          Authorization:`Bearer ${token}`
        }
    }

    const betWithWinner = {
        matcheId:matche[i].id,
        gameScoreTimeOne: Number(s1),
        gameScoreTimeTwo: Number(s2),
        winningTime:winner
    }

    const betEmpate = {
        matcheId:matche[i].id,
        gameScoreTimeOne: Number(s1),
        gameScoreTimeTwo: Number(s2),
    }
    
   
    if(winner!="" && s1!=undefined && s2!=undefined && aux==true){
        
        if(winner==="Empate"){
            const promisse = axios.post(`${URL}/bets`,betWithWinner,config)
            promisse.then(el=>console.log(el))
            promisse.catch(err=>console.log(err))
        }
        else if(winner!=="Empate"){
            const promisse = axios.post(`${URL}/bets`,betEmpate,config)
            promisse.then(el=>console.log(el))
            promisse.catch(err=>console.log(err))
        }
    }


 
    useEffect(()=>{
        
        if(s1>s2 && s1!="" && s2!=""){
           
            setWinner(matche[i].Time1.id)
            
        }
        else if(s1<s2 && s1!="" && s2!=""){
            
            setWinner(matche[i].Time2.id)
                    
        }
        else if(s1!="" && s2==""){
            setWinner("")
        }
        else if(s1=="" && s2!=""){
            setWinner("")
        }
        else if(s1=="" && s2==""){
            setWinner("")
        }
        else if (s1===s2){
            setWinner("Empate")
        }

        console.log('erro do userEffect 1')

    },[s1,s2])

    useEffect(()=>{
        const promisse = axios.get(`${URL}/bets/${matche[i].id}`,config)

        promisse.then((response)=> {
            setS1(response.data.gameScoreTimeOne)
            setS2(response.data.gameScoreTimeTwo)
            setIsCorrect(response.data.correct) 
        })
        console.log('erro do userEffect 2')
        promisse.catch(err=>console.log(err))

        setAux(true) 
    },[])


    return(
        <Container>
            <AreaMatches correct={isCorrect} >
                <Team>
                    {matche[i].Time1.sigla}
                    <img src={require(`../../images/bandeiras/${matche[i].Time1.sigla}.png`)}/>
                    <input value={s1} onChange={(el)=>setS1(el.target.value)} type="number"></input>
                </Team>
                <span>x</span>
                <Team>
                    <input value={s2} onChange={(el)=>setS2(el.target.value)} type="number"></input>
                    <img src={require(`../../images/bandeiras/${matche[i].Time2.sigla}.png`)}/>
                    {matche[i].Time2.sigla}
                    
                </Team>
                
            </AreaMatches>
        </Container>
    )
}


export const Card = memo(CardFormat)


const Container = styled.div`
    margin: 0 auto;
    height: 55px;
    display: flex;
    align-items:center;
    justify-content: center;
    
`

const AreaMatches = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    input{
        border-radius: 6px;
        border: none;
        border:1.2px solid black;
        width: 30px;
        height: 22px;
        margin: 8px;
        text-align: center;
        font-size: 18px;
        font-weight: 500;
        color:${
        props => props.correct===undefined?"black":props.correct===false?"red":props.correct===true?"green":"black"
        }
    }

    span{
        color:#c6babb;
        font-family:Verdana, Geneva, Tahoma, sans-serif;
    }
`
const Team = styled.div`
    
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
    img{
        width: 30px;
        margin: 5px;
    }
`