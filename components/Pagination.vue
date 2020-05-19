<template>
  <div class="flex flex-col items-center my-12">
    <div class="flex text-gray-700">
      <nuxt-link v-if="currentPage > 1" :to="pagination(currentPage - 1)" class="arrow-button md:h-12 w-12 hover:bg-teal-200">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-chevron-left w-6 h-6">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </nuxt-link>
      <div v-else class="arrow-button text-gray-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-chevron-left w-6 h-6">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </div>
      <div class="flex h-12 font-medium rounded-full bg-gray-200">
        <nuxt-link v-if="showFirstPage" :to="pagination(1)" class="w-12 md:flex align-center justify-center page-button hover:bg-teal-200 hidden">
          1
        </nuxt-link>
        <div v-if="showLeftDots" class="w-12 md:flex align-center justify-center page-button hidden">
          ...
        </div>
        <div v-for="(page,index) in middlePages" :key="index" class="md:flex align-center justify-center hidden">
          <div v-if="page===currentPage" class="w-12 md:flex align-center justify-center page-button bg-teal-600 text-white hidden">
            {{ page }}
          </div>
          <nuxt-link v-else :to="pagination(page)" class="w-12 md:flex align-center justify-center page-button hover:bg-teal-200 hidden">
            {{ page }}
          </nuxt-link>
        </div>
        <div v-if="showRightDots" class="w-12 md:flex align-center justify-center page-button hidden">
          ...
        </div>
        <nuxt-link v-if="showLastPage" :to="pagination(totalPage)" class="w-12 md:flex align-center justify-center page-button hover:bg-teal-200 hidden">
          {{ totalPage }}
        </nuxt-link>
        <div class="w-12 h-12 md:hidden flex justify-center items-center leading-5 transition duration-150 ease-in rounded-full bg-teal-600 text-white">
          {{ currentPage }}
        </div>
      </div>
      <nuxt-link v-if="currentPage < totalPage" :to="pagination(currentPage + 1)" class="arrow-button hover:bg-teal-200">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-chevron-right w-6 h-6">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </nuxt-link>
      <div v-else class="arrow-button text-gray-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-chevron-right w-6 h-6">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currentPage: {
      type: Number,
      default: 0
    },
    totalPage: {
      type: Number,
      default: 0
    },
    showFirstPage: {
      type: Boolean,
      default: false
    },
    showLeftDots: {
      type: Boolean,
      default: false
    },
    middlePages: {
      type: Array,
      default: () => []
    },
    showRightDots: {
      type: Boolean,
      default: false
    },
    showLastPage: {
      type: Boolean,
      default: false
    }
  },
  data: () => {
    return {
    }
  },
  methods: {
    pagination(ID) {
      return '/pagination/' + String(ID)
    }
  }
}
</script>

<style scope>
.arrow-button{
  @apply h-12 w-12 mr-1 flex justify-center items-center rounded-full bg-gray-200;
}
.page-button{
  @apply items-center leading-5 transition duration-150 ease-in rounded-full;
}
</style>
