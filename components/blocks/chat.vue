<template>
  <div class="chat-block">
      <div class="info-title">{{$t("dashboard.info.chat")}}</div>
    <div class="chat-content">
        dkldjkldkjldkljkjld
    </div>
  </div>
</template>

<script>
import clinicInput from "~/components/shared/clinicInput";
import editSlot from "~/components/forms/editSlot"

export default {
      data() {
    return {
    };
  },
    components: {

    },
  methods: {
  },
  mounted() {

  },
  computed: {
    language() {
      return this.$store.getters.getLocale;
    }
  },
};
</script>

<style lang="scss" scoped>
.chat-content {
  width: 100%;
  max-height: 75vh;
  overflow: scroll;
  box-shadow: 0 5px 25px rgba(143, 190, 221, 0.281);
  padding: 20px;
  border-radius: 20px;
}
.input-div {
    display: flex;
  flex-flow: row;
  justify-content: space-between;
  margin-top: 40px;
}
.clinicInput {
  width: 300px;
}
.info-title{
  width: 100%;
  font-size: 30px;
  text-align: center;
  color: $black;
}
</style>