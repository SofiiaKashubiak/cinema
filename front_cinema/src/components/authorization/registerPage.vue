<template>
    <form @submit.prevent="createUser()">
        Ім'я <input type="text" v-model="user.firstName" @input="validateName">
        <div v-if="invalidNameReg" >Name can consist only of letters, '-' or ' '</div>
        
        Прізвище <input type="text" v-model="user.lastName" @input="validateLastName">
        <div v-if="invalidLastNameReg" >Last name can consist only of letters, '-' or ' '</div>
        
        Електрона пошта <input type="email" v-model="user.email" @input="validateEmail">
        <div v-if="invalidEmailReg" >Please enter a valid email address</div>
        
        Номер телефону <input type="text" v-model="user.phoneNumber" v-mask="'+##-####-####'" @input="validatePhoneNumber">
        <div v-if="invalidPhoneReg" >Please enter a valid phone number +12-3456-7890</div>
        
        Пароль <input type="password" v-model="user.password" @input="validatePassword">
        <div v-if="invalidPasswordReg">Password should be at least 8 characters long</div>
        
        <button type="submit" :disabled="invalidNameReg || invalidLastNameReg || invalidEmailReg || invalidPhoneReg || invalidPasswordReg || isAnyFieldEmpty()">Let's Go</button>
    </form>
</template>

<script>
import * as userAPI from '@/services/userAPI'
import { mask } from 'vue-the-mask'

export default {
    directives: {
        mask
    },
    data () {
        return{
            user: {
                email: '',
                password: '',
                phoneNumber: '',
                firstName: '',
                lastName: '',
            },
            invalidNameReg: false,
            invalidLastNameReg: false,
            invalidEmailReg: false,
            invalidPhoneReg: false,
            invalidPasswordReg: false,
        };
    },
    methods: {
        createUser() {
            if (!this.invalidNameReg && !this.invalidLastNameReg && !this.invalidEmailReg && !this.invalidPhoneReg && !this.invalidPasswordReg) {
                userAPI.registration(this.user);
                this.$router.push("/");
            }
        },
        validateName() {
            const namePattern = /^[a-zA-Z'-\s]*$/;
            this.invalidNameReg = !namePattern.test(this.user.firstName);
        },
        validateLastName() {
            const lastNamePattern = /^[a-zA-Z'-\s]*$/;
            this.invalidLastNameReg = !lastNamePattern.test(this.user.lastName);
        },
        validateEmail() {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            this.invalidEmailReg = !emailPattern.test(this.user.email);
        },
        validatePhoneNumber() {
            const phonePattern = /^\+\d{2}-\d{4}-\d{4}$/;
            this.invalidPhoneReg = !phonePattern.test(this.user.phoneNumber);
        },
        validatePassword() {
            this.invalidPasswordReg = this.user.password.length < 8;
        },
        isAnyFieldEmpty() {
            for (const key in this.user) {
                if (!this.user[key]) {
                    return true;
                }
            }
            return false;
        }
    },
};

</script>

