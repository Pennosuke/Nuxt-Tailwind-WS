<template>
  <div class="flex-row">
    <h1 class="my-10 text-center text-5xl">
      POKEDEX
    </h1>
    <searchbar></searchbar>
    <poke-list
      :api-url="apiURL"
      :img-url="imgURL"></poke-list>
  </div>
</template>

<script>
import PokeList from '~/components/PokeList.vue'
import Searchbar from '~/components/Searchbar.vue'
export default {
  components: {
    PokeList,
    Searchbar
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
.searchbar {
  @apply rounded-full w-full py-2 px-3 text-gray-700 border shadow appearance-none leading-tight outline-none;
}
</style>
