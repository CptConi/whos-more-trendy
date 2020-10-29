<template>
    <div>
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
</template>

<script>
import ICountUp from 'vue-countup-v2';
import { mapState, mapActions } from 'vuex';
export default {
    name: 'Averages',
    components: { ICountUp },
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
        ...mapState(['chart', 'averages', 'winner', 'theme']),
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
        ...mapActions(['setWinner', 'addToScore']),
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
.average {
    &__container {
        display: flex;
        justify-content: space-around;
        margin-bottom: 50px;
    }
    &__circle {
        width: 80px;
        height: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50px;
        color: var(--app-font-color);
        &--red {
            background-color: var(--team1-color);
            box-shadow: 0 0 0 1px var(--team1-color);
        }
        &--blue {
            background-color: var(--team2-color);
            box-shadow: 0 0 0 1px var(--team2-color);
        }
        font-family: 'Pacifico', sans-serif;
        @media (max-width: 900px) {
            width: 65px;
            height: 65px;
        }
        @media (max-width: 750px) {
            width: 50px;
            height: 50px;
            margin: 15px auto 60px;
        }
        @media (max-width: 450px) {
            margin: 15px auto 60px;
        }
    }
    &__value {
        font-size: 40px;
        transform: translateY(-7%);
        &--red {
            color: var(--team1-font);
        }
        &--blue {
            color: var(--team2-font);
        }
        @media (max-width: 900px) {
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
        @media (max-width: 900px) {
            left: 60px;
        }
        @media (max-width: 750px) {
            left: 50px;
        }
        @media (max-width: 650px) {
            left: 50px;
            top: -10px;
            font-size: 20px;
        }
    }
    &--blue {
        right: 70px;
        @media (max-width: 900px) {
            right: 60px;
        }
        @media (max-width: 750px) {
            right: 50px;
        }
        @media (max-width: 650px) {
            right: 50px;
            top: -10px;
            font-size: 20px;
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
    @media (max-width: 650px) {
        transform: translateY(25px);
    }
}
</style>
