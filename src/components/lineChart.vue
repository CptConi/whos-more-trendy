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
                                display: false,
                            },
                            gridLines: {
                                display: true,
                            },
                        },
                    ],
                    xAxes: [
                        {
                            ticks: {
                                autoSkip: true,
                                maxRotation: 0,
                                minRotation: 0,
                            },
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
                        backgroundColor: 'rgba(244, 67, 54, 0.5)',
                        data: this.chartData[0],
                    },
                    {
                        label: this.keyword2,
                        borderColor: '#2196F3',
                        borderWidth: 3,
                        pointBorderColor: '#2196F3',
                        backgroundColor: 'rgba(33, 150, 243, 0.5)',
                        data: this.chartData[1],
                    },
                ],
            },
            this.options
        );
    },
};
</script>

<style></style>
