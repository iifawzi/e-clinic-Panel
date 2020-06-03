<template>
  <div class="addApp-Component">
        <div class="slotError" v-if="error">
      <notfication color="red" :label="error" />
    </div>
    <div class="addApp-content">
      <div class="addBtn">
        <clinicSubmit
          color="green"
          :statement="$t('dashboard.forms.addApp.title')"
          @click="toggleForm"
        />
      </div>
      <div class="addForm" v-if="showForm">
        <div class="addForm-content">
          <div class="addRow">
            <div class="search-bar">
              <div class="input-div">
                <clinicInput
                  :placeholder="$t('dashboard.forms.addApp.searchHolder')"
                  @input="setSearch"
                  v-model="phone_number"
                >
                  <div v-if="$v.phone_number.$dirty">
                    <div
                      v-if="!$v.phone_number.required || !$v.phone_number.integer"
                    >{{$t('errors.user400')}}</div>
                  </div>
                </clinicInput>
              </div>
              <div class="submit-search">
                <clinicSubmit
                  color="blue"
                  :statement="$t('dashboard.forms.addApp.submitSearch')"
                  @click="getUser"
                />
              </div>
            </div>
          </div>
          <div class="slotError" v-if="error">
            <notfication color="red" :label="error" />
          </div>
          <div class="addRow-2" v-if="userData">
            <span class="appDate">{{$t('dashboard.forms.addApp.appDate')}}</span>
            <no-ssr>
              <datePicker
                @input="getOpenSlots"
                is-inline
                :locale="language"
                v-model="appData.date"
                :value="appData.date"
                is-dark
                :available-dates="{ weekdays: allowed(getDays) }"
              />
            </no-ssr>
              <div class="errorDate" v-if="$v.appData.date.$dirty">
                  <div v-if="!$v.appData.date.required">{{$t('errors.date')}}</div>
                </div>
          </div>
        </div>
        <div class="addRow-2" v-if="userData">
          <div class="inputWrapper">
            <div class="slot-div">
              <clinicSelect @change="setSlot" v-model="appData.slot_id">
                <option value disabled selected>{{$t('dashboard.forms.addApp.apps')}}</option>
                <option
                  v-for="slot in getSlots"
                  :key="slot.slot_id"
                  class="en-selectInput-content-option"
                  :value="slot.slot_id"
                >{{slot.start_time + $t('dashboard.forms.addApp.for') + slot.slot_time + $t('dashboard.forms.addApp.minute') }}</option>

                <template v-if="$v.appData.slot_id.$dirty" v-slot:errorSlot>
                  <div v-if="!$v.appData.slot_id.required">{{$t('errors.day')}}</div>
                </template>
              </clinicSelect>
            </div>
          </div>
        </div>
        <div class="addRow-2" v-if="userData">
              <div class="inputWrapper">
                 <div class="slot-div">
                <clinicSubmit
                  color="green"
                  :statement="$t('dashboard.forms.addApp.addApp')"
                  @click="addApp"
                />
                </div>
              </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import clinicSubmit from "~/components/shared/clinicSubmit";
import clinicInput from "~/components/shared/clinicInput";
import notfication from "~/components/shared/notfication";
import clinicSelect from "~/components/shared/clinicSelect";
const { required, integer } = require("vuelidate/lib/validators");

export default {
  components: {
    clinicSubmit,
    clinicSelect,
    clinicInput,
    notfication
  },
  data() {
    return {
      phone_number: "",
      appData: {
        user_id: "",
        date: "",
        slot_id: ""
      },
      showForm: false
    };
  },
  validations: {
    phone_number: {
      required,
      integer
    },
    appData:{
      slot_id:{
        required,
      },
      date:{
        required,
      }
    }
  },
  methods: {
    allowed(days) {
      let daysAllowed = [];
      for (let day of days) {
        if (day === "sun") {
          daysAllowed.push(1);
        } else if (day === "mon") {
          daysAllowed.push(2);
        } else if (day === "tue") {
          daysAllowed.push(3);
        } else if (day === "wed") {
          daysAllowed.push(4);
        } else if (day === "thu") {
          daysAllowed.push(5);
        } else if (day === "fri") {
          daysAllowed.push(6);
        } else if (day === "sat") {
          daysAllowed.push(7);
        }
      }
      return daysAllowed;
    },
    toggleForm() {
      this.showForm = !this.showForm;
    },
    addApp(){
      const doctor_id = this.$route.params.doctor_id;
       this.$v.appData.$touch();
      if (this.$v.appData.$invalid) {
      } else {
        const data = this.appData;
        this.$store.dispatch("controlPanel/appointments/addAppointment", {data,doctor_id} );
      }
    },
    setSearch(value) {
      this.phone_number = value;
      this.$v.phone_number.$touch();
    },
    setSlot(value){
      this.appData.slot_id = value;
      this.$v.appData.slot_id.$touch();
    },
    getUser() {
      if (this.$v.phone_number.required && this.$v.phone_number.integer) {
        const phone_number = this.phone_number;
        this.$store.dispatch("controlPanel/users/getUser", phone_number);
      }
    },
    getOpenSlots(value) {
           this.appData.date = value;
      this.$v.appData.date.$touch();
      const doctor_id = this.$route.params.doctor_id;
      const date = this.$moment(value).locale('en')
        .format()
        .substr(0, 10);
      const day = this.$moment(value).locale('en')
        .format("ddd")
        .toLowerCase();
      if (this.getDays.some(d => d == day)) {
        const data = {
          doctor_id,
          day,
          date
        };
        this.$store.dispatch("controlPanel/slots/getOpenSlots", data);
      }
    }
  },
  mounted() {
    const doctor_id = this.$route.params.doctor_id;
    this.$store.dispatch("controlPanel/slots/getDoctorDays", { doctor_id });
  },
  computed: {
    userData() {
      const userData = this.$store.getters["controlPanel/users/getUserData"];
      this.appData.user_id = userData.user_id;
      return userData;
    },
    getDays() {
      const days = this.$store.getters["controlPanel/slots/getDays"];
      return days;
    },
    getSlots() {
      const slots = this.$store.getters["controlPanel/slots/getOpenSlots"];
      return slots;
    },
    language() {
      return this.$store.getters.getLocale;
    },
    error() {
       const newError = this.$store.getters["controlPanel/appointments/getNewAppError"]
      return newError;
    }
  }
};
</script>

<style lang="scss" scoped>
.addApp-content {
  width: 100%;
  display: flex;
  flex-flow: column;
  margin-top: 10px;
  margin-bottom: 50px;
  .addBtn {
    width: 25%;
  }
  .addForm {
    box-shadow: 0 5px 25px rgba(54, 57, 238, 0.281);
    padding: 20px;
    border-radius: 30px;
    margin-top: 20px;
    .addForm-content {
      display: flex;
      flex-flow: column;
      justify-content: space-between;
      .input-div {
        width: 200px;
      }
      .input-submit {
        width: 200px;
        display: flex;
      }
      .addRow {
        width: 100%;
        display: flex;
        justify-content: center;
        &-2 {
          margin-top: 20px;
          display: flex;
          justify-content: center;
        }
        &-2:not(:first-child) {
          margin-top: 20px;
          display: flex;
          flex-flow: column;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }
}
.slotError {
  margin-top: 10px;
}
.row-content {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
.search-bar {
  margin-top: 30px;
  display: flex;
  flex-flow: row;
  width: 450px;
  align-items: center;
  justify-content: space-between;
}
.submit-search {
  width: 200px;
}
.addRow-2:not(:first-child) {
  margin-top: 20px;
}
.inputWrapper {
  width: 100%;
  display: flex;
  justify-content: center;
}
.slot-div {
  width: 50%;
}
.appDate {
  font-size: 24px;
  margin-bottom: 10px;
}
.errorDate {
  margin-top: 10px;
  color: $red;
}
</style>