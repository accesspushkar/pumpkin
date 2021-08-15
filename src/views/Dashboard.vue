<template>
  <nav class="navbar">
    <div class="container-fluid">
      <p class="navbar-brand">Assignment - Contributer</p>
    </div>
  </nav>
  <div class="container">
  <div class="row">
    <div class="col-3">
       <div class="full-height border-box">
            <div class="d-grid gap-2">
                <button class="btn" @click="activeTab = 'uploadTab'" type="button">Upload Image</button>
                <button class="btn" @click="activeTab = 'downloadTab'" type="button">Download Report</button>
            </div>
       </div>
    </div>
    <div class="col-9">
        <div class="full-height border-box">
            <div class="form-control" style="border: none" v-if="activeTab === 'uploadTab'">
                <fieldset>
                    <legend>Upload Image</legend>
                    <div class="mb-3">
                        <label for="name" class="form-label">Image Name</label>
                        <input type="text" v-model="image.name" id="name" class="form-control" placeholder="Enter name">
                    </div>
                    <div class="mb-3">
                        <label for="image" class="form-label">Image</label>
                        <input class="form-control" accept="image/*" 
                               type="file" id="image"
                               @change="imageUploaded($event.target.files[0])">
                    </div>
                    <div class="mb-3">
                        <label for="category" class="form-label">Category</label>
                        <select v-model="image.category" class="form-select" id="category">
                            <option selected value="technology">Technology</option>
                            <option value="marketting">Marketing</option>
                            <option value="business">B2B</option>
                        </select>
                    </div>
                    <button @click="upload()" class="btn primary-button">Save</button>
                </fieldset>
            </div>
            <div class="p-3" v-else>
                <div style="height: 80vh">
                    <legend>Download Report</legend>
                    <table class="table table-bordered">
                    <thead>
                        <tr>
                        <th scope="col">Image Name</th>
                        <th scope="col">Category</th>
                        <th scope="col">Total Downloads</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="img in images" :key="img.id">
                            <td>{{img.name}}</td>
                            <td>{{img.category}}</td>
                            <td>{{img.downloads}}</td>
                        </tr>
                    </tbody>
                    </table>
                </div>
                <nav class="p-3">
                    <ul class="pagination justify-content-end">
                        <li class="page-item">
                        <a @click="prevPage()" class="page-link">
                            <span>&laquo;</span>
                        </a>
                        </li>
                        <li class="page-item"><a class="page-link">{{ page }}</a></li>
                        <li class="page-item">
                        <a @click="nextPage()" class="page-link">
                            <span>&raquo;</span>
                        </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </div>
  </div>
  </div>
</template>
<script>
import User from '../models/User';
import Image from '../models/Images';
import { useToast } from 'vue-toastification';

export default {
  name: 'Dashboard',
  data() {
    return {
      toast: null,
      user: {},
      activeTab: 'uploadTab',
      image: {
        name: '',
        category: 'technology',
        file: null,
      },
      page: 1,
      limit: 15,
      allImages: [],
    }
  },
  computed: {
    images() {
      return this.allImages.slice(this.limit * (this.page - 1), (this.limit * this.page))
    },
  },
  methods: {
    prevPage() {
      if(this.page !== 1) return this.page--;
      return;
    },
    nextPage() {
      if(this.allImages.length < 15) return;
      return this.page++;
    },
    imageUploaded(file) {
      this.image.file = file;
    },
    async upload() {
      if (this.image.name.length < 3) {
        this.toast.error('Please enter more than 3 characters for the name!');
      } else if (!this.image.file) {
        this.toast.error('Please upload a file!');
      } else {
        const result = await Image.upload({
            name: this.image.name,
            file: this.image.file,
            category: this.image.category,
            author: this.user.id,
        });
        this.toast.success(result.message)
      }
    },
  },
  async created() {
    this.toast = useToast();
    const token = localStorage.getItem('auth-token')
    this.user = await User.getUser(token);
    this.allImages = await Image.getAllUserImages(token);
  },
}
</script>
<style scoped>
.container {
    padding-left: 15px !important;
    padding-right: 15px !important;
    margin-left: 0 !important;
    margin-right: 0 !important;
    max-width: 100% !important;
}
.row {
    --bs-gutter-x: 1.5rem !important;
}
.full-height {
    height: 89vh;
    margin-top: 15px;
}
.border-box {
    border: 1px solid black;
    width: 100%
}
.table {
    padding: 0.375rem 0.75rem !important;
}
</style>
