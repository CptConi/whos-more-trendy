<template>
    <div class="content" :style='getStyle'>
        <h1 class="main-title">Who's More Trendy ?</h1>
        <FormTrends></FormTrends>
        <Help></Help>
        <transition name="fade-long">
            <Averages></Averages>
        </transition>
        <transition name="fade-short">
            <div class="chart__container" v-if="chart.loaded">
                <line-chart
                    v-if="chart.loaded"
                    :chart-data="chart.trendsData"
                    :chart-labels="chart.dates"
                    :height="chartHeight"
                ></line-chart>
            </div>
        </transition>
        <transition name="fade-short"><Score v-if="score.visible"></Score></transition>
    </div>
</template>

<script>
import lineChart from '../components/lineChart';
import FormTrends from '../components/formTrends';
import Help from '../components/help';
import Score from '../components/score';
import Averages from '../components/averages';
import ThemeManager from '../services/theme';
import { mapState } from 'vuex';
export default {
    name: 'Home',
    components: { lineChart, FormTrends, Score, Averages, Help },
    data() {
        return {};
    },
    computed: {
        ...mapState(['chart', 'error', 'keyword1', 'keyword2', 'score', 'theme']),
        chartHeight() {
            if (document.body.clientWidth > 1200) {
                return 300;
            } else if (document.body.clientWidth < 1200 && document.body.clientWidth > 900) {
                return 260;
            } else if (document.body.clientWidth < 900 && document.body.clientWidth > 650) {
                return 220;
            } else if (document.body.clientWidth < 650 && document.body.clientWidth > 450) {
                return 190;
            } else if (document.body.clientWidth < 450) {
                return 150;
            }
            return 300;
        },
        getStyle() {
            return ThemeManager.getStyle(this);
        },
        appTheme() {
            return ThemeManager.appTheme(this);
        },
    },
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');

.main-title {
    font-family: 'Pacifico', cursive;
    font-size: 70px;
    color: var(--app-font-color);
    text-shadow: 0 0 5px var(--app-shadow-color);
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
.chart {
    &__container {
        margin: 0px auto 0;
        padding-bottom: 100px;
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
