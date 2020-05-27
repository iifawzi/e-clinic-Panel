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
          <th class="allSlots-content-table-th">{{$t('dashboard.tables.slots.day')}}</th>
          <th class="allSlots-content-table-th">{{$t('dashboard.tables.slots.start_time')}}</th>
          <th class="allSlots-content-table-th">{{$t('dashboard.tables.slots.end_time')}}</th>
          <th class="allSlots-content-table-th">{{$t('dashboard.tables.slots.slot_time')}}</th>
          <th class="allSlots-content-table-th">{{$t('dashboard.tables.slots.available')}}</th>
          <th class="allSlots-content-table-th">{{$t('dashboard.tables.slots.options')}}</th>
        </tr>
        <!-- <tbody v-if="this.searchQuery == ''">
        <tr v-for="doctor in doctors" :key="doctor.doctor_id" class="allSlots-content-table-tr">
          <td>{{doctor.first_name}}</td>
          <td>{{doctor.last_name}}</td>
          <td>{{doctor.country}}</td>
          <td>{{doctor[language]}}</td>
          <td
            :class="doctor.avaliable === 1 ? 'green-status' : 'red-status'"
          >{{doctor.avaliable === 1 ? $t('dashboard.forms.allSlots.active') : $t('dashboard.forms.allSlots.notActive')}}</td>
          <td>
            <div class="allSlots-content-table-tr-options">
              <i @click="deleteDoctor(doctor.phone_number)" class="fas fa-times options-delete"></i>
              <nuxt-link :to="'/controlPanel/dashboard/doctors/all/'+doctor.doctor_id">
                <i
                  class="fas fa-edit allSlots-content-table-tr-options-edit"
                  :class="language+'-edit'"
                ></i>
              </nuxt-link>
            </div>
          </td>
        </tr>
</tbody>
       <tbody v-else>
        <tr v-for="doctor in filteredData" :key="doctor.doctor_id" class="allSlots-content-table-tr">
          <td>{{doctor.first_name}}</td>
          <td>{{doctor.last_name}}</td>
          <td>{{doctor.country}}</td>
          <td>{{doctor[language]}}</td>
          <td>{{doctor.price}}</td>
          <td>{{doctor.phone_number}}</td>
          <td
            :class="doctor.avaliable === 1 ? 'green-status' : 'red-status'"
          >{{doctor.avaliable === 1 ? $t('dashboard.forms.allSlots.active') : $t('dashboard.forms.allSlots.notActive')}}</td>
          <td>
            <div class="allSlots-content-table-tr-options">
              <i @click="deleteDoctor(doctor.phone_number)" class="fas fa-times options-delete"></i>
              <nuxt-link :to="'/controlPanel/dashboard/doctors/all/'+doctor.doctor_id">
                <i
                  class="fas fa-edit allSlots-content-table-tr-options-edit"
                  :class="language+'-edit'"
                ></i>
              </nuxt-link>
            </div>
          </td>
        </tr>
</tbody> -->


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
    deleteDoctor(phone_number) {
      this.$store.dispatch("controlPanel/doctors/deleteDoctor", phone_number);
    },
      setSearch(value){
          this.searchQuery = value;
          const searched = this.searchQuery;
          this.filteredData = this.doctors.filter(doctor=>{
              return (doctor.first_name.toLowerCase().includes(searched.toLowerCase()) 
              || doctor.last_name.toLowerCase().includes(searched.toLowerCase()) 
              || doctor.country.toLowerCase().includes(searched.toLowerCase()) 
              || doctor.price.includes(searched) 
              || doctor.phone_number.includes(searched)
              || doctor.en.toLowerCase().includes(searched.toLowerCase())
              || doctor.ar.toLowerCase().includes(searched.toLowerCase())
              )
          });
      }
  },
  mounted() {
    this.$store.dispatch("controlPanel/doctors/getDoctors");
  },
  computed: {
    doctors() {
      return this.$store.getters["controlPanel/doctors/getDoctors"];
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