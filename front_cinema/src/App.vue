<template>
  <div>
<headerComp/>

  <main>
    <RouterView/>
  </main>

<footerComp/>
  </div>
</template>

<script>
import footerComp from "@/components/pageComponents/footerComp";
import headerComp from "@/components/pageComponents/headerComp";

export default {
  name: 'App',
  components: {
    headerComp,
    footerComp
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
