import axios from 'axios';
import router from '@/routes/router';
const userUrl = "http://localhost:3000/session/";


export async function createSession(data) {
    try {
        return await axios.post(userUrl + "createSession", data).then(res => res.data);
    } catch (error) {
        console.error("Error creating new session:", error);
        await router.push("/error");
    }
}

export async function deleteSession() {
    try {
        return await axios.post(userUrl + "deleteSession").then(res => res.data);
    } catch (error) {
        console.error("Error finding session:", error);
        await router.push("/error");
    }
}

export async function getSession(id) {
    try {
        return await axios.get(userUrl + "getSession/" + id).then(res => res.data.data);
    } catch (error) {
        console.error("Error finding session:", error);
        await router.push("/error");
    }
}

export async function getAllSessions() {
    try {
        return await axios.get(userUrl + "getAllSessions").then(res => res.data.data.sessions);
    } catch (error) {
        console.error("Error finding session:", error);
        await router.push("/error");
    }
}