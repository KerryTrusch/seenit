import axios from "axios";
import { objectToQueryString } from "./url";
const defaults = {
    baseURL: process.env.API_URL || 'http://localhost:4000',
    headers: () => ({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem("uid") ? `Bearer ${localStorage.getItem("uid")}` : undefined,
    }),
    error: {
        code: 'INTERNAL_ERROR',
        message: 'Something went wrong. Please try again later or message me on GitHub if the issue does not resolve itself.',
        status: 503,
        data: {},
    },
}

const api = (method, url, variables) =>
    new Promise((resolve, reject) => {
        axios({
            url: `${defaults.baseURL}${url}`,
            method,
            headers: defaults.headers(),
            params: method === 'get' ? variables : undefined,
            data: method !== 'get' ? variables : undefined,
            paramsSerializer: objectToQueryString,
        }).then(
            response => {
                resolve(response.data);
            },
            error => {
                if (error.response) {
                    if (error.response.data.error.code === 'INVALID_TOKEN') {
                        localStorage.removeItem("uid");
                    } else {
                        reject(error.response.data.error);
                    }
                } else {
                    reject(defaults.error);
                }
            }
        )
    });

const api_call = {
    get: (...args) => api('get', ...args),
    post: (...args) => api('post', ...args),
    put: (...args) => api('put', ...args),
    patch: (...args) => api('patch', ...args),
    delete: (...args) => api('delete', ...args)
}
export default api_call