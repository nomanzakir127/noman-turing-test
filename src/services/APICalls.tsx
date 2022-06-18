import axios from 'axios';

const baseURL = "https://frontend-test-api.aircall.io/"

const getData = async (url:string,token:string,params:any, method:string): Promise<any>=>
{

    let data: any = {
       data:{},
       error: null

    }
    const client = axios.create({
        baseURL: baseURL,
        headers: {
            Authorization : `Bearer ${token}`
        },
        data:params
    });

    if(method === 'post')
    {
        await client.post(url,params).then((res) => {
            data.data = res.data  
        }).catch( (error) => {
             
            if(error.response)
            {
                data.error = {message: error.response.data.message}
                error.response.status === 401 && logout()
                
            }
            else if (error.request)
            {
                data.error = {message: error.message}
                logout()
            }
            else
            {
                data.error = {message: error.message}
                logout()
            }
        })
    }
    else if(method === 'get')
    {
        await client.get(url, {
            params: {
              ...(Object.keys(params).length && {...params})
            }
          }).then((res) => {
            data.data = res.data  
          
        }).catch( (error) => {
            if(error.response)
            {
                data.error = {message: error.response.data.message}
                error.response.status === 401 && logout()
            }
            else if (error.request)
            {
                data.error = {message: "Please check your internet connection or consult technical team"}//error.message
                logout()
            }
            else
            {
                data.error = {message: "Please check your internet connection or consult technical team"} //error.message
                logout()
            }
        })
    }

    if(method === 'post')
    {
        await client.post(url,params).then((res) => {
            data.data = res.data  
        }).catch( (error) => {
             
            if(error.response)
            {
                data.error = {message: error.response.data.message}
                error.response.status === 401 && logout()
                
            }
            else if (error.request)
            {
                data.error = {message: error.message}
                logout()
            }
            else
            {
                data.error = {message: error.message}
                logout()
            }
        })
    }
    else if(method === 'put')
    {
        await client.put(url, {
            params: {
              ...(Object.keys(params).length && {...params})
            }
          }).then((res) => {
            data.data = res.data  
          
        }).catch( (error) => {
            if(error.response)
            {
                data.error = {message: error.response.data.message}
                error.response.status === 401 && logout()
            }
            else if (error.request)
            {
                data.error = {message: "Please check your internet connection or consult technical team"}//error.message
                logout()
            }
            else
            {
                data.error = {message: "Please check your internet connection or consult technical team"} //error.message
                logout()
            }
        })
    }

    function logout(){
        localStorage.clear()
      
    }

    return data
}

export default getData;

