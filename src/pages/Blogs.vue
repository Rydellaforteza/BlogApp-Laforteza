<template>
<div>
	<h1>All Blogs</h1>
		<div v-if="loading">Loading...</div>
		<div v-else>
		<div v-if="blogs.length === 0">No blogs yet.</div>
		<div v-for="blog in blogs" :key="blog._id" class="blog-card">
			<router-link :to="`/blogs/${blog._id}`">
	<h3>{{ blog.title }}</h3>
			</router-link>
	<small>by {{ blog.author?.username || 'unknown' }}</small>
	<p class="muted">{{ blog.content.slice(0, 150) }}...</p>
		</div>
		</div>
</div>
</template>


<script>
import API from '../api'
export default {
data() {
return { blogs: [], loading: true }
},
mounted() {
API.get('/blogs')
.then(res => { this.blogs = res.data })
.catch(() => {})
.finally(() => { this.loading = false })
}
}
</script>