<template>
  <router-view></router-view>
</template>

<script>
import { useRouter } from 'vue-router';
import User from './models/User';

export default {
  name: 'App',
  async created() {
    const router = useRouter();
    const token = localStorage.getItem('auth-token');
    if (!token) {
      router.push('/login');
    } else {
      const user = await User.getUser(token);
      const path = user.type === 'normal' ? 'home' : 'dashboard';
      router.replace({ name: path, params: { user }});
    }
  }
};
</script>

<style>
.primary-color {
  color: #c3bd61;
}
.navbar {
  background-color: #c3bd61;
}
.primary-button {
  background-color: #c3bd61 !important;
}
</style>
