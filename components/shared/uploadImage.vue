<template>
  <section class="uploadImage-component">
    <div class="uploadImage-content">
      <div class="image-container">
        <img v-if="imageToShow != ''" class="profile-Image" :src="imageToShow" />
      </div>
      <div class="buttons-container">
        <div class="buttons-noImage">
          <label class="file-select">
            <div v-if="imageToShow == ''" class="select-button">
              <span>{{$t('dashboard.forms.addDoctor.upload')}}</span>
            </div>
            <input type="file" @change="handleFileChange" />
          </label>
        </div>
        <div v-if="imageToShow" class="buttons-image">
          <label class="file-select">
            <div v-if="imageToShow != ''" class="select-button">
              <span>{{$t('dashboard.forms.addDoctor.edit')}}</span>
            </div>
            <input type="file" @change="handleFileChange" />
          </label>
        </div>
      </div>
    </div>
    <span v-if="mutedText != ''" class="info-text">{{mutedText}}</span>
    <div class="error-div">
      <slot />
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      imageToShow: ""
    };
  },
  props: {
    value: {
      type: String,
      default: ""
    },
    mutedText: {
      type: String,
      default: ""
    }
  },
  methods: {
    handleFileChange(e) {
      this.$emit("input", e.target.files[0]);
      this.createImage(e.target.files[0]);
    },
    createImage(file) {
      if (file) {
        var image = new Image();
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = e => {
          this.imageToShow = e.target.result;
        };
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.uploadImage-component {
  width: 100%;
  .uploadImage-content {
    width: 100%;
    .image-container {
      display: flex;
      justify-content: center;
      width: 100%;
      .profile-Image {
        width: 200px;
        height: 200px;
        border-radius: 50%;
      }
    }
    .buttons-container {
      margin-top: 20px;
      .file-select > .select-button {
        cursor: pointer;
        padding: 1rem;

        color: white;
        background-color: #2ea169;

        border-radius: 0.3rem;

        text-align: center;
        font-weight: bold;
      }

      .file-select > input[type="file"] {
        display: none;
      }
    }
  }
}
.error-div {
  align-self: flex-start;
  color: $red;
  font-size: 12px;
  margin: 2px 10px 0px 10px;
}
.info-text {
  color: $greyblue;
  font-size: 12px;
  margin: 2px 10px 0px 10px;
}
</style>