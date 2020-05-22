<template>
    <div v-if="show" @click="hideNotfication" class="notfication-compontnet">
        <div class="notfication-content" :class="color">
            {{label}}
        </div>
    </div>
</template>

<script>
export default {
    data(){
return {
    show: true,
}
    },
    props:{
        label:{
            type: String,
            required:true,
        },
        color:String,
    },
    methods:{
        hideNotfication(){
            this.show = false;
        },
    },
}
</script>
<style lang="scss" scoped>
.notfication-content{
    width: 100%;
    height: 100%;
    border: 1px solid transparent;
    border-radius: 15px;
    color: white;
    padding: 5px;
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
}
.red{
        background-color: $red;
}
.green{
        background-color: $green-color;
}
</style>