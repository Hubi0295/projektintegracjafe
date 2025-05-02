import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function MainContent() {
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);
    useEffect(() => {
        if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
        }
        chartInstanceRef.current = new Chart(chartRef.current, {
            type: 'bar',
            data: {
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
                    borderWidth: 1,
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
        return () => {
            chartInstanceRef.current?.destroy();
        };
    }, []);

    return (
        <div className="maincontent">
            <h1>MainContent</h1>
            <canvas ref={chartRef}></canvas>
        </div>
    );
}
