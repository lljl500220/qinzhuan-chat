import {post} from "../utils/http";

interface User{
    username:string
    password:string
}
export const login = (user:User):Promise<any> =>{
    return post('/auth/login',user,false)
}

export const register = (user:User):Promise<any> =>{
    return post('/auth/register',user)
}