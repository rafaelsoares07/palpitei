import { useEffect, useState, useContext, memo} from "react"
import styled from "styled-components"

import axios from "axios"
import TokenContext from "../../context/tokenContext"


function CardFormat({matche,i}){

    const {token} = useContext(TokenContext)
    
    const [s1, setS1] = useState(undefined)  
    const [s2, setS2] = useState(undefined)
    const [winner, setWinner] = useState(null)
    const [isCorrect, setIsCorrect] = useState(undefined)

    let hora = matche[i].dateAndHora
    let formatHora = hora.substring(11,16)
    

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
    
   
    if(winner!=null && s1!=undefined && s2!=undefined ){
        
        if(winner==="Empate"){
            
            const promisse = axios.post(`${URL}/bets`,betEmpate,config)
            promisse.then(el=>console.log(el))
            promisse.catch(err=>console.log(err))
        }
        else if(winner!=="Empate"){
           
            const promisse = axios.post(`${URL}/bets`,betWithWinner,config)
            promisse.then(el=>console.log(el))
            promisse.catch(err=>console.log(err))
        }
    }


 
    useEffect(()=>{
        
        if(s1>s2 && s1!=undefined && s2!=undefined){
           
            setWinner(matche[i].Time1.id)
            
        }
        else if(s1<s2 && s1!=undefined && s2!=undefined){
            
            setWinner(matche[i].Time2.id)
                    
        }
        else if(s1!=undefined && s2==undefined){
            setWinner(null)
        }
        else if(s1==undefined && s2!=undefined){
            setWinner(null)
        }
        else if(s1==undefined && s2==undefined){
            setWinner(null)
        }
        else if (s1===s2 && s1!=undefined && s2!=undefined){
            setWinner("Empate")
        }

    },[s1,s2])

    useEffect(()=>{
        console.log("entrou aqui")
        const promisse = axios.get(`${URL}/bets/${matche[i].id}`,config)

        

        promisse.then((response)=> {
            console.log(response.data)
            setS1(response.data.gameScoreTimeOne)
            setS2(response.data.gameScoreTimeTwo)
            setIsCorrect(response.data.correct) 
        })
        promisse.catch(err=>console.log(err))

        
    },[])


    return(
        <Container>

            <Header>
                <span className="day">{matche[i].day} </span>
                <span className="stadium"> {matche[i].Stadium.name}</span>
                <span className="time">{formatHora}</span>
            </Header>

            
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
    flex-direction: column;
    margin: 10px;
    
`
const Header = styled.div`

    
    
    display:flex;
    
    span{
        font-size: 14px;
        margin: 2px;
        
    }
    span.day, span.time{
        font-weight:500;
        color:#4F4F4F;
    }


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