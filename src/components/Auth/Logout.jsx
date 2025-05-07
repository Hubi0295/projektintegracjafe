import {useAuth} from "../../AuthContext.jsx";
import Button from "../Button.jsx";

export default function Logout(){
    const {username, setUsername, loading, setLoading} = useAuth();
    const logout = async () => {
            await fetch("http://localhost:3000/auth/logout", {
                method: "POST",
                credentials: "include",
            });
            setUsername(null);
    };
    return (
        <Button text="Logout" action={logout} />
    );
}