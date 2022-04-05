<template>
  <div class="con">
    <div class="card" style="margin-bottom: 100px">
      <div class="card-title mx-auto">Transaction</div>
      <form @submit.prevent="handleSubmit()">
        <span id="card-header">Public Keys:</span>
        <div class="row row-1">
          <div class="col-1"><i class="fa fa-lock" aria-hidden="true"></i></div>
          <div class="col-7">
            <input
              class="text-input"
              type="text"
              disabled
              :value="this.user[0]"
            />
          </div>
          <div class="col-4 d-flex justify-content-center">Your Pub Key</div>
        </div>
        <div class="row row-1">
          <div class="col-1"><i class="fa fa-lock" aria-hidden="true"></i></div>
          <div class="col-7">
            <input
              class="text-input"
              type="text"
              placeholder="**** **** ****"
              v-model="reciever"
            />
          </div>
          <div class="col-4 d-flex justify-content-center">
            Receiver Pub Key
          </div>
        </div>
        <span id="card-header">Transaction Type:</span>
        <div style="margin-top: 10px">
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio1"
              value="whole-land"
              v-model="type"
              checked
            />
            <label class="form-check-label" for="inlineRadio1"
              >Whole Land</label
            >
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio2"
              value="portion-title"
              v-model="type"
            />
            <label class="form-check-label" for="inlineRadio2"
              >Partition From Title</label
            >
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio2"
              value="portion-portion"
              v-model="type"
            />
            <label class="form-check-label" for="inlineRadio2"
              >Partition From Portion</label
            >
          </div>
        </div>
        <div v-if="type === 'portion-title'">
          <div class="form-group py-1">
            <label for="exampleFormControlSelect1" id="card-header"
              >Select Title</label
            >
            <select
              class="form-control"
              id="exampleFormControlSelect1"
              v-model="selectedCertificate"
            >
              <option
                v-for="(certificate, index) in certificates"
                v-bind:key="index"
                v-bind:value="certificate.serial_no"
                :selected="index == 0"
              >
                {{ certificate.owner_name }}
              </option>
            </select>
          </div>
          <div class="row row-1">
            <div class="col-7">
              <input
                class="text-input"
                type="text"
                placeholder=""
                v-model="area"
              />
            </div>
            <div class="col-4 d-flex justify-content-center">Enter Amount</div>
          </div>
        </div>
        <div v-else-if="type === 'whole-land'">
          <div class="form-group py-1">
            <label for="exampleFormControlSelect1" id="card-header"
              >Select Title</label
            >
            <select
              class="form-control"
              id="exampleFormControlSelect1"
              v-model="selectedCertificate"
            >
              <option
                v-for="(certificate, index) in certificates"
                v-bind:key="index"
                v-bind:value="certificate.serial_no"
                :selected="index == 0"
              >
                {{ certificate.owner_name }} {{certificate.serial_no}}
              </option>
            </select>
          </div>
        </div>
        <div v-else>
          <div class="form-group py-1">
            <label for="exampleFormControlSelect1" id="card-header"
              >Select Portion</label
            >
            <select
              class="form-control"
              id="exampleFormControlSelect1"
              v-model="selectedPortion"
            >
              <option
                v-for="(portion, index) in portions"
                v-bind:key="index"
                v-bind:value="portion.id"
                :selected="index == 0"
              >
                {{ portion.area }}
              </option>
            </select>
            <div class="row row-1">
              <div class="col-7">
                <input
                  class="text-input"
                  type="text"
                  placeholder=""
                  v-model="area"
                />
              </div>
              <div class="col-4 d-flex justify-content-center">
                Enter Amount
              </div>
            </div>
          </div>
        </div>
        <div class="row-1">
          <div class="row row-2">
            <span id="card-inner">{{ selectedCertificate }}</span>
          </div>
        </div>
        <button class="btn d-flex mx-auto btn-bg rounded-pill">
          <b>Send</b>
        </button>
      </form>
    </div>
    <div style="margin-top: 500px; background-color: red"></div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import {
  TRANSATION_SUBMIT,
  GET_USER_DATA,
  GET_USER_TOKEN_GETTER,
} from "../store/StoreConstants";
export default {
  created() {
    this.getPartitions();
    this.getCertificates();
  },
  mounted() {
    this.user = this.$store.getters[`auth/${GET_USER_DATA}`];
    this.token = this.$store.getters[`auth/${GET_USER_TOKEN_GETTER}`];
  },
  data() {
    return {
      user: [],
      token: null,
      type: "whole-land",
      reciever: null,
      selectedPortion: null,
      selectedCertificate: null,
      area: null,
      certificates: [],
      portions: [],
      loader: null,
    };
  },
  methods: {
    ...mapActions("auth", {
      transaction: TRANSATION_SUBMIT,
    }),
    async handleSubmit() {
      try {
        this.loader = this.$loading.show({
          // Optional parameters
          container: this.fullPage ? null : this.$refs.formContainer,
          canCancel: false,
        });
        await this.transaction({
          reciever: this.reciever,
          sender: this.user[0],
          type: this.type,
          serial_no: this.selectedCertificate,
          area: this.area,
          partitionId:this.selectedPortion
        });
      } catch (resError) {
        this.loader.hide();
        this.$notify({
        group: "auth",
        type: "An error occured",
        position: "bottom right",
        text: "error!",
      });
        console.log(resError);
        return;
      }
      this.loader.hide();
        this.$notify({
        group: "auth",
        type: "success",
        position: "bottom right",
        text: "Successfull!",
      });
      this.$router.push("/dashboard");
    },
    textToBin(text) {
      var length = text.length,
        output = [];
      for (var i = 0; i < length; i++) {
        var bin = text[i].charCodeAt().toString(2);
        output.push(Array(8 - bin.length + 1).join("0") + bin);
      }
      return output.join(" ");
    },
    async getPartitions() {
      await this.$api
        .get("user/partitions")
        .then((response) => {
          // console.log(response.data.data);
          this.portions = response.data.data;
          console.log(this.portions);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async getCertificates() {
      await this.$api
        .get("user/certificates")
        .then((response) => {
          // console.log(response.data.data);
          this.certificates = response.data.data;
          console.log(this.certificates);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
body {
  min-height: 100vh;
  vertical-align: middle;
  display: flex;
}
.con {
  padding-top: 25px;
  margin-top: 0px;
  background: url("../../public/rm222batch5-kul-21.jpg") center;
  background-size: cover;
  height: 100vh;
  background-attachment: fixed;
}
.card {
  margin: auto;
  width: 600px;
  padding: 3rem 3.5rem;
  box-shadow: 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.mt-50 {
  margin-top: 50px;
}

.mb-50 {
  margin-bottom: 50px;
}

@media (max-width: 767px) {
  .card {
    width: 90%;
    padding: 1.5rem;
  }
}

@media (height: 1366px) {
  .card {
    width: 90%;
    padding: 8vh;
  }
}

.card-title {
  font-weight: 700;
  font-size: 2.5em;
}

.nav {
  display: flex;
}

.nav ul {
  list-style-type: none;
  display: flex;
  padding-inline-start: unset;
  margin-bottom: 6vh;
}

.nav li {
  padding: 1rem;
}

.nav li a {
  color: black;
  text-decoration: none;
}

.active {
  border-bottom: 2px solid black;
  font-weight: bold;
}

.text-input {
  border: none;
  outline: none;
  font-size: 1rem;
  font-weight: 600;
  color: #000;
  width: 100%;
  min-width: unset;
  background-color: transparent;
  border-color: transparent;
  margin: 0;
}

form a {
  color: grey;
  text-decoration: none;
  font-size: 0.87rem;
  font-weight: bold;
}

form a:hover {
  color: grey;
  text-decoration: none;
}

form .row {
  margin: 0;
  overflow: hidden;
}

form .row-1 {
  border: 1px solid rgba(0, 0, 0, 0.137);
  padding: 0.5rem;
  outline: none;
  width: 100%;
  min-width: unset;
  border-radius: 5px;
  background-color: rgba(221, 228, 236, 0.301);
  border-color: rgba(221, 228, 236, 0.459);
  margin: 2vh 0;
  overflow: hidden;
}

form .row-2 {
  border: none;
  outline: none;
  background-color: transparent;
  margin: 0;
  padding: 0 0.8rem;
}

form .row .row-2 {
  border: none;
  outline: none;
  background-color: transparent;
  margin: 0;
  padding: 0 0.8rem;
}

form .row .col-2,
.col-7,
.col-3 {
  display: flex;
  align-items: center;
  text-align: center;
  padding: 0 1vh;
}

form .row .col-2 {
  padding-right: 0;
}

#card-header {
  font-weight: bold;
  font-size: 0.9rem;
}

#card-inner {
  font-size: 0.7rem;
  color: gray;
}

.three .col-7 {
  padding-left: 0;
}

.three {
  overflow: hidden;
  justify-content: space-between;
}

.three .col-2 {
  border: 1px solid rgba(0, 0, 0, 0.137);
  padding: 0.5rem;
  outline: none;
  width: 100%;
  min-width: unset;
  border-radius: 5px;
  background-color: rgba(221, 228, 236, 0.301);
  border-color: rgba(221, 228, 236, 0.459);
  margin: 2vh 0;
  width: fit-content;
  overflow: hidden;
}

.three .col-2 input {
  font-size: 0.7rem;
  margin-left: 1vh;
}

.btn {
  width: 100%;
  background-color: green;
  border-color: green;
  color: white;
  justify-content: center;
  padding: 2vh 0;
  margin-top: 3vh;
}

.btn:focus {
  box-shadow: none;
  outline: none;
  box-shadow: none;
  color: white;
  -webkit-box-shadow: none;
  -webkit-user-select: none;
  transition: none;
}

.btn:hover {
  color: green;
  background-color: white;
}

input:focus::-webkit-input-placeholder {
  color: transparent;
}

input:focus:-moz-placeholder {
  color: transparent;
}

input:focus::-moz-placeholder {
  color: transparent;
}

input:focus:-ms-input-placeholder {
  color: transparent;
}
</style>
