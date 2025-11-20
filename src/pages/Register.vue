<template>
  <div class="auth">
    <h2>Register</h2>

    <form @submit.prevent="registerUser">
      <input type="text" v-model="username" placeholder="Username" required/>

      <input type="email" v-model="email" placeholder="Email" required/>

      <input type="password" v-model="password" placeholder="Password" required/>

      <button class="btn" type="submit">Register</button>
    </form>

    <p>
      Already have an account?
      <router-link to="/login">Login</router-link>
    </p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import API from "../api";
import { useRouter } from "vue-router";

const username = ref("");
const email = ref("");
const password = ref("");

const router = useRouter();

function registerUser() {
  API.post("/users/register", {
    username: username.value,
    email: email.value,
    password: password.value,
  })
    .then(() => {
      alert("Registration successful! Please log in.");
      router.push("/login");
    })
    .catch((err) => {
      alert(err.response?.data?.message || "Registration failed");
    });
}
</script>
