import React, { useMemo, useState , useEffect} from "react";
import Loader from "../../components/Loader/Loader"

const withErrorHandler = (WrappedComponent,axios) => {

    return props => {
        const [statusLoader,SetStatusLoader] = useState(null);

        const intercep = useMemo(()=>{
            axios.interceptors.request.use(request=>{
                SetStatusLoader(true);
                return request;
            },error=>{
                throw new Error ("witherrorHandler ",error.message);
            })
            axios.interceptors.response.use(response=>{
                SetStatusLoader(false);
                return response;
            },error=>{
                throw new Error ("witherrorHandler ",error.message);
            }) 
        },[])
        useEffect(()=>{
            return axios.interceptors.response.eject(intercep);
        },[intercep])
        return (
            <>
                {statusLoader ?<Loader/>:null}
                <WrappedComponent {...props}/>
            </>
        )
    }
}

export default withErrorHandler;