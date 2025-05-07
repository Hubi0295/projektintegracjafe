import Button from "./Button.jsx";
import {Link, useNavigate} from "react-router-dom";
import React from "react";
import Logged from "./Logged.jsx";
import {useAuth} from "../AuthContext.jsx";

export default function Sidebar() {
    const navigate = useNavigate();

    const {username,logout,loading} = useAuth();
    if(loading){
        return <p>Loading....</p>
    }

    return (
        <>
            <div className="sidebar">
                <nav>
                    <ul>
                        {username ?
                            <>
                            <li><Logged/></li>
                            <li><Button text="Wyloguj sie" action={()=>{logout();console.log("Wylogowano")}}/></li>
                            </>
                            :
                            <><li><Link to="/login"><Button text="Zaloguj się" action={() => console.log("Loguj")}/></Link></li>
                            <li><Link to="/register"><Button text="Zarejestruj się" action={() => console.log("Rejestruj")}/></Link></li></>
                    }

                        <li><Link to="/"><Button text="Strona glowna" action={() => console.log("Strona")}/></Link></li>
                        <li><Link to="/results"><Button text="Wyniki" action={() => console.log("Rezultaty")}/></Link></li>
                        <li><Button text="Eksport z bazy" action={()=>console.log("Eksport")}></Button></li>

                    </ul>
                </nav>
            </div>
        </>
    )
}