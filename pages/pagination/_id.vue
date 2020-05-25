<template>
  <div class="flex-row">
    <home-button></home-button>
    <search-bar></search-bar>
    <pokemon-list
      :pokemons="pokemons"
      :img-url="imgUrl"
      :is-loading="isLoading"></pokemon-list>
    <pagination
      :current-page="currentPage"
      :total-page="totalPage"></pagination>
  </div>
</template>

<script>
import axios from 'axios'
import HomeButton from '~/components/HomeButton.vue'
import PokemonList from '~/components/PokemonList.vue'
import SearchBar from '~/components/Searchbar.vue'
import Pagination from '~/components/Pagination.vue'
import { splitId } from '~/utils/pokemonMapper'
export default {
  watchQuery: ['id'],
  key (route) {
    return route.fullPath
  },
  components: {
    HomeButton,
    PokemonList,
    SearchBar,
    Pagination
  },
  async asyncData({ route }) {
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/?offset=${String((parseInt(route.query.id) - 1) * 20)}`
    const { data } = await axios.get(apiUrl)
    const { results } = data
    const pokemons = results.map(({ name, url }) => ({
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
      isLoading: true,
      totalPage: 0,
      currentPage: 1,
      temp: ''
    }
  },
  created() {
    this.currentPage = parseInt(this.$route.query.id)
  }
}
</script>

<style>

</style>
