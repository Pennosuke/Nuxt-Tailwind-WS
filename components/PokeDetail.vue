<template>
  <div class="container mx-auto w-2/3">
    <img :src="imgUrl + pokeID + '.png'" class="w-40 h-40 mx-auto" />
    <div class="grid grid-cols-1">
      <h2 class="mx-auto">
        {{ pokemon.name }}
      </h2>
    </div>
    <div class="divide-y divide-gray-400">
      <div class="grid grid-cols-2">
        <h4 class="mx-auto">
          Base Experience
        </h4>
        <h4 class="mx-auto">
          {{ pokemon.base_experience }}
        </h4>
      </div>
      <div class="grid grid-cols-2">
        <h4 class="mx-auto">
          Height
        </h4>
        <h4 class="mx-auto">
          {{ pokemon.height }}
        </h4>
      </div>
      <div class="grid grid-cols-2">
        <h4 class="mx-auto">
          Weight
        </h4>
        <h4 class="mx-auto">
          {{ pokemon.weight }}
        </h4>
      </div>
      <div class="grid grid-cols-2">
        <h4 class="mx-auto">
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
      <div class="grid grid-cols-2">
        <h4 class="mx-auto">
          Ability
        </h4>
        <div class="flex row justify-center">
          <div v-for="(value, index) in pokemon.abilities" :key="index" class="ability">
            <h5 class="text-center">
              {{ value.type.name }}
            </h5>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-6">

      </div>
    </div>
    <!-- <div class="row">
      <div class="col-md-12">
        <h2>{{ pokemon.name }}</h2>
      </div>
    </div>
    <div class="row bottom-line">
      <div class="col-md-6">
        <h4>Base Experience</h4>
      </div>
      <div class="col-md-6">
        <h4>{{ pokemon.base_experience }}</h4>
      </div>
    </div>
    <div class="row bottom-line">
      <div class="col-md-6">
        <h4>Height</h4>
      </div>
      <div class="col-md-6">
        <h4>{{ pokemon.height }}</h4>
      </div>
    </div>
    <div class="row bottom-line">
      <div class="col-md-6">
        <h4>Weight</h4>
      </div>
      <div class="col-md-6">
        <h4>{{ pokemon.weight }}</h4>
      </div>
    </div>
    <div class="row bottom-line">
      <div class="col-md-6">
        <h4>Type</h4>
      </div>
      <div class="col-md-6 rounded-square-area">
        <div v-for="(value, index) in pokemon.types" :key="index" :data-color="value.type.name" class="type type-color">
          <h5>{{ value.type.name }}</h5>
        </div>
      </div>
    </div>
    <div class="row bottom-line">
      <div class="col-md-6">
        <h4>Abilities</h4>
      </div>
      <div class="col-md-6 rounded-square-area">
        <div v-for="(value, index) in pokemon.abilities" :key="index" class="ability">
          <h5>{{ value.ability.name }}</h5>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <h2>Stats</h2>
      </div>
    </div>
    <div class="row">
      <div v-for="(value, index) in pokemon.stats" :key="index" class="flex col-md-2 col-xs-1">
        <h5>{{ value.stat.name }}</h5>
        <h4>{{ value.base_stat }}</h4>
      </div>
    </div> -->
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full " @click="closeDetail">
      Close
    </button>
  </div>
</template>

<script>
export default {
  props: {
    pokeUrl: {
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
      show: false,
      pokemon: {},
      pokeID: ''
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      const response = await fetch(this.pokeUrl)
      const data = await response.json()
      this.pokemon = data
      this.pokeID = this.pokeUrl.split('/').filter(function(part) { return !!part }).pop()
    },
    closeDetail() {
      this.$emit('closeDetail')
    }
  }
}
</script>

<style scoped>
.type {
  @apply font-bold py-1 px-4 rounded-full text-white w-32 m-2;
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
