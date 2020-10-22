<template>
    <div class="content">
        <div class="container">
            <h1 class="main-title">Who's More Trendy ?</h1>
            <FormTrends></FormTrends>
            <transition name="fade-short">
                <div class="chart__container" v-if="chart.loaded">
                    <div class="chart__content">
                        <line-chart v-if="chart.loaded" :chart-data="chart.trendsData" :chart-labels="chart.dates" :height="320"></line-chart>
                    </div>
                </div>
            </transition>
            <transition name="fade-long">
                <Averages></Averages>
            </transition>
        </div>
        <Score v-if="score.visible"></Score>
    </div>
</template>

<script>
import lineChart from '../components/lineChart';
import FormTrends from '../components/formTrends';
import Score from '../components/score';
import Averages from '../components/averages';
import { mapState } from 'vuex';
export default {
    name: 'Home',
    components: { lineChart, FormTrends, Score, Averages },
    data() {
        return {
            
        };
    },
    computed: {
        ...mapState(['chart', 'error', 'keyword1', 'keyword2', 'score']),
        
    },
    
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');
$redTeam: #f44336;
$blueTeam: #2196f3;

.main-title {
    font-family: 'Pacifico', cursive;
    font-size: 70px;
    color: Black;
    filter: drop-shadow(0 0 3px 3px white);
    font-weight: 200;
    transform: translateY(30px);

    @media (max-width: 900px) {
        font-size: 50px;
    }
    @media (max-width: 650px) {
        font-size: 38px;
        transform: translateY(28px);
    }
    @media (max-width: 450px) {
        font-size: 32px;
        transform: translateY(25px);
    }
}
.kw1 {
    background-color: $redTeam;
    text-transform: capitalize;
    font-weight: 700;
    margin-right: 50px;
    padding: 20px 30px;
    border-radius: 10px;
    color: #f1f1f1;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
}
.kw2 {
    background-color: $blueTeam;
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
        margin: 70px auto 0;
        width: 1190px;
        @media (max-width: 1200px) {
            width: 800px;
        }
        @media (max-width: 900px) {
            width: 600px;
        }
        @media (max-width: 650px) {
            width: 420px;
        }
        @media (max-width: 450px) {
            width: 300px;
        }
    }
}







.fade-long-enter-active {
    transition: all ease 3s;
}

.fade-long-enter {
    opacity: 0;
}
.fade-short-enter-active {
    transition: all ease 0.5s;
}

.fade-short-enter {
    opacity: 0;
}
</style>
