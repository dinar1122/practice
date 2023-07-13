<script setup>
import Post from "@/components/ListPostItem.vue";
import { ref, onMounted } from "vue";
import service from "@/services/newsService.js";
import Settings from "../components/icons/IconSettings.vue";
import { RouterLink, RouterView } from "vue-router";
import dateFormat, { masks } from "dateformat";
import ratingService from "../services/ratingService";
import userService from "../services/userService";
const user = {
  img: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
};
let user_id = JSON.parse(localStorage.getItem("userInfo")).id;
var rating = ref(0);
const posts = ref();
var oldPassword = ref();
var newPassword = ref();
var newPasswordConfirmed = ref();
var sum = ref(0);
onMounted(async () => {
  posts.value = (await service.getNewsByUserId(user_id)).data;
  for (let i = 0; i < posts.value.length; i++) {
    rating = (await ratingService.getRating(posts.value[i].id)).data[0].rating;
    sum.value += rating;
  }
});

var newUsername = ref(null);
var username = JSON.parse(localStorage.getItem("userInfo")).name;
let user_reg_date = JSON.parse(localStorage.getItem("userInfo")).reg_date;
async function updateUsername() {

 var e = await userService.updateUsername(newUsername.value, username);
 console.log(e)
 if (e.e != null)
  alert(e.e)
}
async function updatePassword() {
  if (newPassword.value == newPasswordConfirmed.value){
    let userId = JSON.parse(localStorage.getItem("userInfo")).id;
  let username = JSON.parse(localStorage.getItem("userInfo")).name;
  const e = await userService.updatePassword(userId, newPassword.value, oldPassword.value, username)
  alert(e.data.e)
  }
  else {
    alert('Пароли не совпадают')
  }
}

</script>
<template>
  <div class="container">
    <div
      class="profile-header d-flex mb-5 row"
      style="width: max-content; margin: auto"
    >
      <div class="profile-header mb-4" style="">
        <div class="profile-header__avatar mb-4">
          <img :src="user.img" alt="" />
        </div>
        <div class="profile-header__info align-self-center">
          <div class="profile-header__title fw-bold mb-3">Ваш ник: {{ username }}</div>
          <div class="profile-header__stats">
            <div class="profile-header__stats__rating mb-3">
              Ваш рейтинг:
              <span>{{ sum }}</span>
            </div>
            <div class="profile-header__stats__registration-date">
              На проекте с {{ dateFormat(user_reg_date, "dd.mm.yyyy") }}
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="mb-3 auth">
          <label class="form-label">Имя пользователя</label>
          <input class="form-control input-nb mb-3" v-model="newUsername" />
          <button @click="updateUsername()" type="submit" class="btn-nb">
          Сохранить
        </button>
        </div>
        <div class="mb-3 auth">
          <label class="form-label">Старый пароль</label>
          <input
            type="text"
            class="form-control input-nb"
            v-model="oldPassword"
          />
        </div>
        <div class="mb-3 auth">
          <label class="form-label">Новый пароль</label>
          <input
            type="text"
            class="form-control input-nb"
            v-model="newPassword"
          />
        </div>
        <div class="mb-3 auth">
          <label class="form-label">Повторите новый пароль</label>
          <input
            type="text"
            class="form-control input-nb"
            v-model="newPasswordConfirmed"
          />
        </div>
        <button @click="updatePassword()" type="submit" class="btn-nb">
          Сохранить
        </button>
      </div>
    </div>
  </div>
</template>