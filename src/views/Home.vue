<template>
	<div class="content">
		<div class="container">
			<div class="Search__container">
				<form>
					<input class="Search__input" @keyup.enter="compareTerms" placeholder="Premier terme" type="search" v-model="keyword" />
					<input class="Search__input" @keyup.enter="compareTerms" placeholder="Second terme" type="search" v-model="keyword2" />
					<label for="datepicker">Période de recherche:</label>
					<div class="radiobox">
						<div>
							<input id="7lastday" type="radio" name="date" value="1" v-model="datepicker"/>
							<label for="7lastday">7 derniers jours</label>
						</div>
						<div>
							<input id="1lastmonth" type="radio" name="date" value="2" v-model="datepicker"/>
							<label for="1lastmonth">1 Mois</label>
						</div>
						<div>
							<input id="6lastmonths" type="radio" name="date" value="3" v-model="datepicker"/>
							<label for="6lastmonths">6 Mois</label>
						</div>
						<div>
							<input id="1lastyear" type="radio" name="date" value="4" v-model="datepicker"/>
							<label for="1lastyear">1 An</label>
						</div>
						<div>
							<input id="5lastyears" type="radio" name="date" value="5" v-model="datepicker"/>
							<label for="5lastyears">5 Ans</label>
						</div>
						<div>
							<input id="10lastyears" type="radio" name="date" value="6" v-model="datepicker"/>
							<label for="10lastyears">10 Ans</label>
						</div>
						<div>
							<input id="limitless" type="radio" name="date" value="7" v-model="datepicker"/>
							<label for="limitless">Pas de limite</label>
						</div>
					</div>

					<button class="Search__button" @click.prevent="compareTerms">Who's more Trendy ?</button>
				</form>
			</div>
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
import googleTrends from "../services/googleTrends";
import lineChart from "../components/lineChart";
export default {
	name: "Home",
	components: { lineChart },
	data() {
		return {
			keyword: "",
			keyword2: "",
			datepicker: "1",
			loaded: false,
			errorMessage: "",
			showError: false,
			trendsData: "",
		};
	},
	computed: {
		period() {
			switch (this.datepicker) {
				case '1':
					return this.$moment().subtract(11,  "days")._d;
				case '2':
					return this.$moment().subtract(1,  "month")._d;
				case '3':
					return this.$moment().subtract(6,  "months")._d;
				case '4':
					return this.$moment().subtract(1,  "year")._d;
				case '5':
					return this.$moment().subtract(5,  "year")._d;
				case '6':
					return this.$moment().subtract(10,  "year")._d;
				case '7':
					return this.$moment().subtract(15,  "year")._d;
				default:
					return 'no date';
			}
		},
	},
	methods: {
		compareTerms() {
			if (this.keyword && this.keyword2 && this.datepicker) {
				this.loaded = false;
				this.showError = false;
				googleTrends.compare(this);
			} else {
				this.errorMessage = "Veuillez rentrer deux termes clés valides";
				this.showError = true;
			}
		},
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
