import axios from "axios";
const uploadReq = axios.create({
    baseURL: "http://localhost:3002/",
    headers: {
      "Content-type": "multipart/form-data"
    }
});

import req from './resource';
import { useToast } from 'vue-toastification';
const toast = useToast();

export default {
    async upload(image) {
        try {
          let params= new FormData();
          params.append("file", image.file);
          params.append("name", image.name);
          params.append("category", image.category);
          params.append("author", image.author);          
          const { data } = await uploadReq.post('/image/upload', params);
          return data;
        } catch (e) {
          toast.error(e.message)
          console.log(e);
          throw e;
        }
      },
      async getAllUserImages(userId) {
        try {
          const data = await req.get(`/image/getAll/${userId}`);
          console.log(data)
          return data.data;
        } catch (e) {
          toast.error(e.message)
          console.log(e);
          throw e;
        }
      },
      async getAllImages() {
        try {
          const data = await req.get(`/image/getAll`);
          return data.data;
        } catch (e) {
          toast.error(e.message)
          console.log(e);
          throw e;
        }
      },
      async download(imageId) {
        try {
          const data = await req.post(`/image/download/${imageId}`);
          return data.data;
        } catch (e) {
          toast.error(e.message)
          console.log(e);
          throw e;
        }
      },
  };
