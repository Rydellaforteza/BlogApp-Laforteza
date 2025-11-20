<template>
  <div class="auth">
    <h2>Login</h2>

    <form @submit.prevent="loginUser">
      <input type="email" v-model="email" placeholder="Email" required/>

      <input type="password" v-model="password" placeholder="Password" required/>

      <button class="btn" type="submit">Login</button>
    </form>

    <p>
      Don't have an account?
      <router-link to="/register">Register</router-link>
    </p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import API from "../api";
import { useRouter } from "vue-router";
import { useGlobalStore } from "../store/global";

const email = ref("");
const password = ref("");

const router = useRouter();
const global = useGlobalStore();

function loginUser() {
  API.post("/users/login", { email: email.value, password: password.value })
    .then((res) => {
      const token = res.data.access;
      global.setUserFromToken(token); 
      router.push("/blogs");
    })
    .catch((err) => {
      alert(err.response?.data?.message || "Login failed");
    });
}
</script>
