<script setup>
import Card from "@/components/CardItem.vue";
import service from "@/services/newsService.js";
import { ref, onMounted } from "vue";
import newsService from "../services/newsService";
import categoryService from "../services/categoryService";
import { useAuthStore } from "../stores/auth";
const auth = useAuthStore();
const cards = ref();

/* onMounted(async () => {
  cards.value = (await service.getNews()).data
}) */
</script>
<script>
export default {
  data() {
    return {
      sortParam: null,
      cards: null,
      countCards: 9,
    };
  },
  async created() {
    var cards = await (await newsService.getNews()).data;
    for (let i = 0; i < cards.length; i++) {
      cards[i].category_name = await (
        await categoryService.getCategoryById(cards[i].category_id)
      ).data.name;
    }
    this.cards = cards;
  },
  computed: {
    sortedList() {
      this.sortParam = this.cards.sort(sortByTitle);
    },
  },methods: {
    loadMore: async function () {
      var countCards = this.countCards
      countCards += 6;
      console.log(countCards);
      this.countCards = countCards;
    },
  }
  
};
const sortByTitle = (d1, d2) =>
  d1.time.toLowerCase() < d2.time.toLowerCase() ? 1 : -1;
/* const sortByCompany = (d1, d2) => (d1.company.toLowerCase() > d2.company.toLowerCase()) ? 1 : -1;
const sortByPrice = (d1, d2) =>(d1.price > d2.price) ? 1 : -1; */
</script>

<template>
  <div class="container">
    <div id="app">
      <tr v-for="a in sortedList" :key="a.id"></tr>
    </div>
    <ul class="nav mb-4">
      <li class="nav-item">
        <RouterLink to="/" class="green btn-tab color">Все записи</RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink to="/current" class="green btn-tab color btn-tab-focus">Свежее</RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink v-if="auth.checkAuth" to="/usersubs" class="green btn-tab color"
          >Мои подписки</RouterLink
        >
      </li>
    </ul>
    <div id="app" class="row row-cols-1 row-cols-md-3 g-4">
      <Card v-for="card in cards.slice(0, countCards)" :key="card.id" :card="card" />
      <button class="btn-nb" style="margin-left: 34.5%; padding: 0 9rem 0;" @click="loadMore">Загрузить еще</button>
    </div>
  </div>
</template>