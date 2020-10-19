<template>
	<div class="content">
		<div class="container">
			<FormTrends></FormTrends>
			<div class="error-message" v-if="showError">
				{{ errorMessage }}
			</div>
			<hr />
			<h1 class="title" v-if="loaded">
				<span class="kw1">{{ keyword }}</span> VS <span class="kw2">{{ keyword2 }}</span>
			</h1>
			<div class="Chart__container" v-if="loaded">
				<div class="Chart__title">
					<hr />
				</div>
				<div class="Chart__content">
					<line-chart v-if="loaded" :chart-data="trendsData" :chart-labels="dates"></line-chart>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import lineChart from "../components/lineChart";
import FormTrends from "../components/formTrends";
export default {
	name: "Home",
	components: { lineChart, FormTrends },
	data() {
		return {
			loaded: false,
			errorMessage: "",
			showError: false,
			trendsData: "",
		};
	},
};
</script>

<style lang="scss">
.kw1 {
	background-color: #f44336;
	text-transform: capitalize;
	font-weight: 700;
	margin-right: 50px;
	padding: 20px 30px;
	border-radius: 10px;
	color: #f1f1f1;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
}
.kw2 {
	background-color: #2196f3;
	text-transform: capitalize;
	font-weight: 700;
	margin-left: 50px;
	padding: 20px 30px;
	border-radius: 10px;
	color: #f1f1f1;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
}
</style>
