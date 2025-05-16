import Button from "./Button.jsx";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

export default function UsersSearches() {
    const navigate = useNavigate();
    const [res1,setRes1] = useState("");
    const [res2,setRes2] = useState("");
    const [res3,setRes3] = useState("");
    const [res4,setRes4] = useState("");
    const [res5,setRes5] = useState("");
    const results = [res1,res2,res3,res4,res5];
    const handleChange = (e) => {
        const index = e.target.value;
        if (index !== '') {
            navigate('/results', { state: results[index] });
        }
    };
    useEffect(  () => {
        async function pobierz(){
            const respo = await fetch("http://localhost:3000/api/latest");
            const dataFromBack = await respo.json();
            return dataFromBack;
        }
        pobierz().then(data => {
            console.log(data);
            setRes1(data.first);
            setRes2(data.second);
            setRes3(data.third);
            setRes4(data.fourth);
            setRes5(data.fifth);
        }).catch(error => {
            console.error("Błąd podczas pobierania danych:", error);
        });
    }, []);
    return (
        <select onChange={handleChange} defaultValue="" className="block w-full max-w-xs px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
            <option value="" disabled>Wybierz datę</option>
            {results.map((res, index) => (
                <option key={index} value={index}>{res.date}</option>
            ))}
        </select>
    )
}