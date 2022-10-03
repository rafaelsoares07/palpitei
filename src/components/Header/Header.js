import styled from "styled-components"

import logo from "../../images/palpitei_logo.svg"

export default function Header(){
    return(
        <Container>
            <Profile>
                <p>Palpitei</p>
                <ion-icon name="person-circle-outline"></ion-icon>
            </Profile>
        </Container>
        
    )
    
}

const Container = styled.div`
    max-width: 100vw;
    height: 90px;
    /* border-bottom-left-radius:40px;
    border-bottom-right-radius:40px; */
    background-color: #aa443f;

    display: flex;
    justify-content: center;
    align-items: center;

`

const Profile = styled.div`
    width: 100%;
    height: 75%;

    display: flex;
    justify-content: space-between;
    align-items: center;


`