import { Navigate , useNavigate} from "react-router-dom"
import styled from "styled-components"

import logo from "../../images/logo_name.png"
import logout from "../../images/icones/logout.png"
export default function Header(){

    const navigate = useNavigate()

    function logoutUser(){
        localStorage.clear()
        navigate("/")
    }



    return(
        <Container>
            <Profile>
                <img src={logo}/>
                <img className="logout" src={logout} onClick={logoutUser}/>
            </Profile>
        </Container>
        
    )
    
}

const Container = styled.div`
    width: 100%;
    height: 80px;
    background-color: white;

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

    img{
        width: 180px;
        margin: 5px;
    }
    img.logout{
        width: 35px;
    }

`