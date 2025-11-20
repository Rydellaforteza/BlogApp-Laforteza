<template>
  <div class="auth">
    <h2>Edit Blog</h2>

    <form @submit.prevent="updateBlog">
      <input v-model="title" placeholder="Title" />
      <textarea v-model="content" placeholder="Content"></textarea>
      <button class="btn">Save Changes</button>
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

  mounted() {
    this.loadBlog();
  },

  methods: {
    loadBlog() {
      API.get(`/blogs/${this.$route.params.blogId}`)
        .then(res => {
          this.title = res.data.title;
          this.content = res.data.content;
        })
        .catch(() => {
          this.message = "Failed to load blog.";
        });
    },


    updateBlog() {
      API.patch(`/blogs/${this.$route.params.blogId}/edit`, {
        title: this.title,
        content: this.content
      })
        .then(() => {
          this.message = "Blog updated!";
          this.$router.push(`/blogs/${this.$route.params.blogId}`);
        })
        .catch(err => {
          this.message = err.response?.data?.message || "Update failed.";
        });
    }
  }
};
</script>
