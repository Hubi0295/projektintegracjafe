import React, { useState } from 'react';
import Checkbox from "./Checkbox.jsx";

function MainContent() {
    const [averageSalary, setAverageSalary] = useState(false);
    const [minimalSalary, setMinimalSalary] = useState(false);
    const [minimalPension, setMinimalPension] = useState(false);
    const [averagePension, setAveragePension] = useState(false);
    const [pensionIncapacity, setPensionIncapacity] = useState(false);
    const [familyAllowance, setFamilyAllowance] = useState(false);
    const [sicknessBenefit, setSicknessBenefit] = useState(false);
    const [unemploymentBenefit, setUnemploymentBenefit] = useState(false);

    const [inflation, setInflation] = useState(false);
    const [pkb, setPkb] = useState(false);
    const [pkbPerCapita, setPkbPerCapita] = useState(false);
    const [ppp, setPpp] = useState(false);
    const [pppPerCapita, setPppPerCapita] = useState(false);

    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const filters = {
            averageSalary,
            minimalSalary,
            minimalPension,
            averagePension,
            pensionIncapacity,
            familyAllowance,
            sicknessBenefit,
            unemploymentBenefit,
            inflation,
            pkb,
            pkbPerCapita,
            ppp,
            pppPerCapita,
            dateFrom,
            dateTo
        };

        console.log('Wybrane filtry:', filters);
    };
    
    return (
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6 p-4 border rounded shadow">
            <h2 className="text-xl font-bold">Filtruj dane</h2>

            <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex flex-col gap-6 w-full lg:w-2/3">
                    <fieldset className="border p-3 rounded">
                        <legend className="font-medium">Świadczenia</legend>
                        <div className="flex flex-col">
                            <Checkbox label="Średnia pensja" value={averageSalary} onChange={setAverageSalary} />
                            <Checkbox label="Płaca minimalna" value={minimalSalary} onChange={setMinimalSalary} />
                            <Checkbox label="Minimalna emerytura" value={minimalPension} onChange={setMinimalPension} />
                            <Checkbox label="Średnia emerytura" value={averagePension} onChange={setAveragePension} />
                            <Checkbox label="Renta z tytułu niezdolności do pracy" value={pensionIncapacity} onChange={setPensionIncapacity} />
                            <Checkbox label="Zasiłek rodzinny" value={familyAllowance} onChange={setFamilyAllowance} />
                            <Checkbox label="Zasiłek chorobowy" value={sicknessBenefit} onChange={setSicknessBenefit} />
                            <Checkbox label="Zasiłek dla bezrobotnych" value={unemploymentBenefit} onChange={setUnemploymentBenefit} />
                        </div>
                    </fieldset>

                    <fieldset className="border p-3 rounded">
                        <legend className="font-medium">Wskaźniki makroekonomiczne</legend>
                        <div className="flex flex-col">
                            <Checkbox label="Inflacja" value={inflation} onChange={setInflation} />
                            <Checkbox label="PKB" value={pkb} onChange={setPkb} />
                            <Checkbox label="PKB per capita" value={pkbPerCapita} onChange={setPkbPerCapita} />
                            <Checkbox label="PPP" value={ppp} onChange={setPpp} />
                            <Checkbox label="PPP per capita" value={pppPerCapita} onChange={setPppPerCapita} />
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
);
}



export default MainContent;
