<template>
  <div class="userApps-table">

      <div class="input-div">
        <clinicInput
          :placeholder="$t('dashboard.tables.userApps.searchHolder')"
          @input="setSearch"
          v-model="searchQuery"
          :mutedText="$t('dashboard.tables.userApps.search')"
        >
        </clinicInput>
      </div>
    <div class="userApps-content">
      <table class="userApps-content-table">


        <tr class="userApps-content-table-tr">
          <th class="userApps-content-table-th">{{$t('dashboard.tables.userApps.doctor')}}</th>
          <th class="userApps-content-table-th">{{$t('dashboard.tables.userApps.category')}}</th>
          <th class="userApps-content-table-th">{{$t('dashboard.tables.userApps.date')}}</th>
          <th class="userApps-content-table-th">{{$t('dashboard.tables.userApps.day')}}</th>
          <th class="userApps-content-table-th">{{$t('dashboard.tables.userApps.start_time')}}</th>
          <th class="userApps-content-table-th">{{$t('dashboard.tables.userApps.end_time')}}</th>
          <th class="userApps-content-table-th">{{$t('dashboard.tables.userApps.available')}}</th>
          <th class="userApps-content-table-th">{{$t('dashboard.tables.userApps.cancel')}}</th>
          <th class="userApps-content-table-th">{{$t('dashboard.tables.userApps.cancelDate')}}</th>
        </tr>
        <tbody v-if="this.searchQuery == ''">
        <tr v-for="appointment in appointments" :key="appointment.appointment_id" class="userApps-content-table-tr">
          <td>{{appointment.first_name}} {{appointment.last_name}}</td>
          <td>{{appointment[language]}}</td>
          <td>{{appointment.date}}</td>
          <td>{{ $t('dashboard.days.'+appointment.day)}}</td>
          <td>{{appointment.start_time}}</td>
          <td>{{appointment.end_time}}</td>
          <td
            :class="forStatusClass(appointment.appointment_status)"
        >{{ $t('dashboard.status.'+appointment.appointment_status)}}</td>

          <td>
            <div class="userApps-content-table-tr-options">
                <i @click="cancelApp(appointment.appointment_id)" v-if="appointment.appointment_status === 'upcoming'" class="fas fa-times options-delete"></i>
            </div>
          </td>
                    <td  v-if="appointment.appointment_status == 'canceled'">{{(appointment.updatedAt).substr(0,10)}}</td>
        </tr>
</tbody>
       <tbody v-else>
        <tr v-for="appointment in filteredData" :key="appointment.appointment_id" class="userApps-content-table-tr">
          <td>{{appointment.first_name}} {{appointment.last_name}}</td>
          <td>{{appointment[language]}}</td>
          <td>{{appointment.date}}</td>
          <td>{{ $t('dashboard.days.'+appointment.day)}}</td>
          <td>{{appointment.start_time}}</td>
          <td>{{appointment.end_time}}</td>
          <td
            :class="forStatusClass(appointment.appointment_status)"
        >{{ $t('dashboard.status.'+appointment.appointment_status)}}</td>

          <td>
<div class="userApps-content-table-tr-options">
              <i @click="cancelApp(appointment.appointment_id)" v-if="appointment.appointment_status === 'upcoming'" class="fas fa-times options-delete"></i>
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
    props:{
        userId:{
            type:Number,
            required:true
        }
    },
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
          this.filteredData = this.appointments.filter(appointment=>{
              return (appointment.first_name.toLowerCase().includes(searched.toLowerCase()) 
              || appointment.last_name.toLowerCase().includes(searched.toLowerCase()) 
                   || (appointment.first_name +" " + appointment.last_name).toLowerCase().includes(searched.toLowerCase()) 
              || appointment.date.toLowerCase().includes(searched.toLowerCase())
              )
          });
      },
      forStatusClass(status){
          if (status == 'pending'){
              return "pending"
          }else if(status == 'upcoming'){
              return 'upcoming'
          }else if (status == 'running'){
                 return 'running'
          }else if (status == 'finished'){
                 return 'finished'
          }else if (status == 'canceled'){
                 return 'canceled'
          }
      },
      cancelApp(appointment_id){
          this.$store.dispatch("controlPanel/appointments/cancelAppointment",{appointment_id,user_id: this.userId});
      }
  },
  mounted() {
    if (this.userId){
    this.$store.dispatch("controlPanel/appointments/getUserAppointmentsData",this.userId);
    }
  },
  computed: {
    appointments() {
      return this.$store.getters["controlPanel/appointments/getUserAppointments"];
    },
    language() {
      return this.$store.getters.getLocale;
    }
  },
};
</script>

<style lang="scss" scoped>
.userApps-content {
  margin-top: 15px;
  margin-bottom: 40px;
  width: 100%;
  height: 100%;
  max-height: 100vh;
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
.finished {
  color: $green-color;
}
.canceled {
  color: $red;
}
.upcoming {
  color: $main-color;
}
.running {
  color: $purple;
}
.pending {
  color: $yellow;
}

.input-div {
  width: 400px;
  margin-top: 40px;
}
</style>