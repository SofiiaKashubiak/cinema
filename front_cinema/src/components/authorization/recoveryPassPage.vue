<template>
  <div class="profile-background"></div>
  <div class="parent-container-1">
    <div class="form-profile-container">
      <div class="laptop-container">
        <img src="@/assets/laptop_2.png" class="laptop_image" alt="fluid">
      </div>
      <div class="profile-container">
        <div class="form-title-recovery">
          <span>RECOVER <br> PASSWORD</span>
        </div>
        <div class="recovery-password-form">
          <img src="@/assets/image-login-border.png" class="border-recovery-email" alt="border">
          <div class="input-box-profile">
            <input type="email" autocomplete="new-email" placeholder="Please enter email" id="email-recovery" v-model="user.email" @input="validateEmail">
            <label for="email-recovery" class="label-email-recovery">Email</label>
            <div v-if="invalidEmail" class="error-message-email-recovery"> Please enter a valid email address</div>
          </div>
          <div class="input-box-profile">
            <button type="submit" class="button-recovery-password" @click="createPassword()" :disabled="invalidEmail || !this.user.email">
              <span>Recover Password</span><i class="bx bx-arrow-back"></i>
            </button>
            <p v-if="loginError" class="error-message-email-recovery">This user does not exist</p>
        </div>
        </div>
      </div>
    </div>
  </div>
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
            this.$router.push("/authentication")
        },
        validateEmail() {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            this.invalidEmail = !emailPattern.test(this.user.email);
        },
    },
};
</script>
<style>
.form-title-recovery{
  position: absolute;
  z-index: 5;
  width: 200px;
  height: 270px;
  top: 105px;
  left: -500px;
  gap: 0;
  font-family: Cormorant SC, serif;
  font-size: 52px;
  font-weight: 900 !important;
  line-height: 58px;
  text-align: center;
  color: rgba(255, 255, 255, 1);
}
.border-recovery-email{
  position: absolute;
  top: 170px;
  right: 850px;
}
#email-recovery{
  position: absolute;
  width: 480px;
  top: 200px;
  right: 870px;
  height: 70px;
  background: transparent;
  border: none;
  outline: none;
  font-weight: 500;
  font-size: 26px;
  color: rgba(255, 255, 255, 1);
  font-family: 'Cormorant Garamond', serif;
}
.label-email-recovery{
  position: absolute;
  top: 160px;
  right: 1290px;
  font-family: Cormorant Garamond,serif;
  font-size: 20px;
  font-weight: 400;
  line-height: 24px;
  text-align: left;
  color: rgba(255, 255, 255, 1);
}
.error-message-email-recovery {
  position: absolute;
  top: 270px;
  right: 500px;
  width: 100%;
  color: white;
  padding: 5px;
  font-size: 16x;
  text-align: center;
  font-family: 'Cormorant Garamond', serif;
}
.button-recovery-password{
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  width: 380px;
  height: 52px;
  top: 305px;
  left: 30px;
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
