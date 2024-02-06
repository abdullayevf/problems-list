<template>
    <form class="flex items-center space-x-2">
      
      <label for="hasSolution">Solution</label>
  
      <select @change="hasSolution" id="hasSolution" class="px-2 py-1 border border-gray-400 rounded-md">
        <option selected value=""></option>
        <option value="true">yes</option>
        <option value="false">no</option>
      </select>
    </form>
  </template>
  
  <script setup>
  import { ref } from "vue";
  
  const emit = defineEmits(['hasSolution'])
  
  const hasSolution = (e) => {
    console.log(e.target.value);
    emit('hasSolution', e.target.value)
  }
  </script>
  