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
          <div class="card-header">Edit Post</div>
          <div class="card-body">
            <form @submit.prevent="update()">
              <div class="mb-3">
                <label for="" class="form-label">Title</label>
                <input
                  type="text"
                  v-model="post.title"
                  class="form-control"
                  placeholder="Input Title"
                  readonly
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
import { reactive, ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";

export default {
  setup() {
    //data binding
    let post = reactive({
      title: "",
      body: "",
    });

    // validation akan menampung tipe data array,
    // dari error message yg dikirimkan dari masing2 inputan
    const validation = ref([]);

    // utk redirect ke hal index apabila store berhasil ke dalam api
    const router = useRouter();
    const route = useRoute();

    //utk melakukan request ke api dgn mengirimkan inputan data
    onMounted(() => {
      axios
        .get(`http://localhost:8000/api/post/${route.params.id}`)
        .then((result) => {
          post.title = result.data.data.title;
          post.body = result.data.data.body;
        })
        .catch((err) => {
          console.log = err.response.data;
        });
    });

    // utk melakukan request ke api dengan mengirimkan inputan data
    function update() {
      axios
        .put(
          `http://localhost:8000/api/post/${route.params.id}`,
          post //obj transaction diambil dari title, body (diwakili dgn variable post)
        )
        .then(() => {
          // bila berhasil melakukan put, redirect ke hal index
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
      update,
    };
  },
};
</script>
