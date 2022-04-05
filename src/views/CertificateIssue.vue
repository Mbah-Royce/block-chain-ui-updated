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
        <div class="row row-1">
          <div class="col-7">
            <input
              class="text-input"
              type="text"
              placeholder="Location"
              v-model="location"
            />
          </div>
        </div>
        <div class="row row-1">
          <div class="col-7">
            <input
              class="text-input"
              type="text"
              placeholder="Area"
              v-model="area"
            />
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
  ISSUE_CERTIFICATE,
  GET_USER_DATA,
  GET_USER_TOKEN_GETTER,
} from "../store/StoreConstants";
export default {
  created() {
  },
  mounted() {
    this.user = this.$store.getters[`auth/${GET_USER_DATA}`];
    this.token = this.$store.getters[`auth/${GET_USER_TOKEN_GETTER}`];
  },
  data() {
    return {
      user: [],
      token: null,
      location: null,
      reciever: null,
      area: null,
      loader: null,
    };
  },
  methods: {
    ...mapActions("auth", {
      issueCertificate: ISSUE_CERTIFICATE,
    }),
    async handleSubmit() {
      try {
        this.loader = this.$loading.show({
          // Optional parameters
          container: this.fullPage ? null : this.$refs.formContainer,
          canCancel: false,
        });
        await this.issueCertificate({
          reciever: this.reciever,
          sender: this.user[0],
          location: this.location,
          area: this.area,
          signature: this.reciever + this.sender + this.location + this.area
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
    }

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
