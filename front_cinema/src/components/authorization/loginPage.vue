<template>
    <h1>Hello World</h1>
    <form @submit.prevent="login()">
        Електрона пошта<input type="email" v-model="user.email">
        Пароль <input type="password" v-model="user.password">
        <button type="submit">Lets Go</button>
    </form>
</template>

<script>
import axios from 'axios';
const userUrl = "http://localhost:3000/user/";

export default {
    data () {
        return{
            user: {
                email: '',
                password: '',
            },
        };
    },
    methods: {
        login() {
            axios.post(userUrl + "login", this.user)
            .then(response => {
                const token = response.data.token;
                document.cookie = `bearer=${token}`;
                alert("Успішний вхід!");
            })
            .catch(error => {
                alert(error)
            });
        },
    },
};

</script>

