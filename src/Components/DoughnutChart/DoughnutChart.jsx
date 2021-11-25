import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, ToolTip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Legend);

const DoughnutChart = (props) => {
    const data = {

        datasets: [
            {
                label: '# of Votes',
                data: [props.myRate, 100 - props.myRate],
                backgroundColor: [
                    'rgba(7, 109, 243, 1)',
                    'rgba(255, 255, 255, 1)',
                ],
                borderColor: [
                    'rgba(7, 109, 243, 1)',
                    'rgba(255, 255, 255, 1)',
                ],
                borderWidth: 0,
            },
        ],
    };

    const plugins = [{
        beforeDraw: function (chart) {
            var width = chart.width,
                height = chart.height,
                ctx = chart.ctx;
            ctx.restore();
            var fontSize = (height / 160).toFixed(2);
            ctx.font = fontSize + "em sans-serif";
            ctx.textBaseline = "top";
            var text = props.myRate + "%",
                textX = Math.round((width - ctx.measureText(text).width) / 2),
                textY = height / 2;
            ctx.fillText(text, textX, textY);
            ctx.save();
        }
    }]

    return (
        <Doughnut
            data={data}
            options={{
                responsive: true,
                maintainAspectRatio: false,
                hover: false
            }}
            plugins={plugins}
        >
        </Doughnut>
    )
}

export default DoughnutChart;