<template>
    <div class="people">
      <TitleText
        class="flex justify-between border-b-2 border-black pb-1 z-10 relative"
        :color = "red"
      >
        <span class="font-bold text-4xl">Meet our friends</span>
        <img :src="require('../../../assets/Small-G.svg')" alt="Small G"
      /></TitleText>
  
      <div
        v-if="people.value.length"
        class="items flex flex-wrap relative"
        style="top: -1px;"
      >
        <ListItem
          class="w-full md:w-1/2 2xl:w-1/3 px-2"
          v-for="person in people.value"
          :bio="person.bio"
          :id="person.id"
          :isRequestable="person.isRequestable"
          :key="person.id"
          :linkedinUrl="person.linkedinUrl"
          :name="person.name"
          :profileImage="person.profileImage"
          :role="person.role"
          :twitterUrl="person.twitterUrl"
        />
      </div>
      <div v-else>
        Loading...
      </div>
    </div>
  </template>
  
  <script>
  import { reactive } from "vue";
  import TitleText from "../../common/text/TitleText.vue";
  import ListItem from "./ListItem.vue";
  import services from "../../../services";
  export default {
    name: "People",
    components: {
      ListItem,
      TitleText,
    },
    setup: () => {
      const people = reactive({ value: [] });
  
      const loadProfiles = async () => {
        try {
          // Implementation is handled by the service
          let profiles = await services.profile.getAll();
          console.log("--------",profiles)
          people.value = profiles;
        } catch (error) {
          alert(
            "Sorry, could not load the profiles. Try again later or check your connection to the internet."
          );
        }
      };
      return {
        people,
        loadProfiles,
      };
    },
    mounted() {
      this.loadProfiles();
    },
  };
  </script>
  
  <style></style>