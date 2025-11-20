<template>
  <div v-if="loading">Loading...</div>

  <div v-else-if="blog">
    <h1>{{ blog.title }}</h1>
    <p class="meta">by {{ blog.author?.username }}</p>
    <div class="content">{{ blog.content }}</div>

    
    <div v-if="canEditBlog" class="blog-actions">
  <button class="btn" @click="goToEdit">Edit Blog</button>
  <button class="delete-btn" @click="deleteBlog">Delete Blog</button>
</div>


<hr />

   
<section class="comments">
    <h3>Comments</h3>

    <div v-for="c in blog.comments" :key="c._id" class="comment-box">

      <strong class="comment-author">{{ c.author?.username || "unknown" }}</strong>

      <p class="comment-text">{{ c.comment }}</p>

    
      <div v-if="canDeleteComment(c)" class="comment-actions">
        <button class="delete-btn" @click="deleteComment(c)">Delete</button>
      </div>

    </div>


    <div v-if="isLoggedIn" class="add-comment">
    <textarea v-model="newComment" placeholder="Write a comment..."></textarea>
    <button class="btn" @click="addComment">Post</button>
  </div>

  <div v-else>
    <router-link to="/login">Log in to comment</router-link>
  </div>
</section>

  </div>

  <div v-else>Blog not found</div>
</template>

<script>
import API from "../api";

export default {
  data() {
    return {
      blog: null,
      loading: true,
      newComment: ""
    };
  },

  computed: {
    isLoggedIn() {
      return !!localStorage.getItem("token");
    },

    user() {
      const token = localStorage.getItem("token");
      if (!token) return null;

      try {
        return JSON.parse(atob(token.split(".")[1])); // decoded JWT
      } catch (e) {
        return null;
      }
    },

    
    canEditBlog() {
      if (!this.user || !this.blog?.author) return false;

      const loggedId = this.user.id?.toString();
      const authorId = this.blog.author._id?.toString();

      return this.user.isAdmin === true || loggedId === authorId;
    }
  },

  mounted() {
    this.fetchBlog();
  },

  methods: {
    fetchBlog() {
      this.loading = true;
      API.get(`/blogs/${this.$route.params.blogId}`)
        .then(res => { this.blog = res.data })
        .catch(() => { this.blog = null })
        .finally(() => { this.loading = false });
    },

    goToEdit() {
      this.$router.push(`/blogs/${this.$route.params.blogId}/edit-blog`);
    },

    deleteBlog() {
      if (!confirm("Are you sure you want to delete this blog?")) return;

      API.delete(`/blogs/${this.$route.params.blogId}/remove`)
        .then(() => this.$router.push("/blogs"))
        .catch(err =>
          alert(err.response?.data?.message || "Delete failed")
        );
    },

    addComment() {
      if (!this.newComment) return;

      API.post(`/blogs/${this.$route.params.blogId}/comments`, {
        comment: this.newComment
      })
        .then(() => {
          this.newComment = "";
          this.fetchBlog();
        })
        .catch(err =>
          alert(err.response?.data?.message || "Failed to comment")
        );
    },


    canDeleteComment(c) {
      if (!this.user) return false;

      const loggedId = this.user.id?.toString();
      const blogOwnerId = this.blog.author?._id?.toString();
      const commentOwnerId = c.author?._id?.toString();

      return (
        this.user.isAdmin === true ||
        loggedId === blogOwnerId ||
        loggedId === commentOwnerId
      );
    },

    deleteComment(comment) {
      if (!confirm("Are you sure you want to delete this comment?")) return;

      API.delete(
        `/blogs/${this.$route.params.blogId}/comments/${comment._id}/remove`
      )
        .then(() => {
          alert("Comment deleted successfully");
          this.fetchBlog();
        })
        .catch(err =>
          alert(err.response?.data?.message || "Delete failed")
        );
    }
  }
};
</script>
