/* eslint-disable react/prop-types */
import { Line } from 'react-chartjs-2';
import { useMemo } from 'react';

const ComparisonChart = ({ currentData, previousData, timeFilter }) => {
    const chartData = useMemo(() => {
        const labels = currentData.map(item => new Date(item.date).toLocaleDateString("id-ID"));
        const currentValues = currentData.map(item => item.value);
        const previousValues = previousData.map(item => item.value);

        return {
            labels,
            datasets: [
                {
                    label: `Emisi ${timeFilter === 'weekly' ? 'Minggu' : 'Bulan'} Ini`,
                    data: currentValues,
                    borderColor: 'rgb(75, 192, 192)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    fill: true,
                },
                {
                    label: `Emisi ${timeFilter === 'weekly' ? 'Minggu' : 'Bulan'} Lalu`,
                    data: previousValues,
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    fill: true,
                }
            ]
        };
    }, [currentData, previousData, timeFilter]);


    return (
        <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-medium mb-4">Perbandingan Emisi</h3>
            <Line data={chartData} />
        </div>
    );
};

export default ComparisonChart;