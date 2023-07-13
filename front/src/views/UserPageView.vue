<script setup>
import Post from "@/components/ListPostItem.vue";
import { ref, onMounted } from "vue";
import service from "@/services/newsService.js";
import Settings from "../components/icons/IconSettings.vue";
import { RouterLink, RouterView } from "vue-router";
import dateFormat, { masks } from "dateformat";
import Comments from "../components/CommentItem.vue";
import newsService from "../services/newsService";
import ratingService from "../services/ratingService";
import ProfileTab from "../components/ProfileTab.vue";
import userService from "../services/userService";
import { useRoute } from "vue-router";
import ListPost from "../components/ListPostItem.vue"
const route = useRoute();
const user = {
  img: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
};

</script>
<script>
export default {
  data() {
    return {
      user_id: null,
      user_name: null,
      reg_date: null,
      list: null,
      sum: null,
      ruleDel: false,
    };
  },
  async created() {
    var rating = ref(0);
    var sum = ref(0);
    var posts = ref();
    let user_name = await (await userService.getUsername(this.$route.params.id)).data.name;
    console.log(await (await userService.getUsername(this.$route.params.id)).data);
    let reg_date = await (await userService.getUsername(this.$route.params.id)).data.reg_date
    let user_id = await (await userService.getUsername(this.$route.params.id)).data.id
    posts = (await service.getNewsByUserId(user_id)).data;
    if (JSON.parse(localStorage.getItem("userInfo")).is_admin == true) {
      var ruleDel = true;
        this.ruleDel = ruleDel;
    }
    for (let i = 0; i < posts.length; i++) {
    rating = (await ratingService.getRating(posts[i].id)).data[0].rating;
    sum.value += rating;
  }
    this.user_name = user_name
    this.reg_date = reg_date
    this.sum = sum
    this.list = (await service.getNewsByUserId(user_id)).data;

  },
  components: ListPost,
  methods: { 
    deleteUser: async function () {
      var userId = this.$route.params.id;
      await userService.deleteUser(userId)
    }
  }
};
</script>
<template>
  <div class="container">
    <div class="profile-header d-flex mb-5">
      <div
        class="profile-header d-flex container-fluid"
        style="margin-left: 5rem"
      >
        <div class="profile-header__avatar align-self-center">
          <img width="110" height="150" :src="user.img" alt="" />
        </div>
        <div
          class="profile-header__info align-self-center"
          style="margin-left: 1rem"
        >
          <div class="profile-header__title fw-bold mb-2">{{user_name}}</div>
          <div class="profile-header__stats">
            <div class="profile-header__stats__rating text-success">
              
              {{ sum }}
            </div>
            <div class=" mb-2 profile-header__stats__registration-date">
              На проекте с {{ dateFormat(reg_date, "dd.mm.yyyy") }}
            </div>
            <span v-if="ruleDel" class="link-post" @click="deleteUser"
          >удалить пользователя</span
        >
          </div>
        </div>
      </div>
    </div>
    <div class="profile-tabs row"></div>
    <div class="profile-view profile-content">
      
    </div>
    <button
        class="color btn-nb1"
        >
          Публикации
        </button>
        <div style="margin-left:4rem"><ListPost v-for="i in list" :key="i.id" :list="i" /></div>
  </div>
</template>