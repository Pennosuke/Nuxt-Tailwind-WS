<template>
  <div class="flex-row">
    <home-button></home-button>
    <search-bar></search-bar>
    <poke-list :poke-id="pokeID" :pokemons="pokemons" :img-url="imgUrl"></poke-list>
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
export default {
  components: {
    HomeButton,
    PokeList,
    SearchBar,
    Pagination
  },
  async fetch() {
    const { data } = await axios.get(this.apiUrl + this.offset(this.$route.params.id))
    this.totalPage = Math.floor(data.count / 20)
    data.results.forEach((pokemon) => {
      this.pokeID.push(pokemon.url.split('/').filter(function(part) { return !!part }).pop())
      this.pokemons.push(pokemon)
    })
    this.paginationStyle()
  },
  data: () => {
    return {
      apiUrl: 'https://pokeapi.co/api/v2/pokemon/?offset=',
      imgUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/',
      pokeID: [],
      pokemons: [],
      totalPage: 0,
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
  methods: {
    paginationStyle() {
      this.currentPage = parseInt(this.$route.params.id)
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
    },
    offset(pageID) {
      return String((parseInt(pageID) - 1) * 20)
    }
  }
}
</script>

<style>
.searchbar {
  @apply rounded-full w-full py-2 px-3 text-gray-700 border shadow appearance-none leading-tight outline-none;
}
</style>
