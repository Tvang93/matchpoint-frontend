import { IAddLocationDTO, ILoginInfo, IUserData, IUserInfo,  ICourtCard } from "./Interfaces";

const url = "https://matchpointbe-a7ahdsdjeyf4efgt.westus-01.azurewebsites.net/"

export const mapbox = 'pk.eyJ1IjoidHZhbmciLCJhIjoiY205NzhjeDU4MDR2YjJsb2pvaGxuZnZ0eiJ9.nRf1lWYQP-I8W6cqHJjvww'

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

    await getLoggedInUserDataWithUsername(user.username);

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
        const lsData = sessionStorage.getItem("Token");

        if(lsData != null){
            result = true;
        }
    }
  
    return result;
}

export const ForgotPassword = async (user: ILoginInfo) => {
    const res = await fetch(url + `User/ForgotPassword`, {
        method: "PUT",
        headers: {
            "Content-Type" : "application/json"
        },
        body:JSON.stringify(user)
    })
    if(!res.ok){
        const data = await res.json();
        const message = data.message;
        console.log(message);
        return data.success;
    }

    const data = await res.json();
    return data.success;
}

export const editUsername = async (oldUsername: string, newUsername: string, token: string) => {
    console.log(token)
    const res = await fetch(url + "User/EditUsername", {
        method: "PUT", 
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body:JSON.stringify({username: oldUsername, newUsername: newUsername})
    })
    const data = await res.json();
    return data;

}

export const editPassword = async (username: string, newPassword: string, token: string) => {
    const res = await fetch(url + "User/EditPassword", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
            username,
            password: newPassword,
        })
    })
    const data = await res.json();
    return data;
}

export const deleteUser = async (username: string, token: string) => {
    const res = await fetch(url + `User/DeleteProfile?user=${username}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(username)
    })
    const data = await res.json();
    return data.success;
}

export const addNewLocation = async (location: IAddLocationDTO, token: string) => {
    const res = await fetch(url + "Location/AddNewLocation", {
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
            "Authorization": `Bearer ${token}`
        },
        body:JSON.stringify(location)
    })
    const data = await res.json();
    return data;
}

export const getAllLocations = async (): Promise<ICourtCard[] | null> => {

    const res = await fetch(`${url}Location/GetAllLocations`);
    
    if (!res.ok) {
        const data = await res.json();
        console.error("Error getting locations:", data.message);
        return null;
    }
    
    return await res.json();

};

export const getLocationsByCoords = async (lat: string, lng: string) => {
    const res = await fetch(url + "Location/GetLocationInfoByCoords/" + lat + "/" + lng)
    const data = await res.json();
    return data;
}

export const get5miLocationsByCoords = async (lat: string, lng: string) => {
    const res = await fetch(url + "Location/Get5miLocationInfoByCoords/" + lat + "/" + lng)
    const data = await res.json();
    return data;
}