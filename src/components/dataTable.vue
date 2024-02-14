<template>
  <div v-if="pagesCount !== null" class="min-h-screen p-8 bg-gray-100">
    <div class="mx-auto w-[60%]">
      <div class="flex items-center justify-center w-full">
        <div class="flex items-center justify-between w-full">
          <!-- search bar -->
          <searchBar @search="handleSearch" />
          <!--  filter options-->
          <checkerFilter @has-checker="handleChecker" />

          <solutionFilter @has-solution="handleSolution" />
        </div>
      </div>

      <table
        class="min-w-full mx-auto text-sm text-left text-gray-500 border-4 whitespace-nowrap"
      >
        <thead class="text-sm text-gray-700 uppercase bg-gray-50">
          <tr>
            <th class="px-4 py-3 cursor-pointer" @click="handleIdSort()">
              ID
              <span>&#8593;&#8595;</span>
            </th>
            <th class="px-4 py-3 cursor-pointer" @click="handleTitleSort()">
              Title
              <span>&#8593;&#8595;</span>
            </th>
            <th class="px-4 py-3">Tags</th>
            <th class="px-4 py-3">Difficulty</th>
            <th class="px-4 py-3">likes/dislikes</th>
            <th class="px-4 py-3">Attempts</th>
          </tr>
        </thead>
        <tr
          v-if="problems.length !== 0"
          v-for="problem in problems"
          :key="problem.id"
          class="transition-all border-b hover:shadow-sm"
        >
          <td class="px-4 py-3 font-medium text-gray-900">{{ problem.id }}</td>
          <td class="px-4 py-3 font-medium text-gray-900">
            <span class="text-md">{{ problem.title }}</span>
            <span
              v-if="problem.hasSolution"
              class="inline px-2 py-1 ml-2 bg-green-100 border border-green-300 rounded-md"
            >
              &#x1F5F8; solution</span
            >
          </td>
          <td class="px-4 py-3 space-x-2">
            <span
              class="px-2 py-1 border rounded-sm"
              v-for="tag in problem.tags"
              >{{ tag.name }}</span
            >
          </td>
          <td class="px-4 py-3">{{ problem.difficultyTitle }}</td>
          <td class="px-4 py-3 space-x-1">
            <span class="text-green-500">{{ problem.likesCount }}</span
            ><span>/</span
            ><span class="text-red-400">{{ problem.dislikesCount }}</span>
          </td>
          <td class="px-4 py-3">
            {{ `${problem.solved}/${problem.attemptsCount}` }}
          </td>
        </tr>
        <p class="px-8 my-8" v-else>No such problem found.</p>
      </table>

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
  </div>

  <div v-else class="flex items-center justify-center w-full min-h-screen">
    <p class="text-4xl">Loading...</p>
  </div>
</template>

<script setup>
import searchBar from "./searchBar.vue";
import checkerFilter from "./hasChecker.vue";
import solutionFilter from "./hasSolution.vue";
import { fetchProblems } from "../api/apiService";

import { ref, onMounted } from "vue";

const problems = ref([]);
const page = ref(1);
const searchKey = ref("");
const pagesCount = ref(null);
const hasChecker = ref("");
const hasSolution = ref("");
const ordering = ref("");

onMounted(async () => {
  getProblems();
});

const getProblems = async () => {
  const data = await fetchProblems(
    `page=${page.value}&title=${searchKey.value}&has_checker=${hasChecker.value}&has_solution=${hasSolution.value}&ordering=${ordering.value}`
  );
  problems.value = data.data;
  page.value = data.page;
  pagesCount.value = data.pagesCount;
};

const handlePagination = (whichPage) => {
  switch (whichPage) {
    case "prev":
      page.value--;
      break;
    case "next":
      page.value++;
      break;
    case "first":
      page.value = 1;
      break;
    case "last":
      page.value = pagesCount.value;
      break;
    default:
      break;
  }

  getProblems();
};

const handleChecker = (checker) => {
  hasChecker.value = checker;
  getProblems();
};

const handleSolution = (solution) => {
  hasSolution.value = solution;
  getProblems();
};

const handleSearch = (search) => {
  searchKey.value = search;
  getProblems();
};

const handleIdSort = () => {
  ordering.value = ordering.value === "id" ? "-id" : "id";
  getProblems();
};

const handleTitleSort = () => {
  ordering.value = ordering.value === "title" ? "-title" : "title";
  getProblems();
};
</script>
