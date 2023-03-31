import axios from "axios";
import { ref } from "vue";
import { useRoute } from 'vue-router';
import localAxios from "../localAxios";

export default function useCategories(){
    const categories = ref([])
    const category = ref([])

    const name = ref('')
    const description = ref('')
    const image= ref('')
    const newImage = ref('')
    const status = ref('')

    const getCategories = async () =>{
        let response = await localAxios.get('/api/categories')
        categories.value = response.data
        console.log(categories.value)
    }

    const getCategory = async (id) =>{
        let response = await localAxios.get('/api/categories/'+id)
        name.value = response.data.data.name
        description.value = response.data.data.description
        image.value = response.data.data.image
        status.value = response.data.data.status
    }

    const storeCategory = async (formData) =>{
        let response = await localAxios.post('/api/categories/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
    }

    const updateCategory = async (formData, id) =>{
        let response = await localAxios.post('api/category/edit/' + id, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
    }

    return{
        categories,
        getCategories,
        getCategory,
        name,
        description,
        image,
        status,
        storeCategory,
        updateCategory
    }
}
