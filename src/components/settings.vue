<template>
    <div class="settings__container">
        <button id="showSettings" @click.prevent="showSettingsPanel">
            <img class="showSettings--img" src="../assets/palette.svg" alt="painting palette" />
        </button>
        <transition name="settings-transition">
            <div v-if="isVisible" class="settings__panel">
                <div class="settings__panel--theme">
                    <toggle-button
                        :color="{ checked: '#212b30', unchecked: '#999999' }"
                        :switch-color="{ checked: '#37474F', unchecked: '#DDE1E3' }"
                        :width="70"
                        :height="30"
                        :labels="{ checked: 'Dark', unchecked: 'Light' }"
                        v-model="applicationTheme"
                    ></toggle-button>
                </div>
                <div class="settings__panel--colorbox">
                    <div class="settings__panel--teams">
                        <div class="equipe equipe1">Equipe 1</div>
                        <VSwatches v-model="team1"></VSwatches>
                    </div>
                    <div class="settings__panel--teams">
                        <div class="equipe equipe2">Equipe 2</div>
                        <VSwatches v-model="team2"></VSwatches>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import VSwatches from 'vue-swatches';
import ThemeManager from '../services/theme';
export default {
    name: 'Settings',
    components: { VSwatches },
    data() {
        return {
            isVisible: false,
        };
    },
    computed: {
        applicationTheme: {
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
        getStyle() {
            return ThemeManager.getStyle(this);
        },
        appTheme() {
            return ThemeManager.appTheme(this);
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
    &:hover {
        transition: all 10s linear;
        transform: rotate(360deg);
    }
}

.settings__panel {
    color: var(--app-font-color);
    margin: 0 20%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    &--colorbox {
        width: 50%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
        @media (max-width: 900px) {
            width: 100%;
            flex-direction: column;
        }
    }
    &--theme {
        margin: 10px auto;
    }
    &--teams {
        padding: 0px 15px 5px;
        margin-bottom: 5px;
        border: 1px solid var(--app-secondary-color);
        box-shadow: 0 0 8px var(--app-shadow-color);
        border-radius: 10px;
        display: flex;
        flex-direction: column;
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
