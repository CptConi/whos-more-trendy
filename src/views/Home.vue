<template>
    <div class="content">
        <div class="container">
            <h1 class="main-title">Who's More Trendy ?</h1>
            <FormTrends></FormTrends>

            <!-- <h1 class="title" v-if="chart.loaded">
                <span class="kw1">{{ keyword1 }}</span> VS <span class="kw2">{{ keyword2 }}</span>
            </h1> -->
            <div class="chart__container" v-if="chart.loaded">
                <div class="chart__content">
                    <line-chart v-if="chart.loaded" :chart-data="chart.trendsData" :chart-labels="chart.dates" :height="320"></line-chart>
                </div>
            </div>
            <div class="average__container" v-if="chart.loaded">
                <div class="average__circle average__circle--red">
                    <div class="average__value average__value--red">
                        <ICountUp :delay="delay" :endVal="averages.kw1" :options="options" @ready="onReadyRed" />
                    </div>
                </div>
                <div class="average__circle average__circle--blue">
                    <div class="average__value average__value--blue">
                        <ICountUp :delay="delay" :endVal="averages.kw2" :options="options" @ready="onReadyBlue" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import lineChart from '../components/lineChart';
import FormTrends from '../components/formTrends';
import ICountUp from 'vue-countup-v2';
import { mapState } from 'vuex';
export default {
    name: 'Home',
    components: { lineChart, FormTrends, ICountUp },
    data() {
        return {
            delay: 1000,
            options: {
                useEasing: true,
                duration: 6,
            },
        };
    },
    computed: {
        ...mapState(['chart', 'error', 'keyword1', 'keyword2', 'score', 'averages']),
    },
    methods: {
        onReadyRed(instance) {
            instance.start(this.addScore);
        },
        onReadyBlue(instance) {
            instance.start();
        },
        addScore() {
            let team;
            this.averages.kw1 > this.averages.kw2 ? (team = 'red') : (team = 'blue');
            if (team === 'red') {
                console.log('+1 pour les rouges');
            } else if (team === 'blue') {
                console.log('+1 pour les bleus');
            }
        },
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
        margin-top: 15px;
    }
    @media (max-width: 650px) {
        font-size: 38px;
        margin-top: 25px;
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
        margin-top: 50px;
    }
}

.average {
    &__container {
        display: flex;
        justify-content: space-around;
    }
    &__circle {
        width: 80px;
        height: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50px;
        color: #f1f1f1;
        font-family: 'Pacifico', sans-serif;
        &--red {
            background-color: $redTeam;
        }
        &--blue {
            background-color: $blueTeam;
        }
    }
    &__value {
        font-size: 40px;
        transform: translateY(-7%);
    }
}
</style>
