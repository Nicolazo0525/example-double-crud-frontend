import axios from "axios";
import { defineStore } from "pinia";
import localAxios from "../localAxios";
import { useRouter } from "vue-router";

export const useAuthStore = defineStore('Auth',{
    state: () => ({
        authUser: null
    }),
    getters: {
        user: (state) => state.authUser
    },
    actions: {
        async getToken(){
            await localAxios.get('/sanctum/csrf-cookie');
        },
        async getUser(){
            this.getToken()

            let response = await localAxios.get('/api/user');
            this.authUser = response.data
        },
        async handleLogin(data){
            this.getToken()
            let response = await localAxios.post('/login',{
                email: data.email,
                password: data.password
            });
            this.router.push("/home");
        },
        async handleRegister(data){
            this.getToken()
            let response = await localAxios.post('/register',{
                name: data.name,
                email: data.email,
                password: data.password,
                password_confirmation: data.password_confirmation
            });
            this.router.push("/");
        },
        async handleLogout(){
            await localAxios.post('/logout')
            this.authUser = null
        }
    }
})
