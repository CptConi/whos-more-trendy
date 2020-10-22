<template>
    <div id="help">
        <button class="btn" @click.prevent="showHelpPanel"><span>Comment jouer</span>?</button>
        <div class="help__container"></div>
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
            document.querySelector('.btn').classList.toggle('active');
        },
    },
};
</script>

<style lang="scss">
.btn {
    position: absolute;
    z-index: 3;
    padding: 10px 17px;
    top: 5%;
    right: 3%;
    border: none;
    border-radius: 50px;
    outline: none;
    font-size: 24px;
    font-weight: 600;
    cursor: pointer;
    box-shadow: inset 2px 2px 3px 1px rgba(0, 0, 0, 0.15), 4px 4px 8px rgba(0, 0, 0, 0.2);
    text-align: right;
    transition: width 2s ease;
    & span {
        max-width: 0;
        display: inline-block;
        overflow: hidden;
        vertical-align: top;
        white-space: nowrap;
        transition: all 0.8s ease;
    }
    &:hover span {
        max-width: 15rem;
        margin-right: 0.5rem;
    }
}

.active {
    width: 110%;
    height: 110%;
}
</style>
