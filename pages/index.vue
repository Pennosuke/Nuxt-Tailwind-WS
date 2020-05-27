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
import PokemonList from '~/components/PokemonList.vue'
import SearchBar from '~/components/Searchbar.vue'
import Pagination from '~/components/Pagination.vue'
import { splitId } from '~/utils/pokemonMapper'

export default {
  components: {
    PokemonList,
    SearchBar,
    Pagination
  },
  async asyncData() {
    const apiUrl = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20'
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
      currentPage: 1
    }
  }
}
</script>
