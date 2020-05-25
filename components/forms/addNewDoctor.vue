<template>
  <section class="addNewDoctor-form"> 
<div class="sk-cube-grid" v-if="categories == ''">
  <div class="sk-cube sk-cube1"></div>
  <div class="sk-cube sk-cube2"></div>
  <div class="sk-cube sk-cube3"></div>
  <div class="sk-cube sk-cube4"></div>
  <div class="sk-cube sk-cube5"></div>
  <div class="sk-cube sk-cube6"></div>
  <div class="sk-cube sk-cube7"></div>
  <div class="sk-cube sk-cube8"></div>
  <div class="sk-cube sk-cube9"></div>
</div>

    <div class="addNewDoctorForm-content" v-if="categories != ''">
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
            <div v-if="!$v.doctorData.password.minLength">{{$t('errors.minLength')}}</div>
            <div v-if="!$v.doctorData.password.maxLength">{{$t('errors.maxLength')}}</div>
            <div v-if="!$v.doctorData.password.alphaNum">{{$t('errors.alphaNum')}}</div>
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
              value="egypt"
            >{{$t('dashboard.forms.addDoctor.egypt')}}</option>
            <option
              class="en-selectInput-content-option"
              value="saudiarabia"
            >{{$t('dashboard.forms.addDoctor.saudiarabia')}}</option>

            <template v-if="$v.doctorData.country.$dirty" v-slot:errorSlot>
              <div v-if="!$v.doctorData.country.required">{{$t('errors.country')}}</div>
            </template>
          </clinicSelect>
        </div>

        <div class="input-div">
          <clinicSelect @change="setCategory" v-model="doctorData.category_id">
            <option value disabled selected>{{$t('dashboard.forms.addDoctor.category')}}</option>
            
            <option v-for="category in categories" :key="category.category_id"
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
          :placeholder="$t('dashboard.forms.addDoctor.price')"
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
const { required,integer,minLength,maxLength,alphaNum } = require("vuelidate/lib/validators");
export default {
  data() {
    return {
      doctorData: {
        phone_number: "",
        password: "",
        first_name: "",
        last_name: "",
        country: "",
        category_id: "",
        picture: "",
        price:"",
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
      this.doctorData.category_id = value;
      this.$v.doctorData.category_id.$touch();
    },
    setPicture(value) {
      this.doctorData.picture = value;
      this.$v.doctorData.picture.$touch();
    },
     setPrice(value) {
      this.doctorData.price = value;
      this.$v.doctorData.price.$touch();
    },
    addDoctor() {
      this.$v.$touch();
      if (this.$v.$invalid) {
      } else {
        this.$store.dispatch("controlPanel/doctors/add_doctor", this.doctorData);
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
      categories() {
      return this.$store.getters['controlPanel/categories/get_categories'];
      console.log(this.$store.getters['controlPanel/categories/get_categories'])
      console.log("?");
    },
  }, 
  mounted(){
    this.$store.dispatch('controlPanel/categories/getCategories');
     this.$store.commit("controlPanel/doctors/setSuccess","");
     this.$store.commit("controlPanel/doctors/setError","");
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