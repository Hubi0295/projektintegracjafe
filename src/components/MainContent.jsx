import React, { useState } from 'react';
import Checkbox from "./Checkbox.jsx";
import RadioButton from "./RadioButton.jsx";
import {useNavigate} from "react-router-dom";

function MainContent() {
    const [averageSalary, setAverageSalary] = useState(false);
    const [minimalSalary, setMinimalSalary] = useState(false);
    const [minimalPension, setMinimalPension] = useState(false);
    const [averagePension, setAveragePension] = useState(false);
    const [pensionIncapacity, setPensionIncapacity] = useState(false);
    const [careAllowance, setCareAllowance] = useState(false);
    const [sicknessBenefit, setSicknessBenefit] = useState(false);
    const [unemploymentBenefit, setUnemploymentBenefit] = useState(false);
    const [economyMark, setEconomyMark] = useState("");
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const filters = {
            averageSalary,
            minimalSalary,
            minimalPension,
            averagePension,
            pensionIncapacity,
            careAllowance,
            sicknessBenefit,
            unemploymentBenefit,
            economyMark,
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
                            <Checkbox value="Renta z tytułu niezdolności do pracy" onChange={setPensionIncapacity} />
                            <Checkbox value="Zasiłek pielęgnacyjny" onChange={setCareAllowance} />
                            <Checkbox value="Zasiłek chorobowy" onChange={setSicknessBenefit} />
                            <Checkbox value="Zasiłek dla bezrobotnych" onChange={setUnemploymentBenefit} />
                        </div>
                    </fieldset>

                    <fieldset className="border p-3 rounded">
                        <legend className="font-medium">Wskaźniki makroekonomiczne</legend>
                        <div className="flex flex-col">
                            <RadioButton nameR="economyMark"  label="Inflacja" value="inflation" onChange={setEconomyMark} />
                            <RadioButton nameR="economyMark"  label="PKB" value="pkb" onChange={setEconomyMark} />
                            <RadioButton nameR="economyMark"  label="PKB per capita" value="pkbPerCapita" onChange={setEconomyMark} />
                            <RadioButton nameR="economyMark"  label="PPP" value="ppp" onChange={setEconomyMark} />
                            <RadioButton nameR="economyMark"  label="PPP per capita" value="pppPerCapita" onChange={setEconomyMark} />
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
