import axios from 'axios';
import router from '@/routes/router';
const userUrl = "http://localhost:3000/movie/";


export async function createMovie(data) {
    try {
        return await axios.post(userUrl + "createMovie", data).then(res => res.data);
    } catch (error) {
        console.error("Error creating new movie:", error);
        await router.push("/error");
    }
}

export async function getMovie(id) {
    try {
        return await axios.get(userUrl + "getMovie/" + id).then(res => res.data.data.movie);
    } catch (error) {
        console.error("Error finding movie:", error);
        await router.push("/error");
    }
}

export async function getAllMovies() {
    try {
        return await axios.get(userUrl + "getAllMovies").then(res => res.data.data.movies);
    } catch (error) {
        console.error("Error finding movies:", error);
        await router.push("/error");
    }
}

export const uploadPhoto = (formData) => {
    return axios.post(userUrl + 'upload/photo', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};