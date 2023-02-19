<template>
    <div class="grid grid-cols-2 gap-2">
      <!-- use v-if because social icon doesn't change frequently -->
      <a v-if="linkedinUrl" :href="linkedinUrl" target="_blank">
        <img
          :src="require('../../../assets/Linkedin.svg')"
          alt="Linkedin icon"
        />
      </a>
      <a v-if="twitterUrl" :href="twitterUrl" target="_blank">
        <img
          :src="require('../../../assets/Twitter.svg')"
          alt="Twitter icon"
        />
      </a>
    </div>
  </template>
  
  <script>
  export default {
    name: "SocialIcons",
    props: {
      twitterUrl: {
        type: String,
      },
      linkedinUrl: {
        type: String,
      },
    },
  };
  </script>
  
  <style></style>