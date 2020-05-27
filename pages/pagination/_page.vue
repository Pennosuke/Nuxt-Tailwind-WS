<template>
  <div class="flex-row">
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
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/?offset=${String((parseInt(route.query.page) - 1) * 20)}`
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
      currentPage: 1,
      temp: ''
    }
  },
  computed: {
    pokemons() {
      return pokemonMapper(this.results)
    }
  },
  created() {
    this.currentPage = parseInt(this.$route.query.page)
  }
}
</script>

<style>

</style>
