<template>
    <div id="app" :style="getStyle">
        <router-view />
    </div>
</template>

<script>
import {mapState} from 'vuex';
import ThemeManager from './services/theme';
export default {
    computed: {
        ...mapState(['theme']),
        getStyle() {
            return ThemeManager.getStyle(this);
        },
    },
};
</script>

<style lang="scss">
*,
::before,
::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    transition: all 0.3s 0.05s ease;
}

html {
    scroll-behavior: smooth;
    background-color: var(--app-secondary-color);
}


#app {
    font-family: Arial, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    background-color: var(--app-secondary-color);
    min-height: calc(100vh);
    background-repeat: repeat-y;
}

</style>
