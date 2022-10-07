import styled from "styled-components"

import logo from "../../images/logo_name.png"

export default function Header(){
    return(
        <Container>
            <Profile>
                <img src={logo}/>
                <ion-icon name="person-circle-outline"></ion-icon>
            </Profile>
        </Container>
        
    )
    
}

const Container = styled.div`
    width: 100%;
    height: 90px;
    background-color: #aa443f;

    display: flex;
    justify-content: center;
    align-items: center;

    border-bottom-left-radius: 25px;
    border-bottom-right-radius: 25px;


`

const Profile = styled.div`
    width: 100%;
    height: 75%;

    display: flex;
    justify-content: space-between;
    align-items: center;

    img{
        width: 180px;
    }

`