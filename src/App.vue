<template>
    <div id="app">
        <router-view />
    </div>
</template>

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
}

body{
    background-color: #EEE;
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

#nav {
    padding: 30px;

    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
</style>
