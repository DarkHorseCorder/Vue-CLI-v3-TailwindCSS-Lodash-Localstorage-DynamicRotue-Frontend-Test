<template>
    <div class="">
      <div class="person" v-if="profile.id">
        <div class="grid lg:grid-cols-3 gap-10 items-end">
          <TitleText size="4xl">{{ profile.name }}</TitleText>
          <TitleText class="hidden lg:block" size="lg" color="gray-500">{{
            profile.role
          }}</TitleText>
          <div class="hidden lg:flex justify-end" v-if="profile.isRequestable">
            <Button v-if="!this.requestState" :onClick="sendFriendRequest">Send Request</Button>
            <Button v-else>Pending</Button>
          </div>
        </div>
        <div class="border-t border-black lg:mt-2 lg:mb-9"></div>
        <TitleText class="block lg:hidden mt-1 mb-4" size="md" color="gray-500">{{
          profile.role
        }}</TitleText>
        <div class="block lg:hidden mb-5">
          <Button v-if="profile.isRequestable" :onClick="sendFriendRequest"
            >Send Request</Button
          >
        </div>
        <div class="lg:text-left lg:grid grid-cols-3 gap-10">
          <img
            :src="profile.profileImage"
            alt="Profile picture"
            class="
            relative
            profile-picture
            block
            w-full object-cover h-96 filter rounded-lg
            max-w-sm
            mx-auto
            lg:mx-0
            mb-10
          "
          />
          <div class="bio-container">
            <div class="lg:grid grid-cols-5 mb-14 text-center lg:text-left">
              <div class="col-span-3">
                <TitleText class="quote inline-block  relative mx-8" size="xl">{{
                  profile.quote
                }}</TitleText>
              </div>
            </div>
            <div class="pb-20">
              <BodyText class="leading-5">
                {{ profile.bio }}
              </BodyText>
            </div>
          </div>
        </div>
      </div>
      <div v-else>Loading...</div>
    </div>
  </template>
  
  <script>
  import { reactive } from "vue";
  import { useRoute } from "vue-router";
  import { ref } from 'vue'
  import BodyText from "../../common/text/BodyText.vue";
  import Button from "../../common/Button.vue";
  import services from "../../../services";
  import TitleText from "../../common/text/TitleText.vue";
  
  export default {
    name: "Person",
    components: {
      BodyText,
      Button,
      TitleText,
    },
    setup: () => {
      const profile = reactive(services.profile.getModel());
      const { id } = useRoute().params;
      const requestState = ref(false)
  
      const loadProfile = async () => {
        try {
          // Implementation is handled by the service
          let data = await services.profile.get(id);
          services.profile.setValues(data, profile);
        } catch (error) {
          alert(
            "Sorry, I could not retrieve the profile information. Try again later or check your connection to the internet."
          );
        }
      };
  
      const sendFriendRequest = async () => {
        try {
          const requestResult = await services.profile.sendFriendRequest("Avramenko Artem", id);
          if(requestResult.records.length > 0)
          requestState.value = true;
        } catch (error) {
          alert(
            "Sorry, I could not send the friend request. Try again later or check your connection to the internet."
          );
          
        }
  
      }
      return {
        requestState,
        profile,
        loadProfile,
        sendFriendRequest,
      };
    },
    mounted() {
      this.loadProfile();
    },
  };
  </script>
  
  <style lang="scss">
  .person {
    .title-row {
      grid-column-start: 1;
      grid-column-end: 4;
    }
  
    .bio-container {
      grid-column-start: 2;
      grid-column-end: 4;
    }
  
    .quote {
      &::before,
      &::after {
        position: absolute;
        z-index: 2;
      }
      &::before {
        content: url("../../../assets/Quote-1.svg");
        left: -30px;
        top: -5px;
      }
      &::after {
        content: url("../../../assets/Quote-2.svg");
        right: -30px;
        bottom: -5px;
      }
    }
  }
  </style>