<template>
  <div class="container mx-auto">
    <div v-if="pokemons.length > 0">
      <div class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <div v-for="(pokemon, index) in pokemons" :key="index" class="mx-auto">
          <nuxt-link :to="detail(pokemon.name)">
            <button class="btn btn-color">
              <img :src="imgUrl + pokeID[index] + '.png'" class="w-20 h-20 mx-auto" />
              <h4>{{ pokemon.name }}</h4>
            </button>
          </nuxt-link>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="flex-row">
        <h4 class="text-center mt-24 text-5xl text-gray-700">
          Not found
        </h4>
        <h4 class="text-center text-5xl text-gray-700">
          ;_;
        </h4>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  props: {
    apiUrl: {
      type: String,
      default: ''
    },
    imgUrl: {
      type: String,
      default: ''
    },
    searchName: {
      type: String,
      default: ''
    }
  },
  async fetch() {
    this.currentUrl = this.apiUrl
    if (this.searchName === '') {
      console.log('HOME')
      const { data } = await axios.get(this.currentUrl)
      data.results.forEach((pokemon) => {
        this.pokeID.push(pokemon.url.split('/').filter(function(part) { return !!part }).pop())
        this.pokemons.push(pokemon)
      })
    } else {
      while (true) {
        const { data } = await axios.get(this.currentUrl)
        if (data.next == null) {
          break
        }
        data.results.forEach((pokemon) => {
          if (this.nameMatch(pokemon.name)) {
            this.pokeID.push(pokemon.url.split('/').filter(function(part) { return !!part }).pop())
            this.pokemons.push(pokemon)
          }
        })
        this.currentUrl = data.next
      }
    }
  },
  data: () => {
    return {
      pokeID: [],
      pokemons: [],
      pokeUrl: '',
      currentUrl: ''
    }
  },
  methods: {
    detail(pokeName) {
      return '/detail/' + pokeName
    },
    nameMatch(pokeName) {
      const regex = new RegExp('^' + this.searchName, 'i')
      return regex.test(pokeName)
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
