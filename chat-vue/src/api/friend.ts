import {post} from "../utils/http";
export const addFriendApi = (data:any) => {
    return post('/friend',data)
}