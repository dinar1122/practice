<script setup>
import userService from "../services/userService"
import dateFormat, { masks } from "dateformat";
import commentariesService from "../services/commentariesService";
defineProps({
  comment: {
    id: Number,
    user_id: Number,
    username: String,
    comment_date: Date,
    content: String,
    ruleDel: String
  },
});
async function deleteComment(id) {
  console.log('deleted', id)
  alert('комментарий удален')
  await commentariesService.deleteCommentById(id)
  
}
</script>
<template>
  <div class="comment mt-3 border-bottom pb-3">
    <div class="comment__header">
      <RouterLink class="comment__header__username color" :to="{ name: 'userPage', params: { id: String(comment.user_id) } }">
        {{ comment.username}}
      </RouterLink>
      <span class="comment__header__time">Время:{{dateFormat( comment.comment_date, " dd.mm.yyyy HH:MM") }}</span>
      <span v-if="comment.ruleDel"  class="comment__header__time" @click="deleteComment(comment.id)"
          >удалить</span
        >
    </div>
    <div class="comment__content" style="margin-left: 0rem">
      {{ comment.content }}
    </div>
  </div>
</template>
<style>
.comment__header__username,
.nickname {
  text-decoration: none;
  padding-right: 0.5rem;
  font-weight: bolder;
}
.comment__header__time {
  margin-right: 1rem;
  font-size: 0.8rem;
  cursor: pointer;
}
.comment__content {}
</style>