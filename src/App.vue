<template>
  <div v-if="problems.length > 0" class="p-8 bg-gray-200">

    <!-- Data table -->
    <DataTable :problems="problems" />

    <!-- Pagination -->

    <div class="flex items-center justify-center w-full py-4 space-x-2">
      <!-- previous page -->

      <button
        :disabled="page === 1"
        class="px-4 py-2 transition-all border rounded-sm disabled:text-gray-400 disabled:bg-gray-300 hover:shadow border-slate-400"
     
        @click="handlePagination('prev')"
      >
        prev
      </button>

      <!-- first page -->

      <button
        class="px-4 py-2 transition-all border rounded-sm disabled:text-gray-400 disabled:bg-gray-300 hover:shadow border-slate-400"
        @click="handlePagination('first')"
      >
        first
      </button>

      <!-- current page -->

      <p class="px-4 py-2 border rounded-sm border-slate-400">
        {{ `${page}/${pagesCount}` }}
      </p>

      <!-- last page -->

      <button
        class="px-4 py-2 transition-all border rounded-sm disabled:text-gray-400 disabled:bg-gray-300 hover:shadow border-slate-400"
        @click="handlePagination('last')"
      >
        last
      </button>

      <!-- next -->

      <button
        :disabled="page === pagesCount"
        class="px-4 py-2 transition-all border rounded-sm disabled:text-gray-400 disabled:bg-gray-300 hover:shadow border-slate-400"
        @click="handlePagination('next')"
      >
        next
      </button>
    </div>

  </div>

  <!-- loading -->

  <div v-else class="flex items-center justify-center w-full min-h-screen">
    <p class="text-4xl">Loading...</p>
  </div>
</template>

<script setup>
import DataTable from "./components/dataTable.vue";
import { ref, onMounted } from "vue";

const problems = ref([]);
const page = ref(1);
const pagesCount = ref(null);

onMounted(async () => {
  getProblems();
});

const getProblems = async () => {
  try {
    const response = await fetch(
      `https://kep.uz/api/problems/?page=${page.value}`
    );
    const data = await response.json();
    problems.value = data.data;
    page.value = data.page;
    pagesCount.value = data.pagesCount;
  } catch (error) {
    console.log(error);
  }
};

const handlePagination = (whichPage) => {
  switch (whichPage) {
    case 'prev':
      page.value --
      break;
    case 'next':
      page.value ++
      break;
    case 'first':
      page.value = 1
      break;
    case 'last':
      page.value = pagesCount.value
      break;
    default:
      break;
  }

  getProblems()
}
</script>
