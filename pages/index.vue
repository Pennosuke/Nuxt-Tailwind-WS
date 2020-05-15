<template>
  <div class="flex-row">
    <h1 class="my-10 text-center text-5xl">
      POKEDEX
    </h1>
    <poke-list
      :api-url="apiURL"
      :img-url="imgURL"></poke-list>
      <!-- <poke-detail
      v-if="IsDetailShow"
      :poke-url="pokeURL"
      :img-url="imgURL"
      @closeDetail="closeDetail"></poke-detail> -->
  </div>
</template>

<script>
import PokeList from '~/components/PokeList.vue'
/* import PokeDetail from '~/components/PokeDetail.vue' */
export default {
  components: {
    PokeList/* ,
    PokeDetail */
  },
  data: () => {
    return {
      apiURL: 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20',
      imgURL: 'https://pokeres.bastionbot.org/images/pokemon/',
      pokeURL: ''
    }
  }
}
</script>

<style>
</style>
