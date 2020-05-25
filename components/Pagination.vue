<template>
  <div class="flex flex-col items-center my-12">
    <div class="flex text-gray-700">
      <nuxt-link
        v-if="currentPage > 1"
        :to="{ path: 'pagination', query: { page: String(currentPage - 1) } }"
        class="arrow-button mr-1 hover:bg-teal-200">
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
      <div v-else class="arrow-button mr-1 text-gray-500">
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
      <div class="flex h-6 sm:h-8 md:h-10 lg:h-12 font-medium rounded-full bg-gray-300">
        <nuxt-link
          v-if="showFirstPage"
          :to="{ path: 'pagination', query: { page: String(1) } }"
          class="flex align-center justify-center page-button hover:bg-teal-200">
          1
        </nuxt-link>
        <div v-if="showLeftDots" class="flex align-center justify-center page-button">
          ...
        </div>
        <div v-for="(page,index) in middlePages" :key="index" class="flex align-center justify-center">
          <div v-if="page===currentPage" class="flex align-center justify-center page-button bg-teal-600 text-white">
            {{ page }}
          </div>
          <nuxt-link
            v-else
            :to="{ path: 'pagination', query: { page: String(page) } }"
            class="flex align-center justify-center page-button hover:bg-teal-200">
            {{ page }}
          </nuxt-link>
        </div>
        <div v-if="showRightDots" class="flex align-center justify-center page-button">
          ...
        </div>
        <nuxt-link
          v-if="showLastPage"
          :to="{ path: 'pagination', query: { page: String(totalPage) } }"
          class="flex align-center justify-center page-button hover:bg-teal-200">
          {{ totalPage }}
        </nuxt-link>
      </div>
      <nuxt-link
        v-if="currentPage < totalPage"
        :to="{ path: 'pagination', query: { page: String(currentPage + 1) } }"
        class="arrow-button ml-1 hover:bg-teal-200">
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
      <div v-else class="arrow-button ml-1 text-gray-500">
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
    }
  },
  data() {
    return {
      beforeCurrent: 2,
      afterCurrent: 2,
      showFirstPage: false,
      showLeftDots: false,
      showRightDots: false,
      showLastPage: false,
      middlePages: [],
      firstMiddle: 1,
      lastMiddle: 5
    }
  },
  created() {
    this.paginationStyle()
  },
  methods: {
    paginationStyle() {
      this.firstMiddle = Math.max(this.currentPage - this.beforeCurrent, 1)
      this.lastMiddle = Math.min(this.currentPage + this.afterCurrent, this.totalPage)
      if (this.currentPage - 1 - this.beforeCurrent < 1) {
        this.lastMiddle = Math.min(1 + this.beforeCurrent + this.afterCurrent, this.totalPage)
        this.showFirstPage = false
        this.showLeftDots = false
      } else if (this.currentPage - 1 - this.beforeCurrent === 1) {
        this.showFirstPage = true
        this.showLeftDots = false
      } else if (this.currentPage - 1 - this.beforeCurrent > 1) {
        this.showFirstPage = true
        this.showLeftDots = true
      }
      if (this.totalPage - this.currentPage - this.afterCurrent < 1) {
        this.firstMiddle = Math.max(this.totalPage - this.beforeCurrent - this.afterCurrent, 1)
        this.showLastPage = false
        this.showRightDots = false
      } else if (this.totalPage - this.currentPage - this.afterCurrent === 1) {
        this.showLastPage = true
        this.showRightDots = false
      } else if (this.totalPage - this.currentPage - this.afterCurrent > 1) {
        this.showLastPage = true
        this.showRightDots = true
      }
      for (let i = this.firstMiddle; i <= this.lastMiddle; i++) {
        this.middlePages.push(i)
      }
    }
  }
}
</script>

<style scope>
.arrow-button{
  @apply flex justify-center items-center rounded-full bg-gray-300 h-6 w-6;
}
.page-button{
  @apply items-center leading-5 transition duration-150 ease-in rounded-full w-6 text-sm;
}
@media (min-width: 640px) {
  .arrow-button{
    @apply flex justify-center items-center rounded-full bg-gray-300 h-8 w-8;
  }
  .page-button{
    @apply items-center leading-5 transition duration-150 ease-in rounded-full w-8 text-base;
  }
}
@media (min-width: 768px) {
  .arrow-button{
    @apply flex justify-center items-center rounded-full bg-gray-300 h-10 w-10;
  }
  .page-button{
    @apply items-center leading-5 transition duration-150 ease-in rounded-full w-10 text-base;
  }
}
@media (min-width: 1024px) {
  .arrow-button{
    @apply flex justify-center items-center rounded-full bg-gray-300 h-12 w-12;
  }
  .page-button{
    @apply items-center leading-5 transition duration-150 ease-in rounded-full w-12 text-lg;
  }
}
</style>
