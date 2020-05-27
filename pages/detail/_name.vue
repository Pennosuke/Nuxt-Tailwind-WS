<template>
  <div class="container mx-auto w-2/3">
    <img :src="imgUrl + pokemon.id + '.png'" class="w-40 h-40 mx-auto" />
    <div class="grid grid-cols-1">
      <h1 class="m-auto text-5xl">
        {{ pokemon.name }}
      </h1>
    </div>
    <div class="divide-y divide-gray-400">
      <div class="grid grid-cols-2">
        <h4 class="m-auto">
          Height
        </h4>
        <h4 class="m-auto">
          {{ pokemon.height }}
        </h4>
      </div>
      <div class="grid grid-cols-2">
        <h4 class="m-auto">
          Weight
        </h4>
        <h4 class="m-auto">
          {{ pokemon.weight }}
        </h4>
      </div>
      <div class="grid grid-cols-2">
        <h4 class="m-auto">
          Base Experience
        </h4>
        <h4 class="m-auto">
          {{ pokemon.base_experience }}
        </h4>
      </div>
      <div class="grid sm:grid-cols-1 md:grid-cols-2">
        <h4 class="m-auto">
          Type
        </h4>
        <div class="flex row justify-center flex-wrap">
          <div v-for="(value, index) in pokemon.types" :key="index" :data-color="value.type.name" class="type type-color">
            <h5 class="text-center">
              {{ value.type.name }}
            </h5>
          </div>
        </div>
      </div>
      <div class="grid sm:grid-cols-1 md:grid-cols-2">
        <h4 class="m-auto">
          Ability
        </h4>
        <div class="flex row justify-center flex-wrap">
          <div v-for="(value, index) in pokemon.abilities" :key="index" class="type type-color">
            <h5 class="text-center">
              {{ value.ability.name }}
            </h5>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-1 mb-10">
        <h4 class="m-auto">
          Stats
        </h4>
        <table class="table-fixed">
          <thead>
            <tr>
              <th class="w-2/3"></th>
              <th class="w-1/3"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(value, index) in pokestat" :key="index">
              <td class="border px-4 py-2 bg-teal-200">
                <h5 class="text-center">
                  {{ value.stat.name }}
                </h5>
              </td>
              <td class="border px-4 py-2">
                <h5 class="text-center">
                  {{ value.base_stat }}
                </h5>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  async asyncData({ route }) {
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${route.params.name}/`
    const { data } = await axios.get(apiUrl)
    const pokemon = data
    const pokestat = data.stats.slice().reverse()
    return {
      pokemon,
      pokestat
    }
  },
  data() {
    return {
      imgUrl: 'https://pokeres.bastionbot.org/images/pokemon/'
    }
  }
}
</script>

<style scoped>
.type {
  @apply font-bold py-1 px-4 rounded-full text-white w-32 m-2;
}
.type-color {
  @apply bg-gray-800;
}
.type-color[data-color='bug'] {
  background-color: #A8B820;
}
.type-color[data-color='dark'] {
  background-color: #705848;
}
.type-color[data-color='dragon'] {
  background-color: #7038F8;
}
.type-color[data-color='electric'] {
  background-color: #F8D030;
}
.type-color[data-color='fairy'] {
  background-color: #EE99AC;
}
.type-color[data-color='fighting'] {
  background-color: #C03028;
}
.type-color[data-color='fire'] {
  background-color: #F08030;
}
.type-color[data-color='flying'] {
  background-color: #A890F0;
}
.type-color[data-color='ghost'] {
  background-color: #705898;
}
.type-color[data-color='grass'] {
  background-color: #78C850;
}
.type-color[data-color='ground'] {
  background-color: #E0C068;
}
.type-color[data-color='ice'] {
  background-color: #98D8D8;
}
.type-color[data-color='normal'] {
  background-color: #A8A878;
}
.type-color[data-color='poison'] {
  background-color: #A040A0;
}
.type-color[data-color='psychic'] {
  background-color: #F85888;
}
.type-color[data-color='rock'] {
  background-color: #B8A038;
}
.type-color[data-color='steel'] {
  background-color: #B8B8D0;
}
.type-color[data-color='water'] {
  background-color: #6890F0;
}
.ability {
  margin-bottom: 10px;
  margin-inline: 5px;
  padding-top: 5px;
  padding-inline: 10px;
  border-radius: 30px;
  color: #ffffff;
  letter-spacing: 2px;
  background-color: #44685E;
}
</style>
