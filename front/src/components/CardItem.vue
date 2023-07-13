<script setup>
import dateFormat, { masks } from "dateformat";
import { RouterLink, RouterView } from "vue-router";

defineProps({
  card: {
    id: Number,
    picpreview: String,
    name: String,
    time: Date,
    description: String,
    category_id: Number,
    category_name: String
  }
});

</script>
<template>
  <div class="example-shadow-2 col p-0 card-posts"  >
    <RouterLink :to="{name: 'postPage' , params: {id: card.id} }"
      ><div class="scale card h-100" style="border-radius:0.7rem !important" >
        <div class=" scale card-img-top">
          <img 
            :src="'data:image/png;base64, ' + card.picpreview"
            class="scale card-img-top imgPrev"
          />
        </div>
        <div class="card-body color-card" style="min-height:16rem; max-width: 25rem; min-width: 23rem;">
          <h5 class="card-title ">{{ card.name }}</h5>
          <p class="card-text">
            {{ card.description }}
          </p>
        </div>
        <div class="card-footer row">
          <small class="text-muted col">{{  dateFormat(card.time, "dd.mm.yyyy HH:MM")}}</small>
          <small class="color-card col-5" style="width:max-content">{{card.category_name}}</small>
        </div>
      </div></RouterLink
    >
  </div>
</template>
<style>
@import "./../assets/base.css";
</style>
