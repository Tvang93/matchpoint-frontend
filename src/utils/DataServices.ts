import { IAddLocationDTO, ILoginInfo, IUserData, IUserInfo,  ICourtCard } from "./Interfaces";

export const url = "https://matchpointbackend-c4btg3ekhea4gqcz.westus-01.azurewebsites.net/"

export const blobURL = "https://matchpointblobstorage.blob.core.windows.net/matchpointstorage/"


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

export const getCommentsByLocationId = async (locationId: number) => {
    const res = await fetch(`${url}Location/GetCommentsByLocationId/${locationId}`);

    if(!res.ok) {
        const data = await res.json();
        console.error("Error getting comments:", data.message);
        return null;
    }

    const data = await res.json();
    return data;
};

export const postComment = async (locationId: number, userId: number, comment: string, token: string) => {
    const res = await fetch(`${url}Location/AddComment`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
            locationId,
            userId,
            comment
        })
    });

        if (!res.ok) {
        const data = await res.json();
        console.error("Error getting comments:", data.message);
        return null;
    }

    const data = await res.json();
    return data;
};


export const blobUpload = async (params: FormData)=> {
        const response = await fetch(url + 'Blob/Upload', {
            method: 'POST',
            // The browser automatically sets the correct Content-Type header to multipart/form-data
            body: params, //becuase params is FormData we do NOT need to stringify it
        });

        if (response.ok) {
            // Extract the filename from FormData
            const fileName = params.get('fileName') as string;
            
            // Construct the Blob Storage URL
            const uploadedFileUrl = `${blobURL}/${fileName}`;
            
            return uploadedFileUrl;
        } else {
            console.log('Failed to upload file.');
            return null;
        }
};

export const getLocationInfoById = async (locationId: number) => {
    const res = await fetch(url + `Location/GetLocationInfoById/${locationId}`)
    if (!res.ok) {
        const data = await res.json();
        console.error("Error getting comments:", data.message);
        return null;
    }
    const data = await res.json();
    return data;
}

export const addCourtRating = async (token: string, rating: number, locationId: number) => {
    const res = await fetch(`${url}Location/AddCourtRating`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({Rating: rating, LocationId: locationId}),
    });
    return res.ok
}
export const addSafetyRating = async (token: string, rating: number, locationId: number) => {
    const res = await fetch(`${url}Location/AddSafetyRating`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({Rating: rating, LocationId: locationId}),
    });
    return res.ok
}