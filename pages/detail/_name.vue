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
        <div class="flex row justify-center">
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
        <div class="flex row justify-center">
          <div v-for="(value, index) in pokemon.abilities" :key="index" class="type">
            <h5 class="text-center">
              {{ value.ability.name }}
            </h5>
          </div>
        </div>
      </div>
      <!-- <div class="grid grid-cols-1">
        <h4 class="m-auto">
          Stats
        </h4>
      </div>
      <div>
        <table class="table-fixed">
          <thead>
            <tr v-for>
              <th class="w-1/6"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border px-4 py-2">Intro to CSS</td>
              <td class="border px-4 py-2">Adam</td>
              <td class="border px-4 py-2">858</td>
            </tr>
            <tr class="bg-gray-100">
              <td class="border px-4 py-2">A Long and Winding Tour of the History of UI Frameworks and Tools and the Impact on Design</td>
              <td class="border px-4 py-2">Adam</td>
              <td class="border px-4 py-2">112</td>
            </tr>
          </tbody>
        </table>
      </div> -->
    </div>
    <div class="grid grid-cols-1">
      <nuxt-link to="/" class="mx-auto">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ">
          Close
        </button>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  async fetch() {
    const { data } = await axios.get(this.pokeUrl + this.$route.params.name + '/')
    this.pokemon = data
  },
  data: () => {
    return {
      pokeUrl: 'https://pokeapi.co/api/v2/pokemon/',
      imgUrl: 'https://pokeres.bastionbot.org/images/pokemon/',
      pokemon: {}
    }
  }
}
</script>

<style scoped>
.type {
  @apply font-bold py-1 px-4 rounded-full text-white w-32 m-2 bg-gray-800;
}
.type-color[data-color = "bug"] {
  background-color: #6D7815;
}
.type-color[data-color = "dark"] {
  background-color: #49392F;
}
.type-color[data-color = "dragon"] {
  background-color: #4924A1;
}
.type-color[data-color = "electric"] {
  background-color: #A1871F;
}
.type-color[data-color = "fairy"] {
  background-color: #9B6470;
}
.type-color[data-color = "fighting"] {
  background-color: #7D1F1A;
}
.type-color[data-color = "fire"] {
  background-color: #9C531F;
}
.type-color[data-color = "flying"] {
  background-color: #6D5E9C;
}
.type-color[data-color = "ghost"] {
  background-color: #493963;
}
.type-color[data-color = "grass"] {
  background-color: #4E8234;
}
.type-color[data-color = "ground"] {
  background-color: #927D44;
}
.type-color[data-color = "ice"] {
  background-color: #638D8D;
}
.type-color[data-color = "normal"] {
  background-color: #6D6D4E;
}
.type-color[data-color = "poison"] {
  background-color: #682A68;
}
.type-color[data-color = "psychic"] {
  background-color: #A13959;
}
.type-color[data-color = "rock"] {
  background-color: #786824;
}
.type-color[data-color = "steel"] {
  background-color: #787887;
}
.type-color[data-color = "water"] {
  background-color: #445E9C;
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
