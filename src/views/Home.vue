<template>
  <nav class="navbar">
    <div class="container-fluid">
      <p class="navbar-brand">Assignment - Normal User Login</p>
    </div>
  </nav>
   <div class="container">
  <div class="row">
    <div class="col-3">
       <div class="full-height border-box">
            <div class="d-grid gap-2">
                <legend class="p-2">Category</legend>
                <div class="form-check m-3">
                  <input class="form-check-input" v-model="technicalFilter" type="checkbox" value="" id="technical">
                  <label class="form-check-label" for="technical">
                    Techncal
                  </label>
                </div>
                <div class="form-check m-3">
                  <input class="form-check-input" v-model="markettingFilter" type="checkbox" value="" id="marketting">
                  <label class="form-check-label" for="marketting">
                    Marketting
                  </label>
                </div>
                <div class="form-check m-3">
                  <input class="form-check-input" v-model="businessFilter" type="checkbox" value="" id="business">
                  <label class="form-check-label" for="business">
                    B2B
                  </label>
                </div>
            </div>
       </div>
    </div>
    <div class="col-9">
        <div class="full-height border-box">
            <div class="p-3">
                <div class="columns" style="height: 80vh">
                  <div class="row align-items-start">
                    <div v-for="image in filteredImages" :key="image.id" class="col-4 mb-5">
                      <div class="card" style="width: 18rem;">
                        <img :src="`${baseUrl}/${image.path}`" class="card-img-top" alt="">
                        <div class="card-body">
                          <p class="card-text">Name: {{image.name}}</p>
                          <p class="card-text">Contributer: {{image.username}}</p>
                          <p class="card-text">Downloads: {{image.downloads}}</p>
                          <button class="btn primary-button" @click="downloadAll(image)" >Download</button>
                        </div>
                      </div>
                    </div>
                  </div>
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
import Image from '../models/Images';
import { useToast } from 'vue-toastification';
import _ from 'lodash';

export default {
  name: 'Home',
  data() {
    return {
      baseUrl: `http://localhost:3002/pumpkin-uploads`,
      toast: useToast(),
      technicalFilter: true,
      markettingFilter: true,
      businessFilter: true,
      page: 1,
      limit: 6,
      data: [],
    }
  },
  computed: {
    filteredImages() {
      const selectedCategories = [];
      if (this.technicalFilter) selectedCategories.push('technology');
      if (this.markettingFilter) selectedCategories.push('marketting');
      if (this.businessFilter) selectedCategories.push('business');
      const data = _.filter(this.data, (img) => selectedCategories.includes(img.category));
      return data.slice(this.limit * (this.page - 1), this.limit * this.page);
    },
  },
  methods: {
    prevPage() {
      if(this.page !== 1) return this.page--;
      return;
    },
    nextPage() {
      if (this.filteredImages.length < this.limit) return;
      return this.page++;
    },
    download(image) {
      ++image.downloads;
      Image.download(image.id);
    },
    async downloadAll(selectedImage) {
      const data = selectedImage.batch ? _.filter(this.data, (img) => selectedImage.name === img.name) : _.castArray(selectedImage);
      for (const img of data) { 
        await this.proceedDownload(img); 
      } 
    },
    proceedDownload(img) {
      return new Promise((resolve) => {
        let url = `${this.baseUrl}/${img.path}`; 
        this.downloadResource(url);
        setTimeout(() => resolve(), 500);
      });
    },
    forceDownload(blob, filename) {
      var a = document.createElement('a');
      a.download = filename;
      a.href = blob;
      document.body.appendChild(a);
      a.click();
      a.remove();
    },
    downloadResource(url, filename) {
      if (!filename) filename = url.split('\\').pop().split('/').pop();
      fetch(url, {
          headers: new Headers({
            'Origin': location.origin
          }),
          mode: 'cors'
        })
        .then(response => response.blob())
        .then(blob => {
          let blobUrl = window.URL.createObjectURL(blob);
          this.forceDownload(blobUrl, filename);
        })
        .catch(e => console.error(e));
    },
  },
  async created() {
    this.data = await Image.getAllImages();
  }
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
