<template>
  <div>
    <div :class="state">
      ►{{ uri }}◄
    </div>
    <button type="button" @click="check">{{ checkState }}</button>
  </div>
</template>

<script>
export default {
  name: "BaseUri",
  props:{
    id: {
      type: Number,
      required: true,
      valid: function(value){
        return (!isNaN(value) && Number(value) === value && value > 0)
      }
    },
    uri: {
      type: String,
      required: true,
    },
  },
  data: function(){
    return {
      checkState: "check",
      state: "unknown",
    }
  },
  methods:{
    check: async function(){
      let uri = this.uri;
      // check if it's a valid url
      try{
        new URL(uri);
      }
      catch(err){
        this.state = "invalid";
        return { error: `${uri} is not a valid URL`}
      }
      this.checkState = "Checking";
      uri = encodeURIComponent(uri);
      let response = await fetch(`http://localhost:44335/${uri}`);
      let resJson = await response.json();
      console.warn(`http://localhost:44335/${uri}==>${JSON.stringify(resJson)}`);
      this.checkState = "Check";
      let responseStatus = resJson["status"];
      this.state = `state${responseStatus}`;
      return resJson;
    },
    startCheckLoop: function(){
      console.warn(`Starting the loop`);
      setInterval(this.check, 5*60*1000);
    },
  },
  computed:{

  },
  mounted: function(){
    setTimeout(this.startCheckLoop, this.id*1000);
  }
}
</script>

<style scoped>
.unknown{
  color:magenta;
}
.invalid{
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

</style>