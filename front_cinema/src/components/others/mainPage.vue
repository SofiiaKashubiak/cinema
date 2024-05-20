<template>
    <h1>Hello World</h1>
        Електрона пошта<input type="email" v-model="user.email">
        Пароль <input type="password" v-model="user.password">
        UserID <input type="text" v-model="userID">
        <button @click="getAuthorization()">Lets Go</button>
</template>

<script>
import * as userAPI from '@/services/userAPI'

export default {
    data () {
        return{
            user: [],
            response: [],
            tickets: [],
            userID: '',
            token: '',
        };
    },
    methods: {
        async getAuthorization(){
            this.response = await userAPI.getUserByToken(localStorage.getItem("token"));
            if (this.response != null) {
                this.user = this.response.user;
            }
        }
        // async getTickets() {
        //     this.response = await userAPI.getUserTickets(localStorage.getItem("token"));
        //     if (this.response != null) {
        //         this.tickets = this.response.data;
        //     }
        // }
        // async deleteUser(){
        //     this.response = await userAPI.deleteUser(this.userID);
        // }
    },
}

</script>


