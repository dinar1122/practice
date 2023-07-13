<script setup>
import Comment from "@/components/CommentItem.vue";
import Post from "@/components/Post.vue";
import { ref, onMounted } from "vue";
import commentariesService from "../services/commentariesService";
import defaultExport from "../components/Post.vue";
import { useRoute } from "vue-router";
import userService from "../services/userService";
import { useAuthStore } from "../stores/auth";
const date = ref(null);
const comments = ref();
const username = ref();
const commentValue = ref();
const route = useRoute();
const auth = useAuthStore();

const id = route.params.id; // read parameter id (it is reactive)
onMounted(async () => {
  comments.value = (await commentariesService.getComments(id)).data;

  for (let i = 0; i < comments.value.length; i++) {
     console.log(comments.value[i]);
    
    comments.value[i].username = (
      await userService.getUsername(comments.value[i].user_id)
    ).data.name;
    if ((comments.value[i].user_id) == (JSON.parse(localStorage.getItem("userInfo")).id) || JSON.parse(localStorage.getItem("userInfo")).is_admin == true)
      {
        comments.value[i].ruleDel = true
      } else {
        comments.value[i].ruleDel = false
      }
   
  }
  
});
async function createComment() {
  const userId = JSON.parse(localStorage.getItem("userInfo")).id;
  console.log(commentValue.value, id);
  await commentariesService.createComment(
    commentValue.value,
    id,
    userId,
    date.value
  );
}
</script>
<script>

export default {
  data() {
    return {
      inputVisibility: false,
    };
  },
  methods: {
    hideInput() {
      this.inputVisibility = true;
    },
  },
};
</script>
<template>
  <div class="post-view">
    <div class="news border-bottom mb-2">
      <div class="news-header d-flex justify-content-between">
        <div class="text-end text-success"></div>
      </div>
      <div class="mt-4"><Post /></div>
    </div>
    <div class="comments">
      <h5>Комментарии</h5>
      <div class="form-floating" v-if="auth.checkAuth">
        <textarea
          @focus="hideInput"
          v-model="commentValue"
          class="form-control"
          placeholder="Leave a comment here"
          id="floatingTextarea2"
        ></textarea>
        <button
          v-if="inputVisibility"
          @click="createComment()"
          class="btn-nb btn small-btn"
        >
          Отправить
        </button>
        <label for="floatingTextarea2">Ваш комментарий</label>
      </div>
      <Comment v-for="i in comments" :key="i.id" :comment="i" />
    </div>
  </div>
</template>