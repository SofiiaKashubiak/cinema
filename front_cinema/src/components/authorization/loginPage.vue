<template>
    <h1>Hello World</h1>
    <form @submit.prevent="login()">
        Електрона пошта<input type="email" v-model="user.email">
        Пароль <input type="password" v-model="user.password">
        <button type="submit">Lets Go</button>
    </form>
</template>

<script>
import * as userAPI from '@/services/userAPI'

export default {
    data () {
        return{
            user: {
                email: '',
                password: '',
                response: [],
            },
        };
    },
    methods: {
        async login() {
            this.response = await userAPI.login(this.user)
            if (this.response != null) {
            localStorage.token = this.response.token;
        }
            this.$router.push('/');
        },
    },
};

</script>

