<template>
  <div class="allDoctors-table">
    <div class="allDoctors-content">
      <table class="allDoctors-content-table">
        <tr class="allDoctors-content-table-tr">
          <th class="allDoctors-content-table-th">{{$t('dashboard.forms.allDoctors.firstname')}}</th>
          <th class="allDoctors-content-table-th">{{$t('dashboard.forms.allDoctors.lastname')}}</th>
          <th class="allDoctors-content-table-th">{{$t('dashboard.forms.allDoctors.country')}}</th>
          <th class="allDoctors-content-table-th">{{$t('dashboard.forms.allDoctors.category')}}</th>
          <th class="allDoctors-content-table-th">{{$t('dashboard.forms.allDoctors.price')}}</th>
          <th class="allDoctors-content-table-th">{{$t('dashboard.forms.allDoctors.phone')}}</th>
          <th class="allDoctors-content-table-th">{{$t('dashboard.forms.allDoctors.avaliable')}}</th>
          <th class="allDoctors-content-table-th">{{$t('dashboard.forms.allDoctors.options')}}</th>
        </tr>
        <tr v-for="doctor in doctors" :key="doctor.doctor_id" class="allDoctors-content-table-tr">
          <td>{{doctor.first_name}}</td>
          <td>{{doctor.last_name}}</td>
          <td>{{doctor.country}}</td>
          <td>{{doctor[language]}}</td>
          <td>{{doctor.price}}</td>
          <td>{{doctor.phone_number}}</td>
          <td
            :class="doctor.avaliable === 1 ? 'green-status' : 'red-status'"
          >{{doctor.avaliable === 1 ? $t('dashboard.forms.allDoctors.active') : $t('dashboard.forms.allDoctors.notActive')}}</td>
          <td>
            <div class="allDoctors-content-table-tr-options">
              <i @click="deleteDoctor(doctor.phone_number)" class="fas fa-times options-delete"></i>
              <nuxt-link :to="'/controlPanel/dashboard/doctors/'+doctor.doctor_id">
                <i
                  class="fas fa-edit allDoctors-content-table-tr-options-edit"
                  :class="language+'-edit'"
                ></i>
              </nuxt-link>
            </div>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    deleteDoctor(phone_number) {
      this.$store.dispatch("controlPanel/doctors/deleteDoctor", phone_number);
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
  }
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
</style>