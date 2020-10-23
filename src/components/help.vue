<template>
    <div>
        <div @click.prevent="showHelpPanel" id="help-btn">
            <p>Comment jouer <span>?</span></p>
        </div>
        <transition name="help-transition">
            <div v-if="isVisible" class="help__container">
                <h2>Comment jouer ?</h2>
                <p>
                    Who's More Trendy est un jeu basé sur l'algorithme de recherche Google. Le jeu peut se jouer en 1 contre 1, ou en
                    équipe: L'équipe 🟥Rouge face à l'équipe 🟦Bleue.
                </p>
                <br />
                <p>
                    La partie se déroule en plusieurs round. A chacun de ses rounds, les deux équipes choisissent un mot-clé.
                    <br />
                    <strong>Le but est très simple:</strong>
                    Le mot clé le plus recherché sur la plate-forme Google l'emporte !
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
    border: 1px solid black;
    margin: auto;
    min-width: 90vw;
    max-width: 90vw;
    max-height: 90vh;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
    position: fixed;
    transform: translate(-50%, -50%);
    z-index: 3;
    padding: 30px;
    background-color: white;
    top: 50%;
    left: 50%;
    overflow-y: auto;
}

#close-btn {
    cursor: pointer;
    position: absolute;
    text-align: center;
    top: 10px;
    right: 10px;
    padding: 2px 10px 4px;
    border-radius: 50px;
    background-color: red;
    color: white;
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
    transition: all 0.5s ease-in;
    white-space: pre;
    overflow-x: hidden;
    width: 0;
    min-width: 0;
    opacity: 0;
}
.help-transition-leave {
    width: 0;
    min-width: 0;
    opacity: 0;
}
</style>
