import React, {useEffect, useState} from 'react';
import Checkbox from "./Checkbox.jsx";
import {useNavigate} from "react-router-dom";
import Chart from "chart.js/auto";
function MainContent() {
    const [averageSalary, setAverageSalary] = useState(false);
    const [minimalSalary, setMinimalSalary] = useState(false);
    const [minimalPension, setMinimalPension] = useState(false);
    const [averagePension, setAveragePension] = useState(false);
    const [careAllowance, setCareAllowance] = useState(false);
    const [naturalDisasters, setNaturalDisasters] = useState(false);
    const [inflation, setInflation] = useState(false);
    const [pkb, setPkb] = useState(false);
    const [pkbPerCapita, setPkbPerCapita] = useState(false);
    const [ppp, setPpp] = useState(false);
    const [pppPerCapita, setPppPerCapita] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [dateFrom, setDateFrom] = useState('');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const filters = {
            averageSalary,
            minimalSalary,
            minimalPension,
            averagePension,
            careAllowance,
            naturalDisasters,
            pkb,
            pkbPerCapita,
            ppp,
            pppPerCapita,
            inflation,
            dateFrom,
            dateTo
        };
        const params = new URLSearchParams(filters).toString();
        const url = `http://localhost:3000/api/test?${params}`;
        setLoading(true);
        const respon = await fetch(url, {
            method: 'GET',
            credentials: 'include',
        });

        const dataReceived = await respon.json();
        setData(dataReceived);
        navigate('/results', { state: dataReceived });
    };
    
    return (
        <>
            {loading ? (
                <div
                    className="relative items-center block max-w-fit p-6 pb-10 bg-white border border-gray-100 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-800 dark:hover:bg-gray-700">
                    <img src="/waiting.png" alt="Czekaj..." className="w-full h-auto opacity-40"/>
                    <div role="status" className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2">
                        <svg aria-hidden="true"
                             className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                             viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"/>
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"/>
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>

            ) : (
                <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6 p-4 border rounded shadow">
                    <h2 className="text-xl font-bold">Filtruj dane</h2>

                    <div className="flex flex-col lg:flex-row gap-6">
                        <div className="flex flex-col gap-6 w-full lg:w-2/3">
                            <fieldset className="border p-3 rounded">
                                <legend className="font-medium">Świadczenia</legend>
                                <div className="flex flex-col">
                                    <Checkbox value="Średnia pensja" onChange={setAverageSalary}/>
                                    <Checkbox value="Płaca minimalna" onChange={setMinimalSalary}/>
                                    <Checkbox value="Minimalna emerytura" onChange={setMinimalPension}/>
                                    <Checkbox value="Średnia emerytura" onChange={setAveragePension}/>
                                    <Checkbox value="Zasiłek pielęgnacyjny" onChange={setCareAllowance}/>
                                    <Checkbox value="Kwota na osobe po klęsce żywiołowej" onChange={setNaturalDisasters}/>
                                </div>
                            </fieldset>

                            <fieldset className="border p-3 rounded">
                                <legend className="font-medium">Wskaźniki makroekonomiczne</legend>
                                <div className="flex flex-col">
                                    <Checkbox value="inflation" onChange={setInflation}/>
                                    <Checkbox value="pkb" onChange={setPkb}/>
                                    <Checkbox value="pkbPerCapita" onChange={setPkbPerCapita}/>
                                    <Checkbox value="ppp" onChange={setPpp}/>
                                    <Checkbox value="pppPerCapita" onChange={setPppPerCapita}/>
                                </div>
                            </fieldset>
                        </div>

                        <div className="w-full lg:w-1/3 space-y-4">
                            <div>
                                <label className="block font-medium">Data od:</label>
                                <input
                                    type="month"
                                    value={dateFrom}
                                    onChange={(e) => setDateFrom(e.target.value)}
                                    className="border rounded p-2 w-full"
                                />
                            </div>
                            <div>
                                <label className="block font-medium">Data do:</label>
                                <input
                                    type="month"
                                    value={dateTo}
                                    onChange={(e) => setDateTo(e.target.value)}
                                    className="border rounded p-2 w-full"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="text-center">
                        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded cursor-pointer">
                            Filtruj
                        </button>
                    </div>
                </form>
            )}

        </>
    );
}


export default MainContent;
