<template>
  <form class="flex items-center py-3">
    <label class="sr-only">Search</label>
    <div class="relative w-full">
      <input
        placeholder="Search"
        @input="search"
        type="text"
        class="px-3 py-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
      />
    </div>
  </form>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(["search"]);

const search = (e) => {
  emit("search", e.target.value);
};
</script>
