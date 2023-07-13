<script setup>
import Card from "@/components/CardItem.vue";
import newsService from "@/services/newsService.js";
import { ref, onMounted } from "vue";
import categoryService from "../services/categoryService";
import { useAuthStore } from "../stores/auth";
import subsService from "../services/subsService";
const cards = ref();
const newArray = ref();
const auth = useAuthStore();
onMounted(async () => {
  cards.value = (await newsService.getNews()).data;
  var cards1 = await (await newsService.getNews()).data;
  for (let i = 0; i < cards1.length; i++) {
    cards.value[i].category_name = await (
      await categoryService.getCategoryById(cards1[i].category_id)
    ).data.name;
  }
  const userId = ref(JSON.parse(localStorage.getItem("userInfo")).id);
  console.log(await subsService.getSubsByUserId(userId.value));
  var category = await (await subsService.getSubsByUserId(userId.value)).data;
  console.log(category.length);
  for (let i = 0; i < 3; i++) {
    newArray.value = cards.value.filter(function (f) {
      for (let i = 0; i < category.length; i++) {
        if (f.category_id == category[i].category_id) return f.category_id;
      }
    });
  }
});
</script>

<template>
  <div class="container" v-if="auth.checkAuth">
    <ul class="nav mb-4" >
      <li class="nav-item">
        <RouterLink to="/" class="green btn-tab color">Все записи</RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink to="/current" class="green btn-tab color">Свежее</RouterLink>
      </li>
      <li class="nav-item" >
        <RouterLink   to="/usersubs" class="green btn-tab color btn-tab-focus"
          >Мои подписки</RouterLink
        >
      </li>
    </ul>
    <div class="row row-cols-1 row-cols-md-3 g-4">
      <Card v-for="card in newArray" :key="card.id" :card="card" />
    </div>
  </div>
</template>