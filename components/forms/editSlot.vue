<template>
  <div class="editSlot-Component">
    <div class="warninng" v-if="this.slotData.available === true">
      <notfication color="red" style="margin-bottom:10px" :label="$t('dashboard.forms.editSlot.warning')" />
    </div>
       <div class="slotError" v-if="error">
      <notfication color="red" :label="error" />
    </div>
      <div class="slotSuccess" v-if="success">
      <notfication color="green" :label="success" />
    </div>
    <div class="editSlot-content">
      <div class="addForm">
        <div class="addForm-content">
          <div class="addRow">
            <div class="input-div">
              <clinicSelect @change="setDay" v-model="slotData.day">
                <option value disabled selected>{{$t('dashboard.forms.editSlot.day')}}</option>
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
                :placeholder="$t('dashboard.forms.editSlot.slot_time')"
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
                :placeholder="$t('dashboard.forms.editSlot.start_time')"
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
                <option value disabled selected>{{$t('dashboard.forms.editSlot.status')}}</option>
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
                  color="red"
                  :statement="$t('dashboard.forms.editSlot.update')"
                  @click="editSlot"
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
  props:{
      slotToEdit:{
          type:Object,
          required:true,
      }
  },
  data() {
    return {
      slotData: {
        slot_time: "",
        start_time: "",
        day: "",
        available: "",
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
    editSlot() {
      this.$v.$touch();
      if (this.$v.$invalid) {
      } else {
        const doctor_id = this.$route.params.doctor_id;
        const withId = { newData: this.slotData,doctor_id: doctor_id };
        this.$store.dispatch("controlPanel/slots/updateSlot", withId);
      }
    }
  },
  computed: {
    language() {
      return this.$store.getters.getLocale;
    },
    error() {
      return this.$store.getters["controlPanel/slots/getEditSlotError"];
    },
      success() {
      return this.$store.getters["controlPanel/slots/getEditSlotSuccess"];
    }
  },
  mounted(){
      delete this.slotToEdit.doctor_id;
      for (let key in this.slotToEdit){
         this.slotData[key] = this.slotToEdit[key];
      }
       this.slotData.day = this.$moment(this.slotData.day+ " "+this.slotData.start_time, "ddd HH:mm").parseZone().utcOffset(120).locale("en").format("ddd").toLowerCase()
      this.slotData.start_time = this.$moment(this.slotData.start_time, "HH:mm").parseZone().utcOffset(120).locale("en").format("HH:mm");
  }
};
</script>

<style lang="scss" scoped>
.editSlot-content {
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
        justify-content: space-between;
      }
    }
  }
}
.warninng {
  margin-top: 10px;
}
.row-content{
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
</style>