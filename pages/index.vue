<template>
  <div class="flex-row">
    <h1 class="my-10 text-center text-5xl">
      POKEDEX
    </h1>
    <poke-list
      :api-url="apiURL"
      :img-url="imgURL"></poke-list>
  </div>
</template>

<script>
import PokeList from '~/components/PokeList.vue'
export default {
  components: {
    PokeList
  },
  data: () => {
    return {
      apiURL: 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20',
      imgURL: 'https://pokeres.bastionbot.org/images/pokemon/',
      pokeURL: ''
    }
  }
}
</script>

<style>
</style>
