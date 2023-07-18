import axios from "axios";
import { ref } from "vue";
import { useRoute } from 'vue-router';
import { useAuthStore } from "../stores/Auth";
import localAxios from "../localAxios";

export default function useCategories(){

    const authStore = useAuthStore()

    const categories = ref([])
    const category = ref([])

    const name = ref('')
    const description = ref('')
    const metaCategories = ref([])
    const status = ref([])
    const userId = ref('')
    const image= ref('')
    const newImage = ref('')
    const statusData = ref([])
    const errorsCategory = ref('')

    const getCategories = async (page, data) =>{
        //Obtengo el usuario del store
        await authStore.getUser()
        //Asigno el id del usuario a userId
        userId.value = authStore.user.id

        if (page) {
            let response = await localAxios.get(`/api/search/${userId.value}?page=${page}`)
            categories.value = response.data
            metaCategories.value = response.data.meta
            
        }if (page && data.length > 0) {
            let response = await localAxios.get(`/api/search/${userId.value}?page=${page}&q=${data}`)
            categories.value = response.data
            metaCategories.value = response.data.meta
        }
        /* let response = await localAxios.get('/api/categories')
        categories.value = response.data
        console.log(categories.value) */
    }

    const getCategory = async (id) =>{
        let response = await localAxios.get('/api/categories/'+id)
        name.value = response.data.data.name
        description.value = response.data.data.description
        image.value = response.data.data.image
        status.value = response.data.data.status
        userId.value = response.data.data.user_id
    }

    const storeCategory = async (formData) =>{
        try {
            let response = await localAxios.post('/api/categories/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            statusData.value = response.data.status
        } catch (error) {
            if (error.response.status === 422) {
                errorsCategory.value = error.response.data.errors
            }
        }
    }

    const updateCategory = async (formData, id) =>{
        try {
            let response = await localAxios.post('api/category/edit/' + id, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            statusData.value = response.data.status
        } catch (error) {
            if (error.response.status === 422) {
                errorsCategory.value = error.response.data.errors
            }
        }
    }

    const deleteCategory = async(id) =>{
        try {
            let response = await localAxios.delete('/api/categories/' + id)
            statusData.value = response.data.status
        } catch (error) {
            if (error.response.status === 422) {
                errorsCategory.value = error.response.data.errors
            }
        }
    }

    return{
        categories,
        getCategories,
        getCategory,
        name,
        description,
        image,
        status,
        userId,
        storeCategory,
        updateCategory,
        deleteCategory,
        metaCategories,
        errorsCategory,
        statusData
    }
}
