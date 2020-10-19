<template>
	<form>
		<input class="Search__input" @keyup.enter="compareTerms" placeholder="Premier terme" type="search" v-model="keyword1" />
		<input class="Search__input" @keyup.enter="compareTerms" placeholder="Second terme" type="search" v-model="keyword2" />
		<div class="radiobox">
			<label for="datepicker">Période de recherche:</label>
			<div>
				<input id="7lastday" type="radio" name="date" checked :value="$moment().subtract(11, 'days')._d" v-model="period" />
				<label for="7lastday">7 derniers jours</label>
			</div>
			<div>
				<input id="1lastmonth" type="radio" name="date" :value="$moment().subtract(1, 'month')._d" v-model="period" />
				<label for="1lastmonth">1 Mois</label>
			</div>
			<div>
				<input id="6lastmonths" type="radio" name="date" :value="$moment().subtract(6, 'months')._d" v-model="period" />
				<label for="6lastmonths">6 Mois</label>
			</div>
			<div>
				<input id="1lastyear" type="radio" name="date" :value="$moment().subtract(1, 'year')._d" v-model="period" />
				<label for="1lastyear">1 An</label>
			</div>
			<div>
				<input id="5lastyears" type="radio" name="date" :value="$moment().subtract(5, 'year')._d" v-model="period" />
				<label for="5lastyears">5 Ans</label>
			</div>
			<div>
				<input id="10lastyears" type="radio" name="date" :value="$moment().subtract(10, 'year')._d" v-model="period" />
				<label for="10lastyears">10 Ans</label>
			</div>
			<div>
				<input id="limitless" type="radio" name="date" :value="$moment().subtract(15, 'year')._d" v-model="period" />
				<label for="limitless">Pas de limite</label>
			</div>
		</div>

		<button class="Search__button" @click.prevent="compareTerms">Who's more Trendy ?</button>
	</form>
</template>

<script>
import googleTrends from "../services/googleTrends";
import { mapActions } from "vuex";
export default {
	name: "formTrends",
	data() {
		return {};
	},
	computed: {
		keyword1: {
			get() {
				return this.$store.state.keyword1;
			},
			set(value) {
				this.$store.commit("SET_KEYWORD1", value);
			},
		},
		keyword2: {
			get() {
				return this.$store.state.keyword2;
			},
			set(value) {
				this.$store.commit("SET_KEYWORD2", value);
			},
		},
		period: {
			get() {
				return this.$store.state.period;
			},
			set(value) {
				this.$store.commit("SET_PERIOD", value);
			},
		},
	},
	methods: {
		...mapActions(["setTrendsData", "setLoaded", "setErrorMessage", "setShowErrorMessage"]),
		compareTerms() {
			if (this.keyword1 && this.keyword2) {
			console.log("CompareTerms se lance ...");
				this.setLoaded(false);
				this.setShowErrorMessage (false);
				googleTrends.compare(this);
			} else {
				this.setErrorMessage("Veuillez rentrer deux termes clés valides");
				this.setShowErrorMessage(true);
			}
		},
	},
	mounted() {
		this.$store.commit("SET_PERIOD", this.$moment().subtract(11, "days")._d);
	},
};
</script>

<style></style>
