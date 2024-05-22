import axios from 'axios';
import router from '@/routes/router';
const userUrl = "http://localhost:3000/user/";

export async function getUserByToken(token){
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };

    try {
        return await axios.get(userUrl + "getUserByToken", config).then(res => res.data);
    } catch (error) {
        console.error("Error fetching user by token:", error);
        await router.push("/error")
    }
}

export async function login(data) {
    try {
        return await axios.post(userUrl + "login", data).then(res => res.data);
    } catch (error) {
        console.error("Error logging in:", error);
    }
}

export async function registration(data) {
    try {
        return await axios.post(userUrl + "signup", data).then(res => res.data);
    } catch (error) {
        console.error("Error registering user:", error);
        await router.push("/error");
    }
}

export async function getUserTickets(token){
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };

    try {
        return await axios.get(userUrl + "getUserTickets", config).then(res => res.data);
    } catch (error) {
        console.error("Error fetching user by token:", error);
        await router.push("/error")
    }
}

export async function deleteUser(id) {
    try {
        return await axios.delete(userUrl + "deleteUser/", id).then(res => res.data);
    } catch (error) {
        console.error("Error deleting user:", error);
        await router.push("/error");
    }
}

export async function updateUser(token, user){
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };

    try {
        return await axios.patch(userUrl + "updateUser",user,config).then(res => res.data);
    } catch (error) {
        console.error("Error update user token:", error);
        await router.push("/error")
    }
}

