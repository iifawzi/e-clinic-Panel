<template>
  <section class="editDoctor-form"> 


    <div class="editDoctorForm-content">
          <div class v-if="getSuccess">
      <notfication class="doctorSuccess" color="green" :label="getSuccess" />
    </div>

    <div class="doctorError" v-if="error">
      <notfication color="red" :label="error" />
    </div>
      <div class="input-div">
        <uploadImage :mutedText="$t('muted.picture')" :imageFromComponent="this.doctorData.picture" @input="setPicture">
          <div v-if="$v.doctorData.picture.$dirty">
            <div v-if="!$v.doctorData.picture.required">{{$t('errors.picture')}}</div>
          </div>
        </uploadImage>
      </div>

      <div class="input-div">
        <clinicInput
          :placeholder="$t('dashboard.forms.editDoctor.phone')"
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
          :placeholder="$t('dashboard.forms.editDoctor.password')"
          @input="setPassword"
          v-model="doctorData.password"
          :mutedText="$t('muted.password')"
        >
          <div v-if="$v.doctorData.password.$dirty">
            <div v-if="!$v.doctorData.password.required">{{$t('errors.password')}}</div>
            <div v-if="!$v.doctorData.password.minLength">{{$t('errors.minLength')}}</div>
            <div v-if="!$v.doctorData.password.maxLength">{{$t('errors.maxLength')}}</div>
            <div v-if="!$v.doctorData.password.alphaNum">{{$t('errors.alphaNum')}}</div>
          </div>
        </clinicInput>
      </div>
      <div class="input-div">
        <clinicInput
          :placeholder="$t('dashboard.forms.editDoctor.firstname')"
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
          :placeholder="$t('dashboard.forms.editDoctor.lastname')"
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
            <option value disabled selected>{{$t('dashboard.forms.editDoctor.country')}}</option>
            <option
              class="en-selectInput-content-option"
              value="egypt"
            >{{$t('dashboard.forms.editDoctor.egypt')}}</option>
            <option
              class="en-selectInput-content-option"
              value="saudiarabia"
            >{{$t('dashboard.forms.editDoctor.saudiarabia')}}</option>

            <template v-if="$v.doctorData.country.$dirty" v-slot:errorSlot>
              <div v-if="!$v.doctorData.country.required">{{$t('errors.country')}}</div>
            </template>
          </clinicSelect>
        </div>

        <div class="input-div">
          <clinicSelect @change="setCategory" v-model="doctorData.category_id">
            <option disabled selected>{{$t('dashboard.forms.editDoctor.category')}}</option>
            <option v-for="category in categories" :key="category.category_id" :selected="category.category_id === doctorData.category_id"
              class="en-selectInput-content-option"
              :value=category.category_id
            >{{category[language]}}</option>
            <template v-if="$v.doctorData.category_id.$dirty" v-slot:errorSlot>
              <div v-if="!$v.doctorData.category_id.required">{{$t('errors.category')}}</div>
            </template>
          </clinicSelect>
        </div>
     <div class="input-div">
        <clinicInput
          :placeholder="$t('dashboard.forms.editDoctor.price')"
          @input="setPrice"
          v-model="doctorData.price"
          :mutedText="$t('muted.price')"
        >
          <div v-if="$v.doctorData.price.$dirty">
            <div v-if="!$v.doctorData.price.required">{{$t('errors.price')}}</div>
          </div>
        </clinicInput>
      </div>
        <div class="submit-div">
          <clinicSubmit
            color="blue"
            :statement="$t('dashboard.forms.editDoctor.editDoctor')"
            @click="editDoctor"
          />
        </div>
           <div class="submit-div">
          <clinicSubmit
          v-if="getDoctor.avaliable === false"
            color="green"
            :statement="$t('dashboard.forms.editDoctor.activeDoctor')"
            @click="activeDeactiveAccount"
          />
          <clinicSubmit
          v-else
            color="red"
            :statement="$t('dashboard.forms.editDoctor.deactiveDoctor')"
            @click="activeDeactiveAccount"
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
const { required,integer,minLength,maxLength,alphaNum } = require("vuelidate/lib/validators");
export default {
  data() {
    return {
        componentKey: 0,
        doctorData: {
          doctor_id: "",
        phone_number: "",
        password: "",
        first_name: "",
        last_name: "",
        country: "",
        category_id: "",
        picture: "",
        price:"",
        avaliable: false,
      },
      NewDoctorData:{}, 
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
        required,
        alphaNum,
         minLength: minLength(3),
      maxLength: maxLength(30)
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
      category_id: {
        required
      },
      picture: {
        required
      },
      price:{
        required,
        integer,
        
      }
    }
  },
  methods: {
    setPhone(value) {
      this.doctorData.phone_number = value;
      this.NewDoctorData.phone_number = value; // with this way i will just send only the data the admin changed.
      this.$v.doctorData.phone_number.$touch();
    },
    setPassword(value) {
      this.doctorData.password = value;
      this.NewDoctorData.password = value;
      this.$v.doctorData.password.$touch();
    },
    setFirstname(value) {
      this.doctorData.first_name = value;
      this.NewDoctorData.first_name  = value;
      this.$v.doctorData.first_name.$touch();
    },
    setLastname(value) {
      this.doctorData.last_name = value;
      this.NewDoctorData.last_name  = value;
      this.$v.doctorData.last_name.$touch();
    },
    setCountry(value) {
      this.doctorData.country = value;
      this.$v.doctorData.country.$touch();
    },
    setCategory(value) {
      this.doctorData.category_id = value;
      this.NewDoctorData.category_id  = value;
      this.$v.doctorData.category_id.$touch();
    },
    setPicture(value) {
      this.doctorData.picture = value;
      this.NewDoctorData.picture  = value;
      this.$v.doctorData.picture.$touch();
    },
     setPrice(value) {
      this.doctorData.price = value;
      this.NewDoctorData.price  = value;
      this.$v.doctorData.price.$touch();
    },
    editDoctor() {
      this.$v.$touch();
      if (this.$v.$invalid) {
      } else {
        this.$store.dispatch("controlPanel/doctors/update_doctor", {Newdata: this.NewDoctorData,doctor_id: this.doctorData.doctor_id});
      }
    },
      activeDeactiveAccount() {
      this.$v.$touch();
      if (this.$v.$invalid) {
      } else {
        this.$store.dispatch("controlPanel/doctors/update_doctor", {Newdata: {avaliable: !this.doctorData.avaliable}, doctor_id: this.doctorData.doctor_id});
      }
    }
  },
  computed: {
       language(){
      return this.$store.getters.getLocale;
    },
    error() {
      return this.$store.getters["controlPanel/doctors/getError"];
    },
    getSuccess() {
      return this.$store.getters["controlPanel/doctors/getSuccess"];
    },
     getAccountStatus() {
      return this.$store.getters["controlPanel/doctors/accountStatus"];
      this.doctorData.avaliable = !this.doctorData.avaliable;
    },
      categories() {
      return this.$store.getters['controlPanel/categories/get_categories'];
    },
        getDoctor() {
      const doctorData  = this.$store.getters["controlPanel/doctors/getDoctor"];
      this.doctorData.phone_number = doctorData.phone_number;
      this.doctorData.doctor_id = doctorData.doctor_id;
      this.doctorData.password = doctorData.password;
      this.doctorData.first_name = doctorData.first_name;
      this.doctorData.last_name = doctorData.last_name;
      this.doctorData.country = doctorData.country;
      this.doctorData.category_id = doctorData.category_id;
      this.doctorData.price = doctorData.price;
      this.doctorData.picture = doctorData.picture;
      this.doctorData.avaliable = doctorData.avaliable;
      return doctorData;
    },
  }, 
  mounted(){
    const id = this.$route.params.doctor_id;
    this.$store.dispatch('controlPanel/categories/getCategories');
    this.$store.dispatch("controlPanel/doctors/get_doctor", id);
  }
};
</script>
<style lang="scss" scoped>
.editDoctor-form{
  width: 100%;
  .editDoctorForm-content {
    width: 100%;
  }
}
.input-div {
   width: 100%;
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
  width: 300px;
}
</style>