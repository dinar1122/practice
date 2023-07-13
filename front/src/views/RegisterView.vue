<script setup>
import { ref } from "@vue/reactivity";
import userService from "@/services/userService";

const login = ref(null);
const password = ref(null);
const passwordConfirmed = ref(null);

async function register() {
  console.log(login.value, password.value, passwordConfirmed.value);
  if (login.value.length >= 5) {
    if (password.value == passwordConfirmed.value)
      if (password.value.length >= 8) {
        var e = await userService.register(login.value, password.value);
        if (e != null) alert(e);
        else {
          location.reload();
          window.location.href = "/login";
        }
      } else alert("Короткий пароль, необходимо не менее 8 символов");
    else alert("Пароли не совпадают");
  } else {
    alert("Слишком короткое имя пользователя, необходимо не менее 5 символов");
  }
}
</script>
<template>
  <div class="container auth">
    <div class="mb-3">
      <label class="form-label">Логин</label>
      <input type="text" class="form-control" v-model="login" />
    </div>
    <div class="mb-3">
      <label class="form-label">Пароль</label>
      <input type="password" class="form-control" v-model="password" />
    </div>
    <div class="mb-3">
      <label class="form-label">Повторите пароль</label>
      <input type="password" class="form-control" v-model="passwordConfirmed" />
    </div>

    <button type="submit" class="btn btn-nb" @click="register">
      Зарегистрироваться
    </button>
  </div>
</template>
<style>
@import "./../assets/base.css";
</style>