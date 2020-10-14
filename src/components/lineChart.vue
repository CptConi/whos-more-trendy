<script>
import { Bar } from "vue-chartjs";
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
                    position:'bottom'
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
						label: "Keyword 1",
						borderColor: "#f44336",
						// borderWidth: 1,
						pointBorderColor: "#f44336",
						backgroundColor: "#f44336",
						data: this.chartData[0],
					},
					{
						label: "Keyword 2",
						borderColor: "#2196F3",
						borderWidth: 2,
						pointBorderColor: "#2196F3",
						backgroundColor: "#2196F3",
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
