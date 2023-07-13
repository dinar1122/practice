<script setup>
import { RouterLink, RouterView } from "vue-router";
import categoryService from "../services/categoryService";
import { ref, onMounted } from "vue";
import newsService from "../services/newsService";
import dateFormat, { masks } from "dateformat";
import ratingService from "../services/ratingService";

var categorySelected = ref();
const categories = ref();
const name = ref(null);
const description = ref(null);
const user_id = ref(JSON.parse(localStorage.getItem('userInfo')).id);
const category_id = ref(null);
var picpreview = ref(null);
const time = ref(null);
const content = ref(null);
const news_id = ref(null);
const rating = 0;

onMounted(async () => {
  categories.value = (await categoryService.getCategories()).data;
});

/* console.log((await categoryService.getCategories()).data) */
async function createPost() {
  console.log(content.value)
  await newsService.createPost(
    name.value,
    content.value,
    user_id.value,
    category_id.value,
    description.value,
    picpreview,
    time.value,
    description.value,
    rating.value,
    news_id.value
  );
  location.reload();
      window.location.href = "/";

}
async function func() {
  categories.value = (await categoryService.getCategories()).data;
  
  for (let i = 0; i < categories.value.length; i++) {
    if (categorySelected.value == categories.value[i].name) {
      category_id.value = categories.value[i].id;
    } else {
    }
  }
}

function encodeImageFileAsURL() {
  var filesSelected = document.getElementById("inputFileToLoad").files;
  if (filesSelected.length > 0) {
    var fileToLoad = filesSelected[0];

    var fileReader = new FileReader();

    fileReader.onload = function (fileLoadedEvent) {
      var srcData = fileLoadedEvent.target.result; // <--- data: base64

      var newImage = document.createElement("img");

      newImage.src = srcData;
      picpreview = srcData.replace(/^data:image\/(png|jpg|jpeg|webp);base64,/, "");
      document.getElementById("imgTest").innerHTML = newImage.outerHTML;
      document.getElementById("imgTest").firstChild.classList.add("imgPrev");
    };
    fileReader.readAsDataURL(fileToLoad);
  }
}


</script>
<template>
  <div class="row" style="margin-left:2rem">
    <div class="container bgcont center-block" style="max-width: 800px">
      <div class="form-group">
        <label for="exampleFormControlSelect1" class="mb-2 ">Категория</label>
        <select
          @change="func()"
          v-model="categorySelected"
          class="form-control input-nb"
          id="exampleFormControlSelect1"
        >
          <option v-for="c in categories" :key="c.id">{{ c.name }}</option>
        </select>
      </div>
      <div class="input-group mb-3 mt-3">
        <input
          type="file"
          class="form-control "
          id="inputFileToLoad"
          @change="encodeImageFileAsURL()"
        />
        <label class="input-group-text" for="inputGroupFile02">Превью</label>
      </div>
      <div class="form-group mt-3">
        <input
          type="email"
          class="form-control mb-2 input-nb"
          placeholder="Заголовок"
          v-model="name"
        />
        <textarea
          style="height: 50px; max-height: 150px; overflow:hidden;"
          v-model="description"
          placeholder="Описание"
          class="form-control mt-3"
          id="exampleFormControlTextarea1"
          rows="3"
        ></textarea>
        <textarea
          style="min-height:150px;"
          placeholder="Поле для ввода"
          v-model="content"
          class="form-control mt-3"
          id="exampleFormControlTextarea1"
          rows="3"
        ></textarea>
        <button
          type="button"
          class="btn mt-3 btn-nb"
          
          @click="createPost()"
        >
          Опубликовать
        </button>
        
      </div>
    </div>
    <div class="example-shadow-2 col p-0 card-posts" style="margin-left: 2rem; margin-top: 0.8rem;">
      <RouterLink to="post"
        ><div class="scale card h-100" style="width:387px; border-radius:0.7rem">
          <div class="scale card-img-top">
            <div class="scale" id="imgTest"></div>
          </div>
          <div class="card-body" style="min-height: 15rem">
            <h5 class="card-title">{{name}}</h5>
            <p class="card-text">{{description}}</p>
          </div>
          <div class="card-footer">
            <small class="text-muted">{{dateFormat(new Date(), "dd.mm.yyyy")}}</small>
          </div></div
      ></RouterLink>
    </div>
  </div>
</template>