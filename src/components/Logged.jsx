import Button from "./Button.jsx";
import {useAuth} from "../AuthContext.jsx";

export default function Logged(){
    const { username } = useAuth();
    return(
        <>
        <Button text={"Witaj "+username} action={()=>console.log("AAA")}/>
        </>
    )
}