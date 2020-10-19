<template>
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
        <div class="range-container">
            <label for="datepicker">Période de recherche:</label>
            <input class="datepicker" type="range" min="1" max="7" step="1" id="datepicker" value="1" v-model="datepickerValue" />
            <div>{{ datepickerText }}</div>
        </div>
        

        <button class="Search__button" @click.prevent="compareTerms">Who's more Trendy ?</button>
    </form>
</template>

<script>
import googleTrends from '../services/googleTrends';
import { mapActions } from 'vuex';
export default {
    name: 'formTrends',
    data() {
        return {
            datepickerValue: '1',
            datepickerText: '1 Semaine',
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
        ...mapActions(['setTrendsData', 'setLoaded', 'setErrorMessage', 'setShowErrorMessage', 'setDates']),
        compareTerms() {
            if (this.keyword1 && this.keyword2) {
                console.log('CompareTerms se lance ...');
                this.setLoaded(false);
                this.setShowErrorMessage(false);
                googleTrends.compare(this);
            } else {
                this.setErrorMessage('Veuillez rentrer deux termes clés valides');
                this.setShowErrorMessage(true);
            }
        },
    },
    mounted() {
        this.$store.commit('SET_PERIOD', this.$moment().subtract(10, 'days')._d);
    },
};
</script>
<style lang="scss">
.range-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    & .datepicker {
        width: 75%;
    }
}

.input-container {
    margin: 30px 0;
    display: flex;
    justify-content: space-around;
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
        &:nth-child(1) {
            margin-left: 50px;
            background-color: #f44336;
            &::placeholder {
                color: #ddd;
                font-size: 22px;
            }
            &:focus,
            ::placeholder {
                content: '';
            }
        }
        &:nth-child(2) {
            margin-right: 50px;
            background-color: #2196f3;
            &::placeholder {
                color: #ddd;
                font-size: 22px;
            }
        }
    }
}
</style>
