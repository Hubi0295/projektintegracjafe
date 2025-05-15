import React, {useEffect, useState} from 'react';
import Checkbox from "./Checkbox.jsx";
import {useNavigate} from "react-router-dom";

function MainContent() {
    const [averageSalary, setAverageSalary] = useState(false);
    const [minimalSalary, setMinimalSalary] = useState(false);
    const [minimalPension, setMinimalPension] = useState(false);
    const [averagePension, setAveragePension] = useState(false);
    const [careAllowance, setCareAllowance] = useState(false);
    const [unemploymentBenefit, setUnemploymentBenefit] = useState(false);
    const [inflation, setInflation] = useState(false);
    const [pkb, setPkb] = useState(false);
    const [pkbPerCapita, setPkbPerCapita] = useState(false);
    const [ppp, setPpp] = useState(false);
    const [pppPerCapita, setPppPerCapita] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [dateFrom, setDateFrom] = useState('');
    const [globalNews, setGlobalNews] = useState([]);
    const [polishNews, setPolishNews] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        setPolishNews([{"abc":10},{"asss":123}]);
        setGlobalNews([{"abceff":10},{"asssasdasdad":123}]);
    }, []);
    const handleSubmit = (e) => {
        e.preventDefault();

        const filters = {
            averageSalary,
            minimalSalary,
            minimalPension,
            averagePension,
            careAllowance,
            unemploymentBenefit,
            pkb,
            pkbPerCapita,
            ppp,
            pppPerCapita,
            inflation,
            polishNews,
            globalNews,
            dateFrom,
            dateTo
        };
        navigate('/results', { state: filters });
    };
    
    return (
        <>
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6 p-4 border rounded shadow">
            <h2 className="text-xl font-bold">Filtruj dane</h2>

            <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex flex-col gap-6 w-full lg:w-2/3">
                    <fieldset className="border p-3 rounded">
                        <legend className="font-medium">Świadczenia</legend>
                        <div className="flex flex-col">
                            <Checkbox value="Średnia pensja" onChange={setAverageSalary} />
                            <Checkbox value="Płaca minimalna" onChange={setMinimalSalary} />
                            <Checkbox value="Minimalna emerytura" onChange={setMinimalPension} />
                            <Checkbox value="Średnia emerytura" onChange={setAveragePension} />
                            <Checkbox value="Zasiłek pielęgnacyjny" onChange={setCareAllowance} />
                            <Checkbox value="Zasiłek dla bezrobotnych" onChange={setUnemploymentBenefit} />
                        </div>
                    </fieldset>

                    <fieldset className="border p-3 rounded">
                        <legend className="font-medium">Wskaźniki makroekonomiczne</legend>
                        <div className="flex flex-col">
                            <Checkbox value="inflation" onChange={setInflation} />
                            <Checkbox value="pkb" onChange={setPkb} />
                            <Checkbox value="pkbPerCapita" onChange={setPkbPerCapita} />
                            <Checkbox value="ppp" onChange={setPpp} />
                            <Checkbox value="pppPerCapita" onChange={setPppPerCapita} />
                        </div>
                    </fieldset>
                </div>

                <div className="w-full lg:w-1/3 space-y-4">
                    <div>
                        <label className="block font-medium">Data od:</label>
                        <input
                            type="date"
                            value={dateFrom}
                            onChange={(e) => setDateFrom(e.target.value)}
                            className="border rounded p-2 w-full"
                        />
                    </div>
                    <div>
                        <label className="block font-medium">Data do:</label>
                        <input
                            type="date"
                            value={dateTo}
                            onChange={(e) => setDateTo(e.target.value)}
                            className="border rounded p-2 w-full"
                        />
                    </div>
                </div>
            </div>

            <div className="text-center">
                <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">
                    Filtruj
                </button>
            </div>
        </form>
    </>
);
}



export default MainContent;
