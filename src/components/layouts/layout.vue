
<script setup>
import { onMounted, ref } from 'vue';
import {useAuthStore} from '../../stores/Auth.js'

const authStore = useAuthStore()

onMounted(async() => {
    await authStore.getUser()
})

if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  document.documentElement.classList.add('dark')
} else {
  document.documentElement.classList.remove('dark')
}

const toggleDarkMode = ref(document.documentElement.className === 'dark')


const changeDarkMode = () => {
    toggleDarkMode.value = document.documentElement.classList.toggle('dark')
    
    //Operador ternario
    toggleDarkMode.value ? localStorage.theme = 'dark' : localStorage.theme = 'light'
}
</script>

<template>
    <div class="shadow bg-white z-50">
        <div class="h-16 mx-auto px-12 flex items-center justify-between">
            <!-- <a class="text-2xl hover:text-cyan-500 transition-colors cursor-pointer">Logo</a> -->
            <router-link :to="{name: 'home'}" class="text-2xl hover:text-cyan-500 transition-colors cursor-pointer">Logo</router-link>
            <ul class="flex items-center gap-5 text-base font-bold">
                <template v-if="authStore.user">
                    <li><router-link :to="{name: 'categories.index'}" class="hover:text-cyan-500 transition-colors">Categories</router-link></li>
                    <li><button class="hover:text-cyan-500 transition-colors" @click="authStore.handleLogout">Logout</button></li>
                    <!-- <li><router-link @click="authStore.handleLogout" class="hover:text-cyan-500 transition-colors">Logout</router-link></li> -->
                </template>
                <template v-if="!authStore.user">
                    <li><router-link :to="{name: 'login'}" class="hover:text-cyan-500 transition-colors">Login</router-link></li>
                    <li><router-link :to="{name: 'register'}" class="hover:text-cyan-500 transition-colors">Register</router-link></li>
                </template>
            </ul>
            <div class="flex justify-between gap-1 items-center">
                <template v-if="toggleDarkMode == true">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                        </svg>
                    </div>
                </template>
                <template v-if="toggleDarkMode == false">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                        </svg>
                    </div>
                </template>
                <label for="toogleButton" class="flex items-center cursor-pointer">
                    <div class="relative">
                        
                        <input id="toogleButton" type="checkbox" class="items-center hidden"  @click="changeDarkMode"/>
                        <!-- path -->
                        <div
                            class="flex items-center  cursor-pointer px-1 cm-toggle-wrapper transition ease-in-out bg-gray-200 w-9 h-5 dark:bg-slate-800 rounded-full shadow-inner"
                            >
                            <!-- crcle -->
                            <template v-if="toggleDarkMode == true">
                                <div
                                class="transition ease-in-out absolute w-3.5 h-3.5 bg-white rounded-full shadow right-0"
                                ></div>
                            </template>
                            <template v-if="toggleDarkMode == false">
                                <div
                                class="transition ease-in-out absolute w-3.5 h-3.5 bg-white rounded-full  shadow left-0"
                                ></div>
                            </template>
                        </div>
                    </div>
                </label>
           </div>
        </div>
       
    </div>
</template>

<style>

</style>