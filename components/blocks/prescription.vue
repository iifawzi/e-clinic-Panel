<template>
  <div class="prescription-block">
    <div class="chatError" v-if="prescriptionError">
      <notfication color="red" :label="prescriptionError" />
    </div>

    <div class="spinner-3" v-if="!prescription">
      <div class="bounce1"></div>
      <div class="bounce2"></div>
      <div class="bounce3"></div>
    </div>
    <div class="diagnose-title" v-if="prescription">{{$t("dashboard.info.diagnose")}}</div>
    <div class="diagnose-content" v-if="prescription">
      {{prescription.diagnose}}
    </div>
    <div v-if="prescription" class="prescription-title">{{$t("dashboard.info.prescription")}}</div>
    <div v-if="prescription" class="prescription-content">
      {{prescription.prescription}}

    </div>
  </div>
</template>

<script>
import notfication from "~/components/shared/notfication";
export default {
  data() {
    return {};
  },
  components: {
    notfication
  },
  methods: {},
  mounted() {
    const room_id = this.$route.params.room_id;
    this.$store.dispatch("controlPanel/info/getPrescriptionData", room_id);
  },
  computed: {
    language() {
      return this.$store.getters.getLocale;
    },
    prescriptionError() {
        return this.$store.getters["controlPanel/info/getPrescriptionError"];
    },
    prescription() {
      console.log("dlkd");
        return this.$store.getters["controlPanel/info/getPrescription"];
    }
  }
};
</script>

<style lang="scss" scoped>
.diagnose-content {
  width: 100%;
  margin-top: 15px;
  max-height: 50vh;
  overflow: scroll;
  box-shadow: 0 5px 25px rgba(74, 112, 236, 0.281);
  padding: 20px;
  border-radius: 20px;
  margin-bottom: 30px;
}
.diagnose-title {
  width: 100%;
  font-size: 24px;
  text-align: center;
  color: $black;
}
.prescription-content {
  width: 100%;
  margin-top: 15px;
  max-height: 50vh;
  overflow: scroll;
  box-shadow: 0 5px 25px rgba(74, 112, 236, 0.281);
  padding: 20px;
  border-radius: 20px;
  margin-bottom: 30px;
}
.prescription-title {
  width: 100%;
  font-size: 24px;
  text-align: center;
  color: $black;
}
</style>