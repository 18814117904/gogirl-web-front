import axios from 'axios';

let  instance = axios.create({
    baseURL: '',
    timeout: 6000
});

export default function(method, url, data = null) {
    method = method.toUpperCase();
    if(method == 'POST') {
        return instance.post(url, data);
    } else if (method == 'GET') {
        return instance.get(url, {params: data});
    } else if (method == 'DELETE') {
        return instance.post(url, {params: data});
    } else if (method == 'PUT') {
        return instance.post(url, data);
    } else {
        console.error('未知的method', method);
        return false;
    }
}