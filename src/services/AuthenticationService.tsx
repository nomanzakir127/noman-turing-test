
import axios from "axios";
const baseURL = "https://frontend-test-api.aircall.io/"   

//login request to add token in loken storage for authorization
const login = async (url:string, userInfo:any): Promise<any>=>
{
    let response: any = {
        access_token:null,
        refresh_token:null,
        error: null
     }
     
    const client = axios.create({
        baseURL: baseURL,
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        data:JSON.stringify(userInfo) 
    });

    await client.post(url, JSON.stringify(userInfo)).then( (res) => {

        response.access_token = res.data.access_token
        response.refresh_token = res.data.refresh_token
        localStorage.setItem("authorization", response.access_token)
        localStorage.setItem("ref_auth", response.refresh_token)
       
    }).catch( (error) => {
        localStorage.removeItem("authorization")
        localStorage.removeItem("ref_auth")
        if(error.response)
        {
            response.error = {message: error.response.data.message}
        
        }
        else if (error.request)
        {
            response.error = {message: "Please check your internet connection or consult technical team"}     //error.message
        
        }
        else
        {
            response.error = {message: error.message}
         
        }
   })

   return response
}
 
const logout = () => {
   localStorage.clear()
}

export {login, logout}
