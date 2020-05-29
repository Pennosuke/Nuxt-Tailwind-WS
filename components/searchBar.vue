<template>
  <div class="mx-auto w-2/3 pb-10 sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
    <div class="flex items-center rounded-full border border-teal-500 py-2">
      <input
        v-model="searchText"
        type="text"
        class="ml-3 w-full py-1 px-2 bg-transparent leading-tight focus:outline-none"
        placeholder="Search pokemon name..."
        @keyup.enter="searchByEnter(searchText)">
      <search-bar-button
        :disabled="!searchText"
        :to="{ query: { name: searchText } }">
      </search-bar-button>
    </div>
  </div>
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
  methods: {
    searchByEnter(pokemonName) {
      if (pokemonName !== '') {
        this.$router.push({ query: { name: pokemonName } })
      }
    }
  }
}
</script>
