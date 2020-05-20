<template>
  <div class="flex-row">
    <home-button></home-button>
    <search-bar></search-bar>
    <poke-list
      :poke-id="pokeID"
      :pokemons="pokemons"
      :img-url="imgUrl"
      :is-fetch-complete="isFetchComplete"></poke-list>
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
      if (this.nameMatch(pokemon.name)) {
        this.pokeID.push(pokemon.url.split('/').filter(function(part) { return !!part }).pop())
        this.pokemons.push(pokemon)
      }
    })
    this.isFetchComplete = true
  },
  data: () => {
    return {
      apiUrl: 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=964',
      imgUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/',
      isFetchComplete: false,
      pokeID: [],
      pokemons: []
    }
  },
  methods: {
    nameMatch(pokeName) {
      const regex = new RegExp('^' + this.$route.params.name, 'i')
      return regex.test(pokeName)
    }
  }
}
</script>

<style>
.searchbar {
  @apply rounded-full w-full py-2 px-3 text-gray-700 border shadow appearance-none leading-tight outline-none;
}
</style>
