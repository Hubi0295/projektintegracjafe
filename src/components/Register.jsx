import {useState} from "react";

export default function Register() {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword,setRepeatPassword] = useState('');
    const [error, setError] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        if (password !== repeatPassword) {
            setError("Hasła nie są takie same");
            return;
        }

        try {
            const res = await fetch('http://localhost:3000/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: login, password: password })
            });

            if (!res.ok) {
                throw new Error('Błąd podczas rejestracji');
            }

            const data = await res.json();
            console.log('Zarejestrowano:', data);
            // Możesz przekierować użytkownika do logowania
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
                <div>
                    <label htmlFor="repeatPassword" className="block text-sm font-medium">Powtórz hasło:</label>
                    <input
                        type="password"
                        id="repeatPassword"
                        value={repeatPassword}
                        onChange={(e) => setRepeatPassword(e.target.value)}
                        required
                        className="w-full border rounded p-2"
                    />
                </div>
                {error && <div className="text-red-500 text-sm">{error}</div>}
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
                    Zarejestruj się
                </button>
            </form>
        </div>
    );
}