<template>
  <div id="app">
    <h1>URL Checker</h1>
    <p>Add some urls and I'll check them every 5 minutes. You can do it manually by clicking on 'check' button.</p>
    <form @submit.prevent="addAddress">
      <input type="text" placeholder="https://example.com" autocomplete="true" required v-model="newAddress">
      <button type="submit">Add</button>
    </form>
    <ul>
      <li v-for="address in addresses" :key="address.id">
        <baseUri :uri="address.uri" :id="address.id"/>
      </li>
    </ul>
  </div>
</template>

<script>
import baseUri from './components/BaseUri';

export default {
  name: 'App',
  components:{
    baseUri,
  },
  data: function(){
    return {
      newAddress: "",
      addresses: [
      ],
    };
  },
  methods:{
    addAddress: function(){
      this.addresses.push({ id: this.addresses.length + 1, uri: this.newAddress });
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

<style scoped>
ul{
  list-style: none;
}
button{
  line-height: 1.3rem;
}
input[type=text]{
  min-width: 250px;
  width: 80%;
  line-height: 1.3rem;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 3rem 1rem 1rem 3rem;
}
</style>
