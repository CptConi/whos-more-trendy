<template>
    <div>
        <div class="score__container">
            <h3>Score</h3>
            <div class="score__box">
                <div class="score__panel score__panel--red">
                    <span class="score__value score__value--red">{{ score.red }}</span>
                </div>
                <div class="score__panel score__panel--blue">
                    <span class="score__value score__value--blue">{{ score.blue }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: 'Score',
    computed: {
        ...mapState(['score']),
    },
};
</script>

<style lang="scss">
.score__container {
    & h3 {
        position: absolute;
        top: -33px;
        left: 50%;
        height: 40px;
        transform: translatex(-50%);
        font-size: 28px;
        font-family: 'Pacifico', sans-serif;
        color: var(--app-font-color);
        background: linear-gradient(to top, var(--app-secondary-color) 17%, transparent 17%);
        padding: 0 22px;
        border-radius: 12px;
    }

    position: fixed;
    bottom: 1.5%;
    left: calc(50% - 150px);
    width: 300px;
    height: 50px;
    background-color: var(--app-primary-color);
    border-radius: 12px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.7);
    @media (max-width: 1250px) {
        width: 220px;
        left: calc(50% - 110px);
    }
    @media (max-width: 900px) {
        height: 45px;
    }
    @media (max-width: 750px) {
        width: 220px;
        left: calc(50% - 110px);
        margin: 10px 0;
    }
    & .score__box {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    & .score__panel {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100px;
        height: 50px;
        &--red {
            border-radius: 12px 0px 0 12px;
            background: linear-gradient(to right, var(--team1-color) 60%, transparent);
            @media (max-width: 900px) {
                height: 45px;
            }
        }
        &--blue {
            border-radius: 0 12px 12px 0;
            background: linear-gradient(to left, var(--team2-color) 60%, transparent);
            @media (max-width: 900px) {
                height: 45px;
            }
        }
    }
    & .score__value {
        font-size: 34px;
        font-weight: 900;
        &--red {
            color: var(--team1-font);
            text-align: left;
        }
        &--blue {
            color: var(--team2-font);
            text-align: right;
        }
        @media (max-width: 900px) {
            font-size: 30px;
        }
        @media (max-width: 750px) {
            font-size: 26px;
        }
    }
}
</style>
