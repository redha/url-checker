<template>
  <div id="app">
    <h1>Hi there !!</h1>
    <form @submit.prevent="addAddress">
      <input type="text" placeholder="https://example.com" autocomplete="true" required v-model="newAddress">
      <button type="submit">Add</button>
    </form>
    <ul>
      <li v-for="address in addresses" :key="address.id">
        <div class="uri" :class="address.state">{{ address.uri }}</div>
        <div class="desc">{{ address.description}}</div>
        <button type="button" @click="check(address)">{{address.checking}}</button>
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
      this.addresses.push({id: this.addresses.length + 1, uri: this.newAddress, checking: "check"});
      this.newAddress = "";
    },
    check: async function(address){
      let uri = address.uri;
      // check if it's a valid url
      try{
        new URL(uri);
      }
      catch(err){
        address.state = "stateInvalid";
        return { error: `${uri} is not a valid URL`}
      }
      address.checking = "Checking";
      console.warn(encodeURIComponent(uri));
      uri = encodeURIComponent(uri);
      console.warn(`http://localhost:44335/${uri}`);
      let response = await fetch(`http://localhost:44335/${uri}`);
      let resJson = await response.json();
      console.log(resJson);
      address.checking = "Check";
      let responseStatus = resJson["status"];
      address.state = `state${responseStatus}`;
      return resJson;
    }
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
.stateInvalid{
  color:#777;
}
.state200{
  color:rgb(3, 221, 3);
}
.state502{
  color: pink
}
.state599{
  color:blue
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 3rem 1rem 1rem 3rem;
}
</style>
