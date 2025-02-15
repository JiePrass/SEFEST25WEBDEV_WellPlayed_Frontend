/* eslint-disable react/prop-types */
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const HistoryChart = ({ data, yearFilter }) => {
    // Buat array label untuk bulan (Januari - Desember)
    const monthLabels = [
        'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun',
        'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'
    ];

    // Mapping data ke bulan (0-11)
    const monthlyData = new Array(12).fill(0);
    data.forEach(item => {
        const month = new Date(item.date).getMonth();
        monthlyData[month] += item.value;
    });

    const chartData = {
        labels: monthLabels,
        datasets: [
            {
                label: `Total Emisi Karbon (${yearFilter})`,
                data: monthlyData,
                borderColor: '#FF7F50',
                backgroundColor: 'rgba(255, 127, 80, 0.2)',
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: true },
            tooltip: { enabled: true },
        },
        scales: {
            x: {
                grid: { display: false },
                title: { display: true, text: 'Bulan' }
            },
            y: {
                beginAtZero: true,
                title: { display: true, text: 'Total Emisi (kgCO2)' }
            },
        },
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm h-72">
            <h3 className="text-lg font-medium mb-4">Riwayat Emisi Karbon Pada Tahun {yearFilter}</h3>
            <Line data={chartData} options={options} />
        </div>
    );
};

export default HistoryChart;
