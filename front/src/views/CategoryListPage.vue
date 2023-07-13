<script setup>
import categoryService from "@/services/categoryService";
import { ref, onMounted } from "vue";
import { RouterLink, RouterView } from "vue-router";
const categories = ref();
onMounted(async () => {
  categories.value = (await categoryService.getCategories()).data;
});
</script>
<template>
  <div>
    <ul>
      <li class="nav cat-page" v-for="c in categories" :key="c.id">
        <RouterLink
          :to="{ name: 'categoryPage', params: { id: c.id } }"
          class="nav-link link-dark px-2 color"
          >{{ c.name }}</RouterLink
        >
      </li>
    </ul>
  </div>
</template>