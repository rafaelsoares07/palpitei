import * as React from 'react';
import { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styled from "styled-components"

import Card from "./Card"

import arrowLeft from "../../images/icones/arrow-left.svg"
import arrowRight from "../../images/icones/arrow-right.svg"


export default function SimpleAccordion({groupName,roundOne,roundTwo,roundTree}) {

    const [round, setRound] = useState(1)

    
    function incrementRound(){
        const currentRound = round
        if(currentRound<3){
            setRound(round+1)
        }
        else{
            setRound(1)
        }
    }
    function decrementRound(){
        const currentRound = round
        if(currentRound>1){
            setRound(round-1)
        }
        else{
            setRound(3)
        }
    }

    const round1 = roundOne
    const round2 = roundTwo
    const round3 = roundTree

  return (
    <div>
    
    <Container>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>{groupName}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Matches>
            <Slider>
                <img src={arrowLeft} onClick={decrementRound}/>
                <span>{round}º Rodada</span>
                <img src={arrowRight} onClick={incrementRound} />
                
            </Slider>

            
            <Aux1 visible={round}>
                <Card matche={round1} i={0}/>
                <Card matche={round1} i={1}/>
            </Aux1>
            
            
            
            <Aux2 visible={round}>
                <Card matche={round2} i={0}/>
                <Card matche={round2} i={1}/>
            </Aux2>
            

            
            <Aux3 visible={round}>
                <Card matche={round3} i={0}/>
                <Card matche={round3} i={1}/>
            </Aux3>
            
            
            

          </Matches>
        </AccordionDetails>
      </Accordion>
    </Container>
      
    </div>
  );
}

const Container = styled.div`
    width: 90%;
    margin: 0 auto;
    margin: 15px;
    
`

const Matches = styled.div`
    width: 100%;
    height: 150px;
    border: 0.2px solid #ded8cf;
`
const Slider = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin: 5px;
    img{
        cursor: pointer;
    }
    span{
        font-size: 18px;
        margin: 5px;
    }
    border-bottom: 0.1px solid #ded8cf;

`

const Aux1 = styled.div`
    display: ${props=> props.visible!=1?"none":"block"};
`

const Aux2 = styled.div`
    display: ${props=> props.visible!=2?"none":"block"};

`
const Aux3 = styled.div`
    display: ${props=> props.visible!=3?"none":"block"};
`