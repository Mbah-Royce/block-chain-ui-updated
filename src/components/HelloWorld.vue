<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize you wallet,<br />
      check out the
      <a href="" target="_blank" rel="noopener">Getting Started</a>.
    </p>
    <button
      type="button"
      class="btn btn-lg btn-bg rounded-pill"
      @click="redirect"
    >
      Get Started
    </button>
  </div>
</template>

<script>
import { sha256 } from 'js-sha256';
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  mounted(){
    var hash = sha256('21846104f3123aeef52221a03cd9da8c94e96b9089f6b5e20f71c633be45ee1a69ef945fd2ca7e5664b9a5ce7e0157e4af436d877c9154f0e7d976e3ecf539c167e9b96a04e5b8f60f6cf00bae04e5555db2895b89a46d3a22810a0f7f6619e07c5d4f00fc9bf1f174c0ba6b743f41f01f0950434c9bdaeaad6d944ef141363c8cc509696b48,70,2,33,0,157,77,27,52,35,35,3,146,240,125,76,165,98,99,81,97,92,29,138,29,249,106,164,97,149,168,91,62,27,33,186,74,2,33,0,176,50,214,1,18,29,33,228,104,198,73,234,207,178,22,118,2,102,12,18,207,130,3,37,210,40,71,38,174,30,247,123')
    // var hash = sha256('hello');
    console.log(hash);
  },
  methods: {
    redirect() {
      this.$notify({
        group: "foo",
        title: "Important message",
        text: "Hello user! This is a notification!",
      });
      this.$router.push("/createwallet");
      //  this.$loading.show({
      //               // Optional parameters
      //               container: this.fullPage ? null : this.$refs.formContainer,
      //               canCancel: true,
      //               onCancel: this.onCancel,
      //           });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  padding-top: 15%;
  color: white;
}
.btn-bg {
  background-color: green;
  color: white;
}
.btn-bg:hover {
  background-color: white;
  color: green;
  font-weight: bold;
}
/* ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
} */
</style>
