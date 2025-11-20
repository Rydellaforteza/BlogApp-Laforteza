import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Blogs from '../pages/Blogs.vue'
import BlogDetails from '../pages/BlogDetails.vue'
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
import CreateBlog from '../pages/CreateBlog.vue'
import BlogEdit from '../pages/BlogEdit.vue';


const routes = [
{ path: '/', component: Home },
{ path: '/blogs', component: Blogs },
{ path: '/blogs/:blogId', component: BlogDetails, props: true },
{ path: '/blogs/:blogId/edit-blog', component: BlogEdit },
{ path: '/login', component: Login },
{ path: '/register', component: Register },
{ path: '/create', component: CreateBlog }
]


const router = createRouter({
history: createWebHistory(),
routes
})



export default router