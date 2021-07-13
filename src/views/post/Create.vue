<template>
  <div class="container my-5">
    <div class="row justify-content-center">
      <div class="col-8">
        <router-link
          :to="{ name: 'post.index' }"
          class="btn btn-primary btn-sm rounded shadow mb-3"
          >Back</router-link
        >
        <div class="card rounded shadow">
          <div class="card-header">Create Post</div>
          <div class="card-body">
            <form @submit.prevent="store()">
              <div class="mb-3">
                <label for="" class="form-label">Title</label>
                <input
                  type="text"
                  v-model="post.title"
                  class="form-control"
                  placeholder="Input Title"
                />
                <div v-if="validation.title" class="text-danger">
                  {{ validation.title[0] }}
                </div>
              </div>
              <div class="mb-3">
                <label for="" class="form-label">Body</label>
                <textarea
                  v-model="post.body"
                  class="form-control"
                  cols="30"
                  rows="10"
                  placeholder="Input free text"
                ></textarea>
                <div v-if="validation.body" class="text-danger">
                  {{ validation.body[0] }}
                </div>
              </div>
              <button class="btn btn-outline-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//reactive utk data binding
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

export default {
  setup() {
    //data binding
    const post = reactive({
      title: "",
      body: "",
    });

    // validation akan menampung tipe data array,
    // dari error message yg dikirimkan dari masing2 inputan
    const validation = ref([]);

    // utk redirect ke hal index apabila store berhasil ke dalam api
    const router = useRouter();

    //utk melakukan request ke api dgn mengirimkan inputan data
    function store() {
      axios
        .post(
          "http://localhost:8000/api/post",
          post //obj post diambil dari field2 title,slug,body (diwakili dgn variable post)
        )
        .then(() => {
          //bila berhasil melakukan post, redirect ke hal index
          router.push({
            name: "post.index",
          });
        })
        .catch((err) => {
          validation.value = err.response.data;
        });
    }

    // utk method store, gunakan return
    return {
      post,
      validation,
      router,
      store,
    };
  },
};
</script>
