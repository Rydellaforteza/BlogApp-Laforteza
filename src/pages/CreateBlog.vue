<template>
  <div class="auth">
    <h2>Create Blog</h2>

    <form @submit.prevent="submit">
      <input v-model="title" placeholder="Title" required/>

      <textarea v-model="content" placeholder="Content" required></textarea>

      <button class="btn" type="submit">Create</button>
    </form>

    <p class="muted">{{ message }}</p>
  </div>
</template>

<script>
import API from "../api";

export default {
  data() {
    return {
      title: "",
      content: "",
      message: ""
    };
  },

  methods: {
    submit() {
      API.post("/blogs", {
        title: this.title,
        content: this.content
      })
        .then(() => {
          this.message = "Created";
          this.$router.push("/blogs");
        })
        .catch((err) => {
          this.message =
            err.response?.data?.message || "Error creating blog";
        });
    }
  }
};
</script>
