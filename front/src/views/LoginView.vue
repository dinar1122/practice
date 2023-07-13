<script setup>
import { ref } from "@vue/reactivity";
import userService from "@/services/userService";
const login1 = ref(null);
const password = ref(null);

async function login() {
  var e = await userService.login(login1.value, password.value);
  console.log(e.e);
  if (e.e != null) {
    alert(e.e);
  } else {
    window.location.href = "/";
  }
}
</script>

<template>
  <div class="container auth">
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">Логин</label>
      <input
        v-model="login1"
        type="email"
        class="form-control"
        id="exampleInputEmail1"
        aria-describedby="emailHelp"
        required
        minlength="6"
        maxlength="30"
      />
    </div>
    <div class="mb-3">
      <label for="exampleInputPassword1" class="form-label">Пароль</label>
      <input
        v-model="password"
        type="password"
        class="form-control"
        id="exampleInputPassword1"
        required
        minlength="6"
        maxlength="30"
      />
    </div>
    <div class="mb-3 form-check">
      <input type="checkbox" class="form-check-input" id="exampleCheck1" />
      <label class="form-check-label" for="exampleCheck1">Запомнить</label>
    </div>
    <button type="submit" class="btn btn-nb" @click="login">Войти</button>
  </div>
</template>
<style>
@import "./../assets/base.css";
</style>