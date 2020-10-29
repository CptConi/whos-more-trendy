<template>
    <div>
        <form>
            <div class="input-container">
                <div class="input-group --red" :class="input1Filled">
                    <label class="label label--red" for="kw-red">Equipe 1</label>
                    <input
                        id="kw-red"
                        class="search__input search__input--red"
                        @keyup.enter="compareTerms"
                        type="search"
                        v-model="keyword1"
                    />
                </div>
                <div class="input-group --blue" :class="input2Filled">
                    <label class="label label--blue" for="kw-blue">Equipe 2</label>
                    <input
                        id="kw-blue"
                        class="search__input search__input--blue"
                        @keyup.enter="compareTerms"
                        type="search"
                        v-model="keyword2"
                    />
                </div>
            </div>
            <div class="range__container">
                <label for="datepicker" class="range__title">Période de recherche:</label>
                <div class="range__periode">{{ datepickerText }}</div>
                <input
                    class="range__datepicker"
                    type="range"
                    min="1"
                    max="7"
                    step="1"
                    id="datepicker"
                    value="1"
                    v-model="datepickerValue"
                />
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
import Settings from '../components/settings';
import { mapActions } from 'vuex';
export default {
    name: 'formTrends',
    components: { Settings },
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
            get() {
                return this.$store.state.theme;
            },
        },
        input1Filled() {
            if (this.keyword1 != '') {
                return 'filled';
            } else {
                return null;
            }
        },
        input2Filled() {
            if (this.keyword2 != '') {
                return 'filled';
            } else {
                return null;
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
    },
};
</script>

<style lang="scss">
form {
    margin: 20px auto;
    border: 1px solid #ccc;
    border-radius: 12px;
    background-color: var(--app-primary-color);
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
.input-group {
    position: relative;
    & label {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: var(--app-placeholder-color);
    }
    &:focus-within .label,
    &.filled .label{
        top: -12px;
        font-weight: 700;
        transform: translate(0, -50%);
        &--red {
            left: 10px;
            color: var(--team1-color);
        }
        &--blue {
            left: calc(2% + 10px);
            color: var(--team2-color);
            @media(max-width:650px){
                left: 10px;
            }
        }
    }
}

.input-container {
    margin: 35px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    & .search__input {
        display: block;
        width: 460px;
        height: 60px;
        outline: none;
        border-radius: 5px;
        background-color: var(--app-secondary-color);
        text-align: center;
        text-transform: capitalize;
        font-size: 22px;
        &::-webkit-search-cancel-button {
            position: relative;
            right: 20px;
            cursor: pointer;
        }
        &--red {
            margin-right: 2%;
            border: 1px solid var(--team1-color);
            color: var(--app-font-color);
            transition: border 0.2s linear;
            &:focus {
                border-bottom: 3px solid var(--team1-color);
                border-top: 3px solid transparent;
                border-right: 3px solid transparent;
                border-left: 3px solid transparent;
                border-radius: 5px 5px 0 0;
            }
        }
        &--blue {
            margin-left: 2%;
            border: 1px solid var(--team2-color);
            color: var(--app-font-color);
            transition: border 0.2s linear;
            &:focus {
                border: 3px solid var(--team2-color);
                border-top: 3px solid transparent;
                border-right: 3px solid transparent;
                border-left: 3px solid transparent;
                border-radius: 5px 5px 0 0;
            }
        }
        @media(max-width: 1200px){
            width: 340px;
        }
        @media(max-width: 900px){
            width: 250px;
        }
        @media(max-width: 650px){
            margin: auto;
            width: 350px;
        }
        @media(max-width: 450px){
            width: 250px;
        }


    }
    @media (max-width: 650px) {
        height: 150px;
        flex-direction: column;
        justify-content: space-between;
    }
}

.range {
    &__container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 10px 10px 20px;
        margin: 30px 110px 10px;
        border-radius: 12px;
        border: 1px solid var(--app-secondary-color);
        color: var(--app-font-color);
        background: linear-gradient(145deg, var(--app-primary-color), var(--app-secondary-color));
        box-shadow: 0 0 40px var(--app-shadow-color);
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
    }
    &__datepicker {
        width: 75%;
        cursor: pointer;
        background-color: transparent;
    }
    &__periode {
        font-size: 14px;
        margin-bottom: 15px;
    }
}

.search__button {
    transform: translateY(50%);
    width: 350px;
    height: 60px;
    cursor: pointer;
    border: none;
    outline: none;
    box-shadow: 1px 1px 10px -3px var(--team1-color), -1px -1px 10px -3px var(--team2-color);
    border-radius: 20px;
    color: var(--app-font-color);
    background-color: var(--app-shadow-color);
    font-size: 25px;
    text-transform: capitalize;
    transition: all 0.3s ease;
    &:hover {
        transform: perspective(200px) translate3d(0, 30%, 30px) rotate(-2deg);
        box-shadow: 6px 4px 15px -3px var(--team1-color), 3px -4px 15px -3px var(--team2-color);
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
        box-shadow: 3px 3px 10px -3px var(--team1-color), -3px -3px 10px -3px var(--team2-color);
        border-radius: 20px;
        color: var(--app-font-color);
        background: linear-gradient(160deg, var(--team1-color), var(--team2-color));
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
