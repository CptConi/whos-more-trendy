<template>
    <div>
        <div @click.prevent="showHelpPanel" id="help">
            <p>Comment jouer <span>?</span></p>
        </div>
        <transition name="help-tr">
            <div v-if="isVisible" class="help__container">
                <h2>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta itaque quasi ducimus, rerum perspiciatis modi?</h2>
                <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut adipisci quas numquam quod doloribus ratione quos sapiente
                    velit quam impedit provident reprehenderit fuga alias beatae officiis quidem temporibus nisi neque laborum asperiores,
                    dolorem dolor! Enim eveniet officia explicabo, sequi quasi laudantium ducimus, laboriosam nihil ad nobis cum reiciendis,
                    animi sapiente.
                </p>
                <br />
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet modi quidem ipsa illum eos quia repellat exercitationem
                    inventore libero iste dolores facilis debitis cumque sint velit minima repellendus aperiam, asperiores animi itaque
                    optio obcaecati ea voluptates. Quo atque optio animi enim tempora molestias natus impedit!
                </p>
                <div id="close-truc" @click.prevent="showHelpPanel">X</div>
            </div>
        </transition>
    </div>
    <!-- <div id="help">
        <button class="btn" @click.prevent="showHelpPanel"><span>Comment jouer</span>?</button>
        <div class="help__container"></div>
    </div> -->
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
            document.getElementById('help').classList.toggle('active');
        },
    },
};
</script>

<style lang="scss">
#help {
    cursor: pointer;
    border-radius: 10px;
    background-color: white;
    border: none;
    box-shadow: 0 0 10px rgba(0,0,0,0.4);
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
    box-shadow: 0 0 10px rgba(0,0,0,0.4);
    position: fixed;
    transform: translate(-50%, -50%);
    z-index: 3;
    padding: 30px;
    background-color: white;
    top: 50%;
    left: 50%;
    overflow-y: auto;
}

#close-truc {
    cursor: pointer;
    position: absolute;
    text-align: center;
    top: 10px;
    right: 10px;
padding: 3px 8px;
    border-radius: 50px;
    background-color: red;
    color: white;
    font-weight: 900;
}

.help-tr-enter-active {
    min-width: 90vw;
    max-height: 0;
}

.help-tr-enter {
    transition: all 3s ease;
    min-height: 0;
}

.help-tr-leave-active {
    width: 0;
    min-width: 0;
    opacity: 0;
}
</style>
