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
  },
  mounted() {
    const link = document.createElement('link');
    link.href = "https://fonts.googleapis.com/css2?family=Cormorant+Unicase&family=Cormorant+SC&family=Cormorant+Infant&family=Cormorant&family=Cormorant+Garamond&display=swap";
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }
}

</script>

<style>


</style>
