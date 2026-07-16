import { apiClient } from "./client"


export  const movieService = {

    getList : async (slug : string )=>{

        const {data } = await apiClient.get('/api/danh-sach/' + slug)

        return data.data
    }

}