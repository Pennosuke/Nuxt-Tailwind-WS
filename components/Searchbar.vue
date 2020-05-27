<template>
  <form class="mx-auto w-2/3 py-10 sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
    <div class="flex items-center rounded-full border border-teal-500 py-2">
      <input
        v-model="searchText"
        type="text"
        class="ml-3 w-full py-1 px-2 bg-transparent leading-tight focus:outline-none"
        placeholder="Search pokemon name..."
        @keyup.enter="searchByEnter(searchText)">
      <input class="hidden">
      <search-bar-button
        :disabled="!searchText"
        :to="{ path: 'search', query: { name: searchText } }">
      </search-bar-button>
    </div>
  </form>
</template>

<script>
import searchBarButton from '~/components/searchBarButton.vue'
export default {
  components: {
    searchBarButton
  },
  data() {
    return {
      searchText: ''
    }
  },
  created() {
    console.log('this.searchText', this.searchText)
  },
  methods: {
    searchByEnter(pokemonName) {
      if (pokemonName !== '') {
        this.$router.push({ path: 'search', query: { name: pokemonName } })
      }
    }
  }
}
</script>
