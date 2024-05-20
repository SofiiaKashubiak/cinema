<template>
    <form @submit.prevent="updateUser()">
        Ім'я<input type="name" v-model="user.firstName" @input="isChanges()">
        <div v-if="invalidNameReg" class="error-message-name">Name can consist only letters and '-' or '</div>
        Прізвище <input type="surname" v-model="user.lastName" @input="isChanges()">
        <div v-if="invalidLastNameReg" class="error-message-lastname">Last name can consist only letters and '-' or '</div>
        Електрона пошта <input type="email" v-model="user.email" disabled>
        Номер телефону <input type="text" v-model="user.phoneNumber" @input="isChanges()">
        <div v-if="invalidPhoneReg" class="error-message-phone">Please enter a valid phone number +38(0##)-###-##-##</div>
        Пароль <input type="password" v-model="user.password" @input="isChanges()">
        <div v-if="invalidPasswordReg" class="error-message-password">Password should be at least 8 characters long</div>
        <button type="submit" :disabled="!changes">Lets Go</button>
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
        };
    },
    methods: {
        async updateUser(){
            await userAPI.updateUser(localStorage.getItem("token"),this.user);
        },
        isChanges() {
                if (this.user.password !== this.password || this.user.phoneNumber !== this.phoneNumber || this.firstName !== this.user.firstName || this.user.lastName !== this.lastName) {
                    this.changes = true;
                    return;
            }
            this.changes = false;
        }
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