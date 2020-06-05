<template>
  <div class="docApps-table">

      <div class="input-div">
                     <div class="apps-title">{{$t('dashboard.tables.docApps.title')}}</div>
        <clinicInput class="clinicInput"
          :placeholder="$t('dashboard.tables.docApps.searchHolder')"
          @input="setSearch"
          v-model="searchQuery"
          :mutedText="$t('dashboard.tables.docApps.search')"
        >
        </clinicInput>
      </div>
    <div class="docApps-content">
      <table class="docApps-content-table">


        <tr class="docApps-content-table-tr">
          <th class="docApps-content-table-th">{{$t('dashboard.tables.docApps.user')}}</th>
          <th class="docApps-content-table-th">{{$t('dashboard.tables.docApps.date')}}</th>
          <th class="docApps-content-table-th">{{$t('dashboard.tables.docApps.day')}}</th>
          <th class="docApps-content-table-th">{{$t('dashboard.tables.docApps.start_time')}}</th>
          <th class="docApps-content-table-th">{{$t('dashboard.tables.docApps.available')}}</th>
                  <th class="docApps-content-table-th">{{$t('dashboard.tables.docApps.cancel')}}</th>
          <th class="docApps-content-table-th">{{$t('dashboard.tables.docApps.cancelDate')}}</th>
        </tr>
        <tbody v-if="this.searchQuery == ''">
        <tr v-for="appointment in appointments" :key="appointment.appointment_id" class="docApps-content-table-tr">
          <td>{{appointment.first_name}} {{appointment.last_name}}</td>
          <td>{{($moment(appointment.date+" "+appointment.start_time, "YYYY-MM-DD HH:mm").parseZone().utcOffset(120).locale("en").format("YYYY-MM-DD"))}}</td>
          <td>{{ $t('dashboard.days.'+$moment(appointment.day+ " "+appointment.start_time, "ddd HH:mm").parseZone().utcOffset(120).locale("en").format("ddd").toLowerCase())}}</td>
          <td>{{$moment(appointment.start_time,"HH:mm").parseZone().utcOffset(120).format("HH:mm")}}</td>
          <td
            :class="forStatusClass(appointment.appointment_status)"
        >{{ $t('dashboard.status.'+appointment.appointment_status)}}</td>

          <td>
            <div class="docApps-content-table-tr-options">
                         <i @click="cancelApp(appointment.appointment_id)" v-if="appointment.appointment_status === 'upcoming'" class="fas fa-times options-delete"></i>

            </div>
          </td>
                    <td  v-if="appointment.appointment_status == 'canceled'">{{$moment(appointment.updatedAt).parseZone().utcOffset(120).locale(language).format('llll')}}</td>

        </tr>
</tbody>
       <tbody v-else>
        <tr v-for="appointment in filteredData" :key="appointment.appointment_id" class="docApps-content-table-tr">
          <td>{{appointment.first_name}} {{appointment.last_name}}</td>
             <td>{{($moment(appointment.date+" "+appointment.start_time, "YYYY-MM-DD HH:mm").parseZone().utcOffset(120).locale("en").format("YYYY-MM-DD"))}}</td>
<td>{{ $t('dashboard.days.'+$moment(appointment.day+ " "+appointment.start_time, "ddd HH:mm").parseZone().utcOffset(120).locale("en").format("ddd").toLowerCase())}}</td>
          <td>{{$moment(appointment.start_time,"HH:mm").parseZone().utcOffset(120).format("HH:mm")}}</td>
          <td
            :class="forStatusClass(appointment.appointment_status)"
        >{{ $t('dashboard.status.'+appointment.appointment_status)}}</td>

          <td>
            <div class="docApps-content-table-tr-options">
                       <i @click="cancelApp(appointment.appointment_id)" v-if="appointment.appointment_status === 'upcoming'" class="fas fa-times options-delete"></i>

            </div>
          </td>
                    <td  v-if="appointment.appointment_status == 'canceled'">{{$moment(appointment.updatedAt).parseZone().utcOffset(120).locale(language).format('llll')}}</td>
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
          }else if (status == 'missed'){
                 return 'missed'
          }else if (status == 'doctor missed'){
                 return 'missed_doctor'
          }else if (status == 'user missed'){
                 return 'missed_user'
          }
      },
            cancelApp(appointment_id){
               const id = this.$route.params.doctor_id;
          this.$store.dispatch("controlPanel/appointments/cancelAppointment",{appointment_id,id,updateWhat: "doctor"});
      }
  },
  mounted() {
      const id = this.$route.params.doctor_id;
      if (id){
    this.$store.dispatch("controlPanel/appointments/getDocAppointmentsData",id);
      }
  },
  computed: {
    appointments() {
      return this.$store.getters["controlPanel/appointments/getDocAppointments"];
    },
    language() {
      return this.$store.getters.getLocale;
    }
  },
};
</script>

<style lang="scss" scoped>
.docApps-content {
  margin-top: 15px;
  margin-bottom: 20px;
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
.missed {
  color: $orange;
}
.missed_doctor {
  color: $brown;
}
.missed_user {
  color: $sky;
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
.apps-title {
  font-size: 40px;
  text-align: center;
  color: $main-color;
}

</style>