
import axios from "axios";
// import config from "../config";

//this module holds the http requests handler library Axios
//if you ever wanted to change the request handler library, you can do it here
//but remember to change the import and add the new methods to http exports
// It is used throughout the project to make http requests.


// axios.interceptors.response.use(null, (error:any) => {
//     if (
//         error.response &&
//         (error.response.status >= 400) && (error.response.status < 500)
//     ) {
//         return Promise.reject(error.response);
//     }
//     toast.error("Unexpected error occurred");

//     // sentry.captureException(error)
// });

function setToken(header:string="x-auth-token",token:string) {
    // let token = localStorage.getItem(config.tokenKey);

    axios.defaults.headers.common[header] = token;
}
function removeToken(header: string = "x-auth-token") {
    delete axios.defaults.headers.common[header];
}


function saveToken(name:string="x-auth-token", token:string) {
    localStorage.setItem(name, token);
}

let http = {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
    setToken,
removeToken,
    saveToken,
};

export default http;