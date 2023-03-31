<script setup>
import { onMounted, ref } from 'vue';
import useCategories from '../../composables/category';
import localAxios from '../../localAxios';

const props = defineProps({
    id: {
        type: String,
    },
})


/* const {category, getCategory} = useCategories(); */
const formData = new FormData();

const name = ref('')
const image = ref('')
const newImage = ref('')
const author = ref('')
const editorial = ref('')
const edition = ref('')
const pages = ref('')
const status = ref('')
const categories_id = ref('')

const getBooks = async () =>{
    let response = await localAxios.get('/api/books/'+ props.id)
    name.value = response.data.data.name
    image.value = response.data.data.image
    author.value = response.data.data.author
    editorial.value = response.data.data.editorial
    edition.value = response.data.data.edition
    pages.value = response.data.data.pages
    status.value = response.data.data.status
    categories_id.value = response.data.data.categories_id
    /* console.log(category.value) */
}

onMounted(() => {
    getBooks()
})

const onFileChange = (e) =>{
    newImage.value = e.target.files[0]
    console.log(image.value)
}

const editBook = async () =>{
    formData.append('name',name.value);
    formData.append('image',image.value);
    formData.append('newImage',newImage.value);
    formData.append('author',author.value);
    formData.append('editorial',editorial.value);
    formData.append('edition',edition.value);
    formData.append('pages',pages.value);
    formData.append('status',status.value);
    formData.append('categories_id',categories_id.value);
    let response = await localAxios.post('api/book/edit/' + props.id, formData, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
        },
    })
    /* 
    for (const [key, value] of form) {
        values[key] = value
    } */
}
</script>

<template>
    <div class="space-y-4 w-11/12 mx-auto rounded-md shadow-md bg-white mt-12 p-6">
        <div class="flex justify-between flex-row">

            <header class="mb-3 text-2xl font-bold">Create Category</header>
        </div>
        <form action="" @submit.prevent="editBook()">
            <div class="grid grid-cols-2 gap-2">
                <div class="w-full rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400">
                    <input type="text" placeholder="Name" v-model="name"  
                        class="my-3 w-full border-none bg-transparent outline-none focus:outline-none" />
                </div>
                <div class="w-full rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400">
                    <input
                        type="file"
                        @change="onFileChange"
                        class="cursor-pointer block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                </div>
                <img :src="`http://localhost:8000/storage/${image}`" class="w-10 h-10 rounded" alt="">
                <div
                    class="flex w-full items-center space-x-2 rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400">
                    <input type="text" placeholder="Author" v-model="author"  
                        class="my-3 w-full border-none bg-transparent outline-none focus:outline-none" />
                </div>
                <div
                    class="flex w-full items-center space-x-2 rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400">
                    <input type="text" placeholder="Editorial" v-model="editorial"  
                        class="my-3 w-full border-none bg-transparent outline-none focus:outline-none" />
                </div>
                <div
                    class="flex w-full items-center space-x-2 rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400">
                    <input type="text" placeholder="Edition" v-model="edition"  
                        class="my-3 w-full border-none bg-transparent outline-none focus:outline-none" />
                </div>
                <div
                    class="flex w-full items-center space-x-2 rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400">
                    <input type="text" placeholder="Pages" v-model="pages"  
                        class="my-3 w-full border-none bg-transparent outline-none focus:outline-none" />
                </div>
                <div
                    class="flex w-full items-center space-x-2 rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400">
                    <select name="status" id="status" v-model="status" class="flex w-full py-2  bg-gray-50  focus-within:ring-blue-400">
                        <option value="">Select option</option>
                        <option value="0">Inactive</option>
                        <option value="1">Active</option>
                    </select>
                </div>
                <div
                    class="hidden w-full items-center space-x-2 rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400">
                    <input type="text" placeholder="Pages" v-model="categories_id"  
                            class="my-3 w-full border-none bg-transparent outline-none focus:outline-none" />
                    <!-- <template v-for="category in categories.data" :key="category.id">
                        <template v-if="categories_id == category.id">
                            
                        </template>
                    </template> -->
                    
                    <!-- <select name="status" id="status" v-model="categories_id" class="flex w-full bg-gray-50  focus-within:ring-blue-400">
                        <option value="">Select option</option>
                        <template v-for="category in categories.data" :key="category.id">
                            <option :value="category.id">{{ category.name }}</option>
                        </template>
                    </select> -->
                </div>
            </div>
            <div class="mt-2 flex justify-center">
                <button class="w-20 text-center items-center rounded-2xl border-b-4 border-b-blue-600 bg-blue-500 py-3 font-bold text-white hover:bg-blue-400 active:translate-y-[0.125rem] active:border-b-blue-400">Create</button>
            </div>
        </form>
    </div>
</template>

<style>

</style>