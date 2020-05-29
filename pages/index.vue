<template>
  <div class="flex-row">
    <search-bar></search-bar>
    <pokemon-list
      :is-loading="isLoading"
      :pokemons="pokemons"
      :img-url="imgUrl"></pokemon-list>
    <pagination
      :current-page="currentPage"
      :total-page="totalPage"></pagination>
  </div>
</template>

<script>
import axios from 'axios'
import pokemonList from '~/components/pokemonList.vue'
import searchBar from '~/components/searchBar.vue'
import pagination from '~/components/pagination.vue'
import { pokemonMapper } from '~/utils/pokemonMapper'

export default {
  watchQuery: ['page'],
  key (route) {
    return route.fullPath
  },
  components: {
    pokemonList,
    searchBar,
    pagination
  },
  async asyncData({ route }) {
    const pokemonListOffset = route.query.page === undefined ? 0 : String((parseInt(route.query.page) - 1) * 20)
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/?offset=${pokemonListOffset}`
    const { data } = await axios.get(apiUrl)
    const { results } = data
    return {
      results,
      totalPage: Math.ceil(data.count / 20),
      isLoading: false
    }
  },
  data() {
    return {
      imgUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/',
      isLoading: true,
      totalPage: 0,
      currentPage: 1
    }
  },
  computed: {
    pokemons() {
      return pokemonMapper(this.results)
    }
  },
  created() {
    this.currentPage = this.$route.query.page === undefined ? 1 : parseInt(this.$route.query.page)
  }
}
</script>
