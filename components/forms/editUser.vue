<template>
    <div class="editUser-Component">
        <div class="search-bar">
           <div class="input-div">
        <clinicInput
          :placeholder="$t('dashboard.forms.allUsers.searchHolder')"
          @input="setSearch"
          v-model="searchQuery"
        >
        </clinicInput>
      </div>
           <div class="submit-div">
          <clinicSubmit
            color="blue"
            :statement="$t('dashboard.forms.allUsers.submitSearch')"
            @click="addDoctor"
          />
        </div>
        </div>
   
      <div class="editUser-content">
      </div>
    </div>
</template>

<script>
import clinicInput from "~/components/shared/clinicInput";
import clinicSubmit from "~/components/shared/clinicSubmit";

export default {
        components: {
        clinicInput,
        clinicSubmit,
    },
          data() {
    return {
     searchQuery: "",
     filteredData: "",
    };
  },
    computed: {
    language() {
      return this.$store.getters.getLocale;
    }
  },
    methods: {
      setSearch(value){
          this.searchQuery = value;
          const searched = this.searchQuery;
      }
  },
}
</script>

<style lang="scss" scoped>
.input-div {
  width: 200px;
}
.submit-div{
     width: 100px;
}
.search-bar {
    margin-top: 30px;
    display: flex;
    flex-flow: row;
    width: 400px;
    align-items: center;
    justify-content: space-evenly;
}
</style>