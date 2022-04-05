<template>
  <center>
    <h3 class="b1">LEDGER</h3>
  </center>
  <hr />
  <div class="" v-for="(block, index) of blocks" :key="block.index">
    <!-- {{ hash(block.block_prev_hash+""+block.block_id+""+block.block_nonce+""+block.transaction_id+""+block.transaction_amount+block.transactiono_reciver+block.transaction_sender+block.transaction_signature)}} -->
    <Block
      :blockId="block.block_id"
      :nonce="block.block_nonce"
      :transactionId="block.transaction_id"
      :transactionAmount="block.transaction_amount"
      :transactionReceiver="block.transactiono_reciver"
      :transactionSender="block.transaction_sender"
      :transactionSignature="block.transaction_signature"
      :hash="block.block_hash"
      :prevHash="block.block_prev_hash"
      :position="index"
      :isAffected="block.isAffected"
      @blockChanged="updateBlocks"
      @blockUndo="undoChange"
    />
  </div>
</template>
<script>
import { sha256 } from 'js-sha256';
import Block from "../components/Block.vue";
export default {
  mounted() {
    this.getBlocks();
    window.Echo.channel('new-block')
    .listen('NewBlock', (e) => {
      this.blocks.push(e.block)
      console.log(e.block);
    });
  },
  components: {
    Block,
  },
  data() {
    return {
      data: "ddjj",
      blocks: [],
    };
  },
  methods: {
    hash(message){
       return sha256(message)
    },
    updateBlocks(blockInfo) {
      var hash = "44555";
      var i = blockInfo[9];
      var message = blockInfo[0]+""+blockInfo[1]+""+blockInfo[2]+""+blockInfo[3]+""+blockInfo[4]+blockInfo[5]+blockInfo[6]+blockInfo[7];
      hash = sha256(message);
      this.blocks[i].isAffected = true;
      this.blocks[i].block_hash = hash;
      i = i+1;
      for (i; i < this.blocks.length; i++) {
        this.blocks[i].isAffected = true;
        console.log(this.blocks[i].block_nonce);
        message = this.blocks[i-1].block_hash+""+this.blocks[i].block_id+""+this.blocks[i].block_nonce+""+this.blocks[i].transaction_id+""+this.blocks[i].transaction_amount+this.blocks[i].transactiono_reciver+this.blocks[i].transaction_sender+this.blocks[i].transaction_signature;
        hash = sha256(message);
        // hash = sha256(
        //   "21846104f3123aeef52221a03cd9da8c94e96b9089f6b5e20f71c633be45ee1a69ef945fd2ca7e5664b9a5ce7e0157e4af436d877c9154f0e7d976e3ecf539c167e9b96a04e5b8f60f6cf00bae04e5555db2895b89a46d3a22810a0f7f6619e07c5d4f00fc9bf1f174c0ba6b743f41f01f0950434c9bdaeaad6d944ef141363c8cc509696b48,70,2,33,0,157,77,27,52,35,35,3,146,240,125,76,165,98,99,81,97,92,29,138,29,249,106,164,97,149,168,91,62,27,33,186,74,2,33,0,176,50,214,1,18,29,33,228,104,198,73,234,207,178,22,118,2,102,12,18,207,130,3,37,210,40,71,38,174,30,247,123"
        // );
        this.blocks[i].block_hash = hash;
        this.blocks[i].block_prev_hash = this.blocks[i-1].block_hash;
        // this.blocks[i].block_prev_hash = hash;
      }
    },
    undoChange(position) {
      var i = position
        var message = this.blocks[i].block_prev_hash+""+this.blocks[i].block_id+""+this.blocks[i].block_nonce+""+this.blocks[i].transaction_id+""+this.blocks[i].transaction_amount+this.blocks[i].transactiono_reciver+this.blocks[i].transaction_sender+this.blocks[i].transaction_signature;
        var hash = sha256(message);
        this.blocks[i].block_hash = hash;
        this.blocks[i].isAffected = false;
      i = i + 1;
      for (i; i <= this.blocks.length; i++) {
        this.blocks[i].isAffected = false;
        message = this.blocks[i-1].block_hash+""+this.blocks[i].block_id+""+this.blocks[i].block_nonce+""+this.blocks[i].transaction_id+""+this.blocks[i].transaction_amount+this.blocks[i].transactiono_reciver+this.blocks[i].transaction_sender+this.blocks[i].transaction_signature;
        hash = sha256(message);
        this.blocks[i].block_hash = hash;
        this.blocks[i].block_prev_hash = this.blocks[i-1].block_hash;
        console.log(this.blocks[i].block_id)
      }
    },
    async getBlocks() {
      await this.$api
        .get("blocks")
        .then((response) => {
          // console.log(response.data.data);
          this.blocks = response.data.data;
          console.log(this.blocks);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style>
.b1 {
  border: 2px black;
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  background-color: white;
  margin-top: 5px;
  margin-bottom: 15px;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  margin-left: 15px;
  margin-right: 15px;
}
</style>
