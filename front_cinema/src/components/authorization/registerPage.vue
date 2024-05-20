<template>
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
        };
    },
    methods: {
        createUser() {
            userAPI.registration(this.user);
            this.$router.push("/");
        },
    },
};

</script>

