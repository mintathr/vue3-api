<template>
  <div class="container my-5">
    <div class="row justify-content-center">
      <div class="col-8">
        <router-link
          :to="{ name: 'post.create' }"
          class="btn btn-primary btn-sm rounded shadow mb-3"
          >Add</router-link
        >
        <div class="card rounded shadow">
          <div class="card-header">Post List</div>
          <div class="card-body">
            <table class="table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Slug</th>
                  <th>Body</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(post, index) in posts.data" :key="index">
                  <td>{{ post.title }}</td>
                  <td>{{ post.slug }}</td>
                  <td>{{ post.body }}</td>

                  <td>
                    <div class="btn-group">
                      <router-link
                        :to="{
                          name: 'post.edit',
                          params: { id: post.id },
                        }"
                        class="btn btn-sm btn-outline-info"
                        >Edit</router-link
                      >
                      <button
                        class="btn btn-sm btn-outline-danger"
                        @click.prevent="destroy(post.id, index)"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

import { onMounted, ref } from "vue";

export default {
  setup() {
    //reactive state
    let posts = ref([]); //definisikan wadah utk menamping data dgn fungsi ref

    onMounted(() => {
      //get data from api endpoint
      axios
        .get("http://localhost:8000/api/post") //melakukan fetch ke api
        .then((result) => {
          posts.value = result.data;
        })
        .catch((err) => {
          console.log(err.response);
        });
    });

    function destroy(id, index) {
      axios
        .delete(`http://localhost:8000/api/post/${id}`)
        .then(() => {
          //splice adalah utk menghapus data
          posts.value.data.splice(index, 1);
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    }

    return {
      posts,
      destroy,
    };
  },
};
</script>
