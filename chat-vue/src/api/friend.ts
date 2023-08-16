import {get, post} from "../utils/http";
export const addFriendApi = (data:any) => {
    return post('/friend',data)
}

export const findUserAndGroup = (data:any) => {
    return get('/users/findUserAndGroup',data)
}

export const findAllFriend = () => {
    return get('/friend',{})
}



