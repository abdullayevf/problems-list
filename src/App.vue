<template>
  
    <!-- Data table -->
    <DataTable
      :problems="problems"
      @search-key="handleFilter"
      @has-checker="handleChecker"
      @has-solution="handleSolution"
      @ordering="handleIdOrdering"
    />

  <!-- loading -->

  
</template>

<script setup>
import DataTable from "./components/dataTable.vue";
import { ref, onMounted } from "vue";

</script>
