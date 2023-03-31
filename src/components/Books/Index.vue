<script setup>
import { onMounted,ref } from 'vue';/* 
import useCategories from '../../composables/category'; */
import localAxios from '../../localAxios';

const props = defineProps({
    category_id: {
        type: String,
    },
})



const books = ref([])
const categoryId = props.category_id
console.log(props.category_id)/* 
const {categories, getCategories} = useCategories(); */
const getBooks = async () =>{
    let response = await localAxios.get('/api/book/index/' + props.category_id)
    books.value = response.data
    console.log(books.value)
}
const deleteCategory = async(id) =>{
    let response = await localAxios.delete('/api/categories/' + id)
}
onMounted(() => {
    getBooks()
})
</script>

<template>
    <div class="space-y-4 w-11/12 mx-auto rounded-md shadow-md bg-white mt-12 p-6">
        <div class="flex justify-between flex-row">

            <header class="mb-3 text-2xl font-bold">Index Books</header>
            <router-link :to="{name: 'BookCreate', params:{category_id:categoryId}}" class="w-20 text-center items-center rounded-2xl border-b-4 border-b-blue-600 bg-blue-500 py-3 font-bold text-white hover:bg-blue-400 active:translate-y-[0.125rem] active:border-b-blue-400">Create</router-link>
        </div>
        <div>
            <table class="min-w-full leading-normal">
                <thead>
                    <tr>
                        <th
                            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Name
                        </th>
                        <th
                            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Image
                        </th>
                        <th
                            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            author
                        </th>
                        <th
                            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            editorial
                        </th>
                        <th
                            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            edition
                        </th>
                        <th
                            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            pages
                        </th>
                        <th
                            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            status
                        </th>
                        <th
                            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Categoría
                        </th>
                        <th
                            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Accions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="book in books.data" :key="book.id">
                        <tr>
                            <td class="w-2/5 px-3 py-3  text-gray-600 text-base bg-white border-b border-gray-200">
                                <div class="flex justify-center items-center">
                                    <div class=" text-gray-900 whitespace-no-wrap text-center">
                                        {{ book.name }}
                                    </div>
                                </div>
                            </td>
                            <td class="w-2/5 px-3 py-3  text-gray-600 text-base bg-white border-b border-gray-200">
                                <div class="flex justify-center items-center">
                                    <img :src="`http://localhost:8000/storage/${book.image}`" class="w-10 h-10 rounded" alt="">
                                </div>
                            </td>
                            <td class="w-2/5 px-3 py-3  text-gray-600 text-base bg-white border-b border-gray-200">
                                <div class="flex justify-center items-center">
                                    <div class=" text-gray-900 whitespace-no-wrap text-center">
                                        {{ book.author }}
                                    </div>
                                </div>
                            </td>
                            <td class="w-2/5 px-3 py-3  text-gray-600 text-base bg-white border-b border-gray-200">
                                <div class="flex justify-center items-center">
                                    <div class=" text-gray-900 whitespace-no-wrap text-center">
                                        {{ book.editorial }}
                                    </div>
                                </div>
                            </td>
                            <td class="w-2/5 px-3 py-3  text-gray-600 text-base bg-white border-b border-gray-200">
                                <div class="flex justify-center items-center">
                                    <div class=" text-gray-900 whitespace-no-wrap text-center">
                                        {{ book.edition }}
                                    </div>
                                </div>
                            </td>
                            <td class="w-2/5 px-3 py-3  text-gray-600 text-base bg-white border-b border-gray-200">
                                <div class="flex justify-center items-center">
                                    <div class=" text-gray-900 whitespace-no-wrap text-center">
                                        {{ book.pages }}
                                    </div>
                                </div>
                            </td>
                            <td class="w-2/5 px-3 py-3  text-gray-600 text-base bg-white border-b border-gray-200">
                                <div class="flex justify-center items-center">
                                    <div class=" text-gray-900 whitespace-no-wrap text-center">
                                        {{ book.status }}
                                    </div>
                                </div>
                            </td>
                            <td class="w-2/5 px-3 py-3  text-gray-600 text-base bg-white border-b border-gray-200">
                                <div class="flex justify-center items-center">
                                    <div class=" text-gray-900 whitespace-no-wrap text-center">
                                        {{ book.categories_id }}
                                    </div>
                                </div>
                            </td>
                            <td class="w-2/5 px-3 py-3  text-gray-600 text-base bg-white border-b border-gray-200">
                                <div class="flex justify-center gap-1 flex-row items-center">
                                    <div class="items-center">
                                        <router-link :to="{name: 'BookEdit', params:{id:book.id}}" class="">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                            </svg>
                                        </router-link>
                                    </div>
                                    <div class=" items-center">
                                        <button class="w-20 text-center items-center rounded-2xl" @click="deleteCategory(book.id)">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                              </svg>
                                              
                                        </button>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>
        
    </div>
</template>

<style>

</style>