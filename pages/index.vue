<template>
  <div class="flex-row">
    <home-button></home-button>
    <search-bar></search-bar>
    <poke-list
      :pokemons="pokemons"
      :img-url="imgUrl"
      :is-fetch-complete="isFetchComplete"></poke-list>
    <pagination
      :current-page="currentPage"
      :total-page="totalPage"
      :show-first-page="showFirstPage"
      :show-left-dots="showLeftDots"
      :middle-pages="middlePages"
      :show-right-dots="showRightDots"
      :show-last-page="showLastPage"></pagination>
  </div>
</template>

<script>
import axios from 'axios'
import HomeButton from '~/components/HomeButton.vue'
import PokeList from '~/components/PokeList.vue'
import SearchBar from '~/components/Searchbar.vue'
import Pagination from '~/components/Pagination.vue'
import { splitId } from '~/utils/pokemonMapper'

export default {
  components: {
    HomeButton,
    PokeList,
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
      isFetchComplete: true
    }
  },
  data () {
    return {
      imgUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/',
      isFetchComplete: false,
      pokeId: [],
      totalPage: 0,
      pokemons: [],
      currentPage: 1,
      beforeCurrent: 2,
      afterCurrent: 2,
      showFirstPage: false,
      showLeftDots: false,
      showRightDots: false,
      showLastPage: false,
      middlePages: [],
      firstMiddle: 1,
      lastMiddle: 3
    }
  },
  created () {
    this.paginationStyle()
  },
  methods: {
    paginationStyle() {
      this.firstMiddle = Math.max(this.currentPage - this.beforeCurrent, 1)
      this.lastMiddle = Math.min(this.currentPage + this.afterCurrent, this.totalPage)
      if (this.currentPage - 1 - this.beforeCurrent < 1) {
        this.lastMiddle = Math.min(1 + this.beforeCurrent + this.afterCurrent, this.totalPage)
        this.showFirstPage = false
        this.showLeftDots = false
      } else if (this.currentPage - 1 - this.beforeCurrent === 1) {
        this.showFirstPage = true
        this.showLeftDots = false
      } else if (this.currentPage - 1 - this.beforeCurrent > 1) {
        this.showFirstPage = true
        this.showLeftDots = true
      }
      if (this.totalPage - this.currentPage - this.afterCurrent < 1) {
        this.firstMiddle = Math.max(this.totalPage - this.beforeCurrent - this.afterCurrent, 1)
        this.showLastPage = false
        this.showRightDots = false
      } else if (this.totalPage - this.currentPage - this.afterCurrent === 1) {
        this.showLastPage = true
        this.showRightDots = false
      } else if (this.totalPage - this.currentPage - this.afterCurrent > 1) {
        this.showLastPage = true
        this.showRightDots = true
      }
      for (let i = this.firstMiddle; i <= this.lastMiddle; i++) {
        this.middlePages.push(i)
      }
    }
  }
}
</script>
