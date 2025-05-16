import { useState } from "react";
import {useAuth} from "../../AuthContext.jsx";
import {useNavigate} from "react-router-dom";

export default function Login() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { setUsername } = useAuth();
    const navigate = useNavigate();
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ username: login, password: password })
            });
            if (!res.ok) {
                throw new Error('Błędny login lub hasło');
            }
            setUsername(login);
            console.log('Zalogowano pomyślnie');
            navigate("/");
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <div className="maincontent">
            <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto">
                <div>
                    <label htmlFor="login" className="block text-sm font-medium">Login:</label>
                    <input
                        type="text"
                        id="login"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        required
                        className="w-full border rounded p-2"
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium">Hasło:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full border rounded p-2"
                    />
                </div>
                {error && <div className="text-red-500 text-sm">{error}</div>}
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded cursor-pointer">
                    Zaloguj się
                </button>
            </form>
        </div>
    );
}
