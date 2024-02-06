<template>
  <form class="flex items-center space-x-2">
    
    <label for="hasChecker">Checker</label>

    <select @change="hasChecker" id="hasChecker" class="px-2 py-1 border border-gray-400 rounded-md">
      <option selected value=""></option>
      <option value="true">yes</option>
      <option value="false">no</option>
    </select>
  </form>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(['hasChecker'])

const hasChecker = (e) => {
  emit('hasChecker', e.target.value)
}
</script>
