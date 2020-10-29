<template>
    <div>
        <div @click.prevent="showHelpPanel" id="help-btn">
            <p>Comment jouer ?</p>
        </div>
        <transition name="help-transition">
            <div v-if="isVisible" class="help__container">
                <h2>COMMENT JOUER ?</h2>
                <p>
                    Who's More Trendy est un jeu basé sur l'algorithme de recherche Google. <br />
                    Le jeu peut se jouer en 1 contre 1, ou en équipe.
                </p>
                <br />
                <p>
                    La partie se déroule en plusieurs round. À chaque round, les deux équipes choisissent un mot-clé, et lancent le match en
                    appuyant sur le bouton 'Who's More Trendy ?'
                    <br />
                    <br />
                    <strong>Le but est très simple:</strong>
                    <br />
                    Le terme le plus recherché sur la plate-forme Google l'emporte !
                </p>
                <div id="close-btn" @click.prevent="showHelpPanel">&times;</div>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'Help',
    data() {
        return {
            isVisible: false,
        };
    },
    methods: {
        showHelpPanel() {
            this.isVisible = !this.isVisible;
        },
    },
};
</script>

<style lang="scss">
#help-btn {
    cursor: pointer;
    border-radius: 10px;
    background-color: white;
    border: none;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
    padding: 15px 10px;
    width: 150px;
    margin: 50px auto 0;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    right: 0;
    left: auto;
    transition: all 1s ease-out;
}

.help__container {
    border: 1px solid #aaa;
    margin: auto;
    min-width: 90vw;
    max-width: 90vw;
    max-height: 90vh;
    border-radius: 10px;
    box-shadow: 0 0 10pxvar(--app-shadow-color);
    position: fixed;
    transform: translate(-50%, -50%);
    z-index: 3;
    padding: 30px;
    background-color:var(--app-secondary-color);
    top: 50%;
    left: 50%;
    overflow-y: auto;
    & h2 {
        font-size: 26px;
        font-weight: 600;
        margin: 10px auto 30px;
        color: var(--app-font-color);
    }
    & p {
        font-size: 20px;
        padding-bottom: 14px;
        color: var(--app-font-color);
    }
}

#close-btn {
    cursor: pointer;
    position: absolute;
    text-align: center;
    top: 10px;
    right: 10px;
    padding: 5px;
    border-radius: 50px;
    color: var(--app-font-color);
    font-size: 45px;
    font-weight: 900;
}

.help-transition-enter-active {
    transition: all 0.3s ease-in;
    opacity: 1;
}

.help-transition-enter {
    opacity: 0;
}

.help-transition-leave-active {
    transition: all 0.3s ease-out;
    opacity: 0;
}
.help-transition-leave {
    opacity: 1;
}
</style>
