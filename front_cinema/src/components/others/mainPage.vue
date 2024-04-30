<template>
    <h1>Hello World</h1>
        Електрона пошта<input type="email" v-model="user.email">
        Пароль <input type="password" v-model="user.password">
        <button @click="getAuthorization()">Lets Go</button>
</template>

<script>
import axios from 'axios';
const userUrl = "http://localhost:3000/user/";

export default {
    data () {
        return{
            user: [],
            token: '',
        };
    },
    methods: {
        getTokenFromCookie() {
            const cookies = document.cookie.split(';');
            for (let cookie of cookies) {
                const [name, value] = cookie.trim().split('=');
                if (name === 'bearer') {
                    this.token = value;
                    break;
                }
            }
        },
        getAuthorization() {
            axios.get(userUrl + "getUserByToken", {
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            })
            .then(response => {
                this.user = response.data.user
            })
            .catch(error => {
                alert(error);
            });
        },
    },
    created() {
        // Отримати токен при завантаженні компонента
        this.getTokenFromCookie();
    },
};

</script>

