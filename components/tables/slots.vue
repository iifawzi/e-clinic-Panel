<template>
  <div class="allSlots-table">
    <div class="editDiv" v-if="showEdit"> 
         <client-only> <editSlot :key="this.updateEditSlot" :slotToEdit="this.slotToEdit" /></client-only>
    </div>
            
      <div class="input-div">
             <div class="slots-title">{{$t('dashboard.tables.slots.title')}}</div>
        <clinicInput class="clinicInput"
          :placeholder="$t('dashboard.tables.slots.searchHolder')"
          @input="setSearch"
          v-model="searchQuery"
          :mutedText="$t('dashboard.tables.slots.search')"
        >
        </clinicInput>
      </div>

<div class="spinner-1" v-if="!slots">
<div class="double-bounce1"></div>
<div class="double-bounce2"></div>
 </div>

    <div class="allSlots-content" v-if="slots">
      <table class="allSlots-content-table">


        <tr class="allSlots-content-table-tr">
          <th class="allSlots-content-table-th">{{$t('dashboard.tables.slots.day')}}</th>
          <th class="allSlots-content-table-th">{{$t('dashboard.tables.slots.start_time')}}</th>
          <th class="allSlots-content-table-th">{{$t('dashboard.tables.slots.slot_time')}}</th>
          <th class="allSlots-content-table-th">{{$t('dashboard.tables.slots.available')}}</th>
          <th v-if="admin.role === 'admin'" class="allSlots-content-table-th">{{$t('dashboard.tables.slots.options')}}</th>
        </tr>
        <tbody v-if="this.searchQuery == ''">
        <tr v-for="slot in slots" :key="slot.slot_id" class="allSlots-content-table-tr">
          <td>{{ $t('dashboard.days.'+$moment(slot.day+ " "+slot.start_time, "ddd HH:mm").parseZone().utcOffset(120).locale("en").format("ddd").toLowerCase())}}</td>


          <td>{{$moment(slot.start_time, "HH:mm").parseZone().utcOffset(120).locale("en").format("HH:mm")}}</td>
          <td>{{slot.slot_time}}</td>
          <td
            :class="slot.available == 1 ? 'green-status' : 'red-status'"
          >{{slot.available == 1 ?  $t('dashboard.tables.slots.active') : $t('dashboard.tables.slots.notActive')}}</td>
          <td v-if="admin.role === 'admin'">
            <div class="allSlots-content-table-tr-options">
                         <i @click="openEdit(slot)" class="fas fa-edit allSlots-content-table-tr-options-edit"></i>

            </div>
          </td>
        </tr>
</tbody>
       <tbody v-else >
           <tr v-for="slot in filteredData" :key="slot.slot_id" class="allSlots-content-table-tr">
          <td>{{ $t('dashboard.days.'+$moment(slot.day+ " "+slot.start_time, "ddd HH:mm").parseZone().utcOffset(120).locale("en").format("ddd").toLowerCase())}}</td>


          <td>{{$moment(slot.start_time, "HH:mm").parseZone().utcOffset(120).locale("en").format("HH:mm")}}</td>
          <td>{{slot.slot_time}}</td>
          <td
            :class="slot.available == 1 ? 'green-status' : 'red-status'"
          >{{slot.available == 1 ?  $t('dashboard.tables.slots.active') : $t('dashboard.tables.slots.notActive')}}</td>
          <td v-if="admin.role === 'admin'">
            <div class="allSlots-content-table-tr-options">
                         <i @click="openEdit(slot)" class="fas fa-edit allSlots-content-table-tr-options-edit"></i>

            </div>
          </td>
        </tr>
</tbody>


      </table>
    </div>
  </div>
</template>

<script>
import clinicInput from "~/components/shared/clinicInput";
import editSlot from "~/components/forms/editSlot"

export default {
      data() {
    return {
    admin :'',
     searchQuery: "",
     filteredData: "",
     slotToEdit:"",
     updateEditSlot:0,
     showEdit:false
    };
  },
    components: {
        clinicInput,
        editSlot
    },
  methods: {
      setSearch(value){
          this.searchQuery = value;
          const searched = this.searchQuery;
          this.filteredData = this.slots.filter(slot=>{
              return (this.$moment(slot.day+ " "+slot.start_time, "ddd HH:mm").parseZone().utcOffset(120).locale("en").format("ddd").toLowerCase().includes(this.forArabicSearch(searched).toLowerCase()))
          });
      },
      forArabicSearch(word){
          let searchWord = ""
          if (word.includes("ثل") || word.includes("tu")){
            searchWord = "tue"
          }else if (word.includes("خم")|| word.includes("th")){
              searchWord = "thu"

          }else if ( word.includes("جم")|| word.includes("fr")){
              searchWord = "fri"

          }else if (word.includes("سب")|| word.includes("sa")){
              searchWord = "sat"

          }else if ( word.includes("حد")|| word.includes("su")){
              searchWord = "sun"

          }else if (word.includes("ني")|| word.includes("mo")){
              searchWord = "mon"
          }else if (word.includes("رب")|| word.includes("we")){
              searchWord = "wed"
          }
          return searchWord;
      },
      openEdit(theSlot){
                  if (theSlot.slot_id == this.slotToEdit.slot_id){
     this.showEdit = false;
            this.slotToEdit = ""
          }else {
          this.showEdit = true;
          this.slotToEdit = theSlot;
          this.updateEditSlot +=1;
          }


      }
  },
  mounted() {
    const id = this.$route.params.doctor_id;
    this.$store.dispatch("controlPanel/slots/getDoctorSlots",id);
    this.admin = this.$store.getters["controlPanel/auth/getAdmin"];
  },
  computed: {
    slots() {
      return this.$store.getters["controlPanel/slots/getSlots"];
    },
    language() {
      return this.$store.getters.getLocale;
    }
  },
};
</script>

<style lang="scss" scoped>
.allSlots-content {
  margin-top: 15px;
  width: 100%;
  height: 100%;
  max-height: 100vh;
  overflow: scroll;
  box-shadow: 0 5px 25px rgba(54, 57, 238, 0.281);
  padding: 20px;
  border-radius: 20px;
  &-table {
    width: 100%;
    text-align: center;

    &-th {
      color: $light-color;
    }
    &-tr {
      height: 50px;
      &-options {
        color: $red;
        display: flex;
        flex-flow: row;
        justify-content: center;
        &-edit {
          color: $green-color;
          cursor: pointer;
        }
      }
      &:hover {
        background-color: rgb(229, 234, 245);
      }
    }
  }
}
.options-delete {
  cursor: pointer;
}
td {
  color: $main-color;
  font-size: 22px;
  font-weight: 400;
}
.green-status {
  color: $green-color;
}
.red-status {
  color: $red;
}
.input-div {
    display: flex;
  flex-flow: row;
  justify-content: space-between;
  margin-top: 40px;
}
.clinicInput {
  width: 300px;
}
.slots-title{
  font-size: 40px;
  text-align: center;
  color: $main-color;
}
</style>