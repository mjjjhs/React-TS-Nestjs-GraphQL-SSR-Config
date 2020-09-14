import Qs from 'qs';
import axios from 'axios';
import axiosRetry from "axios-retry";
import uri from "./uri";

axios.defaults.baseURL = uri.authority;
axiosRetry(axios, { retries: 4 });

class ApiFetch{
    private url: string;
    public data: any;
    private readonly config: any;
    constructor(url, data = null, config={}){
        this.url = url;
        this.data = data;
        this.config = config
    }

    public get() {
        let config;
        if(this.data){
            const params ={...this.data};
            config = {...this.config, params};
        }else{
            config = {...this.config};
        }

        const _axios = axios.create({
            paramsSerializer: params => Qs.stringify(params, {arrayFormat: 'repeat'})
        });

        return _axios.get(this.url, config).catch(error=>{
            if(error?.response?.status === 404 && error?.response?.headers?.["no_content"]){return false}
            throw error.response;
        });
    }

    public async post() {
        return await axios.post(this.url, this.data, this.config).catch(error=>{
            if(error?.response?.status === 404 && error?.response?.headers?.["no_content"]){return false}
            throw error.response;
        });
    }

    public async put() {
        return await axios.put(this.url, this.data, this.config).catch(error=>{
            if(error?.response?.status === 404 && error?.response?.headers?.["no_content"]){return false}
            throw error.response;
        });
    }

    public async patch() {
        return await axios.patch(this.url, this.data, this.config).catch(error=>{
            if(error?.response?.status === 404 && error?.response?.headers?.["no_content"]){return false}
            throw error.response;
        });
    }

    public async delete() {
        let config = {...this.config};
        if(this.data) config = Object.assign(config, {data: this.data});

        return await axios.delete(this.url, config).catch(error=>{
            if(error?.response?.status === 404 && error?.response?.headers?.["no_content"]){return false}
            throw error.response;
        });
    }
}

export default ApiFetch;
