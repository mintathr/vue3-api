<template>
  <div class="container my-5">
    <div class="row justify-content-center">
      <div class="col-8">
        <router-link
          :to="{ name: 'transaction.index' }"
          class="btn btn-primary btn-sm rounded shadow mb-3"
          >Back</router-link
        >
        <div class="card rounded shadow">
          <div class="card-header">Create Transaction</div>
          <div class="card-body">
            <form @submit.prevent="store()">
              <div class="mb-3">
                <label for="" class="form-label">Title</label>
                <input
                  type="text"
                  v-model="transaction.title"
                  class="form-control"
                />
                <div v-if="validation.title" class="text-danger">
                  {{ validation.title[0] }}
                </div>
              </div>
              <div class="mb-3">
                <label for="" class="form-label">Amount</label>
                <input
                  type="text"
                  v-model="transaction.amount"
                  class="form-control"
                />
                <div v-if="validation.amount" class="text-danger">
                  {{ validation.amount[0] }}
                </div>
              </div>
              <div class="mb-3">
                <label for="" class="form-label">Time</label>
                <input
                  type="text"
                  v-model="transaction.time"
                  class="form-control"
                  placeholder="yyyy-mm-dd hh:mm:ss"
                />
                <div v-if="validation.time" class="text-danger">
                  {{ validation.time[0] }}
                </div>
              </div>
              <div class="mb-3">
                <label for="" class="form-label">Type</label>
                <select class="form-select" v-model="transaction.type">
                  <option value="expense">Expense</option>
                  <option value="revenue">Revenue</option>
                </select>
                <div v-if="validation.type" class="text-danger">
                  {{ validation.type[0] }}
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
//reactive utk databinding
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

export default {
  setup() {
    // data binding
    const transaction = reactive({
      title: "",
      amount: "",
      time: "",
      type: "",
    });

    //validation akan menampung tipe data array, dari error message yg dikirimkan dari masing2 inputan
    const validation = ref([]);

    // utk redirect kehalaman index apabila store berhasil kedalam api
    const router = useRouter();

    // utk melakukan request ke api dgn mengirimkan inputan data
    function store() {
      axios
        .post(
          "http://localhost:8000/api/transaction",
          transaction //obj transaction diambil dari field2 title,amount,time,type (diwakili dgn variabel transaction)
        )
        .then(() => {
          //bila berhasil melakukan post, redirect ke hal index
          router.push({
            name: "transaction.index",
          });
        })
        .catch((err) => {
          validation.value = err.response.data;
        });
    }

    // utk method store, gunakan return
    return {
      transaction,
      validation,
      router,
      store,
    };
  },
};
</script>