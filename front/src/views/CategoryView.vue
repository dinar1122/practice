<script>
import categoryService from "../services/categoryService";
import newsService from "../services/newsService";
import Posts from "../components/ListPostItem.vue";
import subsService from "../services/subsService";
import { ref, onMounted } from "vue";
export default {
  data() {
    return {
      id: null,
      list: null,
      categoryName: null,
      categoryListId: null,
      inputVisibility: false,
      subsVisibility: true,
/*       subsSucces: false */
    };
  },
  async created() {
    var categoryName = await (
      await categoryService.getCategoryById(this.$route.params.id)
    ).data.name;
    var id = await (
      await categoryService.getCategoryById(this.$route.params.id)
    ).data.id;
    var list
    list = await (await newsService.getNewsByCategoryId(id)).data;
    this.list = list;
    this.categoryName = categoryName;
    const userId = ref(JSON.parse(localStorage.getItem("userInfo")).id);
    var categoryListId = await (
      await subsService.getSubsByUserId(userId.value)
    ).data;
    for (let i = 0; i < categoryListId.length; i++) {
      if (categoryListId[i].category_id == this.$route.params.id) {
        this.inputVisibility = true;
        this.subsVisibility = false
      } 
    }
  },
  components: {
    Posts
},
  methods: {
    subscribe: async function () {
      const categoryId = this.$route.params.id;
      const userId = ref(JSON.parse(localStorage.getItem("userInfo")).id);
      await subsService.subscribe(userId.value, categoryId);
    },
    unsubscribe: async function () {
      const categoryId = this.$route.params.id;
      const userId = ref(JSON.parse(localStorage.getItem("userInfo")).id);
      await subsService.unsubscribe(userId.value, categoryId);
    },
   /*  showSucces: async function () {
      this.subsSucces = true
    } */
    
  },
};
</script>
<template>
  <div>
    <div class="row">
      <div class="col-1 category-title btn-nb">
        Категория: {{ categoryName }}
      </div>
      <button v-if="inputVisibility" @click="unsubscribe()" class="col-1 category-title btn-nb">
        Отписаться
      </button>
      <button v-if="subsVisibility" @click="subscribe()" class="col-1 category-title btn-nb">
        Подписаться
      </button>
    </div>
    <Posts v-for="i in list" :key="i.name" :list="i" />
  </div>
</template>