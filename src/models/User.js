import req from './resource';
import { useToast } from 'vue-toastification';
const toast = useToast();

export default {
    async login(params) {
        try {
          const { data } = await req.post('/user/login', params);
          return data;
        } catch (e) {
          console.log(e);
          throw e;
        }
      },
      async getUser(userId) {
        try {
          const { data } = await req.get(`/user/get/${userId}`);
          return data;
        } catch (e) {
          console.log(e);
          throw e;
        }
      },
      async signUp(params) {
        try {
          const { data } = await req.post('/user/signup', params);
          return data;
        } catch (e) {
          toast.error(e.message)
          console.log(e);
          throw e;
        }
      },
  };
