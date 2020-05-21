<template>
  <section class="addNewDoctor-form">
    <div class="addNewDoctorForm-content">

<div class="input-div">
      <uploadImage  :mutedText="$t('muted.picture')" @input="setPicture">
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
          v-model="doctorData.firstname"
            :mutedText="$t('muted.firstname')"
        >
          <div v-if="$v.doctorData.firstname.$dirty">
            <div v-if="!$v.doctorData.firstname.required">{{$t('errors.firstname')}}</div>
          </div>
        </clinicInput>
      </div>
        <div class="input-div">
        <clinicInput
          :placeholder="$t('dashboard.forms.addDoctor.lastname')"
          @input="setLastname"
          v-model="doctorData.lastname"
            :mutedText="$t('muted.lastname')"
        >
          <div v-if="$v.doctorData.lastname.$dirty">
            <div v-if="!$v.doctorData.lastname.required">{{$t('errors.lastname')}}</div>
          </div>
        </clinicInput>
        <div class="input-div">
        <clinicSelect @change="setCountry" v-model="doctorData.country">
               <option value disabled selected>{{$t('dashboard.forms.addDoctor.country')}}</option>
                <option class="en-selectInput-content-option" value="Egypt">{{$t('dashboard.forms.addDoctor.egypt')}}</option>
                <option class="en-selectInput-content-option" value="Saudiarabia">{{$t('dashboard.forms.addDoctor.saudiarabia')}}</option>

               
                 <template v-if="$v.doctorData.country.$dirty"  v-slot:errorSlot>
            <div v-if="!$v.doctorData.country.required">{{$t('errors.country')}}</div>
          </template>
        </clinicSelect>
        </div>

                <div class="input-div">
        <clinicSelect @change="setCategory" v-model="doctorData.category">
               <option value disabled selected>{{$t('dashboard.forms.addDoctor.category')}}</option>
                <option class="en-selectInput-content-option" value="3yon">{{$t('dashboard.forms.addDoctor.3yoon')}}</option>
                <option class="en-selectInput-content-option" value="asnan">{{$t('dashboard.forms.addDoctor.asnan')}}</option>
                 <template v-if="$v.doctorData.category.$dirty"  v-slot:errorSlot>
            <div v-if="!$v.doctorData.category.required">{{$t('errors.category')}}</div>
          </template>
        </clinicSelect>
        </div>


                <div class="input-div">
        <clinicSelect @change="setSubCategory" v-model="doctorData.subCategory"  :mutedText="$t('muted.subCategory')">
               <option value disabled selected>{{$t('dashboard.forms.addDoctor.subCategory')}}</option>
                <option class="en-selectInput-content-option" value="3yon">{{$t('dashboard.forms.addDoctor.3yoon')}}</option>
                <option class="en-selectInput-content-option" value="asnan">{{$t('dashboard.forms.addDoctor.asnan')}}</option>
        </clinicSelect>
        </div>

      <div class="submit-div">
        <clinicSubmit color="blue" :statement="$t('dashboard.forms.addDoctor.submit')" @click="addDoctor" />
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
      doctorData: {
        phone_number: "",
        passsord:"",
        firstname:"",
        lastname:"",
        country: "",
        category: "",
        subCategory: "",
        picture:"",
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
      firstname:{
          required,
      },
       lastname:{
          required,
      },
      country: {
        required,
      },
      category: {
        required,
      },
      picture:{
        required,
      }

    }
  },
  methods: {
    setPhone(value) {
      this.doctorData.phone_number = value;
      this.$v.doctorData.phone_number.$touch();
    },
     setPassword(value) {
      this.doctorData.password = value;
      this.$v.doctorData.password.$touch();
    },
     setFirstname(value) {
      this.doctorData.firstname = value;
      this.$v.doctorData.firstname.$touch();
    },
      setLastname(value) {
      this.doctorData.lastname = value;
      this.$v.doctorData.lastname.$touch();
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
      this.doctorData.subCategory = value;
    },
      setPicture(value) {
      this.doctorData.picture = value;
      this.$v.doctorData.picture.$touch();
    },
    addDoctor(){
      this.$v.$touch();
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
.submit-div{
  margin-top: 20px;
  height: 40px;
}
</style>