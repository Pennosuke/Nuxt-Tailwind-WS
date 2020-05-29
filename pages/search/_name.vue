<template>
  <div class="flex-row">
    <search-bar></search-bar>
    <pokemon-list
      :pokemons="pokemons"
      :img-url="imgUrl"
      :is-loading="isLoading"></pokemon-list>
  </div>
</template>

<script>
import axios from 'axios'
import pokemonList from '~/components/pokemonList.vue'
import searchBar from '~/components/searchBar.vue'
import { pokemonMapper } from '~/utils/pokemonMapper'
export default {
  watchQuery: ['name'],
  key (route) {
    return route.fullPath
  },
  components: {
    pokemonList,
    searchBar
  },
  async asyncData({ route }) {
    const apiUrl = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=964'
    const { data } = await axios.get(apiUrl)
    const { results } = data
    const regex = new RegExp(`^${route.query.name}`, 'i')
    /* const pokemons = results.filter(({ name }) => regex.test(name)).map(({ name, url }) => ({
      name,
      url,
      id: splitId(url)
    })) */
    return {
      // pokemons,
      results,
      regex,
      totalPage: Math.ceil(data.count / 20),
      isLoading: false
    }
  },
  data() {
    return {
      imgUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/',
      isLoading: true
    }
  },
  computed: {
    pokemons() {
      return pokemonMapper(this.results.filter(({ name }) => this.regex.test(name)))
    }
  }
}
</script>
