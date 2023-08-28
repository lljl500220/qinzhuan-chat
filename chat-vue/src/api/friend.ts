import {get, post} from "../utils/http";
export const addFriendApi = (data:any) => {
    return post('/friend',data)
}

export const findUserApi = (data:any) => {
    return get('/users/findUser',data)
}

export const findAllFriendApi = () => {
    return get('/friend',{})
}



