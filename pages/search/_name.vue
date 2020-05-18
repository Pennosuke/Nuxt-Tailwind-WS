<template>
  <div class="flex-row">
    <HomeButton></HomeButton>
    <searchbar></searchbar>
    <poke-list
      :api-url="apiURL"
      :img-url="imgURL"
      :search-name="searchName"></poke-list>
  </div>
</template>

<script>
import HomeButton from '~/components/HomeButton.vue'
import PokeList from '~/components/PokeList.vue'
import Searchbar from '~/components/Searchbar.vue'
export default {
  components: {
    HomeButton,
    PokeList,
    Searchbar
  },
  data: () => {
    return {
      apiURL: 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20',
      imgURL: 'https://pokeres.bastionbot.org/images/pokemon/',
      pokeURL: '',
      searchName: ''
    }
  },
  created() {
    this.searchName = this.$route.params.name
    console.log('$route.params.name = ' + this.$route.params.name)
    console.log('searchName = ' + this.searchName)
  }
}
</script>

<style>
.searchbar {
  @apply rounded-full w-full py-2 px-3 text-gray-700 border shadow appearance-none leading-tight outline-none;
}
</style>
