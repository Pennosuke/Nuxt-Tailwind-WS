<template>
  <form class="mx-auto w-2/3 sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
    <div class="flex items-center rounded-full border border-teal-500 py-2">
      <input v-model="search_name" class="ml-3 w-full text-gray-700 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Search pokemon name...">
      <nuxt-link v-if="search_name !== ''" :to="search(search_name)">
        <button class="mr-3 flex-shrink-0 py-2 px-2 rounded-full bg-transparent hover:bg-gray-400" type="button">
          <svg
            class="text-gray-700 h-4 w-4 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            xml:space="preserve"
            viewBox="0 0 56.966 56.966">
            <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
          </svg>
        </button>
      </nuxt-link>
      <div v-else class="mr-3 flex-shrink-0 py-2 px-2 rounded-full bg-transparent">
        <svg
          class="text-gray-500 h-4 w-4 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          xml:space="preserve"
          viewBox="0 0 56.966 56.966">
          <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
        </svg>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  data: () => {
    return {
      search_name: ''
    }
  },
  methods: {
    search(pokeName) {
      return '/search/' + pokeName
    }
  }
}
</script>

<style>

</style>
