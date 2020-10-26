<template>
    <div>
        <form>
            <div class="input-container">
                <input
                    class="search__input"
                    @keyup.enter="compareTerms"
                    placeholder="Premier terme"
                    onfocus="this.placeholder = ''"
                    onblur="this.placeholder = 'Premier terme'"
                    type="search"
                    v-model="keyword1"
                />
                <input
                    class="search__input"
                    @keyup.enter="compareTerms"
                    placeholder="Second terme"
                    onfocus="this.placeholder = ''"
                    onblur="this.placeholder = 'Second terme'"
                    type="search"
                    v-model="keyword2"
                />
            </div>
            <div class="range__container">
                <label for="datepicker" class="range__title">Période de recherche:</label>
                <div class="range__periode">{{ datepickerText }}</div>
                <input class="range__datepicker" type="range" min="1" max="7" step="1" id="datepicker" value="1" v-model="datepickerValue" />
            </div>
            <div class="error-message" v-if="error.showError">
                {{ error.errorMessage }}
            </div>
            <Settings></Settings>
            <transition name="load">
                <button class="search__button" @click.prevent="compareTerms" v-if="!chart.loading">Who's more Trendy ?</button>
                <button class="search__button--loading" v-else>
                    <i class="fa fa-circle-o-notch fa-spin"></i>
                </button>
            </transition>
        </form>
    </div>
</template>

<script>
import googleTrends from '../services/googleTrends';
import Utils from '../services/utils';
import Settings from '../components/settings'
import { mapActions } from 'vuex';
export default {
    name: 'formTrends',
    components:{Settings},
    data() {
        return {
            datepickerValue: '1',
            datepickerText: '1 Semaine',
            colorPicker: '',
        };
    },
    computed: {
        keyword1: {
            get() {
                return this.$store.state.keyword1;
            },
            set(value) {
                this.$store.commit('SET_KEYWORD1', value);
            },
        },
        keyword2: {
            get() {
                return this.$store.state.keyword2;
            },
            set(value) {
                this.$store.commit('SET_KEYWORD2', value);
            },
        },
        period: {
            get() {
                return this.$store.state.period;
            },
            set(value) {
                this.$store.commit('SET_PERIOD', value);
            },
        },
        error: {
            get() {
                return this.$store.state.error;
            },
        },
        chart: {
            get() {
                return this.$store.state.chart;
            },
        },
        winner: {
            get() {
                return this.$store.state.winner;
            },
        },
        theme: {
            get(){
                return this.$store.theme;
            }
        },
    },
    watch: {
        datepickerValue() {
            switch (this.datepickerValue) {
                case '1':
                    this.period = this.$moment().subtract(10, 'days')._d;
                    this.datepickerText = '1 Semaine';
                    break;
                case '2':
                    this.period = this.$moment().subtract(1, 'month')._d;
                    this.datepickerText = '1 Mois';
                    break;
                case '3':
                    this.period = this.$moment().subtract(6, 'month')._d;
                    this.datepickerText = '6 Mois';
                    break;
                case '4':
                    this.period = this.$moment().subtract(1, 'year')._d;
                    this.datepickerText = '1 An';
                    break;
                case '5':
                    this.period = this.$moment().subtract(5, 'year')._d;
                    this.datepickerText = '5 Ans';
                    break;
                case '6':
                    this.period = this.$moment().subtract(10, 'year')._d;
                    this.datepickerText = '10 Ans';
                    break;
                case '7':
                    this.period = this.$moment().subtract(15, 'year')._d;
                    this.datepickerText = 'Pas de limite';
                    break;
                default:
                    this.period = this.$moment().subtract(15, 'year')._d;
                    this.datepickerText = 'Pas de limite';
                    break;
            }
        },
    },
    methods: {
        ...mapActions([
            'setTrendsData',
            'setLoaded',
            'setErrorMessage',
            'setShowErrorMessage',
            'setDates',
            'setAverages',
            'setLoading',
            'setWinner',
            'SetScoreVisibility',
        ]),

        compareTerms() {
            if (this.keyword1 && this.keyword2) {
                // Set / Reset loading layout
                this.setLoading(true);
                this.setLoaded(false);
                this.setShowErrorMessage(false);
                this.resetAnimations();
                googleTrends.compare(this);
                this.SetScoreVisibility(true);
            } else {
                this.setErrorMessage('Veuillez rentrer deux termes clés valides');
                this.setShowErrorMessage(true);
            }
        },
        getAverage(pArray) {
            return Utils.average(pArray);
        },
        setKeywordsAverage(pArray1, pArray2) {
            this.setAverages({ avg1: this.getAverage(pArray1), avg2: this.getAverage(pArray2) });
        },
        resetAnimations() {
            this.setWinner('');
        },
    },
    mounted() {
        this.$store.commit('SET_PERIOD', this.$moment().subtract(10, 'days')._d);
        let focus = document.querySelector('.search__input');
        focus.focus();
        focus.select();
    },
};
</script>

<style lang="scss">
form {
    margin: 20px auto;
    border: 1px solid #ccc;
    border-radius: 12px;
    background-color: #546e7a;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 1100px;
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

.input-container {
    margin: 30px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    & .search__input {
        width: 40%;
        height: 60px;
        border: none;
        outline: none;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
        text-align: center;
        text-transform: capitalize;
        font-size: 22px;
        color: #f5f5f5;
        transform: all 0.2s ease;
        &::-webkit-search-cancel-button {
            position: relative;
            right: 20px;
            cursor: pointer;
        }
        &:nth-child(1) {
            margin-right: 2%;
            background-color: #f44336;
            &::placeholder {
                color: #ddd;
                font-size: 22px;
            }
            &:focus {
                box-shadow: 0 0 20px #f44336;
            }
            &:hover {
                transform: scale(1.02);
            }
            @media (max-width: 650px) {
                margin: auto;
                width: 380px;
                margin-bottom: 8px;
            }
            @media (max-width: 450px) {
                width: 270px;
            }
        }
        &:nth-child(2) {
            margin-left: 2%;
            background-color: #2196f3;
            &::placeholder {
                color: #ddd;
                font-size: 22px;
            }
            &:focus {
                box-shadow: 0 0 20px #2196f3;
            }
            &:hover {
                transform: scale(1.02);
            }
            @media (max-width: 650px) {
                margin: auto;
                width: 380px;
            }
            @media (max-width: 450px) {
                width: 270px;
            }
        }
    }
    @media (max-width: 650px) {
        flex-direction: column;
    }
}

.range {
    &__container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 10px 10px;
        margin: 30px 110px 10px;
        border-radius: 12px;
        background: linear-gradient(145deg, #4c636e, #5a7683);
        box-shadow: 10px 10px 30px #475e68, -10px -10px 30px #617f8c;
        @media (max-width: 650px) {
            margin: 30px 40px 10px;
        }
        @media (max-width: 450px) {
            margin: 30px 25px 10px;
        }
    }
    &__title {
        margin: 10px 0 5px;
        font-size: 18px;
        color: #f1f1f1;
    }
    &__datepicker {
        width: 75%;
        cursor: pointer;
        background-color: transparent;
    }
    &__periode {
        font-size: 14px;
        margin-bottom: 15px;
        color: #ccc;
    }
}

.search__button {
    transform: translateY(50%);
    width: 350px;
    height: 60px;
    cursor: pointer;
    border: none;
    outline: none;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    border-radius: 20px;
    color: #f1f1f1;
    background-color: #47498a;
    font-size: 25px;
    text-transform: capitalize;
    transition: all 0.3s ease;
    &:hover {
        transform: perspective(200px) translate3d(0, 30%, 30px) rotate(-2deg);
        box-shadow: 7px 7px 10px rgba(58, 42, 42, 0.3);
        transform-origin: center;
        @media (max-width: 650px) {
            transform: perspective(200px) translate3d(0, 30%, 20px) rotate(-2deg);
        }
        @media (max-width: 450px) {
            transform: perspective(200px) translate3d(0, 20%, 10px) rotate(-1deg);
        }
    }
    &--loading {
        transform: translateY(50%);
        width: 60px;
        height: 60px;
        cursor: pointer;
        border: none;
        outline: none;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        border-radius: 20px;
        color: #f1f1f1;
        background-color: #47498a;
        font-size: 25px;
        transition: transform 0.3s ease;
    }
    @media (max-width: 650px) {
        width: 240px;
        height: 50px;
        font-size: 20px;
    }
    @media (max-width: 450px) {
        width: 200px;
        font-size: 18px;
    }
}
</style>
