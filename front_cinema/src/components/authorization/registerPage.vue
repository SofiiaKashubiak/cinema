<template>
    <h1>Hello World</h1>
    <form @submit.prevent="createUser()">
        Ім'я<input type="name" v-model="user.firstName">
        Прізвище <input type="surname" v-model="user.lastName">
        Електрона пошта <input type="email" v-model="user.email">
        Номер телефону <input type="text" v-model="user.phoneNumber">
        Пароль <input type="password" v-model="user.password">
        <button type="submit">Lets Go</button>
    </form>
</template>

<script>
import axios from "axios";
const userUrl = "http://localhost:3000/user/";

export default {
    data () {
        return{
            user: {
                email: '',
                password: '',
                phoneNumber: '',
                firstName: '',
                lastName: '',
            },
        };
    },
    methods: {
        createUser() {
            axios.post(userUrl + "signup", this.user)
            .then(
                this.$router.push("/")
            )
            .catch(error => {
                alert(error)
            });
        },
    },
};

</script>

