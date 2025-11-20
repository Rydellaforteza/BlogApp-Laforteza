<template>
  <nav class="navbar">
    <router-link to="/" class="logo logo-wrapper">
      <img src="../assets/logo.jpg" class="nav-logo" />
      <span>SilentJournal</span>
    </router-link>

    <div class="nav-links">
      <router-link to="/blogs">Blogs</router-link>

      <router-link 
        v-if="global.user" 
        to="/create"
      >
        Create
      </router-link>

      
      <template v-if="!global.user">
        <router-link to="/login">Login</router-link>
        <router-link to="/register" class="nav-btn">Register</router-link>
      </template>

      
      <template v-else>
        <span class="nav-username">Hi, {{ global.user.username }}!</span>
        <button class="nav-btn" @click="logout">Logout</button>
      </template>
    </div>
  </nav>
</template>

<script setup>
import { useGlobalStore } from "../store/global";
import { useRouter } from "vue-router";

const global = useGlobalStore();
const router = useRouter();

function logout() {
  global.logout();
  router.push("/login");
}
</script>
