<template>
  <div class="flex flex-col items-center my-12">
    <div class="flex text-gray-700">
      <nuxt-link v-if="currentPage > 1" :to="pagination(currentPage - 1)" class="arrow-button hover:bg-teal-200">
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
        <nuxt-link v-if="showFirstPage" :to="pagination(1)" class="flex align-center justify-center page-button hover:bg-teal-200">
          1
        </nuxt-link>
        <div v-if="showLeftDots" class="flex align-center justify-center page-button">
          ...
        </div>
        <div v-for="(page,index) in middlePages" :key="index" class="flex align-center justify-center">
          <div v-if="page===currentPage" class="flex align-center justify-center page-button bg-teal-600 text-white">
            {{ page }}
          </div>
          <nuxt-link v-else :to="pagination(page)" class="flex align-center justify-center page-button hover:bg-teal-200">
            {{ page }}
          </nuxt-link>
        </div>
        <div v-if="showRightDots" class="flex align-center justify-center page-button">
          ...
        </div>
        <nuxt-link v-if="showLastPage" :to="pagination(totalPage)" class="flex align-center justify-center page-button hover:bg-teal-200">
          {{ totalPage }}
        </nuxt-link>
        <!-- <div class="w-12 h-12 md:hidden flex justify-center items-center cursor-pointer leading-5 transition duration-150 ease-in rounded-full bg-teal-600 text-white">
          3
        </div> -->
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

<style>
.arrow-button{
  @apply h-12 w-12 mr-1 flex justify-center items-center rounded-full bg-gray-200;
}
.page-button{
  @apply w-12 items-center leading-5 transition duration-150 ease-in rounded-full;
}
</style>
