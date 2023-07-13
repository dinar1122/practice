<script setup>
import { RouterLink, RouterView } from "vue-router";
import NewsIcon from "@/components/icons/IconNews.vue";
import Header from "./components/Header.vue"
import IconNewPost from "@/components/icons/IconNewPost.vue";


</script>

<template>
  <div>
    <Header />

    <main class="content">
      <div class="container">
        <RouterView />
      </div>
    </main>
    <footer class="py-3 my-4">
      
      <ul class="nav justify-content-center border-bottom pb-3 mb-3" style="margin-top:5rem">
        <li class="nav-item">
          <a href="#" class="nav-link px-2 text-muted">О нас</a>
        </li>
        <li class="nav-item">
          <a href="#" class="nav-link px-2 text-muted">Сотрудничество</a>
        </li>
      </ul>
      <p class="text-center text-muted">© 2022 NBlog</p>
    </footer>
  </div>
</template>

<style>
@import url("https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css");
@import "./assets/base.css";
</style>

