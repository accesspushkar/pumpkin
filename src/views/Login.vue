<template>
  <nav class="navbar">
    <div class="container-fluid">
      <p class="navbar-brand">Assignment</p>
    </div>
  </nav>
  <div class="container">
    <div class="row">
      <div class="col">
        <div class="mt-3">
          <h3>Sign Up</h3>
        </div>
          <div class="mb-3">
            <label for="email" class="form-label">Email address</label>
            <input type="email" v-model="newUser.email" class="form-control" id="email" required>
          </div>
          <div class="mb-3">
            <label for="name" class="form-label">Username</label>
            <input type="text" v-model="newUser.username" class="form-control" id="name" required>
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input type="password" v-model="newUser.password" class="form-control" id="password" required>
          </div>
          <div class="form-check">
            <input class="form-check-input" @click="newUser.type = 'normal'" type="radio" name="userType" id="normal" :checked="newUser.type === 'normal'">
            <label class="form-check-label" for="normal">
              Normal User
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" @click="newUser.type = 'contributer'" type="radio" name="userType" id="contributer" :checked="newUser.type === 'contributer'">
            <label class="form-check-label" for="contributer">
              Contributer
            </label>
          </div>
          <button @click="signUp" class="btn primary-button">Sign Up</button>        
      </div>
      <div class="col">
        <div class="mt-3">
          <h3>Login</h3>
        </div>
          <div class="mb-3">
            <label for="username" class="form-label">Username</label>
            <input type="text" v-model="userName" class="form-control" id="username" required>
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input type="password" v-model="pwd" class="form-control" id="loginPwd" required>
          </div>
          <button @click="login" class="btn primary-button">Log In</button>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import User from '../models/User';

export default {
  name: 'Login',
  setup() {
    const router = useRouter();
    const toast = useToast();
    const state = reactive({
      newUser: {
        email: '',
        username: '',
        password: '',
        type: 'normal',
      },
      pwd: '',
      userName: '',
    });

    const login = async () => { 
      const params = {
        username: state.userName,
        password: state.pwd,
      };
      const user = await User.login(params);
      if (user.message) {
        toast.error(user.message)
      } else {
        toast.success('Success, logging in..')
        localStorage.setItem('auth-token', user.id);
        const path = user.type === 'normal' ? 'home' : 'dashboard';
        router.replace({ name: path, params: { user }});
      }
    };
    const signUp = async () => {
      if (!state.newUser.email.length) {
        toast.warning('Please enter a valid email id');
      } else if(state.newUser.username.length < 3) {
        toast.warning('Please enter minimum 3 characters for the username');
      } else if (state.newUser.password.length < 5) {
        toast.warning('Please enter minimum 5 characters for the password');
      } else {
        const params = {
          email: state.newUser.email,
          username: state.newUser.username,
          password: state.newUser.password,
          type: state.newUser.type
        };
        const res = await User.signUp(params);
        if (res.message === 'Success') {
          toast.success('Successfully signed up, you can now log in!')
          window.location.reload();
        } else if (res.message) {
          toast.error(res.message)
        } else toast.error('Something went wrong!')
      }
    };

    return {
      ...toRefs(state),
      login,
      signUp
    }
  }
}
</script>
<style scoped>

</style>
