<template>
    <div class="content">
        <div class="container">
            <h1 class="main-title">Who's More Trendy ??</h1>
            <FormTrends></FormTrends>
            <div class="error-message" v-if="error.showError">
                {{ error.errorMessage }}
            </div>
            <!-- <h1 class="title" v-if="chart.loaded">
                <span class="kw1">{{ keyword1 }}</span> VS <span class="kw2">{{ keyword2 }}</span>
            </h1> -->
            <div class="chart__container" v-if="chart.loaded">
                <div class="chart__content">
                    <line-chart v-if="chart.loaded" :chart-data="chart.trendsData" :chart-labels="chart.dates"></line-chart>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import lineChart from '../components/lineChart';
import FormTrends from '../components/formTrends';
import { mapState } from 'vuex';
export default {
    name: 'Home',
    components: { lineChart, FormTrends },
    data() {
        return {
            loaded: false,
            errorMessage: '',
            showError: false,
        };
    },
    computed: {
        ...mapState(['chart', 'error', 'keyword1', 'keyword2']),
    },
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap');
.main-title {
    font-family: 'Permanent Marker', sans-serif;
    font-size: 70px;
    color: white;
    text-shadow: -1px -1px 1px #000, 1px -1px 1px #000, -1px 1px 1px #000, 1px 1px 1px #000;
    transform: rotate(-3deg);
    filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.4));
  @media(max-width: 900px){
        font-size: 50px;
        margin-top: 15px;

    }
    @media(max-width: 650px){
        font-size: 36px;
        margin-top: 25px;
    }
    @media (max-width: 450px) {
        font-size: 26px;
    }

}
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

.chart {
    &__container {
        margin-top: 50px;
    }
}

canvas{
        overflow-x: hidden; 

}
</style>
