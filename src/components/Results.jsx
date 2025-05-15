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
    const fakeApi = {
        "averageSalary": {
            "values":[1000,2000,3000,5000,8000],
            "dates":["2013-05-14","2015-05-14","2019-05-14","2021-05-14","2023-05-14"]
        },
        "minimalSalary": {
            "values": [1250, 1380, 1650, 1980, 2450],
            "dates": ["2012-03-12", "2014-08-25", "2016-11-03", "2019-07-18", "2022-10-29"]
        },
        "minimalPension": {
            "values": [700, 820, 930, 1100, 1280],
            "dates": ["2011-06-22", "2013-09-15", "2015-12-01", "2018-04-17", "2021-09-08"]
        },
        "averagePension": {
            "values": [880, 1020, 1180, 1400, 1650],
            "dates": ["2010-05-30", "2012-12-11", "2016-01-19", "2019-03-05", "2023-01-14"]
        },
        "careAllowance": {
            "values": [90, 100, 115, 130, 150],
            "dates": ["2012-01-01", "2014-05-14", "2016-10-10", "2018-12-25", "2023-06-06"]
        },
        "unemploymentBenefit": {
            "values": [500, 580, 660, 740, 820],
            "dates": ["2010-03-01", "2012-10-18", "2015-03-22", "2017-08-09", "2021-12-27"]
        },
        "inflation": {
            "values": [1.2, 1.6, 2.1, 3.3, 6.5],
            "dates": ["2011-07-04", "2013-05-21", "2016-02-14", "2019-10-05", "2023-04-01"]
        },
        "pkb": {
            "values": [450000, 520000, 610000, 720000, 850000],
            "dates": ["2010-01-10", "2012-06-30", "2015-08-19", "2018-11-25", "2022-09-14"]
        },
        "pkbPerCapita": {
            "values": [11500, 12800, 14400, 16200, 18500],
            "dates": ["2011-03-15", "2013-10-07", "2016-06-12", "2020-01-29", "2024-05-03"]
        },
        "ppp": {
            "values": [510000, 580000, 660000, 755000, 870000],
            "dates": ["2010-04-22", "2013-01-30", "2015-05-16", "2019-09-01", "2023-12-20"]
        },
        "pppPerCapita": {
            "values": [12500, 13800, 15200, 17200, 19500],
            "dates": ["2011-09-08", "2014-03-12", "2017-11-17", "2021-01-06", "2024-08-22"]
        },
        "globalNews":{
            "articles": [
                {
                    "title": "Google's Pixel 7 and 7 Pro’s design gets revealed even more with fresh crisp renders",
                    "description": "Now we have a complete image of what the next Google flagship phones will look like. All that's left now is to welcome them during their October announcement!",
                    "content": "Google’s highly anticipated upcoming Pixel 7 series is just around the corner, scheduled to be announced on October 6, 2022, at 10 am EDT during the Made by Google event. Well, not that there is any lack of images showing the two new Google phones, b... [1419 chars]",
                    "url": "https://www.phonearena.com/news/google-pixel-7-and-pro-design-revealed-even-more-fresh-renders_id142800",
                    "image": "https://m-cdn.phonearena.com/images/article/142800-wide-two_1200/Googles-Pixel-7-and-7-Pros-design-gets-revealed-even-more-with-fresh-crisp-renders.jpg",
                    "publishedAt": "2022-09-28T08:14:24Z",
                    "source": {
                        "name": "PhoneArena",
                        "url": "https://www.phonearena.com"
                    }
                },
                {
                    "title": "Google's Pixel 7 and 7 Pro’s design gets revealed even more with fresh crisp renders",
                    "description": "Now we have a complete image of what the next Google flagship phones will look like. All that's left now is to welcome them during their October announcement!",
                    "content": "Google’s highly anticipated upcoming Pixel 7 series is just around the corner, scheduled to be announced on October 6, 2022, at 10 am EDT during the Made by Google event. Well, not that there is any lack of images showing the two new Google phones, b... [1419 chars]",
                    "url": "https://www.phonearena.com/news/google-pixel-7-and-pro-design-revealed-even-more-fresh-renders_id142800",
                    "image": "https://m-cdn.phonearena.com/images/article/142800-wide-two_1200/Googles-Pixel-7-and-7-Pros-design-gets-revealed-even-more-with-fresh-crisp-renders.jpg",
                    "publishedAt": "2022-09-28T08:14:24Z",
                    "source": {
                        "name": "PhoneArena",
                        "url": "https://www.phonearena.com"
                    }
                }
            ]
        },
        "polishNews":{
            "articles":[
                {
                    "title": "Google's Pixel 7 and 7 Pro’s design gets revealed even more with fresh crisp renders",
                    "description": "Now we have a complete image of what the next Google flagship phones will look like. All that's left now is to welcome them during their October announcement!",
                    "content": "Google’s highly anticipated upcoming Pixel 7 series is just around the corner, scheduled to be announced on October 6, 2022, at 10 am EDT during the Made by Google event. Well, not that there is any lack of images showing the two new Google phones, b... [1419 chars]",
                    "url": "https://www.phonearena.com/news/google-pixel-7-and-pro-design-revealed-even-more-fresh-renders_id142800",
                    "image": "https://m-cdn.phonearena.com/images/article/142800-wide-two_1200/Googles-Pixel-7-and-7-Pros-design-gets-revealed-even-more-with-fresh-crisp-renders.jpg",
                    "publishedAt": "2022-09-28T08:14:24Z",
                    "source": {
                        "name": "PhoneArena",
                        "url": "https://www.phonearena.com"
                    }
                },
                {
                    "title": "Google's Pixel 7 and 7 Pro’s design gets revealed even more with fresh crisp renders",
                    "description": "Now we have a complete image of what the next Google flagship phones will look like. All that's left now is to welcome them during their October announcement!",
                    "content": "Google’s highly anticipated upcoming Pixel 7 series is just around the corner, scheduled to be announced on October 6, 2022, at 10 am EDT during the Made by Google event. Well, not that there is any lack of images showing the two new Google phones, b... [1419 chars]",
                    "url": "https://www.phonearena.com/news/google-pixel-7-and-pro-design-revealed-even-more-fresh-renders_id142800",
                    "image": "https://m-cdn.phonearena.com/images/article/142800-wide-two_1200/Googles-Pixel-7-and-7-Pros-design-gets-revealed-even-more-with-fresh-crisp-renders.jpg",
                    "publishedAt": "2022-09-28T08:14:24Z",
                    "source": {
                        "name": "PhoneArena",
                        "url": "https://www.phonearena.com"
                    }
                }
            ]
        }
    }

    useEffect(() => {
        console.log(state)
        if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
        }
        const allDates = [...new Set([
        ])];
        const allData = []
        Object.keys(fakeApi).map((key) => {
            try{
                allDates.push(...fakeApi[key].dates);
            }
            catch (e){
            }
        });
        allDates.sort((a, b) => new Date(a) - new Date(b));
        let kolor = getRandomColor();
        Object.keys(fakeApi).map((key) => {
            kolor = getRandomColor();
            try{
                if(key==="inflation"  || key==="pkb" || key==="pkbPerCapita" || key==="ppp" || key==="pppPerCapita"  ){
                    allData.push({
                        label: key,
                        data: alignData(fakeApi[key].dates, fakeApi[key].values, allDates),
                        borderColor: kolor,
                        backgroundColor: kolor,
                        spanGaps:true,
                        yAxisID: 'y1'
                    })
                }
                else{
                    allData.push({
                        label: key,
                        data: alignData(fakeApi[key].dates, fakeApi[key].values, allDates),
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
    }, []);
    return(
        <>
            <div className="maincontent">
                <h1>Wyniki</h1>
                <canvas ref={chartRef}></canvas>
                <Button text="Eksport do JSON" action={()=>exportToJson(fakeApi)}/>
                <Button text="Eksport do XML" action={()=>console.log("eksport xml")}/>
            </div>
            <div>
                {fakeApi.globalNews.articles.map((article, index) => (
                    <TextArea key={`global-${index}`} props={article}/>
                ))}

                {fakeApi.polishNews.articles.map((article, index) => (
                    <TextArea key={`polish-${index}`} props={article}/>
                ))}
            </div>
        </>
    );
}
