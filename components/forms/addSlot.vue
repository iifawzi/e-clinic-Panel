<template>
  <div class="addSlot-Component">
    <div class="slotError" v-if="error">
      <notfication color="red" :label="error" />
    </div>
    <div class="addSlot-content">
      <div class="addBtn">
        <clinicSubmit
          color="green"
          :statement="$t('dashboard.forms.addSlot.title')"
          @click="toggleForm"
        />
      </div>

<div class="spinner-4" v-if="showProgress">
<div class="dot1"></div>
<div class="dot2"></div>
</div>

      <div class="addForm" v-if="showForm && getSlots === false">
        <div class="addForm-content">
          <div class="addRow">
            <div class="input-div">
              <clinicSelect @change="setDay" v-model="slotData.day">
                <option value disabled selected>{{$t('dashboard.forms.addSlot.day')}}</option>
                <option
                  class="en-selectInput-content-option"
                  value="sat"
                >{{$t('dashboard.days.sat')}}</option>
                <option
                  class="en-selectInput-content-option"
                  value="sun"
                >{{$t('dashboard.days.sun')}}</option>
                <option
                  class="en-selectInput-content-option"
                  value="mon"
                >{{$t('dashboard.days.mon')}}</option>
                <option
                  class="en-selectInput-content-option"
                  value="tue"
                >{{$t('dashboard.days.tue')}}</option>
                <option
                  class="en-selectInput-content-option"
                  value="wed"
                >{{$t('dashboard.days.wed')}}</option>
                <option
                  class="en-selectInput-content-option"
                  value="thu"
                >{{$t('dashboard.days.thu')}}</option>
                <option
                  class="en-selectInput-content-option"
                  value="fri"
                >{{$t('dashboard.days.fri')}}</option>
                <template v-if="$v.slotData.day.$dirty" v-slot:errorSlot>
                  <div v-if="!$v.slotData.day.required">{{$t('errors.day')}}</div>
                </template>
              </clinicSelect>
            </div>

            <div class="input-div">
              <clinicInput
                :placeholder="$t('dashboard.forms.addSlot.slot_time')"
                @input="setSlot_time"
                v-model="slotData.slot_time"
                :mutedText="$t('muted.slot_time')"
              >
                <div v-if="$v.slotData.slot_time.$dirty">
                  <div v-if="!$v.slotData.slot_time.required">{{$t('errors.slot_time')}}</div>
                </div>
              </clinicInput>
            </div>

            <div class="input-div">
              <clinicInput
                :placeholder="$t('dashboard.forms.addSlot.start_time')"
                @input="setStart"
                v-model="slotData.start_time"
                :mutedText="$t('muted.start_time')"
              >
                <div v-if="$v.slotData.start_time.$dirty">
                  <div v-if="!$v.slotData.start_time.required">{{$t('errors.start_time')}}</div>
                </div>
              </clinicInput>
            </div>

            <div class="input-div">
              <clinicSelect @change="setAvailable" v-model="slotData.available">
                <option value disabled selected>{{$t('dashboard.forms.addSlot.status')}}</option>
                <option
                  class="en-selectInput-content-option"
                  value="false"
                >{{$t('dashboard.tables.slots.notActive')}}</option>
                <option
                  class="en-selectInput-content-option"
                  value="true"
                >{{$t('dashboard.tables.slots.active')}}</option>
                <template v-if="$v.slotData.available.$dirty" v-slot:errorSlot>
                  <div v-if="!$v.slotData.available.required">{{$t('errors.status')}}</div>
                </template>
              </clinicSelect>
            </div>
          </div>

          <div class="addRow">
            <div class="row-content">
              <div class="input-submit" :class="language+'-float'">
                <clinicSubmit
                  color="blue"
                  :statement="$t('dashboard.forms.addSlot.add')"
                  @click="addNewSlot"
                />
              </div>
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
const { required } = require("vuelidate/lib/validators");

export default {
  components: {
    clinicSubmit,
    clinicSelect,
    clinicInput,
    notfication
  },
  data() {
    return {
      showProgress: false,
      slotData: {
        slot_time: "",
        start_time: "",
        day: "",
        available: ""
      },
      showForm: false
    };
  },
  validations: {
    slotData: {
      slot_time: {
        required
      },
      start_time: {
        required
      },
      day: {
        required
      },
      available: {
        required
      }
    }
  },
  methods: {
    toggleForm() {
      this.showForm = !this.showForm;
    },
    setSlot_time(value) {
      this.slotData.slot_time = value;
      this.$v.slotData.slot_time.$touch();
    },
    setStart(value) {
      this.slotData.start_time = value;
      this.$v.slotData.start_time.$touch();
    },
    setDay(value) {
      this.slotData.day = value;
      this.$v.slotData.day.$touch();
    },
    setAvailable(value) {
      this.slotData.available = value;
      this.$v.slotData.available.$touch();
    },
    addNewSlot() {
      this.$v.$touch();
      if (this.$v.$invalid) {
      } else {
        const doctor_id = this.$route.params.doctor_id;
        const withId = { ...this.slotData, doctor_id };
        this.showProgress = true,
        this.$store.dispatch("controlPanel/slots/addNewSlot", withId);
      }
    }
  },
  computed: {
    language() {
      return this.$store.getters.getLocale;
    },
    error() {
         this.showProgress = false;
      return this.$store.getters["controlPanel/slots/getNewSlotError"];
    }, 
    getSlots(){
       const progress = this.showProgress = false;
      const slots = this.$store.getters["controlPanel/slots/getSlots"];
      return progress;
    }
  }
};
</script>

<style lang="scss" scoped>
.addSlot-content {
  display: flex;
  flex-flow: column;
  margin-top: 15px;
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
        justify-content: space-between;
      }
    }
  }
}
.slotError {
  margin-top: 10px;
}
.row-content{
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
</style>