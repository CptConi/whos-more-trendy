<script>
import { Bar } from 'vue-chartjs';
export default {
    extends: Bar,
    props: {
        chartData: {
            type: Array,
            required: false,
        },
        chartLabels: {
            type: Array,
            required: true,
        },
    },
    computed: {
        keyword1: {
            get() {
                // Capitalize keyword
                let kw = this.$store.state.keyword1;
                return kw.charAt(0).toUpperCase() + kw.slice(1);
            },
        },
        keyword2: {
            get() {
                // Capitalize keyword
                let kw = this.$store.state.keyword2;
                return kw.charAt(0).toUpperCase() + kw.slice(1);
            },
        },
    },
    data() {
        return {
            options: {
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: true,
                            },
                            gridLines: {
                                display: true,
                            },
                        },
                    ],
                    xAxes: [
                        {
                            gridLines: {
                                display: false,
                            },
                        },
                    ],
                },
                legend: {
                    display: true,
                    position: 'bottom',
                },
                responsive: true,
                maintainAspectRatio: false,
            },
        };
    },
    mounted() {
        this.renderChart(
            {
                labels: this.chartLabels,
                datasets: [
                    {
                        label: this.keyword1,
                        borderColor: '#f44336',
                        borderWidth: 3,
                        pointBorderColor: '#f44336',
                        backgroundColor: '#e57373',
                        data: this.chartData[0],
                    },
                    {
                        label: this.keyword2,
                        borderColor: '#2196F3',
                        borderWidth: 3,
                        pointBorderColor: '#2196F3',
                        backgroundColor: '#64B5F6',
                        data: this.chartData[1],
                    },
                    // {
                    // 	label: "Both Keywords",
                    // 	borderColor: "#9E9E9E",
                    // 	pointBackgroundColor: "white",
                    // 	borderWidth: 2,
                    // 	pointBorderColor: "#9E9E9E",
                    // 	backgroundColor: "transparent",
                    // 	data: this.chartData[2],
                    // },
                ],
            },
            this.options
        );
    },
};
</script>

<style></style>
