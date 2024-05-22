<template>
    <form @submit.prevent="updateUser()">
        Ім'я<input type="name" v-model="user.firstName" @input="validateName()">
        <div v-if="invalidNameReg" class="error-message-name">Name can consist only letters and '-' or '</div>
        Прізвище <input type="surname" v-model="user.lastName" @input="validateLastName()">
        <div v-if="invalidLastNameReg" class="error-message-lastname">Last name can consist only letters and '-' or '</div>
        Електрона пошта <input type="email" v-model="user.email" disabled>
        Номер телефону <input type="text" v-model="user.phoneNumber" v-mask="'+##-####-####'" @input="validatePhoneNumber">
        <div v-if="invalidPhoneReg" class="error-message-phone">Please enter a valid phone number +12-3456-7890</div>
        <button type="submit" :disabled="!changes || invalidNameReg || invalidLastNameReg || invalidPhoneReg">Let's Go</button>
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
                phoneNumber: '',
                firstName: '',
                lastName: '',
            },
                email: '',
                password: '',
                phoneNumber: '',
                firstName: '',
                lastName: '',
            changes: false,
            invalidNameReg: false,
            invalidLastNameReg: false,
            invalidPhoneReg: false,
        };
    },
    methods: {
        async updateUser(){
            await userAPI.updateUser(localStorage.getItem("token"),this.user);
        },
        isChanges() {
                if (this.user.phoneNumber !== this.phoneNumber || this.firstName !== this.user.firstName || this.user.lastName !== this.lastName) {
                    this.changes = true;
                    return;
            }
            this.changes = false;
        },
        validateName() {
            const namePattern = /^[a-zA-Z'-\s]*$/;
            this.invalidNameReg = !namePattern.test(this.user.firstName);
            this.isChanges();
        },
        validateLastName() {
            const lastNamePattern = /^[a-zA-Z'-\s]*$/;
            this.invalidLastNameReg = !lastNamePattern.test(this.user.lastName);
            this.isChanges();
        },
        validatePhoneNumber() {
            const phonePattern = /^\+\d{2}-\d{4}-\d{4}$/;
            this.invalidPhoneReg = !phonePattern.test(this.user.phoneNumber);
            this.isChanges();
        },
    },
    async mounted() {
        const token = localStorage.getItem("token")
        if (token){
            const response = await userAPI.getUserByToken(token);
            if (response != null) {
                this.user = response.user;
                this.firstName = response.user.firstName;
                this.lastName = response.user.lastName;
                this.phoneNumber = response.user.phoneNumber;
                this.password = response.user.password;
            }
        } else {
            this.$router.push("/login");
        }
    }
};
</script>