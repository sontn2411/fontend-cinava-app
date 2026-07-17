import { apiClient } from "./client"
import type { ParamsType } from "@/types/api.types"


export  const movieService = {

    getList : async (slug : string, params?: ParamsType )=>{
        const {data } = await apiClient.get('/api/danh-sach/' + slug, { params })
    
        return data.data
    },

    getListByCategory : async (slug : string, params?: ParamsType )=>{
        const {data } = await apiClient.get('/api/the-loai/' + slug, { params })
        return data.data
    },
    
    getListByNational : async (slug: string, params?: ParamsType) =>{
        const {data} = await apiClient.get('/api/quoc-gia/' + slug, { params }) 
        return data.data
    },

    search : async (query : string, params?: ParamsType)=>{
        const {data} = await apiClient.get('/api/tim-kiem', { params : {keyword : query, ...params}})
        return data.data
    },
    getDetailFilm : async (slug : string ) =>{
        const {data} = await apiClient.get('/api/phim/'+slug )

        return data.data
    }




}