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
  components: {
    pokemonList,
    searchBar,
    pagination
  },
  async asyncData() {
    const apiUrl = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20'
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
      temp: '',
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
  }
}
</script>
