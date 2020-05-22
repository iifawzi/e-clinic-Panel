<template>
  <section class="addNewDoctor-form" :key="componentKey">
    <div class="doctorError" v-if="error">
      <notfication color="red" :label="error" />
    </div>
    <div class v-if="getSuccess">
      <notfication class="doctorSuccess" color="green" :label="getSuccess" />
    </div>
    <div class="addNewDoctorForm-content">
      <div class="input-div">
        <uploadImage :mutedText="$t('muted.picture')" @input="setPicture">
          <div v-if="$v.doctorData.picture.$dirty">
            <div v-if="!$v.doctorData.picture.required">{{$t('errors.picture')}}</div>
          </div>
        </uploadImage>
      </div>

      <div class="input-div">
        <clinicInput
          :placeholder="$t('dashboard.forms.addDoctor.phone')"
          @input="setPhone"
          v-model="doctorData.phone_number"
          :mutedText="$t('muted.phone')"
        >
          <div v-if="$v.doctorData.phone_number.$dirty">
            <div v-if="!$v.doctorData.phone_number.required">{{$t('errors.phone')}}</div>
          </div>
        </clinicInput>
      </div>
      <div class="input-div">
        <clinicInput
          :placeholder="$t('dashboard.forms.addDoctor.password')"
          @input="setPassword"
          v-model="doctorData.password"
          :mutedText="$t('muted.password')"
        >
          <div v-if="$v.doctorData.password.$dirty">
            <div v-if="!$v.doctorData.password.required">{{$t('errors.password')}}</div>
          </div>
        </clinicInput>
      </div>
      <div class="input-div">
        <clinicInput
          :placeholder="$t('dashboard.forms.addDoctor.firstname')"
          @input="setFirstname"
          v-model="doctorData.first_name"
          :mutedText="$t('muted.firstname')"
        >
          <div v-if="$v.doctorData.first_name.$dirty">
            <div v-if="!$v.doctorData.first_name.required">{{$t('errors.firstname')}}</div>
          </div>
        </clinicInput>
      </div>
      <div class="input-div">
        <clinicInput
          :placeholder="$t('dashboard.forms.addDoctor.lastname')"
          @input="setLastname"
          v-model="doctorData.last_name"
          :mutedText="$t('muted.lastname')"
        >
          <div v-if="$v.doctorData.last_name.$dirty">
            <div v-if="!$v.doctorData.last_name.required">{{$t('errors.lastname')}}</div>
          </div>
        </clinicInput>
        <div class="input-div">
          <clinicSelect @change="setCountry" v-model="doctorData.country">
            <option value disabled selected>{{$t('dashboard.forms.addDoctor.country')}}</option>
            <option
              class="en-selectInput-content-option"
              value="Egypt"
            >{{$t('dashboard.forms.addDoctor.egypt')}}</option>
            <option
              class="en-selectInput-content-option"
              value="Saudiarabia"
            >{{$t('dashboard.forms.addDoctor.saudiarabia')}}</option>

            <template v-if="$v.doctorData.country.$dirty" v-slot:errorSlot>
              <div v-if="!$v.doctorData.country.required">{{$t('errors.country')}}</div>
            </template>
          </clinicSelect>
        </div>

        <div class="input-div">
          <clinicSelect @change="setCategory" v-model="doctorData.category">
            <option value disabled selected>{{$t('dashboard.forms.addDoctor.category')}}</option>
            <option
              class="en-selectInput-content-option"
              value="3yon"
            >{{$t('dashboard.forms.addDoctor.3yoon')}}</option>
            <option
              class="en-selectInput-content-option"
              value="asnan"
            >{{$t('dashboard.forms.addDoctor.asnan')}}</option>
            <template v-if="$v.doctorData.category.$dirty" v-slot:errorSlot>
              <div v-if="!$v.doctorData.category.required">{{$t('errors.category')}}</div>
            </template>
          </clinicSelect>
        </div>

        <div class="input-div">
          <clinicSelect
            @change="setSubCategory"
            v-model="doctorData.sub_category"
            :mutedText="$t('muted.subCategory')"
          >
            <option value disabled selected>{{$t('dashboard.forms.addDoctor.subCategory')}}</option>
            <option
              class="en-selectInput-content-option"
              value="3yon"
            >{{$t('dashboard.forms.addDoctor.3yoon')}}</option>
            <option
              class="en-selectInput-content-option"
              value="asnan"
            >{{$t('dashboard.forms.addDoctor.asnan')}}</option>
          </clinicSelect>
        </div>

        <div class="submit-div">
          <clinicSubmit
            color="blue"
            :statement="$t('dashboard.forms.addDoctor.submit')"
            @click="addDoctor"
          />
        </div>
      </div>
    </div>
  </section>
</template>


<script>
import clinicInput from "~/components/shared/clinicInput";
import clinicSelect from "~/components/shared/clinicSelect";
import clinicSubmit from "~/components/shared/clinicSubmit";
import notfication from "~/components/shared/notfication";
import uploadImage from "~/components/shared/uploadImage";
const { required } = require("vuelidate/lib/validators");
export default {
  data() {
    return {
        componentKey: 0,
      doctorData: {
        phone_number: "",
        password: "",
        first_name: "",
        last_name: "",
        country: "",
        category: "",
        sub_category: "",
        picture: ""
      }
    };
  },
  components: {
    clinicInput,
    clinicSubmit,
    notfication,
    clinicSelect,
    uploadImage
  },
  validations: {
    doctorData: {
      phone_number: {
        required
      },
      password: {
        required
      },
      first_name: {
        required
      },
      last_name: {
        required
      },
      country: {
        required
      },
      category: {
        required
      },
      picture: {
        required
      }
    }
  },
  methods: {
     forceRerender() {
      this.componentKey += 1;  
    },
    setPhone(value) {
      this.doctorData.phone_number = value;
      this.$v.doctorData.phone_number.$touch();
    },
    setPassword(value) {
      this.doctorData.password = value;
      this.$v.doctorData.password.$touch();
    },
    setFirstname(value) {
      this.doctorData.first_name = value;
      this.$v.doctorData.first_name.$touch();
    },
    setLastname(value) {
      this.doctorData.last_name = value;
      this.$v.doctorData.last_name.$touch();
    },
    setCountry(value) {
      this.doctorData.country = value;
      this.$v.doctorData.country.$touch();
    },
    setCategory(value) {
      this.doctorData.category = value;
      this.$v.doctorData.category.$touch();
    },
    setSubCategory(value) {
      this.doctorData.sub_category = value;
    },
    setPicture(value) {
      this.doctorData.picture = value;
      this.$v.doctorData.picture.$touch();
    },
    addDoctor() {
      this.$v.$touch();
      if (this.$v.$invalid) {
      } else {
        this.$store.dispatch("doctors/add_doctor", this.doctorData);
      }
    }
  },
  computed: {
    error() {
      return this.$store.getters["doctors/getError"];
    },
    getSuccess() {
      this.$v.$reset()
      this.forceRerender();
      this.doctorData.phone_number = "";
      this.doctorData.password = "";
      this.doctorData.first_name = "";
      this.doctorData.last_name = "";
      this.doctorData.country = "";
      this.doctorData.category = "";
      this.doctorData.sub_category = "";
      this.doctorData.picture = "";
      return this.$store.getters["doctors/getSuccess"];
    }
  }
};
</script>
<style lang="scss" scoped>
.input-div {
  width: 300px;
}
.input-div:not(:first-child) {
  margin-top: 10px;
}
.submit-div {
  margin-top: 20px;
  height: 40px;
}
.doctorError {
  margin-bottom: 10px;
}
.doctorSuccess {
  margin-bottom: 15px;
  height: 40px;
}
</style>