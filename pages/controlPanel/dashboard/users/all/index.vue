<template>
  <section class="allUsers-page">
    <div class="allUsers-content" :class="language+'-controlPanel-padding'">
      <div class="add-title">{{$t("dashboard.forms.allUsers.title")}}</div>
      <!-- errors -->
      <div class="doctorError" v-if="error">
        <notfication color="red" :label="error" />
      </div>
      <div class v-if="getSuccess">
        <notfication class="doctorSuccess" color="green" :label="getSuccess" />
      </div>
 <!-- search bar -->
      <div class="search-bar">
        <div class="input-div">
          <clinicInput
            :placeholder="$t('dashboard.forms.allUsers.searchHolder')"
            @input="setSearch"
            v-model="searchQuery"
          ></clinicInput>
        </div>
        <div class="submit-div">
          <clinicSubmit
            color="blue"
            :statement="$t('dashboard.forms.allUsers.submitSearch')"
            @click="addDoctor"
          />
        </div>
      </div>
 <!-- content -->
   <div class="userProfile">
        <showUser />
      </div>
    </div>
  </section>
</template>
<script>
import notfication from "~/components/shared/notfication";
import clinicInput from "~/components/shared/clinicInput";
import clinicSubmit from "~/components/shared/clinicSubmit";
import showUser from "~/components/forms/showUser";

export default {
  layout: "dashboard",
  middleware: "admin-auth",

  data() {
    return {
      searchQuery: "",
      filteredData: ""
    };
  },
  head() {
    return {
      title: this.language == "ar" ? "المستخدمين" : "Users"
    };
  },
  components: {
    notfication,
    showUser,
    clinicInput,
    clinicSubmit,
    showUser
  },
  methods: {
    setSearch(value) {
      this.searchQuery = value;
      const searched = this.searchQuery;
    }
  },
  mounted() {
    console.log("called");
    this.$store.commit("controlPanel/doctors/setDeleteDoctorSuccess", "");
  },
  computed: {
    language() {
      return this.$store.getters.getLocale;
    },
    error() {
      return this.$store.getters["controlPanel/doctors/getDeleteError"];
    },
    getSuccess() {
      this.shouldUpdate += 1;
      return this.$store.getters["controlPanel/doctors/getDeleteSuccess"];
    }
  }
};
</script>
<style lang="scss" scoped>
.allUsers-page {
  width: 100%;
}
.allUsers-content {
  width: 100%;
}
.add-title {
  width: 100%;
  font-size: 30px;
  text-align: center;
  padding-bottom: 5px;
  border-bottom: 2px solid $light-color;
  color: $black;
}
.doctorError,
.doctorSuccess {
  margin-top: 10px;
}
.input-div {
  width: 200px;
}
.submit-div {
  width: 100px;
}
.search-bar {
  margin-top: 30px;
  display: flex;
  flex-flow: row;
  width: 350px;
  align-items: center;
  justify-content: space-between;
}
.userProfile {
  width: 100%;
}
</style>