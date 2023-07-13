<script setup>
import dateFormat, { masks } from "dateformat";
defineProps({
  list: {
    id: Number,
    name: String,
    time: Date,
    description: String,
    rating: Number
  },
});
</script>
<template>
  <div class="profile-content__item border-bottom mb-4 pb-4 mt-6" style="padding-left:1rem">
    <RouterLink style="text-decoration:none;" :to="{name: 'postPage' , params: {id: list.id}}"
      ><div class="profile-content__item__header fs-5">
      <a href="#" class=" link-nb" >{{ list.name }}</a>
    </div>
    <div class="profile-content__item__body text-secondary">
      {{ list.description }}
    </div>
    <div class="profile-content__item__footer mt-2">
      <span class="text-secondary link-post-list">{{ dateFormat(list.time, "dd.mm.yyyy HH:MM") }}</span>
    </div>
    
    </RouterLink>
    
  </div>
</template>