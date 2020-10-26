<template>
    <div class="settings__container">
        <button id="showSettings" @click.prevent="showSettingsPanel">
            <img class="showSettings--img" src="../assets/palette.svg" alt="painting palette" />
        </button>
        <transition name="settings-transition">
            <div v-if="isVisible" class="settings__panel">
                <div class="setting__panel--theme">
                    <toggle-button
                        :color="{ checked: '#673AB7', unchecked: '#E0E0E0' }"
                        :width="70"
                        :height="30"
                        v-model="appTheme"
                    ></toggle-button>
                </div>
                <div class="settings__panel--teams">
                    <div class="equipe1">Equipe 1 <input type="color" v-model="team1" /></div>
                    <div class="equipe2">Equipe 2 <input type="color" v-model="team2" /></div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'Settings',
    data() {
        return {
            isVisible: true,
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
    &--teams {
        border: 1px solid #aaa;
        border-radius: 10px;
    }
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
