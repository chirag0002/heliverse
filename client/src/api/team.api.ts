import { API } from "./api"

export const TeamApi = {
    createTeam : (token:string, payload:{name:string, memberIds?:number[] }) => {
        return API.post('/api/team/', payload, {
            headers: {
                "Authorization": token
            }
        })
    },

    getMyTeams: (token:string) => {
        return API.get('/api/team/', {
            headers: {
                "Authorization": token
            }
        })
    },

    getTeam: (teamId:string) => {
        return API.get(`/api/team/${teamId}`)
    },

    addUsers : (teamId:string, payload:{memberIds:number[]}, token:string) => {
        return API.put(`/api/team/${teamId}/add-users`, payload, {
            headers: {
                "Authorization": token
            }
        })
    },

    removeUser : (teamId:string, payload:{memberId:number}, token:string) => {
        return API.put(`/api/team/${teamId}/remove-users`, payload, {
            headers: {
                "Authorization": token
            }
        })
    },
    
    deleteTeam: (teamId:string, token:string) => {
        return API.delete(`/api/team/${teamId}`, {
            headers: {
                "Authorization": token
            }
        })
    }
}