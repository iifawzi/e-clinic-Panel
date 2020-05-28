<template>
  <div class="allSlots-table">

      <div class="input-div">
        <clinicInput
          :placeholder="$t('dashboard.tables.slots.searchHolder')"
          @input="setSearch"
          v-model="searchQuery"
          :mutedText="$t('dashboard.tables.slots.search')"
        >
        </clinicInput>
      </div>
    <div class="allSlots-content">
      <table class="allSlots-content-table">


        <tr class="allSlots-content-table-tr">
          <th class="allSlots-content-table-th">{{$t('dashboard.tables.userApps.doctor')}}</th>
          <th class="allSlots-content-table-th">{{$t('dashboard.tables.userApps.category')}}</th>
          <th class="allSlots-content-table-th">{{$t('dashboard.tables.userApps.date')}}</th>
          <th class="allSlots-content-table-th">{{$t('dashboard.tables.userApps.day')}}</th>
          <th class="allSlots-content-table-th">{{$t('dashboard.tables.userApps.start_time')}}</th>
          <th class="allSlots-content-table-th">{{$t('dashboard.tables.userApps.end_time')}}</th>
          <th class="allSlots-content-table-th">{{$t('dashboard.tables.userApps.available')}}</th>
          <th class="allSlots-content-table-th">{{$t('dashboard.tables.userApps.options')}}</th>
        </tr>
        <tbody v-if="this.searchQuery == ''">
        <tr v-for="slot in slots" :key="slot.slot_id" class="allSlots-content-table-tr">
          <td>{{ $t('dashboard.days.'+slot.day)}}</td>
          <td>{{slot.start_time}}</td>
          <td>{{slot.end_time}}</td>
          <td>{{slot.slot_time}}</td>
          <td
            :class="slot.available == 1 ? 'green-status' : 'red-status'"
          >{{slot.available == 1 ?  $t('dashboard.tables.userApps.active') : $t('dashboard.tables.userApps.notActive')}}</td>
          <td>
            <div class="allSlots-content-table-tr-options">
              <!-- <i @click="deleteDoctor(doctor.phone_number)" class="fas fa-times options-delete"></i> -->
              <nuxt-link to="">
                <i
                  class="fas fa-edit allSlots-content-table-tr-options-edit"
                  :class="language+'-edit'"
                ></i>
              </nuxt-link>
            </div>
          </td>
        </tr>
</tbody>

      </table>
    </div>
  </div>
</template>

<script>
import clinicInput from "~/components/shared/clinicInput";
export default {
      data() {
    return {
     searchQuery: "",
     filteredData: "",
    };
  },
    components: {
        clinicInput,
    },
  methods: {
      setSearch(value){
          this.searchQuery = value;
          const searched = this.searchQuery;
          this.filteredData = this.slots.filter(slot=>{
              return (slot.day.toLowerCase().includes(this.forArabicSearch(searched).toLowerCase()))
          });
      },
      forArabicSearch(word){
          console.log(word);
          let searchWord = ""
          if (word.includes("ثل") || word.includes("tu")){
            searchWord = "tue"
          }else if (word.includes("خم")|| word.includes("th")){
              searchWord = "thu"

          }else if ( word.includes("جم")|| word.includes("fr")){
              searchWord = "fri"

          }else if (word.includes("سب")|| word.includes("sa")){
              searchWord = "sat"

          }else if ( word.includes("حد")|| word.includes("su")){
              searchWord = "sun"

          }else if (word.includes("ني")|| word.includes("mo")){
              searchWord = "mon"
          }else if (word.includes("رب")|| word.includes("we")){
              searchWord = "wed"
          }
          return searchWord;
      }
  },
  mounted() {
    const id = this.$route.params.doctor_id;
    this.$store.dispatch("controlPanel/slots/getDoctorSlots",id);
  },
  computed: {
    slots() {
      return this.$store.getters["controlPanel/slots/getSlots"];
    },
    language() {
      return this.$store.getters.getLocale;
    }
  },
};
</script>

<style lang="scss" scoped>
.allSlots-content {
  margin-top: 15px;
  width: 100%;
  height: 100vh - 25vh;
  overflow: scroll;
  box-shadow: 0 5px 25px rgba(54, 57, 238, 0.281);
  padding: 20px;
  border-radius: 20px;
  &-table {
    width: 100%;
    text-align: center;

    &-th {
      color: $light-color;
    }
    &-tr {
      height: 50px;
      &-options {
        color: $red;
        display: flex;
        flex-flow: row;
        justify-content: space-evenly;
        &-edit {
          color: $green-color;
          margin-left: 20px;
          cursor: pointer;
        }
      }
      &:hover {
        background-color: rgb(229, 234, 245);
      }
    }
  }
}
.options-delete {
  cursor: pointer;
}
td {
  color: $main-color;
  font-size: 22px;
  font-weight: 400;
}
.green-status {
  color: $green-color;
}
.red-status {
  color: $red;
}
.input-div {
  width: 400px;
  margin-top: 40px;
}
</style>