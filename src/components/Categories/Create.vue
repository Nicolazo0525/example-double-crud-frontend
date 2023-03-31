<script setup>
import { onMounted, ref } from 'vue';
import useCategories from '../../composables/category';
import localAxios from '../../localAxios';

const { storeCategory} = useCategories();
const formData = new FormData();

const name = ref('')
const description = ref('')
const image = ref('')
const status = ref('')

/* onMounted(() => {
    getCategories()
}) */

const props = defineProps({
    cliente: {
        type:Object,
        default: () => ({}),
    },
    imagen: {
        type:String,
        default: () => ({}),
    },
})

const onFileChange = (e) =>{
    image.value = e.target.files[0]
    console.log(image.value)
}

const createCategory = async () =>{
    formData.append('name',name.value);
    formData.append('description',description.value);
    formData.append('image',image.value);
    formData.append('status',status.value);
    /* let response = await localAxios.post('/api/categories', formData, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
        },
    }) */
    for (const [key, value] of formData) {
        formData[key] = value
    }  
    await storeCategory({...formData})
}
</script>

<template>
    <div class="space-y-4 w-11/12 mx-auto rounded-md shadow-md bg-white mt-12 p-6">
        <div class="flex justify-between flex-row">

            <header class="mb-3 text-2xl font-bold">Create Category</header>
        </div>
        <form action="" @submit.prevent="createCategory()">
            <div class="grid grid-cols-2 gap-2">
                <div class="w-full rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400">
                    <input type="text" placeholder="Name" v-model="name"  
                        class="my-3 w-full border-none bg-transparent outline-none focus:outline-none" />
                </div>
                <div
                    class="flex w-full items-center space-x-2 rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400">
                    <textarea class="my-3 w-full border-none bg-transparent outline-none" placeholder="Write your description..." v-model="description"></textarea>
                </div>
                <div class="w-full rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400">
                    <input
                        type="file"
                        @change="onFileChange"
                        required
                        class="cursor-pointer block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                </div>
                <div
                    class="flex w-full items-center space-x-2 rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400">
                    <select name="status" id="status" v-model="status" class="flex w-full bg-gray-50  focus-within:ring-blue-400">
                        <option value="">Select option</option>
                        <option value="0">Inactive</option>
                        <option value="1">Active</option>
                    </select>
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