<template>
    <div class="content">
        <div class="container">
            <h1 class="main-title">Who's More Trendy ?</h1>
            <FormTrends></FormTrends>
            <div class="chart__container" v-if="chart.loaded">
                <div class="chart__content">
                    <line-chart v-if="chart.loaded" :chart-data="chart.trendsData" :chart-labels="chart.dates" :height="320"></line-chart>
                </div>
            </div>
            <div class="average__container" v-if="chart.loaded">
                <div class="average__circle average__circle--red" :class="kw1AvgAnim">
                    <div class="average__value average__value--red">
                        <ICountUp :delay="delay" :endVal="averages.kw1" :options="options" @ready="onReadyRed" />
                        <transition name="fade-score">
                            <div class="score score--red" v-if="kw1AvgAnim === 'winner--red'">
                                {{ '+' + (averages.kw1 - averages.kw2) }}
                            </div>
                        </transition>
                    </div>
                </div>
                <div class="average__circle average__circle--blue" :class="kw2AvgAnim">
                    <div class="average__value average__value--blue">
                        <ICountUp :delay="delay" :endVal="averages.kw2" :options="options" @ready="onReadyBlue" />
                        <transition name="fade-score">
                            <div class="score score--blue" v-if="kw2AvgAnim === 'winner--blue'">
                                {{ '+' + (averages.kw2 - averages.kw1) }}
                            </div>
                        </transition>
                    </div>
                </div>
            </div>
        </div>
        <score></score>
    </div>
</template>

<script>
import lineChart from '../components/lineChart';
import FormTrends from '../components/formTrends';
import Score from '../components/score';
import ICountUp from 'vue-countup-v2';
import { mapState, mapActions } from 'vuex';
export default {
    name: 'Home',
    components: { lineChart, FormTrends, ICountUp, Score },
    data() {
        return {
            delay: 1000,
            options: {
                useEasing: true,
                duration: 5,
            },
        };
    },
    computed: {
        ...mapState(['chart', 'error', 'keyword1', 'keyword2', 'score', 'averages', 'winner', 'score']),
        kw1AvgAnim() {
            let anim = 'none';
            if (this.winner === 'red') {
                anim = 'winner--red';
            }
            return anim;
        },
        kw2AvgAnim() {
            let anim = 'none';
            if (this.winner === 'blue') {
                anim = 'winner--blue';
            }
            return anim;
        },
    },
    methods: {
        ...mapActions(['setScore', 'setWinner', 'addToScore']),
        onReadyRed(instance) {
            instance.start(this.addScore);
        },
        onReadyBlue(instance) {
            instance.start();
        },
        addScore() {
            // Red team wins
            if (this.averages.kw1 > this.averages.kw2) {
                this.setWinner('red');
                let pointsToAdd = this.averages.kw1 - this.averages.kw2;
                let teamWins = { team: 'red', score: pointsToAdd };
                this.addToScore(teamWins);
                // Blue team wins
            } else if (this.averages.kw1 < this.averages.kw2) {
                this.setWinner('blue');
                let pointsToAdd = this.averages.kw2 - this.averages.kw1;
                let teamWins = { team: 'blue', score: pointsToAdd };
                this.addToScore(teamWins);
                // Draw
            } else if (this.averages.kw1 == this.averages.kw2) {
                this.addToScore({ team: 'red', score: 0 });
                this.addToScore({ team: 'blue', score: 0 });
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
            box-shadow: 0 0 0 1px $redTeam;
        }
        &--blue {
            background-color: $blueTeam;
            box-shadow: 0 0 0 1px $blueTeam;
        }
        @media(max-width: 900px){
            width: 65px;
            height: 65px;
        }
        @media (max-width: 750px) {
            width: 50px;
            height: 50px;
        }
    }
    &__value {
        font-size: 40px;
        transform: translateY(-7%);
        @media(max-width: 900px){
            font-size: 32px;
        }
        @media (max-width: 750px) {
            font-size: 28px;
        }

    }
}
.winner--red {
    animation: pulse-red 1.4s ease-out infinite;
}
.winner--blue {
    animation: pulse-blue 1.4s ease-out infinite;
}

@keyframes pulse-red {
    to {
        box-shadow: 0 0 0 8px rgba(244, 67, 54, 0.01);
    }
}
@keyframes pulse-blue {
    to {
        box-shadow: 0 0 0 8px rgba(33, 150, 243, 0.01);
    }
}

.score {
    position: absolute;
    color: green;
    top: -30px;
    font-size: 26px;
    opacity: 0;
    &--red {
        left: 70px;
        @media(max-width: 900px){
        left: 60px;
        }
    }
    &--blue {
        right: 70px;
        @media(max-width: 900px){
        right: 60px;
        }
    }
}

.fade-score-enter-active {
    transition: all ease-out 4s;
    opacity: 0;
}

.fade-score-enter {
    opacity: 1;
    transform: translateY(50px);
}
</style>
