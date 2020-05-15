<template>
  <div class="container mx-auto">
    <div class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <div v-for="(pokemon, index) in pokemons" :key="index" class="mx-auto">
        <nuxt-link :to="Path(pokemon.name)">
          <button class="btn btn-color">
            <img :src="imgUrl + pokeID[index] + '.png'" class="w-20 h-20 mx-auto" />
            <h4>{{ pokemon.name }}</h4>
          </button>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    apiUrl: {
      type: String,
      default: ''
    },
    imgUrl: {
      type: String,
      default: ''
    }
  },
  data: () => {
    return {
      pokeID: [],
      pokemons: [],
      pokeUrl: ''
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      const response = await fetch(this.apiUrl)
      const data = await response.json()
      data.results.forEach((pokemon) => {
        this.pokeID.push(pokemon.url.split('/').filter(function(part) { return !!part }).pop())
        this.pokemons.push(pokemon)
      })
    },
    Path(pokeName) {
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
