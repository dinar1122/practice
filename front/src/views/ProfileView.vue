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
const user = {
  img: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
};
let user_id = JSON.parse(localStorage.getItem("userInfo")).id;
var posts = ref();
var rating = ref(0);
var sum = ref(0);
onMounted(async () => {
  posts = (await service.getNewsByUserId(user_id)).data;
  posts = (await service.getNewsByUserId(user_id)).data;
  for (let i = 0; i < posts.length; i++) {
    rating = (await ratingService.getRating(posts[i].id)).data[0].rating;
    sum.value += rating;
  }
});
let user_name = JSON.parse(localStorage.getItem("userInfo")).name;
let user_reg_date = JSON.parse(localStorage.getItem("userInfo")).reg_date;
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
          <div class="profile-header__title fw-bold mb-2">{{ user_name }}</div>
          <div class="profile-header__stats">
            <div class="profile-header__stats__rating text-success">
              
              {{ sum }}
            </div>
            <div class="profile-header__stats__registration-date">
              На проекте с {{ dateFormat(user_reg_date, "dd.mm.yyyy") }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="profile-tabs row"></div>
    <div class="profile-view profile-content">
      <Post v-for="i in posts" :key="i" :post="i" />
    </div>
    <ProfileTab />
  </div>
</template>