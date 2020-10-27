<template>
    <div class="settings__container">
        <button id="showSettings" @click.prevent="showSettingsPanel">
            <img class="showSettings--img" src="../assets/palette.svg" alt="painting palette" />
        </button>
        <transition name="settings-transition">
            <div v-if="isVisible" class="settings__panel">
                <div class="settings__panel--theme">
                    <toggle-button
                        :color="{ checked: '#673AB7', unchecked: '#E0E0E0' }"
                        :width="70"
                        :height="30"
                        v-model="appTheme"
                    ></toggle-button>
                </div>
                <div class="settings__panel--teams">
                    <div class="equipe equipe1">Equipe 1</div>
                    <VSwatches v-model="team1"></VSwatches>
                    <div class="equipe equipe2">Equipe 2</div>
                    <VSwatches v-model="team2"></VSwatches>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import VSwatches from 'vue-swatches';
export default {
    name: 'Settings',
    components: { VSwatches },
    data() {
        return {
            isVisible: true,
            hue1: '',
            hue2: '',
            color: {
                hue: 50,
                saturation: 100,
                luminosity: 50,
                alpha: 1,
            },
        };
    },
    computed: {
        appTheme: {
            get() {
                return this.$store.state.theme.darkMode;
            },
            set(value) {
                this.$store.commit('SET_THEME_APP', value);
            },
        },
        team1: {
            get() {
                return this.$store.state.theme.team1;
            },
            set(value) {
                this.$store.commit('SET_THEME_TEAM_1', value);
            },
        },
        team2: {
            get() {
                return this.$store.state.theme.team2;
            },
            set(value) {
                this.$store.commit('SET_THEME_TEAM_2', value);
            },
        },
    },
    methods: {
        showSettingsPanel() {
            this.isVisible = !this.isVisible;
        },
    },
};
</script>

<style lang="scss">
#showSettings {
    cursor: pointer;
    padding: 5px;
    border: none;
    outline: none;
    background-color: transparent;
}

.showSettings--img {
    width: 50px;
    transform: rotate(-30deg);
}

.settings__panel {
    color: white;
    margin: 0 20%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    &--theme{
        margin: 10px auto;
    }
    &--teams {
        padding: 15px;
        border: 1px solid #aaa;
        border-radius: 10px;
        display: grid;
        grid-template: repeat(2, 2);
    }
}

.equipe {
    margin: 10px auto;
}

//  Transitions ===============================
.settings-transition-enter-active {
    transition: all 0.3s ease-in;
    opacity: 1;
}

.settings-transition-enter {
    opacity: 0;
}

.settings-transition-leave-active {
    transition: all 0.3s ease-out;
    opacity: 0;
}
.settings-transition-leave {
    opacity: 1;
}
</style>
