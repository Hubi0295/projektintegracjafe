import Button from "./Button.jsx";
import {Link, useNavigate} from "react-router-dom";

export default function Sidebar() {
    const navigate = useNavigate();
    return (
        <>
            <div className="sidebar">
                <Button text="Zaloguj się" action={()=>navigate("/login")} />
                <Button text="Zarejestruj się" action={()=>navigate("/register")} />
                <nav>
                    <ul>
                        <li className="buttonSign"><Link to="/">Home</Link></li>
                        <li className="buttonSign"><Link to="/results">Results</Link></li>
                    </ul>
                </nav>
            </div>
        </>
    )
}