<template>
    <div class="people-list-item">
      <div class="border-t border-gray-400"></div>
      <div class="xl:grid grid-cols-2 py-16">
        <router-link
          class="people-list-item relative block"
          tag="div"
          :to="{ name: 'profile', params: { id } }"
        >
          <img
            :src="profileImage"
            alt="Profile picture"
            class="profile-picture w-full object-cover h-60 filter rounded-lg"
          />
        <RequestableIcon :isRequestable="isRequestable" class="absolute top-2.5 left-2"/>
        </router-link>
        <div class="xl:grid justify-items-stretch xl:h-60 pt-5 xl:pt-0 xl:px-2.5">
          <div class="overflow-auto overflow-ellipsis">
            <div class="flex justify-between">
              <div>
                <TitleText class="name block" size="lg">{{ name }}</TitleText>
                <TitleText
                  class="job-title block pb-2"
                  color="gray-500"
                  size="sm"
                  >{{ role }}</TitleText
                >
              </div>
              <div class="social flex items-start justify-end pt-2 xl:hidden">
                <SocialIcons
                  :linkedinUrl="linkedinUrl"
                  :twitterUrl="twitterUrl"
                />
              </div>
            </div>
            <BodyText class="description leading-4" size="sm">
              {{ bio }}
            </BodyText>
          </div>
          <div class="social pt-1 hidden xl:flex items-end">
            <SocialIcons :linkedinUrl="linkedinUrl" :twitterUrl="twitterUrl" />
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import BodyText from "../../common/text/BodyText.vue";
  import RequestableIcon from './RequestableIcon.vue';
  import SocialIcons from "./SocialIcons.vue";
  import TitleText from "../../common/text/TitleText.vue";
  
  export default {
    name: "ListItem",
    components: {
      BodyText,
      RequestableIcon,
      SocialIcons,
      TitleText
    },
    props: {
      bio: {
        type: String
      },
      id: {
        type: String
      },
      isRequestable: {
        type: Boolean
      },
      linkedinUrl: {
        type: String
      },
      name: {
        type: String
      },
      profileImage: {
        type: String
      },
      role: {
        type: String
      },
      twitterUrl: {
        type: String
      }
    },
  };
  </script>
  
  <style lang="scss">
  .people-list-item {
    .profile-picture {
      box-shadow: -6px 6px 6px rgba(0, 0, 0, 0.3);
    }
  }
  </style>