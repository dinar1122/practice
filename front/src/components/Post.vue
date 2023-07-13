<script >
import service from "@/services/newsService.js";
import categoryService from "../services/categoryService";
import userService from "../services/userService";
import IconUp from "./icons/IconUp.vue";
import IconDown from "@/components/icons/IconDown.vue";
import { ref, onMounted } from "vue";
import Markdown from "vue3-markdown-it";
import dateFormat, { masks } from "dateformat";
import ratingService from "../services/ratingService";
import newsService from "../services/newsService";

let text = ref(null);

var id = null;

export default {
  data() {
    return {
      postId: null,
      source: null,
      date: null,
      text: "null",
      category_name: null,
      username: null,
      user_id: null,
      title: null,
      rating: null,
      category_id: null,
      ruleDel: false,
    };
  },
  async created() {
    var postId = this.$route.params.id;
    var text = (await service.getNewsById(postId)).data.content;
    var title = (await service.getNewsById(postId)).data.name;
    var date = (await service.getNewsById(postId)).data.time;
    var category_id = (await service.getNewsById(postId)).data.category_id;
    var user_id = (await service.getNewsById(postId)).data.user_id;
    var category_name = (await categoryService.getCategoryById(category_id))
      .data.name;
    var username = await (await userService.getUsername(user_id)).data.name;
    var rating = (await ratingService.getRating(postId)).data[0].rating;
    date = dateFormat(date, "dd.mm.yyyy hh:mm");
    if (JSON.parse(localStorage.getItem("userInfo")) != null) {
      if (
        (await service.getNewsById(postId)).data.user_id ==
          JSON.parse(localStorage.getItem("userInfo")).id ||
        JSON.parse(localStorage.getItem("userInfo")).is_admin == true
      ) {
        var ruleDel = true;
        this.ruleDel = ruleDel;
      }
    }
    this.text = text;
    this.title = title;
    this.date = date;
    this.category_id = category_id;
    this.category_name = category_name;
    this.username = username;
    this.postId = postId;
    this.rating = rating;
    this.user_id = user_id;
    console.log(user_id);
  },
  components: {
    Markdown,
    IconDown,
    IconUp,
  },
  methods: {
    upVote: async function () {
      const userId = ref(JSON.parse(localStorage.getItem("userInfo")).id);
      await ratingService.incRate(this.postId, userId.value);
    },
    downVote: async function () {
      const userId = ref(JSON.parse(localStorage.getItem("userInfo")).id);
      await ratingService.decRate(this.postId, userId.value);
    },
    deletePost: async function () {
      var postId = this.$route.params.id;
      location.reload();
      window.location.href = "/";
      await newsService.deletePost(postId);
    },
  },
};
</script>


<template>
  <div>
    <h2>{{ title }}</h2>
    <Markdown :source="text" />
    <div class="mb-2 row">
      <div class="col">
        <span class="m-1 link-post">{{ date }}</span>
        <RouterLink
          :to="{ name: 'categoryPage', params: { id: String(category_id) } }"
          class="m-1 link-post"
          >{{ category_name }}</RouterLink
        >
        <RouterLink
          :to="{ name: 'userPage', params: { id: String(user_id) } }"
          class="m-1 link-post"
          >{{ username }}</RouterLink
        >
        <span v-if="ruleDel" class="m-1 link-post" @click="deletePost"
          >удалить</span
        >
      </div>
      <div class="col-2">
        <a style="cursor: pointer" @click="downVote"
          ><IconDown class="col"
        /></a>
        <span class="m-1 link-post">{{ rating }}</span>
        <a style="cursor: pointer" @click="upVote"><IconUp class="col" /></a>
      </div>
    </div>
  </div>
</template>