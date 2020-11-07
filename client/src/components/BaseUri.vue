<template>
  <div class="baseuri">
    <div :class="state"><input type="checkbox" v-model="enabled">{{ uri }}</div>
    <div>
      <div>
        Successes: {{ successes }} ({{ successRate }}%), Failures: {{ failures }} ({{ 100 - successRate }}%)
      </div>
    </div>
    <button v-show="enabled" type="button" @click="check">{{ checkState }}</button>
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
      enabled: true,
      state: "unknown",
      firstTryAt: null,
      successes: 0,
      failures: 0
    }
  },
  methods:{
    check: async function(){
      if (!this.enabled) return;
      let uri = this.uri;
      // check if it's a valid url
      try{
        new URL(uri);
      }
      catch(err){
        this.state = "invalid";
        this.enabled = false;
        return { error: `${uri} is not a valid URL`}
      }
      if (!this.firstTryAt) this.firstTryAt = new Date().getTime();
      this.checkState = "Checking";
      uri = encodeURIComponent(uri);
      let response = await fetch(`http://localhost:44335/${uri}`);
      let resJson = await response.json();
      console.log(`http://localhost:44335/${uri}==>${JSON.stringify(resJson)}`);
      this.checkState = "Check";
      let responseStatus = resJson["status"];
      if (!responseStatus || responseStatus >= 400){
        this.failures++;
      }
      else{
        this.successes++;
      }
      this.state = `state${responseStatus}`;
    },
    startCheckLoop: async function(){
      console.warn(`Starting the loop`);
      await this.check();
      setInterval(this.check, 5*60*1000);
    },
  },
  computed:{
    successRate: function(){
      let total = this.successes + this.failures;
      if (total == 0) return 0;
      return 100*Math.round(100*(this.successes/total))/100;
    }
  },
  mounted: function(){
    setTimeout(this.startCheckLoop, this.id*1000);
  }
}
</script>

<style scoped>
.baseuri{
  margin: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: gray 1px dotted;
}
.unknown{
  color:magenta;
}
.invalid{
  color:red;
}
.state200{
  color:rgb(3, 128, 3);
}
.state502{
  color: pink
}
.state599{
  color:blue
}

</style>