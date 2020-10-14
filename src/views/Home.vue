<template>
	<div class="content">
		<div class="container">
			<div class="Search__container">
				<input class="Search__input" @keyup.enter="compareTerms" placeholder="Premier terme" type="search" name="search" v-model="keyword" />
				<input class="Search__input" @keyup.enter="compareTerms" placeholder="Second terme" type="search" name="search" v-model="keyword2" />
				<button class="Search__button" @click="compareTerms">Who's more Trendy ?</button>
			</div>
			<div class="error-message" v-if="showError">
				{{ errorMessage }}
			</div>
			<hr />
			<h1 class="title" v-if="loaded"><span class="kw1">{{ keyword }}</span> VS <span class="kw2">{{ keyword2 }}</span></h1>
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
			loaded: false,
			errorMessage: "",
			showError: false,
			trendsData: "",
			dates: "",
		};
	},
	methods: {
		compareTerms() {
			googleTrends.compare(this);
		},
	},
};
</script>

<style lang="scss">
  .kw1{
    background-color: #f44336;
    text-transform: capitalize;
    font-weight: 700;
    margin-right: 50px;
    padding: 20px 30px;
    border-radius: 10px;
    color: #F1F1F1;
    box-shadow: 0 0 10px rgba(0,0,0,0.4);
  }
  .kw2{
    background-color: #2196F3;
    text-transform: capitalize;
    font-weight: 700;
    margin-left: 50px;
    padding: 20px 30px;
    border-radius: 10px;
    color: #F1F1F1;
    box-shadow: 0 0 10px rgba(0,0,0,0.4);
  }
</style>
