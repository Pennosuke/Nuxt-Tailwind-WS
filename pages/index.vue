<template>
  <div class="flex-row">
    <search-bar></search-bar>
    <pokemon-list
      :is-loading="isLoading"
      :pokemons="pokemons"
      :img-url="imgUrl"></pokemon-list>
    <pagination
      v-if="this.$route.query.name === undefined"
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
  watchQuery: ['page', 'name'],
  key (route) {
    return route.fullPath
  },
  components: {
    pokemonList,
    searchBar,
    pagination
  },
  async asyncData({ route }) {
    const pokemonListOffset = route.query.page === undefined ? 0 : (parseInt(route.query.page) - 1) * 20
    const pokemonListLimit = route.query.name === undefined ? 20 : 964
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/?offset=${pokemonListOffset}&limit=${pokemonListLimit}`
    const { data } = await axios.get(apiUrl)
    const { results } = data
    const regex = new RegExp(`^${route.query.name}`, 'i')
    return {
      results,
      regex,
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
      const fetchResults = this.$route.query.name === undefined ? this.results : this.results.filter(({ name }) => this.regex.test(name))
      return pokemonMapper(fetchResults)
    }
  },
  created() {
    console.log('this.$route.query', this.$route.query)
    this.currentPage = this.$route.query.page === undefined ? 1 : parseInt(this.$route.query.page)
  }
}
</script>
