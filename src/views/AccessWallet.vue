<template>
<div class="body">
    <div class="container py-3 inner">
      <div class="row justify-content-center no-gutters">
        <div class="test col-lg-3 text-center" style="border-top-left-radius:15px;border-bottom-left-radius:15px;box-shadow: -10px 0px 10px 1px #aaaaaa;" data-tilt>
          <img src="../../public/img-01.png" alt="IMG" @mouseover="animate">
        </div>
        <div class="col-lg-4" style="border-top-right-radius:15px;border-bottom-right-radius:15px;box-shadow: 10px 0px 10px 1px #aaaaaa;">
          <h1 class="font-weight-bold py-3 text-center">Sign In</h1>
          <h4 class="text-center">Access Digital Wallet</h4>
          <form @submit.prevent="handleSubmit()">
            <x-alert />
            <div class="form-row justify-content-center py-3">
              <div class="col-lg-6">
                <input
                  type="text"
                  placeholder="Public Key"
                  name="public key"
                  class="input100"
                  v-model="publicKey"
                  required
                  autocomplete="email"
                />
                <span class="focus-input100"></span>
                <span class="symbol-input100">
                  <i class="fa fa-lock" aria-hidden="true"></i>
                </span>
              </div>
            </div>
            <div class="form-row justify-content-center py-3">
              <div class="col-lg-6">
                <input
                  type="text"
                  placeholder="Private Key"
                  name="private key"
                  class="input100"
                  v-model="privateKey"
                  required
                  autocomplete="email"
                />
                <span class="focus-input100"></span>
                <span class="symbol-input100">
                  <i class="fa fa-lock" aria-hidden="true"></i>
                </span>
              </div>
            </div>
            <div class="form-row justify-content-center">
              <div class="col-lg-3 py-1">
                <button type="submit" class="btn  btn-bg">Access</button>
              </div>
            </div>
            <div class="py-4">
                          <a href="{{route('forget.password.get')}}" class="text-center"
              >Do not have a digital wallet?</a
            >
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
            <a href='https://www.freepik.com/vectors/background'>Background vector created by rawpixel.com - www.freepik.com</a>
</template>

<script>
import { mapActions } from "vuex";
import {
  ACCESS_WALLET,
} from "../store/StoreConstants";
export default {
  data(){
    return{
       publicKey: null,
      privateKey: null,
    }
  },
  methods:{
        ...mapActions("auth", {
      acessWallet: ACCESS_WALLET
    }),
        async handleSubmit() {
      try{
          this.loader = this.$loading.show({
        // Optional parameters
        container: this.fullPage ? null : this.$refs.formContainer,
        canCancel: false,
      });
      await this.acessWallet({
        publicKey: this.publicKey,
        privateKey: this.privateKey
      })
      }catch (resErrors){
        this.loader.hide();
        this.$notify({
        group: "auth",
        type: "An error occured",
        position: "bottom right",
        text: "error!",
      });
        console.log(resErrors);
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
    animate(){
      // alert(e.offsetX)
    }
  }
};
</script>

<style scoped>
.inner {
  position: absolute;
  top: 40%; left: 50%;
  transform: translate(-50%,-50%);
}
.body{
  position: relative;
  background: url("../../public/rm222batch5-kul-21.jpg") center fixed no-repeat;
  padding: auto;
  height: 100vh;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.input100 {
  font-family: Poppins-Medium;
  font-size: 15px;
  line-height: 1.5;
  color: #666666;

  display: block;
  width: 100%;
  background: #e6e6e6;
  height: 50px;
  border: none;
  outline: none;
  border-radius: 25px;
  padding: 0 30px 0 68px;
}
.btn-bg {
  background-color: green;
  color: white;
  border-radius: 50px;
}
.focus-input100 {
  display: block;
  position: absolute;
  border-radius: 25px;
  bottom: 0;
  left: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  background-color: #e6e6e6;
  box-shadow: 0px 0px 0px 0px;
  color: rgba(87, 184, 70, 0.8);
}

.input100:focus + .focus-input100 {
  -webkit-animation: anim-shadow 0.5s ease-in-out forwards !important;
  animation: anim-shadow 0.5s ease-in-out forwards !important;
  outline: transparent !important;
}
@-webkit-keyframes anim-shadow {
  to {
    box-shadow: 0px 0px 70px 25px;
    opacity: 0;
  }
}

@keyframes anim-shadow {
  to {
    box-shadow: 0px 0px 70px 25px;
    opacity: 0;
  }
}
.symbol-input100 {
  font-size: 15px;

  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  align-items: center;
  position: absolute;
  border-radius: 25px;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding-left: 35px;
  pointer-events: none;
  color: #666666;

  -webkit-transition: all 0.4s;
  -o-transition: all 0.4s;
  -moz-transition: all 0.4s;
  transition: all 0.4s;
}

.input100:focus + .focus-input100 + .symbol-input100 {
  color: green;
  padding-left: 28px;
}
</style>