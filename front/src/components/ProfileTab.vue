<script>
import { ref, onMounted } from "vue";
import ratingService from "../services/ratingService";
import service from "@/services/newsService.js";
import Posts from "./ListPostItem.vue";
import Comments from "./CommentItemProfile.vue"
import commentariesService from '../services/commentariesService';
import { RouterLink, RouterView } from "vue-router";
export default {
  el: "app",
  data() {
    
    return {
      //button
      showActive: true,
      isActive: true,
      isArhive: false,
      userId: null,
      list: null,
      comments: null,
    };
  },
  async created() {
    let userId = JSON.parse(localStorage.getItem("userInfo")).id;
    this.comments = await (await commentariesService.getCommentsById(userId)).data    
    this.list = (await service.getNewsByUserId(userId)).data;
  },
  
  components: { Posts , Comments},
};
</script>
<template>
  <div id="app">
    <div class="container-wrapper" >
      <div class="d-flex flex-start mb-5">
        <button
        class="color"
          id="btn-active-ticket"
          @click="showActive = true"
          :class="{ green: showActive }"
        >
          Публикации
        </button>
        <button
        class="color"
          id="btn-archive"
          @click="showActive = false"
          :class="{ green: !showActive }"
        >
          Комментарии
        </button>
        
        <RouterLink to="/profileedit" 
        ><button
        class="color btn-nb-profile"
          
        >
          Настройки
        </button>
      </RouterLink>
      </div>
      <transition id="app" name="fade" mode="out-in" >
        <div key="show" v-if="showActive" class="d-flex flex-wrap">
          <Posts v-for="i in list" :key="i.id" :list="i"/>
        </div>
        <div key="hide" v-else>
          <Comments v-for="i in comments" :key="i.id" :comment="i"/>
        </div>
      </transition>
    </div>
  </div>
</template>