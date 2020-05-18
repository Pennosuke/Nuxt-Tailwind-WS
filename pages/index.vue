<template>
  <div class="flex-row">
    <home-button></home-button>
    <search-bar></search-bar>
    <poke-list :poke-id="pokeID" :pokemons="pokemons"></poke-list>
  </div>
</template>

<script>
import axios from 'axios'
import HomeButton from '~/components/HomeButton.vue'
import PokeList from '~/components/PokeList.vue'
import SearchBar from '~/components/Searchbar.vue'
export default {
  components: {
    HomeButton,
    PokeList,
    SearchBar
  },
  async fetch() {
    const { data } = await axios.get(this.apiUrl)
    data.results.forEach((pokemon) => {
      this.pokeID.push(pokemon.url.split('/').filter(function(part) { return !!part }).pop())
      this.pokemons.push(pokemon)
    })
  },
  data: () => {
    return {
      apiUrl: 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20',
      pokeID: [],
      pokemons: []
    }
  }
}
</script>

<style>
.searchbar {
  @apply rounded-full w-full py-2 px-3 text-gray-700 border shadow appearance-none leading-tight outline-none;
}
</style>
