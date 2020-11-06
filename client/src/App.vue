<template>
  <div id="app">
    <h1>Hi there !!</h1>
    <form @submit.prevent="addAddress">
      <input type="text" placeholder="https://example.com" required v-model="newAddress">
      <button type="submit">Add</button>
    </form>
    <ul>
      <li v-for="address in addresses" :key="address.id">
        <div class="uri">{{ address.uri }}</div>
        <div class="desc">{{ address.description}}</div>
        </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'App',
  data: function(){
    return {
      newAddress: "",
      addresses: [
      ],
    };
  },
  methods:{
    addAddress: function(){
      this.addresses.push({id: this.addresses.length + 1, uri: this.newAddress});
      this.newAddress = "";
    },
  },
  computed:{
    formIsValid: function(){
      try {
        new URL(this.newAddress);
      } catch (_) {
        return "false";  
      }
      return "true";
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 3rem 1rem 1rem 3rem;
}
</style>
