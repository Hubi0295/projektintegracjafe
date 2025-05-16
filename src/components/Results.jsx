import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import Button from "./Button.jsx";
import TextArea from "./TextArea.jsx";
import {useLocation} from "react-router-dom";

function alignData(sourceDates, sourceValues, allLabels) {
    const dateValueMap = {};
    sourceDates.forEach((date, index) => {
        dateValueMap[date] = sourceValues[index];
    });

    return allLabels.map(date => dateValueMap[date] ?? null);
}
function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

function exportToJson(jsonData){
    const json = JSON.stringify(jsonData, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'data.json';
    link.click();
};


export default function Results() {
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);
    const location = useLocation();
    const { state } = location;

    useEffect(() => {
        console.log(state)
        if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
        }
        const allDates = [...new Set([
        ])];
        const allData = []
        Object.keys(state).map((key) => {
            try{
                allDates.push(...state[key].dates);
            }
            catch (e){
            }
        });
        allDates.sort((a, b) => new Date(a) - new Date(b));
        let kolor = getRandomColor();
        Object.keys(state).map((key) => {
            kolor = getRandomColor();
            try{
                if(key==="inflation"  || key==="pkb" || key==="pkbPerCapita" || key==="ppp" || key==="pppPerCapita"  ){
                    allData.push({
                        label: key,
                        data: alignData(state[key].dates, state[key].values, allDates),
                        borderColor: kolor,
                        backgroundColor: kolor,
                        spanGaps:true,
                        yAxisID: 'y1'
                    })
                }
                else{
                    allData.push({
                        label: key,
                        data: alignData(state[key].dates, state[key].values, allDates),
                        borderColor: kolor,
                        backgroundColor: kolor,
                        spanGaps:true,
                        yAxisID: 'y'
                    })
                }
            }
            catch (e){
            }
        });

        const data = {
            labels: allDates,
            datasets: allData
        };
        chartInstanceRef.current = new Chart(chartRef.current, {
            type: 'line',
            data: data,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Porownanie danych i wskaznikow'
                    }
                },
                scales: {
                    y: {
                        type: 'linear',
                        display: true,
                        position: 'left',
                    },
                    y1: {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        grid: {
                            drawOnChartArea: false,
                        },
                    },
                }
            },
        });
        return () => {
            chartInstanceRef.current?.destroy();
        };
    }, [state]);
    return(
        <>
            <div className="maincontent">
                <h1>Wyniki</h1>
                <canvas ref={chartRef}></canvas>
                <Button text="Eksport do JSON" action={()=>exportToJson(state)}/>
                <Button text="Eksport do XML" action={()=>console.log("eksport xml")}/>
            </div>
            <div className="overflow-scroll border p-4 rounded-xl">
                {state.globalNews.articles.map((article, index) => (
                    <TextArea key={`global-${index}`} props={article}/>
                ))}

                {state.polishNews.articles.map((article, index) => (
                    <TextArea key={`polish-${index}`} props={article}/>
                ))}
            </div>
        </>
    );
}
