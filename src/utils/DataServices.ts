import { ILoginInfo, IUserData, IUserInfo } from "./Interfaces";

const url = "https://matchpointbe-a7ahdsdjeyf4efgt.westus-01.azurewebsites.net/"

let userData: IUserData;

export const createAccount = async (user:IUserInfo) => {
    const res = await fetch(url + "User/CreateUser", {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body:JSON.stringify(user)
    });

    if(!res.ok){
        const data = await res.json();
        const message = data.message;
        console.log(message);
        return data.success;
    }

    const data = await res.json();
    return data.success;
}

export const login = async (user:ILoginInfo) => {
    const res = await fetch(url + "User/Login", {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body:JSON.stringify(user)
    });

    if(!res.ok){
        const data = await res.json();
        const message = data.message;
        console.log(message);

        return null
    }

    const data = await res.json();
    console.log(data.token);
    return data;
}

export const getLoggedInUserDataWithUsername = async (username:string) => {
    const res = await fetch(url + `User/GetUserInfoByUsername/${username}`);
    if(!res.ok){
        const data = await res.json();
        const message = data.message;
        console.log(message);
        return null
    }
    userData = await res.json();
    return userData;
}

export const getLoggedInUserDataWithEmail = async (email:string) => {
    const res = await fetch(url + `User/GetUserInfoByEmail/${email}`);
    if(!res.ok){
        const data = await res.json();
        const message = data.message;
        console.log(message);
        return null
    }
    userData = await res.json();
    return userData;
}

export const loggedInData = () => {
    return userData;
}

export const checkToken = () => {
    let result = false;

    if(typeof window != null){
        const lsData = localStorage.getItem("Token");

        if(lsData != null){
            result = true;
        }
    }
  
    return result;
}
