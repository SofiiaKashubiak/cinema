<template>
  <div class="profile-background"></div>
  <div class="parent-container-1">
    <div class="form-profile-container">
      <div class="laptop-container">
        <img src="@/assets/laptop.png" class="laptop_image" alt="fluid">
      </div>
      <div class="profile-container">
        <div class="form-title-profile">
          <span>UPDATE <br> PROFILE</span>
        </div>
        <div class="profile-form">
          <img src="@/assets/image-name-border.png" class="border-profile-first-name" alt="border">
          <img src="@/assets/image-name-border.png" class="border-profile-last-name" alt="border">
          <img src="@/assets/image-email-register-border.png" class="border-profile-email" alt="border">
          <img src="@/assets/image-phone-border.png" class="border-profile-password" alt="border">
          <div class="input-box-profile">
            <input type="name" autocomplete="new-name" id="name-profile" v-model="user.firstName" @input="validateName()">
            <label for="name-profile" class="label-name-profile">First Name</label>
            <div v-if="invalidNameReg" class="error-message-name-profile">Name can consist only letters and '-' or '</div>
          </div>
          <div class="input-box-profile">
            <input type="surname" autocomplete="new-last-name" id="last-name-profile" v-model="user.lastName" @input="validateLastName()">
            <label for="last-name-profile" class="label-last-name-profile">Last Name</label>
            <div v-if="invalidLastNameReg" class="error-message-last-name-profile">Last name can consist only letters and '-' or '</div>
          </div>
          <div class="input-box-profile">
            <input type="email" id="email-profile" v-model="user.email" disabled>
            <label for="name-register" class="label-email-profile">Email</label>
          </div>
          <div class="input-box-register">
            <input type="text" v-model="user.phoneNumber" autocomplete="new-phone" id="phone-profile" v-mask="'+##-####-####'" @input="validatePhoneNumber">
            <label for="phone-profile" class="label-phone-profile">Phone Number</label>
            <div v-if="invalidPhoneReg" class="error-message-phone-profile">Please enter a valid phone number +12-3456-7890</div>
          </div>
          <div class="input-box-register">
            <button class="button-update-user" type="submit" @click="updateUser()" :disabled="!changes || invalidNameReg || invalidLastNameReg || invalidPhoneReg">
              <span>Update User</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
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
            this.$router.push("/authentication");
        }
    }
};
</script>
<style>
.profile-background{
  overflow: hidden;
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  margin: 0;
  padding: 0;
  height: 100vh;
  gap: 0;
  background-image: url('@/assets/profile_background.png');
}
.form-profile-container {
  transform: translateX(25%);
  width: 100%;
  max-width: 1016px;
  height: 591px;
  position: relative;
  margin-top: 5%;
  background-image: url('@/assets/profile_box.png');
  background-size: cover;
  background-repeat: no-repeat;
  opacity: 1;
}
.profile-container{
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 800px;
  left: 520px;
  padding: 120px;
}
.laptop-container {
  position: relative;
}

.laptop-container .laptop_image {
  position: absolute;
  top: 190px;
  height: auto;
  transition: transform 1s ease-in-out;
}
.form-title-profile{
  position: absolute;
  z-index: 5;
  width: 200px;
  height: 270px;
  top: 105px;
  left: -470px;
  gap: 0;
  font-family: Cormorant SC, serif;
  font-size: 52px;
  font-weight: 900 !important;
  line-height: 58px;
  text-align: center;
  color: rgba(255, 255, 255, 1);
}
.border-profile-first-name{
  position: absolute;
  top: 110px;
  right: 1145px;
}
#name-profile{
  position: absolute;
  width: 233px;
  top: 140px;
  left: -148px;
  height: 70px;
  background: transparent;
  border: none;
  outline: none;
  font-weight: 500;
  font-size: 26px;
  color: rgba(255, 255, 255, 1);
  font-family: 'Cormorant Garamond', serif;
}
.label-name-profile{
  position: absolute;
  top: 98px;
  left: -148px;
  font-family: Cormorant Garamond,serif;
  font-size: 20px;
  font-weight: 400;
  line-height: 24px;
  text-align: left;
  color: rgba(255, 255, 255, 1);
}
.error-message-name-profile {
  position: absolute;
  top: 200px;
  left:-660px;
  width: 100%;
  color: white;
  padding: 5px;
  font-size: 16x;
  text-align: center;
  font-family: 'Cormorant Garamond', serif;
}
.border-profile-last-name{
  position: absolute;
  top: 110px;
  right: 815px;
}
.label-last-name-profile{
  position: absolute;
  top: 98px;
  left: 185px;
  font-family: Cormorant Garamond,serif;
  font-size: 20px;
  font-weight: 400;
  line-height: 24px;
  text-align: left;
  color: rgba(255, 255, 255, 1);
}
#last-name-profile{
  position: absolute;
  width: 233px;
  top: 140px;
  left: 185px;
  height: 70px;
  background: transparent;
  border: none;
  outline: none;
  font-weight: 500;
  font-size: 26px;
  color: rgba(255, 255, 255, 1);
  font-family: 'Cormorant Garamond', serif;
}
.error-message-last-name-profile {
  position: absolute;
  top: 200px;
  left:-340px;
  width: 100%;
  color: white;
  padding: 5px;
  font-size: 16x;
  text-align: center;
  font-family: 'Cormorant Garamond', serif;
}
.border-profile-email{
  position: absolute;
  top: 240px;
  right: 1145px;
}
.label-email-profile{
  position: absolute;
  top: 228px;
  left: -147px;
  font-family: Cormorant Garamond,serif;
  font-size: 20px;
  font-weight: 400;
  line-height: 24px;
  text-align: left;
  color: rgba(255, 255, 255, 1);
}
#email-profile{
  position: absolute;
  width: 233px;
  top: 273px;
  left: -150px;
  height: 70px;
  background: transparent;
  border: none;
  outline: none;
  font-weight: 500;
  font-size: 26px;
  color: rgba(255, 255, 255, 1);
  font-family: 'Cormorant Garamond', serif;
}
.border-profile-password{
  position: absolute;
  top: 240px;
  right: 815px;
}
.label-phone-profile{
  position: absolute;
  top: 228px;
  left: 187px;
  font-family: Cormorant Garamond,serif;
  font-size: 20px;
  font-weight: 400;
  line-height: 24px;
  text-align: left;
  color: rgba(255, 255, 255, 1);
}
#phone-profile{
  position: absolute;
  width: 233px;
  top: 273px;
  left: 190px;
  height: 70px;
  background: transparent;
  border: none;
  outline: none;
  font-weight: 500;
  font-size: 26px;
  color: rgba(255, 255, 255, 1);
  font-family: 'Cormorant Garamond', serif;
}
.error-message-phone-profile {
  position: absolute;
  top: 340px;
  left:-340px;
  width: 100%;
  color: white;
  padding: 5px;
  font-size: 16x;
  text-align: center;
  font-family: 'Cormorant Garamond', serif;
}
.input-box-profile{
  display: flex;
  align-items: center;
  justify-content: center;
}
.button-update-user{
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  width: 253px;
  height: 52px;
  top: 390px;
  left: 180px;
  border: none;
  border-radius: 30px;
  background: rgba(229, 69, 224, 0.15);
  font-family: Cormorant Garamond, serif;
  font-size: 36px;
  font-weight: 600;
  line-height: 44px;
  text-align: center;
  color: #FFFFFF;
}
</style>