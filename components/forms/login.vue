<template>
  <section class="loginForm-component">
    <div class="loginError" v-if="error">
      <notfication color="red" :label="error"/>
    </div>
    <div class="loginForm-content">
      <div class="input-div">
        <clinicInput :placeholder="$t('panel.loginForm.username')" @input="setUsername" v-model="loginData.username"
        >
            <div v-if="$v.loginData.username.$dirty">
              <div v-if="!$v.loginData.username.required">{{$t('errors.username')}}</div>
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
        username: "",
        password: ""
      }
    };
  },
  //   Validations Rules:
  validations: {
      loginData:{
    username: {
      required
    },
    password: {
      required
    }
      }
  },
  methods:{
    //   Validations Rules 
    setUsername(value){
        this.loginData.username = value;
        this.$v.loginData.username.$touch();
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
             this.$store.dispatch('controlPanel/login_admin',this.loginData);
        }
    }
  },
  computed: {
  error(){
   return this.$store.getters['controlPanel/getError'];
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