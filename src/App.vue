<template>
  <div class="container">
    <div class="centralizar">
      <h1><i class="bi bi-wrench-adjustable"></i> Web Tools for IPMTC</h1>
    </div>
    <Ipmtc />
    <hr />
    <div class="centralizar">
      <p>by Pablo Dutra - 2023</p>
    </div>
  </div>
</template>

<script>
import Ipmtc from "@/components/Ipmtc.vue";

export default {
  name: "App",
  components: {
    Ipmtc,
  },
  data: function () {
    return {};
  },
  methods: {

  },
  mounted() {

  },
};
</script>

<style>
.centralizar {
  display: flex;
  justify-content: center;
}
</style>