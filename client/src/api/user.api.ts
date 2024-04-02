import { API } from "./api"

export const UserApi = {
    auth: (payload: { email: string }) => {
        return API.post('/api/users/auth', payload)
    },

    getUser: (userId: number) => {
        return API.get(`/api/users/${userId}`)
    },

    getAllUsers: ({ gender, availability, domain, search, page }: { page?:number, gender?: string; availability?: string; domain?: string; search?: string }) => {
        
        let queryString = '';

        if (gender) queryString += `gender=${gender}`;
        if (domain) queryString += `&domain=${domain}`;
        if (search) queryString += `&search=${search}`;
        if (availability) queryString += `&available=${availability}`;
        if (page) queryString += `&page=${page}`;
    
        return API.get(`/api/users?${queryString}`);
    },
    
    createUser: (payload: { first_name: string, last_name: string, email: string, gender: string, avatar: string, domain: string, available: boolean }) => {
        return API.post('/api/users', payload)
    },
    
    updateUser: (payload: { first_name: string, last_name: string, email: string, gender: string, avatar: string, domain: string, available: boolean }, userId: number) => {
        return API.put(`/api/users/${userId}`, payload)
    },
    
    deleteUser: (userId: number) => {
        return API.delete(`/api/users/${userId}`)
    }
}