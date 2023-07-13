<script setup>
import userService from "../services/userService"
import dateFormat, { masks } from "dateformat";
defineProps({
  comment: {
    username: String,
    comment_date: Date,
    content: String,
  },
});


</script>

<template>
  <div class="comment mt-3 border-bottom pb-3">
    <div class="comment__header">
      <span class="comment__header__time">Время:{{dateFormat( comment.comment_date, " dd.mm.yyyy HH:MM") }}</span>
    </div>
    <div class="comment__content" style="margin-left: 0rem">
      {{ comment.content }}
    </div>
  </div>
</template>
