<template>
  <div class="showUser-form">
    <div class="showUserForm-content">
        <div class="userData">
      <div class="userImage">
        <img class="userPic" src="http://localhost:5000/images/fawzi.png" />
      </div>
      <div class="userInfo">
        <span class="user_name">Fawzi Essam Abdulfattah</span>
        <div class="section">
               <span style="display:block" class="weight "><i class="icon fas fa-weight"></i> 140 {{$t('dashboard.forms.allUsers.kg')}}</span>
                 <span  style="display:block" class="height"><i class="icon fas fa-ruler-combined"></i> 180 {{$t('dashboard.forms.allUsers.cm')}}</span>
        </div>
         <div class="section">
               <span style="display:block" class="birthdata ">  <i class="icon far fa-calendar-alt"></i> 20/3/1999</span>
                 <span  style="display:block" class="height"><i class="icon fas fa-phone-square-alt"></i> 01090243795</span>
        </div>
          <div class="section">
                <div class="submit-div">
          <clinicSubmit
            color="red"
            :statement="$t('dashboard.forms.allUsers.blockUser')"
            @click="editDoctor"
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

export default {
    components:{
        clinicSubmit,
    }
};
</script>

<style lang="scss" scoped>
.showUserForm-content {
    margin-top: 60px;
  padding: 10px;
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  .userData {
        box-shadow: 0 5px 25px rgba(6, 150, 54, 0.233);
        // box-shadow: 10px 15px 20px  rgba(223, 53, 53, 0.103);
        padding: 30px;
  display: flex;
  flex-flow: row;
  justify-content: space-evenly;
  align-items: center;
width: 50%;
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
    .section{
        width: 100%;
        color: black;
        display: flex;
        justify-content: space-evenly;
        font-size: 20px;
        margin-top: 16px;
        .icon{ 
color: $light-color;
        }
    }
  }
  }
}
.submit-div{
    width:80%
}
</style>