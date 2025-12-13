// frontend/js/charts.js

document.addEventListener('DOMContentLoaded', () => {

    // Check if chart element exists to prevent errors on other pages
    const savingsChartCanvas = document.getElementById('savingsChart');
    const inflationChartCanvas = document.getElementById('inflationChart');

    if (savingsChartCanvas && inflationChartCanvas) {

        // Chart 1: Solar vs Grid Cost
        const ctx1 = savingsChartCanvas.getContext('2d');
        new Chart(ctx1, {
            type: 'bar',
            data: {
                labels: ['Year 1', 'Year 5', 'Year 10', 'Year 15', 'Year 20'],
                datasets: [
                    {
                        label: 'Cost with Grid (No Solar)',
                        data: [540000, 850000, 1300000, 2100000, 3200000],
                        backgroundColor: '#e74c3c' // Red for Expense
                    },
                    {
                        label: 'Cost with Solar',
                        data: [40000, 55000, 70000, 90000, 120000],
                        backgroundColor: '#2ecc71' // Green for Savings
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: { legend: { position: 'bottom' } }
            }
        });

        // Chart 2: Unit Price Inflation
        const ctx2 = inflationChartCanvas.getContext('2d');
        new Chart(ctx2, {
            type: 'line',
            data: {
                labels: ['2023', '2024', '2025', '2026', '2027'],
                datasets: [{
                    label: 'Grid Unit Price (PKR)',
                    data: [45, 58, 65, 78, 90], // Rising trend
                    borderColor: '#f39c12',
                    backgroundColor: 'rgba(243, 156, 18, 0.1)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                plugins: { legend: { display: false } }
            }
        });
    }
});