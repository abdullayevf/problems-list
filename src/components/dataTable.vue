<template>
  <div class="mx-auto w-[60%]">
    <div class="flex items-center justify-center w-full">
      <div class="flex items-center justify-between w-full">
        <!-- search barm -->
        <searchBar @search="handleSearch" />
        <!--  filter options-->
        <hasChecker @has-checker="handleChecker" />

        <hasSolution @has-solution="handleSolution" />
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
        v-if="filteredProblems.length !== 0"
        v-for="problem in filteredProblems"
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
  </div>
</template>

<script setup>
import searchBar from "./searchBar.vue";
import hasChecker from "./hasChecker.vue";
import hasSolution from "./hasSolution.vue";

import { computed, ref } from "vue";

const searchKey = ref("");
const ordering = ref("");

const emit = defineEmits([
  "searchKey",
  "hasChecker",
  "hasSolution",
  "ordering",
]);

const props = defineProps({
  problems: {
    type: Array,
    required: true,
  },
});

const filteredProblems = computed(() => {
  if (searchKey.value !== "") {
    // return props.problems.filter((problem) =>
    //   problem.hasChecker
    // );
    return props.problems;
  } else {
    return props.problems;
  }
});

const handleSearch = (search) => {
  emit("searchKey", searchKey.value);
  searchKey.value = search;
};

const handleChecker = (checker) => {
  emit("hasChecker", checker);
};

const handleSolution = (solved) => {
  emit("hasSolution", solved);
};

const handleIdSort = () => {
  ordering.value = ordering.value === "id" ? "-id" : "id";
  emit("ordering", ordering.value);
};

const handleTitleSort = () => {
  ordering.value = ordering.value === "title" ? "-title" : "title";
  emit("ordering", ordering.value);
};
</script>
