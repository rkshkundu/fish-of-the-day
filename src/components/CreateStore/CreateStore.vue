<template>
  <div class="create-store-background">
    <div class="create-store-form-wrapper">
      <form class="create-store-form" @submit.prevent="createStore">
        <h1 class="create-store-form-heading">Please enter a store name</h1>
        <input type="text" class="create-store-form-name" v-model="storeName" placeholder="Store Name" />
        <button type="submit"  class="create-store-form-button"><span>&#10148;</span></button>
      </form>  
    </div>  
  </div>  
</template>

<script>
export default {
  name: 'CreateStore',
  data() {
    return {
      storeName: ''
    }
  },
  created() {
    if(localStorage.getItem('loggedIn')){
      this.$router.push({name:'Store', params: {storeName: localStorage.getItem('storeName')}});
    }
  },
  methods: {
    /**
    * @function
    * @description validate the store name, if name is correct, redirect to store page, else will show error message
    */
    createStore() {
      var storeName = this.storeName;
      if(storeName && storeName.toLowerCase() == 'fish-store') {
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("storeName", storeName);
        this.$router.push({name:'Store', params: {storeName: storeName}});
      }else if(!storeName) {
        this.$toasted.clear();
        this.$toasted.error("Please enter store name. This field can not be empty.").goAway(2000);
      }else {
        this.$toasted.clear();
        this.$toasted.error("Store name is not correct. We have only 'fish-store' available.").goAway(2000);
      }
    }
  }
}
</script>

<style lang="scss">
  @import './CreateStore';
</style>
