<template>
  <div class="login_register_background"></div>
  <div class="parent-container-1">
    <div class="form-registration-login-container" :class="{'fluid-expanded': isFluidExpanded}" >
      <div class="fluid-container">
        <img src="@/assets/fluid-1.png" class="fluid-1" alt="fluid">
      </div>
      <transition name="slide-fade"
                  @before-enter="handleBeforeEnter"
                  @enter="handleEnter"
                  @after-enter="handleAfterEnter"
                  @before-leave="handleBeforeLeave"
                  @leave="handleLeave"
                  @after-leave="handleAfterLeave">
        <div class="login-container" v-show="showLogin && !isAnimating">
          <div class="form-icon">
            <i class="bx bx-log-in-circle icon-1"></i>
            <i class="bx bx-user-plus icon-2" @click="startAnimation"></i>
          </div>
          <div class="form-title">
            <span>WELCOME <br> BACK</span>
          </div>

          <div class="login-form">
            <img src="@/assets/image-login-border.png" class="border-login-email" alt="border">
            <img src="@/assets/image-login-border.png" class="border-login-password" alt="border">
            <div class="input-box-login">
              <input type="email" autocomplete="new-password" placeholder="Please enter email" id="email-login" v-model="user.email" @input="validateEmail">
              <label for="email-login" class="label-email-login">Email</label>
              <div v-if="invalidEmailReg" class="error-message"> Please enter a valid email address</div>
            </div>
            <div class="input-box-login">
              <input type="password" autocomplete="new-password" placeholder="Please enter password" id="password-login" v-model="user.password" @input="validatePassword">
              <label for="password-login" class="label-email-password">Password</label>
              <div v-if="invalidPasswordReg" > Password should be at least 8 characters long</div>
            </div>
            <div class="input-box-login">
              <button class="button-sign-in" type="submit" @click="login()" :disabled="invalidEmailReg || invalidPassword || isAnyFieldEmptyLog()">
                <span>Sign In</span><i class="bx bx-arrow-back"></i>
              </button>
              <div v-if="loginError">Такого користувача не існує, або пароль не вірний</div>
            </div>
          </div>
          <div class="form-login-buttons-links">
            <div class="sign-up">
              <a href="#" id="register-btn" @click.prevent="startAnimation"> Sign Up</a>
            </div>
            <div class="forgot">
              <a href="/recovery" id="register-btn"> Forgot Password?</a>
            </div>
          </div>
        </div>
      </transition>
      <transition name="slide-fade"
                  @before-enter="handleBeforeEnter"
                  @enter="handleEnter"
                  @after-enter="handleAfterEnter"
                  @before-leave="handleBeforeLeave"
                  @leave="handleLeave"
                  @after-leave="handleAfterLeave">
        <div class="register-container" v-show="showRegister && !isAnimating">
          <div class="form-icon">
            <i class="bx bx-user-plus icon-3"></i>
            <i class="bx bx-log-in-circle icon-4" @click="startAnimation"></i>
          </div>
          <div class="form-title">
            <span>CREATE <br> ACCOUNT</span>
          </div>

          <div class="register-form">
            <img src="@/assets/image-name-border.png" class="border-login-first-name" alt="border">
            <img src="@/assets/image-name-border.png" class="border-login-last-name" alt="border">
            <img src="@/assets/image-email-register-border.png" class="border-login-email-register" alt="border">
            <img src="@/assets/image-phone-border.png" class="border-login-phone" alt="border">
            <img src="@/assets/image-password-border.png" class="border-login-password-register" alt="border">
            <div class="input-box-register">
              <input type="text" autocomplete="new-name" placeholder="Please enter name" id="name-register" v-model="user.firstName" @input="validateName">
              <label for="name-register" class="label-name-register">First Name</label>
              <div v-if="invalidNameReg">Name can consist only of letters, '-' or ' '</div>
            </div>
            <div class="input-box-register">
              <input type="text" autocomplete="new-last-name" placeholder="Please enter surname" id="last-name-register" v-model="user.lastName" @input="validateLastName">
              <label for="last-name-register" class="label-last-name-register">Last Name</label>
              <div v-if="invalidLastNameReg">Last name can consist only of letters, '-' or ' '</div>
            </div>
            <div class="input-box-register">
              <input type="email" autocomplete="new-email-" placeholder="Please enter email" id="email-register" v-model="user.email" @input="validateEmail">
              <label for="name-register" class="label-email-register">Email</label>
              <div v-if="invalidEmailReg">Please enter a valid email address</div>
            </div>
            <div class="input-box-register">
              <input type="text" autocomplete="new-phone" placeholder="+##-####-####" id="phone-register" v-model="user.phoneNumber" v-mask="'+##-####-####'" @input="validatePhoneNumber">
              <label for="phone-register" class="label-phone-register">Phone Number</label>
              <div v-if="invalidPhoneReg">Please enter a valid phone number +12-3456-7890</div>
            </div>
            <div class="input-box-register">
              <input type="password" autocomplete="new-password-" placeholder="Please enter password" id="password-register" v-model="user.password" @input="validatePassword">
              <label for="password-register" class="label-password-register">Password</label>
              <div v-if="invalidPasswordReg">Password should be at least 8 characters long</div>
            </div>
            <div class="input-box-register">
              <button class="button-sign-up" type="submit" @click="createUser()" :disabled="invalidNameReg || invalidLastNameReg || invalidEmailReg || invalidPhoneReg || invalidPasswordReg || isAnyFieldEmptyReg()">
                <span>Sign Up</span><i class="bx bx-arrow-back"></i>
              </button>
            </div>
          </div>
          <div class="form-register-buttons-links">
            <div class="sign-up">
              <a href="#" id="login-btn" @click.prevent="startAnimation"> Sign In</a>
              <p v-if="loginError">Такого користувача не існує, або пароль не вірний</p>
            </div>
            <div class="forgot">
              <a href="/" id="register-btn"> Home Page</a>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import 'boxicons/css/boxicons.min.css';
import * as userAPI from '@/services/userAPI';
import { mask } from 'vue-the-mask';

export default {
  directives: {
    mask,
  },
  created() {
    this.disableAutofill(); // Викликати функцію при створенні компоненту
  },
  data() {
    return {
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
      responsePass: [],
      responseRecPass: [],
      invalidEmail: false,
      invalidPassword: false,
      loginError: false,
      showLogin: true,
      showRegister: false,
      isTransitioning: false,
      isFluidExpanded: false,
      isAnimating: false,
    };
  },
  methods: {
    disableAutofill() {
      const inputFields = document.querySelectorAll('input');

      inputFields.forEach(input => {
        input.setAttribute('autocomplete', 'off');
      });
    },
    async login() {
            if (!this.invalidEmail && !this.invalidPassword) {
                this.response = await userAPI.login(this.user);
                this.responseRecPass = await userAPI.loginViaRecovery(this.user);
                if (this.response != null) {
                    localStorage.token = this.response.token;
                    this.$router.push('/');
                } else if (this.responseRecPass != null){
                    localStorage.token = this.response.token;
                    this.$router.push('/');
                } else {
                    this.showLoginError();
                }
            }
    },
    async createUser() {
      if (!this.invalidNameReg && !this.invalidLastNameReg && !this.invalidEmailReg && !this.invalidPhoneReg && !this.invalidPasswordReg) {
        await userAPI.registration(this.user);
        this.$router.push('/');
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
    isAnyFieldEmptyReg() {
      return !this.user.email || !this.user.password || !this.user.phoneNumber || !this.user.firstName || !this.user.lastName;
    },
    isAnyFieldEmptyLog() {
            return !this.user.email || !this.user.password;
    },
    showLoginError() {
            this.loginError = true;
            setTimeout(() => {
                this.loginError = false;
            }, 10000);
    },
    startAnimation() {
      console.log("Animation started");
      this.isAnimating = true;
      this.isFluidExpanded = true;
      setTimeout(() => {
        this.isFluidExpanded = false;
        setTimeout(() => {
          this.toggleForm();
          this.isAnimating = false;
          console.log("Animation ended");
        }, 1000);
      }, 1000);
    },
    toggleForm() {
      this.showLogin = !this.showLogin;
      this.showRegister = !this.showRegister;
    },
    handleBeforeEnter(el) {
      el.style.opacity = 0;
    },
    handleEnter(el, done) {
      setTimeout(() => {
        el.style.opacity = 1;
        done();
      }, 0);
    },
    handleAfterEnter(el) {
      el.style.opacity = '';
    },
    handleBeforeLeave(el) {
      el.style.opacity = 1;
    },
    handleLeave(el, done) {
      setTimeout(() => {
        el.style.opacity = 0;
        done();
      }, 0);
    },
    handleAfterLeave(el) {
      el.style.opacity = '';
    },
  },
};

</script>

<style>
.error-message {
    position: absolute;
    top: -5px;
    left: 0;
    width: 100%;
    background-color: rgba(255, 0, 0, 0.8);
    color: white;
    padding: 5px;
    font-size: 12px;
    text-align: center;
  }
.fluid-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.fluid-1 {
  width: 100%;
  height: auto;
  transition: transform 1s ease-in-out;
}

.fluid-expanded .fluid-1 {
  transform: scale(5);
}
//Login Form Container
.login-container,
.register-container {
  transition: opacity 1.5s ease-in-out;
  opacity: 1;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}

.slide-fade-enter,
.slide-fade-leave-to /* .slide-fade-leave-active в версіях <2.1.8 */ {
  opacity: 0;
}
.login_register_background{
  overflow: hidden;
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  margin: 0;
  padding: 0;
  height: 100vh;
  gap: 0;
  background-image: url('@/assets/login_register_background.png');

}
.parent-container-1 {
  position: fixed;
  top: 0;
  left: -220px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.form-registration-login-container {
  transform: translateX(20%);
  width: 90%;
  max-width: 1126px;
  height: 639px;
  position: relative;
  margin-top: 5%;
  background-color: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(44px);
  border-radius: 40px;
  opacity: 1;
  overflow: hidden;

}
.fluid-container{
  position: relative;
  top: 0;
  left: 0;
}
.fluid-container .fluid-1{
  position: absolute;
  top: -80px;
  left: -90px;
  width: 600px;
  height: 540px;
}
.form-icon{
  z-index: 5;
  display: flex;
  justify-content: space-between;
}
.form-icon i{
  font-size: 44px;
  cursor: pointer;
}
.form-title{
  position: absolute;
  z-index: 5;
  width: 200px;
  height: 110px;
  top: 110px;
  left: 30px;
  gap: 0;
  font-family: Cormorant SC, serif;
  font-size: 48px;
  font-weight: 900 !important;
  line-height: 58px;
  text-align: center;
  color: rgba(255, 255, 255, 1);

}
.login-container{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 800px;
  padding: 120px;
}
.form-icon .icon-1{
  position: absolute;
  color: rgba(255, 255, 255, 1);
  top: 15px;
  left: 38px;
}
.form-icon .icon-2{
  position: absolute;
  color: rgba(255, 255, 255, 1);
  top: 17px;
  right: 60px;
}
.border-login-email{
  position: absolute;
  top: 160px;
  left: 480px;
}
.label-email-login{
  position: absolute;
  top: 149px;
  left: 530px;
  font-family: Cormorant Garamond,serif;
  font-size: 20px;
  font-weight: 400;
  line-height: 24px;
  text-align: left;
  color: rgba(255, 255, 255, 1);
}
#email-login{
  position: absolute;
  width: 479px;
  top: 190px;
  left: 510px;
  height: 70px;
  background: transparent !important;
  border: none;
  outline: none;
  font-weight: 500;
  font-size: 26px;
  color: rgba(255, 255, 255, 1);
  font-family: 'Cormorant Garamond', serif;
}
#password-login{
  position: absolute;
  width: 479px;
  top: 343px;
  left: 510px;
  height: 70px;
  background: transparent !important;
  border: none;
  outline: none;
  font-weight: 500;
  font-size: 26px;
  color: rgba(255, 255, 255, 1);
  font-family: 'Cormorant Garamond', serif;
}
#email-login::placeholder {
  color: rgba(255, 255, 255, 1);
  font-family: 'Cormorant Garamond', serif;
  font-size: 20px;
  opacity: 0.7;
}
#password-login::placeholder {
  color: rgba(255, 255, 255, 1);
  font-family: 'Cormorant Garamond', serif;
  font-size: 20px;
  opacity: 0.7;
}
.border-login-password{
  position: absolute;
  top: 310px;
  left: 480px;
}

.label-email-password{
  position: absolute;
  top: 299px;
  left: 525px;
  font-family: Cormorant Garamond,serif;
  font-size: 20px;
  font-weight: 400;
  line-height: 24px;
  text-align: left;
  color: rgba(255, 255, 255, 1);
}
.input-box-login{
  display: flex;
  align-items: center;
  justify-content: center;
}
.button-sign-in{
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  width: 253px;
  height: 52px;
  top: 450px;
  right: 114px;
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
.bx-arrow-back{
  transform: rotate(180deg);
}
.form-login-buttons-links{
  display: flex;
  align-items: center;
  justify-content: center;
}
.form-login-buttons-links .sign-up{
  color: #FFFFFF;
  position: absolute;
  top: 545px;
  left: 510px;
  font-family: Cormorant Garamond,serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 24px;
}
.form-login-buttons-links .forgot{
  color: #FFFFFF;
  position: absolute;
  top: 545px;
  right: 120px;
  font-family: Cormorant Garamond,serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 24px;
}
.form-login-buttons-links .sign-up a,
.form-login-buttons-links .forgot a{
  color: inherit;
}
//CreateAccount
.register-container{
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 800px;
  left: 520px;
  padding: 120px;
}
.form-icon .icon-3{
  position: absolute;
  color: rgba(255, 255, 255, 1);
  top: 15px;
  left: 38px;
}
.form-icon .icon-4{
  position: absolute;
  color: rgba(255, 255, 255, 1);
  top: 17px;
  right: 60px;
}
.border-login-first-name{
  position: absolute;
  top: 100px;
  right: 400px;
}
.label-name-register{
  position: absolute;
  top: 89px;
  left: 470px;
  font-family: Cormorant Garamond,serif;
  font-size: 20px;
  font-weight: 400;
  line-height: 24px;
  text-align: left;
  color: rgba(255, 255, 255, 1);
}
#name-register{
  position: absolute;
  width: 233px;
  top: 134px;
  left: 466px;
  height: 70px;
  background: transparent;
  border: none;
  outline: none;
  font-weight: 500;
  font-size: 26px;
  color: rgba(255, 255, 255, 1);
  font-family: 'Cormorant Garamond', serif;
}
.border-login-last-name{
  position: absolute;
  top: 100px;
  right: 65px;
}
.label-last-name-register{
  position: absolute;
  top: 89px;
  left: 808px;
  font-family: Cormorant Garamond,serif;
  font-size: 20px;
  font-weight: 400;
  line-height: 24px;
  text-align: left;
  color: rgba(255, 255, 255, 1);
}
#last-name-register{
  position: absolute;
  width: 233px;
  top: 134px;
  left: 800px;
  height: 70px;
  background: transparent;
  border: none;
  outline: none;
  font-weight: 500;
  font-size: 26px;
  color: rgba(255, 255, 255, 1);
  font-family: 'Cormorant Garamond', serif;
}
.border-login-email-register{
  position: absolute;
  top: 230px;
  right: 400px;
}
.label-email-register{
  position: absolute;
  top: 220px;
  left: 470px;
  font-family: Cormorant Garamond,serif;
  font-size: 20px;
  font-weight: 400;
  line-height: 24px;
  text-align: left;
  color: rgba(255, 255, 255, 1);
}
#email-register{
  position: absolute;
  width: 233px;
  top: 268px;
  left: 466px;
  height: 70px;
  background: transparent;
  border: none;
  outline: none;
  font-weight: 500;
  font-size: 26px;
  color: rgba(255, 255, 255, 1);
  font-family: 'Cormorant Garamond', serif;
}

.border-login-phone{
  position: absolute;
  top: 230px;
  right: 65px;
}
.label-phone-register{
  position: absolute;
  top: 220px;
  left: 808px;
  font-family: Cormorant Garamond,serif;
  font-size: 20px;
  font-weight: 400;
  line-height: 24px;
  text-align: left;
  color: rgba(255, 255, 255, 1);
}
#phone-register{
  position: absolute;
  width: 233px;
  top: 268px;
  left: 800px;
  height: 70px;
  background: transparent;
  border: none;
  outline: none;
  font-weight: 500;
  font-size: 26px;
  color: rgba(255, 255, 255, 1);
  font-family: 'Cormorant Garamond', serif;
}
.border-login-password-register{
  position: absolute;
  top: 360px;
  right: 65px;
}
.label-password-register{
  position: absolute;
  top: 347px;
  left: 490px;
  font-family: Cormorant Garamond,serif;
  font-size: 20px;
  font-weight: 400;
  line-height: 24px;
  text-align: left;
  color: rgba(255, 255, 255, 1);
}
#password-register{
  position: absolute;
  width: 570px;
  top: 397px;
  left: 466px;
  height: 70px;
  background: transparent;
  border: none;
  outline: none;
  font-weight: 500;
  font-size: 26px;
  color: rgba(255, 255, 255, 1);
  font-family: 'Cormorant Garamond', serif;
}
.input-box-register{
  display: flex;
  align-items: center;
  justify-content: center;
}
.button-sign-up{
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  width: 253px;
  height: 52px;
  top: 485px;
  right: 70px;
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
.form-register-buttons-links .sign-up{
  color: #FFFFFF;
  position: absolute;
  top: 555px;
  left: 510px;
  font-family: Cormorant Garamond,serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 24px;
}
.form-register-buttons-links .forgot{
  color: #FFFFFF;
  position: absolute;
  top: 555px;
  right: 80px;
  font-family: Cormorant Garamond,serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 24px;
}
.form-register-buttons-links .sign-up a,
.form-register-buttons-links .forgot a{
  color: inherit;
}
#name-register::placeholder,
#last-name-register::placeholder,
#email-register::placeholder,
#phone-register::placeholder,
#password-register::placeholder{
  color: rgba(255, 255, 255, 1);
  font-family: 'Cormorant Garamond', serif;
  font-size: 20px;
  opacity: 0.7;
}
</style>
