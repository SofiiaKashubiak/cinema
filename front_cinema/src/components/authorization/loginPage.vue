<template>
    <form @submit.prevent="login()">
        Електрона пошта <input type="email" v-model="user.email" @input="validateEmail">
        <div v-if="invalidEmail"> Please enter a valid email address</div>
        
        Пароль <input type="password" v-model="user.password" @input="validatePassword">
        <div v-if="invalidPassword"> Password should be at least 8 characters long</div>
        
        <button type="submit" :disabled="invalidEmail || invalidPassword || isAnyFieldEmpty()">Let's Go</button>
        <p v-if="loginError">Такого користувача не існує, або пароль не вірний</p>
    </form>
</template>

<script>
import * as userAPI from '@/services/userAPI'

export default {
    data() {
        return {
            user: {
                email: '',
                password: '',
            },
            response: [],
            invalidEmail: false,
            invalidPassword: false,
            loginError: false,
        };
    },
    methods: {
        async login() {
            if (!this.invalidEmail && !this.invalidPassword) {
                this.response = await userAPI.login(this.user);
                if (this.response != null) {
                    localStorage.token = this.response.token;
                    this.$router.push('/');
                } else {
                    this.showLoginError();
                }
            }
        },
        validateEmail() {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            this.invalidEmail = !emailPattern.test(this.user.email);
        },
        validatePassword() {
            this.invalidPassword = this.user.password.length < 8;
        },
        isAnyFieldEmpty() {
            return !this.user.email || !this.user.password;
        },
        showLoginError() {
            this.loginError = true;
            setTimeout(() => {
                this.loginError = false;
            }, 10000); // Hide the error message after 10 seconds
        }
    },
};
</script>
