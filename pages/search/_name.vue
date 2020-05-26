<template>
  <div class="flex-row">
    <home-button></home-button>
    <search-bar></search-bar>
    <pokemon-list
      :pokemons="pokemons"
      :img-url="imgUrl"
      :is-loading="isLoading"></pokemon-list>
  </div>
</template>

<script>
import axios from 'axios'
import HomeButton from '~/components/HomeButton.vue'
import PokemonList from '~/components/PokemonList.vue'
import SearchBar from '~/components/Searchbar.vue'
import { splitId } from '~/utils/pokemonMapper'
export default {
  watchQuery: ['name'],
  key (route) {
    return route.fullPath
  },
  components: {
    HomeButton,
    PokemonList,
    SearchBar
  },
  async asyncData({ route }) {
    const apiUrl = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=964'
    const { data } = await axios.get(apiUrl)
    const { results } = data
    const regex = new RegExp(`^${route.query.name}`, 'i')
    const pokemons = results.filter(({ name }) => regex.test(name)).map(({ name, url }) => ({
      name,
      url,
      id: splitId(url)
    }))
    return {
      pokemons,
      totalPage: Math.ceil(data.count / 20),
      isLoading: false
    }
  },
  data() {
    return {
      imgUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/',
      isLoading: true
    }
  }
}
</script>

<style>
.searchbar {
  @apply rounded-full w-full py-2 px-3 text-gray-700 border shadow appearance-none leading-tight outline-none;
}
</style>
