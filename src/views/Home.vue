<template>
  <div class="home">
    <input type="text" v-model="search">
    <button>Envoi de la requête</button>
  </div>
</template>

<script>



export default {
  name: 'Home',
  components: {
  },
  data() {
    return {
      search:''
    }
  },
}
</script>
