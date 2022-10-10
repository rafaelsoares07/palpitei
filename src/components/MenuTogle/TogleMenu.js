import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import {Navigate,useNavigate } from "react-router-dom"

import togleBTN from "../../images/icones/togle.png"
import togleClose from "../../images/icones/close.png"
import closeLocked from "../../images/icones/fechadura.png"


export default function TogleMenu(){

    const style = {
        width: '100%',
        bgcolor: 'background.paper'
      };

      const [togleBtn, setTogleBtn] = useState(false)
      const navigate = useNavigate()

    return(
        <Titulo >

            <Icon active={togleBtn} >

              <span onClick={()=>setTogleBtn(!togleBtn)}>
                <img className="open" src={togleBTN}/>
              </span>
  
            </Icon>
              
            <Itens active={togleBtn} >
            
              <span onClick={()=>setTogleBtn(!togleBtn)}>
                <img className="close" src={togleClose}></img>
              </span>
            
              <List sx={style} component="nav" aria-label="mailbox folders">
                <Divider />
                <ListItem button>
                  <ListItemText primary="Fase de Grupo" onClick={()=>navigate("/home")} />
                </ListItem>
                <Divider />
                <ListItem button divider>
                  <ListItemText primary="Fase Mata-Mata" />
                  <img width={"22px"} src={closeLocked}/>
                </ListItem>
                <ListItem button>
                  <ListItemText primary="Jogos do Dia" onClick={()=>navigate("/matchesByDay")} />
                </ListItem>
              </List>
            </Itens>

          </Titulo>
    )

}

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
    display:${props=>props.active===true?"none":"block"};
  }
  
`

const Itens = styled.div`
  
  display: none;
  width: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  display:${props=>props.active===true?"flex":"none"};


  img.close{
    margin-top: 8px;
    margin-right: 10px;
    width: 25px;
    cursor: pointer;
  }
`