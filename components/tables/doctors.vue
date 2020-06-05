<template>
  <div class="allDoctors-table">

      <div class="input-div">
        <clinicInput
          :placeholder="$t('dashboard.forms.allDoctors.searchHolder')"
          @input="setSearch"
          v-model="searchQuery"
          :mutedText="$t('dashboard.forms.allDoctors.search')"
        >
        </clinicInput>
      </div>
    <div class="allDoctors-content">
      <table class="allDoctors-content-table">


        <tr class="allDoctors-content-table-tr">
          <th class="allDoctors-content-table-th">{{$t('dashboard.forms.allDoctors.firstname')}}</th>
          <th class="allDoctors-content-table-th">{{$t('dashboard.forms.allDoctors.lastname')}}</th>
          <th class="allDoctors-content-table-th">{{$t('dashboard.forms.allDoctors.country')}}</th>
          <th class="allDoctors-content-table-th">{{$t('dashboard.forms.allDoctors.category')}}</th>
          <th class="allDoctors-content-table-th">{{$t('dashboard.forms.allDoctors.price')}}</th>
          <th class="allDoctors-content-table-th">{{$t('dashboard.forms.allDoctors.phone')}}</th>
          <th class="allDoctors-content-table-th">{{$t('dashboard.forms.allDoctors.available')}}</th>
          <th class="allDoctors-content-table-th">{{$t('dashboard.forms.allDoctors.options')}}</th>
        </tr>
        <tbody v-if="this.searchQuery == ''">
        <tr v-for="doctor in doctors" :key="doctor.doctor_id" class="allDoctors-content-table-tr">
          <td>{{doctor.first_name}}</td>
          <td>{{doctor.last_name}}</td>
          <td>{{doctor.country}}</td>
          <td>{{doctor[language]}}</td>
          <td>{{doctor.price}}</td>
          <td>{{doctor.phone_number}}</td>
          <td
            :class="doctor.available === 1 ? 'green-status' : 'red-status'"
          >{{doctor.available === 1 ? $t('dashboard.forms.allDoctors.active') : $t('dashboard.forms.allDoctors.notActive')}}</td>
          <td>
            <div class="allDoctors-content-table-tr-options">
              <!-- <i @click="deleteDoctor(doctor.phone_number)" class="fas fa-times options-delete"></i> -->
              <nuxt-link :to="'/controlPanel/dashboard/doctors/all/'+doctor.doctor_id">
                <i
                  class="fas fa-edit allDoctors-content-table-tr-options-edit"
                  :class="language+'-edit'"
                ></i>
              </nuxt-link>
            </div>
          </td>
        </tr>
</tbody>
       <tbody v-else>
        <tr v-for="doctor in filteredData" :key="doctor.doctor_id" class="allDoctors-content-table-tr">
          <td>{{doctor.first_name}}</td>
          <td>{{doctor.last_name}}</td>
          <td>{{doctor.country}}</td>
          <td>{{doctor[language]}}</td>
          <td>{{doctor.price}}</td>
          <td>{{doctor.phone_number}}</td>
          <td
            :class="doctor.available === 1 ? 'green-status' : 'red-status'"
          >{{doctor.available === 1 ? $t('dashboard.forms.allDoctors.active') : $t('dashboard.forms.allDoctors.notActive')}}</td>
          <td>
            <div class="allDoctors-content-table-tr-options">
              <!-- <i @click="deleteDoctor(doctor.phone_number)" class="fas fa-times options-delete"></i> -->
              <nuxt-link :to="'/controlPanel/dashboard/doctors/all/'+doctor.doctor_id">
                <i
                  class="fas fa-edit allDoctors-content-table-tr-options-edit"
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
.allDoctors-content {
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
        justify-content: center;
        &-edit {
          color: $green-color;
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