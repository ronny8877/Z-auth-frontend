
import { API_ADDRESS } from "../config";
import http from "./http";

export async function register(user: any) {
return await http.post(`${API_ADDRESS}/users/routes/register`,user);
}

export async function login(user: any) {
    return await http.post(`${API_ADDRESS}/users/routes/login`, user);
}

export async function getUser() {
  const token = localStorage.getItem("x-auth-token");
  if (!token) {
    return null;
  }
    http.setToken("x-auth-token",token);
    return await http.get(`${API_ADDRESS}/users/routes/`);
}

export async function handelSignInWith(id:any) {
    const token = localStorage.getItem("x-auth-token");
    if (!token) {
        return null;
    }
    http.setToken("x-auth-token", token);
    return await http.get(`${API_ADDRESS}/auth/signinwith/req/handel/${id}`);
}

export async function becomeADev(){
    const token = localStorage.getItem("x-auth-token");
    if (!token) {
        return null;
    }
    http.setToken("x-auth-token", token);
return await http.post(`${API_ADDRESS}/users/routes/join/developer`);
}


export async function getAppList(){
    const token = localStorage.getItem("x-auth-token");
    if (!token) {
        return null;
    }
    http.setToken("x-auth-token", token);
    return await http.get(`${API_ADDRESS}/apps/get`);
}

export async function createNewApp(app:any){
    const token = localStorage.getItem("x-auth-token");
    if (!token) {
        return null;
    }
    http.setToken("x-auth-token", token);
    return await http.post(`${API_ADDRESS}/apps/new`,app);
}


export async function getUserApps(){
    const token = localStorage.getItem("x-auth-token");
    if (!token) {
        return null;
    }
    http.setToken("x-auth-token", token);
    return await http.get(`${API_ADDRESS}/users/routes/apps_access`);




}



export async function getAppUser(appId: string
    ){
    const token = localStorage.getItem("x-auth-token");
    if (!token) {
        return null;
    }
    http.setToken("x-auth-token", token);
    return await http.get(`${API_ADDRESS}/developer/all/users/${appId}`);
}


export async function getQrCode(appId: string
    ){
    const token = localStorage.getItem("x-auth-token");

    if (!token) {
        return null;
    }
    http.setToken("x-auth-token", token);
    http.setToken("x-app-token", appId);
    return await http.get(`${API_ADDRESS}/auth/signinwith/method/qr`);
}

export async function checkRequestStatus(appId:string){
    const token = localStorage.getItem("x-auth-token");
    if (!token) {
        return null;
    }
    http.setToken("x-app-token", appId);
    http.setToken("x-auth-token", token);
    return await http.get(`${API_ADDRESS}/auth/signinwith/req/status`);
}