<template>
    <div
      class="layout min-h-full relative pt-20 px-5 sm:p-16 lg:p-28  bg-gradient-to-r from-beige-500 to-beige-100 flex justify-center"
    >
      <img
        class="big-g max-w-none lg:max-w-full sm:w-auto fixed pointer-events-none"
        :src="require('../../assets/Big-G.svg')"
        alt="Letter G"
      />
      <div class="max-w-6xl w-full">
        <slot />
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "Layout",
  };
  </script>
  
  <style lang="scss">
  div.layout {
    .big-g {
      @media (max-width: 768px) {
        top: -40px;
        left: 50%;
        transform: translateX(-40%);
      }
  
      @media (min-width: 768px) {
        bottom: 0;
        right: 0;
      }
    }
  }
  </style>