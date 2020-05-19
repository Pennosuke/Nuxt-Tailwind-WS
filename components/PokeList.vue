<template>
  <div class="container mx-auto">
    <div v-if="pokemons.length > 0">
      <div class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <div v-for="(pokemon, index) in pokemons" :key="index" class="mx-auto">
          <nuxt-link :to="detail(pokemon.name)">
            <button class="btn btn-color">
              <img :src="imgUrl + pokeId[index] + '.png'" class="w-20 h-20 mx-auto" />
              <h4>{{ pokemon.name }}</h4>
            </button>
          </nuxt-link>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="flex-row">
        <h4 class="text-center mt-24 text-5xl text-gray-700">
          No results found
        </h4>
        <h4 class="text-center text-5xl text-gray-700">
          ;_;
        </h4>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    pokeId: {
      type: Array,
      default: () => []
    },
    pokemons: {
      type: Array,
      default: () => []
    },
    imgUrl: {
      type: String,
      default: ''
    }
  },
  methods: {
    detail(pokeName) {
      return '/detail/' + pokeName
    }
  }
}
</script>

<style scoped>
.btn {
  @apply font-medium py-4 px-4 my-6 rounded-full w-48 h-48 shadow-xl;
}
.btn-color {
  @apply bg-gray-200 text-blue-700;
}
.btn-color:hover {
  color: white;
  background-color: #4299e1;
  animation-name: hover-animation;
  animation-duration: 0.5s;
}
@keyframes hover-animation {
  from {
    color: #2b6cb0;
    background-color: #edf2f7;
  }
  to {
    color: white;
    background-color: #4299e1;
  }
}
</style>
