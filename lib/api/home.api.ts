import { apiClient } from "./client"


export const homeService = {
    getData : async ()=>{
        const {data} = await apiClient.get('/api/home')
        return data.data
    } ,
    getUpdate : async ()=>{
        const {data} = await apiClient.get('/api/home/phim-moi-cap-nhat')

        return data.data
    },
    getListMovie : async ()=>{
        const {data} = await apiClient.get('/api/home/danh-sach-phim')
        return data.data
    }
}