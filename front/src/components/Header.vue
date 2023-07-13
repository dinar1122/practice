<script setup>
import { RouterLink, RouterView } from "vue-router";
import { useAuthStore } from "../stores/auth";
import IconNewPost from "@/components/icons/IconNewPost.vue";
import categoryService from "@/services/categoryService";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const categories = ref();
const id = route.params.id;
const auth = useAuthStore();
onMounted(async () => {
  
  categories.value = (await categoryService.getCategories()).data;
});
async function logout() {
  localStorage.removeItem("user");
  localStorage.removeItem("userInfo");
  location.reload();
}
async function refresh() {
  location.reload();
}
</script>
<template>
  <div>
    <header class="pt-3 mb-5 bg-light">
      <nav class="py-2 border-bottom pb-4">
        <div class="container d-flex flex-wrap">
          <ul class="nav me-auto">
            <RouterLink
              to="/"
              class="
                d-flex
                align-items-center
                mb-3 mb-lg-0
                me-lg-auto
                text-dark text-decoration-none
              "
            >
              <span class="fs-4 ms-3 m-2 mt-0 link-post" style="font-family:Verdana, Geneva, Tahoma, sans-serif; ">NBlog</span>
            </RouterLink>
            <li class="nav-item" v-for="c in categories" :key="c.id">
              <RouterLink :to="{name: 'categoryPage' , params: {id: c.id} }"  class="nav-link link-dark px-2 color">{{ c.name }}</RouterLink>
            </li>
          </ul>
          <ul class="nav">
            
          </ul>
          <ul class="nav " v-if="auth.checkAuth" style="margin-right: 1rem">
          <li class="nav-item">
              <RouterLink
                to="/NewsPostCreate"
                class="nav-link link-dark px-2 color"
                style="padding-top: 0.4rem"
                ><IconNewPost style="padding-bottom:0.2rem; padding-left: 0.2rem;" class="m-2 text-dark mb-2 " /><span
                  >Создать</span
                ></RouterLink
              >
            </li>
            <li class="nav-item">
              <RouterLink to="/profile" class="nav-link link-dark px-2 color"
                >Профиль</RouterLink
              >
            </li>
            <li class="nav-item">
              <RouterLink
                to="#"
                class="nav-link link-dark px-2 color"
                @click="logout()"
                >Выйти</RouterLink
              >
            </li>
          </ul>
          <ul class="nav" v-else>
            <li class="nav-item">
              <RouterLink to="login" class="nav-link link-dark px-2 color"
                >Вход</RouterLink
              >
            </li>
            <li class="nav-item">
              <RouterLink to="register" class="nav-link link-dark px-2 color"
                >Регистрация</RouterLink
              >
            </li>
          </ul>
        </div>
      </nav>

      <div class="container d-flex flex-wrap justify-content-center"></div>
    </header>
  </div>
</template>