import React, { useMemo, useState , useEffect} from "react";
import Loader from "../../components/Loader/Loader"
import axios from "axios";

function withLoaderHandler<T> (WrappedComponent:React.ComponentType) {

    return (props:T)=> {
        const [statusLoader,SetStatusLoader] = useState<boolean>(false);

        const intercep:any = useMemo(()=>{
            axios.interceptors.request.use(request=>{
                SetStatusLoader(true);
                return request;
            })
            axios.interceptors.response.use(response=>{
                SetStatusLoader(false);
                return response;
            }) 
        },[])
        useEffect(()=>{
            return axios.interceptors.response.eject(intercep);
        },[intercep])
        return (
            <>
                {statusLoader ? <Loader/> : null}
                <WrappedComponent {...props}/>
            </>
        )
    }
}

export default withLoaderHandler;