<template>
  <section class="loginForm-component">
    <div class="loginError" v-if="error">
      <notfication color="red" :label="error"/>
    </div>
    <div class="loginForm-content">
      <div class="input-div">
        <clinicInput :placeholder="$t('panel.loginForm.phone_number')" @input="setPhone_number" v-model="loginData.phone_number"
        >
            <div v-if="$v.loginData.phone_number.$dirty">
              <div v-if="!$v.loginData.phone_number.required">{{$t('errors.phone')}}</div>
            </div>
        </clinicInput>
      </div>
      <div class="input-div">
        <clinicInput :placeholder="$t('panel.loginForm.password')" @input="setPassword" v-model="loginData.password">
               <div v-if="$v.loginData.password.$dirty">
              <div v-if="!$v.loginData.password.required">{{$t('errors.password')}}</div>
            </div>
        </clinicInput>
      </div>
      <div class="submit-div">
        <clinicSubmit color="blue" :statement="$t('panel.loginForm.submit')" @click="submitLogin" />
      </div>
    </div>
  </section>
</template>
<script>
import clinicInput from "~/components/shared/clinicInput";
import clinicSubmit from "~/components/shared/clinicSubmit";
import notfication from "~/components/shared/notfication";
const { required} = require('vuelidate/lib/validators')
export default {
  //
  components: {
    clinicInput,
    clinicSubmit,
    notfication
  },
  //
  data() {
    return {
      loginData: {
        phone_number: "",
        password: ""
      }
    };
  },
  //   Validations Rules:
  validations: {
      loginData:{
    phone_number: {
      required
    },
    password: {
      required
    }
      }
  },
  methods:{
    //   Validations Rules 
    setPhone_number(value){
        this.loginData.phone_number = value;
        this.$v.loginData.phone_number.$touch();
    },
    setPassword(value){
        this.loginData.password = value;
        this.$v.loginData.password.$touch();
    },
    // Submmition Method: 
    submitLogin(){
        this.$v.$touch();
        if (this.$v.$invalid){
        }else {
             this.$store.dispatch('controlPanel/auth/login_admin',this.loginData);
        }
    }
  },
  computed: {
  error(){
   return this.$store.getters['controlPanel/auth/getError'];
  }
},
};
</script>

<style lang="scss" scoped>
.loginForm-component {
  width: 100%;
  .loginForm-content {
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    .input-div {
      width: 100%;
    }
    .submit-div {
      width: 100%;
      margin-top: 10px;
  height: 40px;

    }
    .input-div:not(:first-child) {
      margin-top: 5px;
    }
  }
  .loginError{
    width: 100%;
    margin-bottom: 15px;
  }
}
</style>