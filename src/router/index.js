import { createRouter, createWebHistory } from "vue-router";

import CategoriesIndex from '../components/Categories/Index.vue';
import CategoryCreate from '../components/Categories/Create.vue'
import CategoryEdit from '../components/Categories/Edit.vue'

import BooksIndex from '../components/Books/Index.vue';
import BookCreate from '../components/Books/Create.vue'
import BookEdit from '../components/Books/Edit.vue'
import Home from '../components/Home.vue'
import Register from '../components/Authentication/Register.vue'
import Login from '../components/Authentication/Login.vue'
import ForgotPassword from '../components/Authentication/ForgotPassword.vue'
import ResetPassword from '../components/Authentication/ResetPassword.vue'

const routes = [
    
    {
        path: "/home/",
        name: "home",
        component: Home
    },
    {
        path: "/register/",
        name: "register",
        component: Register
    },
    {
        path: "/login/",
        name: "login",
        component: Login
    },
    {
        path: "/forgot-password/",
        name: "ForgotPassword",
        component: ForgotPassword,
        props: true
    },
    {
        path: "/password-reset/:token",
        name: "ResetPassword",
        component: ResetPassword,
        props: true
    },
    {
        path: "/categories/",
        name: "categories.index",
        component: CategoriesIndex
    },
    
    {
        path: "/category-create/",
        name: "CategoryCreate",
        component: CategoryCreate
    },
    {
        path: "/category/:id",
        name: "CategoryEdit",
        component: CategoryEdit,
        props: true
    },
    {
        path: "/books/:category_id ",
        name: "BooksIndex",
        component: BooksIndex,
        props: true
    },
    {
        path: "/books-create/:category_id",
        name: "BookCreate",
        component: BookCreate,
        props: true
    },
    {
        path: "/book/:id",
        name: "BookEdit",
        component: BookEdit,
        props: true
    }
]

export default createRouter({
    history: createWebHistory(),
    routes
})