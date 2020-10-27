<script>
import { Bar } from 'vue-chartjs';
import Utils from '../services/utils';
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
        theme: {
            get() {
                return this.$store.state.theme;
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
                        borderColor: `${this.theme.team1}`,
                        borderWidth: 3,
                        pointBorderColor: `${this.theme.team1}`,
                        backgroundColor: `rgba(${Utils.hexToRgb(this.theme.team1).r}, ${Utils.hexToRgb(this.theme.team1).g}, ${
                            Utils.hexToRgb(this.theme.team1).b
                        }, 0.5)`,
                        data: this.chartData[0],
                    },
                    {
                        label: this.keyword2,
                        borderColor: `${this.theme.team2}`,
                        borderWidth: 3,
                        pointBorderColor: `${this.theme.team2}`,
                        backgroundColor: `rgba(${Utils.hexToRgb(this.theme.team2).r}, ${Utils.hexToRgb(this.theme.team2).g}, ${
                            Utils.hexToRgb(this.theme.team2).b
                        }, 0.5)`,
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
