import {post} from "../utils/http.ts";

interface User{
    username:string
    password:string
}
export const login = (user:User):Promise<any> =>{
    return post('/auth/login',user)
}