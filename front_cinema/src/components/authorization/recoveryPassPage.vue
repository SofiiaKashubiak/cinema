<template>
    <form @submit.prevent="createPassword()">
        Електрона пошта <input type="email" v-model="user.email" @input="validateEmail">
        <div v-if="invalidEmail"> Please enter a valid email address</div>
        
        <button type="submit" :disabled="invalidEmail || !this.user.email">Let's Go</button>
        <p v-if="loginError">Такого користувача не існує</p>
    </form>
</template>

<script>
import * as userAPI from '@/services/userAPI'

export default {
    data() {
        return {
            user: {
                email: '',
            },
            invalidEmail: false,
        };
    },
    methods: {
        async createPassword() {
            userAPI.createRecoveryPassword(this.user.email);
        },
        validateEmail() {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            this.invalidEmail = !emailPattern.test(this.user.email);
        },
    },
};
</script>
