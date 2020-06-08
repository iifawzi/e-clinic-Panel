<template>
  <div class="chat-block">
    <div class="info-title">{{$t("dashboard.info.chat")}}</div>

    <div class="chatError" v-if="chatError">
      <notfication color="red" :label="chatError" />
    </div>
    <div class="spinner-1" v-if="!chatMessages" >
    <div class="double-bounce1"></div>
    <div class="double-bounce2"></div>
    </div>

    <div class="chat-content" v-if="chatMessages">
      <div class="messages">
        <div v-for="(msg,idx) in chatMessages" :key="msg.message_id" :class="['msg', msg.sender === 'doctor' ? 'msg-right' : 'msg-left']">
          <div class="msg-content">
            <div v-if="chatMessages[idx].sender != chatMessages[idx-1]" :class="language+ msg.sender === 'doctor' ? '-msgMargin' : '-LeftMsgMargin' +''" class="sender">{{msg.sender_name}}</div>
            <div v-if="msg.type === 'message'" class="TheMessage">{{msg.message}}</div>
            <div v-if="msg.type === 'image'" ><a target="_blank" :href="'https://clinice.herokuapp.com/images/chats/'+msg.message"><img class="TheImage" :src="'https://clinice.herokuapp.com/images/chats/'+msg.message"></a></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import notfication from "~/components/shared/notfication";
export default {
  data() {
    return {};
  },
  components: {
    notfication
  },
  methods: {},
  mounted() {
    const room_id = this.$route.params.room_id;
    console.log(room_id);
    this.$store.dispatch("controlPanel/info/getMessagesData", room_id);
  },
  computed: {
    language() {
      return this.$store.getters.getLocale;
    },
    chatError() {
      return this.$store.getters["controlPanel/info/getMessageError"];
    },
    chatMessages() {
      return this.$store.getters["controlPanel/info/getMessages"];
    }
  }
};
</script>

<style lang="scss" scoped>
.chat-content {
  width: 100%;
  max-height: 70vh;
  overflow: scroll;
  box-shadow: 0 5px 25px rgba(145, 114, 233, 0.281);
  padding: 20px;
  border-radius: 20px;
  .messages {
    display: flex;
    flex-flow: column;
    justify-content: space-evenly;
  }
  .msg {
    margin-top: 20px;
    font-size: 16px;
  }
  .msg-right {
    .msg-content {
      float: right;
      .TheMessage {
            margin-top: 20px;
        color: white;
        padding-top: 6px;
        padding-right: 10px;
        padding-left: 10px;
        width: 100%;
        border-radius: 25px;
        background-color: $light-color;
        text-align: center;
      }
      .TheImage{
          width: 200px;
          height: 200px;
      }
      .sender {
        float: right;
      }
    }
  }
  .msg-left {
    .msg-content {
      float: left;
            .TheMessage {
            margin-top: 20px;
        color: white;
        padding-top: 6px;
        padding-right: 10px;
        padding-left: 10px;
        width: 100%;
        border-radius: 25px;
   background-color: $greyblue;
        text-align: center;
      }
      .TheImage{
          width: 200px;
          height: 200px;
      }
      .sender {
        float: left;
      }
    }
  }
}
.info-title {
  width: 100%;
  font-size: 30px;
  text-align: center;
  color: $black;
}
.chatError {
  margin: 0px 10px;
}
.en-msgMargin {
  margin-right: 15px;
}
.en-LeftMsgMargin {
  margin-left: 15px;
}
</style>