<template>
  <div class="showUser-form">
    <!-- search bar -->
    <div class="search-bar">
      <div class="input-div">
        <clinicInput
          :placeholder="$t('dashboard.forms.allUsers.searchHolder')"
          @input="setSearch"
          v-model="phone_number" 
        >
         <div v-if="$v.phone_number.$dirty">
            <div v-if="!$v.phone_number.required">{{$t('errors.user400')}}</div>
          </div>
        </clinicInput>
      </div>
      <div class="submit-search">
        <clinicSubmit
          color="blue"
          :statement="$t('dashboard.forms.allUsers.submitSearch')"
          @click="getUser"
        />
      </div>
    </div>
    <!--  -->
      <div class="sk-cube-grid" v-if="showProgress">
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
    <div class="showUserForm-content">
      <div v-if="userData" class="userData" :class="userData.blocked  === false ? 'green-shadow' : 'red-shadow'">
        <div class="userImage">
          <img class="userPic" :src="'https://clinice.herokuapp.com/images/'+ userData.picture" />
        </div>
        <div class="userInfo">
          <span class="user_name">{{userData.first_name +" "+ userData.last_name}}</span>
          <div class="section">
            <span style="display:block" class="weight">
              <i class="icon fas fa-weight"></i>
              {{userData.weight}} {{$t('dashboard.forms.allUsers.kg')}}
            </span>
            <span style="display:block" class="height">
              <i class="icon fas fa-ruler-combined"></i>
              {{userData.height}} {{$t('dashboard.forms.allUsers.cm')}}
            </span>
          </div>
          <div class="section">
            <span style="display:block" class="birthdata">
              <i class="icon far fa-calendar-alt"></i>
              {{userData.birth_date}}
            </span>
            <span style="display:block" class="height">
              <i class="icon fas fa-phone-square-alt"></i>
              {{userData.phone_number}}
            </span>
          </div>
          <div class="section">
            <div v-if="admin.role === 'admin'" class="submit-div">
              <clinicSubmit
                :color="userData.blocked === false ? 'red'  : 'green' "
                :statement="userData.blocked === false ? $t('dashboard.forms.allUsers.blockUser')  : $t('dashboard.forms.allUsers.unblockUser')"
                @click="toggleBlock(userData.phone_number)"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="userApps" v-if="userData">
              <div class="userApps-title">{{$t('dashboard.tables.userApps.title')}}</div>
          <userApps :userId="userData.user_id"/>
      </div>

            <div v-if="!error && !userData">
        <span class="no-search">{{$t('dashboard.forms.allUsers.noSearch')}}</span>
      </div>
      <div v-if="error && !userData">
        <span class="error">{{error}}</span>
      </div>
    </div>

  </div>
</template>

<script>
import clinicSubmit from "~/components/shared/clinicSubmit";
import clinicInput from "~/components/shared/clinicInput";
import userApps from "~/components/tables/userApps";
const { required, integer } = require("vuelidate/lib/validators");

export default {
  mounted(){
    this.admin = this.$store.getters["controlPanel/auth/getAdmin"];
  },
  data() {
    return {
      admin:'',
      showProgress: false,
      phone_number: ""
    };
  },
  methods: {
    setSearch(value) {
      this.phone_number = value;
      this.$v.phone_number.$touch();
    },
    getUser() {
           this.showProgress = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
      } else {
        const phone_number = this.phone_number;
        this.$store.dispatch("controlPanel/users/getUser", phone_number);
      }
    },
    toggleBlock(phone_number) {
      this.showProgress = true;
        this.$store.dispatch("controlPanel/users/toggleBlock", phone_number);
    }
  },
  computed: {
    userData() {
      this.showProgress = false;
      return this.$store.getters["controlPanel/users/getUserData"];
    },
    error() {
      this.showProgress = false;
      return this.$store.getters["controlPanel/users/getUserError"];
    }
  },
  validations: {
    phone_number: {
      required,
    }
  },
  components: {
    clinicSubmit,
    clinicInput,
    userApps
  }
};
</script>

<style lang="scss" scoped>
.showUserForm-content {
  margin-top: 60px;
  padding: 10px;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  .userData {
    padding: 30px;
    display: flex;
    flex-flow: row;
    justify-content: space-evenly;
    align-items: center;
    width: 50%;
    border-radius: 15px;
    .userImage {
      .userPic {
        width: 200px;
        height: 200px;
        border-radius: 50%;
      }
    }
    .userInfo {
      width: 100%;
      text-align: center;
      .user_name {
        font-size: 20px;
        font-weight: 600;
        color: $main-color;
      }
      .section {
        width: 100%;
        color: black;
        display: flex;
        justify-content: space-evenly;
        font-size: 20px;
        margin-top: 16px;
        .icon {
          color: $light-color;
        }
      }
    }
  }
  .userApps {
    margin-top: 80px;
    width: 100%;
    &-title{
      width: 100%;
      font-size:40px;
      text-align: center;
      color: $main-color;
    }
  }
}
.submit-div {
  width: 80%;
}
.search-bar {
  margin-top: 30px;
  display: flex;
  flex-flow: row;
  width: 350px;
  align-items: center;
  justify-content: space-between;
}
.input-div {
  width: 200px;
}
.submit-search {
  width: 100px;
}
.no-search {
  color: $green-color;
  font-size: 30px;
}
.error {
  color: $red;
  font-size: 30px;
}
.red-shadow {
    box-shadow: 10px 10px 20px  rgba(233, 51, 51, 0.164);

}
.green-shadow {
    box-shadow: 0 5px 25px rgba(6, 150, 54, 0.233);
}
</style>