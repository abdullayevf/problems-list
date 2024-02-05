<template>
  <div class="overflow-x-scroll bg-white border rounded-lg">
    <div class="flex items-center justify-between">
      <!-- search barm -->
      <searchBar @search="handleSearch" />
      <!-- checkbox filters -->

    </div>
    <table class="text-sm text-left text-gray-500 whitespace-nowrap">
      <thead class="text-sm text-gray-700 uppercase bg-gray-50">
        <tr>
          <th class="px-4 py-3">ID</th>
          <th class="px-4 py-3">Title</th>
          <th class="px-4 py-3">Difficulty</th>
          <th class="px-4 py-3">Solved</th>
          <th class="px-4 py-3">Status</th>
          <th class="px-4 py-3">Author</th>
          <th class="px-4 py-3 text-nowrap">Not solved</th>
          <th class="px-4 py-3">Attempts</th>
          <th class="px-4 py-3">Has checker</th>
          <th class="px-4 py-3">Has solution</th>
          <th class="px-4 py-3">Kepcoin value</th>
          <th class="px-4 py-3">Likes</th>
          <th class="px-4 py-3">Dislikes</th>
          <th class="px-4 py-3">Hidden</th>
          <th class="px-4 py-3">Tags</th>
        </tr>
      </thead>
      <tr
        v-for="problem in filteredProblems"
        :key="problem.id"
        class="transition-all border-b hover:shadow-sm"
      >
        <td class="px-4 py-3 font-medium text-gray-900">{{ problem.id }}</td>
        <td class="px-4 py-3 font-medium text-gray-900">{{ problem.title }}</td>
        <td class="px-4 py-3">{{ problem.difficultyTitle }}</td>
        <td class="px-4 py-3">{{ problem.solved }}</td>
        <td class="px-4 py-3">
          {{
            problem.userInfo.hasSolved
              ? `solved`
              : problem.userInfo.hasAttempted
              ? `attempted`
              : `not attempted`
          }}
        </td>
        <td class="px-4 py-3">{{ problem.authorUsername }}</td>
        <td class="px-4 py-3">{{ problem.notSolved }}</td>
        <td class="px-4 py-3">{{ problem.attemptsCount }}</td>
        <td class="px-4 py-3">{{ problem.hasChecker }}</td>
        <td class="px-4 py-3">{{ problem.hasSolution }}</td>
        <td class="px-4 py-3">{{ problem.solutionKepcoinValue }}</td>
        <td class="px-4 py-3">{{ problem.likesCount }}</td>
        <td class="px-4 py-3">{{ problem.dislikesCount }}</td>
        <td class="px-4 py-3">{{ problem.hidden }}</td>
        <td class="px-4 py-3 space-x-2">
          <span
            class="px-2 py-1 border rounded-sm"
            v-for="tag in problem.tags"
            >{{ tag.name }}</span
          >
        </td>
      </tr>
    </table>
  </div>
</template>

<script setup>
import searchBar from "./searchBar.vue";
import { computed, ref } from "vue";

const searchKey = ref("");

const props = defineProps({
  problems: {
    type: Array,
    required: true,
  },
});

const filteredProblems = computed(() => {
  if (searchKey.value !== "") {
    return props.problems.filter((problem) =>
      problem.title.toLowerCase().includes(searchKey.value.toLowerCase())
    );
  } else {
    return props.problems
  }
});

const handleSearch = (search) => {
  searchKey.value = search;
};

</script>
