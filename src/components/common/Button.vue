<template>
    <button
    class="button inline-flex items-center rounded-full px-5 text-xs border border-black "
    v-bind="$attrs"
    >
    <slot />
    </button>
  </template>
  
  <script>
  export default {
      name: "Button"
  }
  </script>
  
  <style lang="scss">
  .button {
      background-color: #8DCC7B;
      font-weight: 700;
      height: 37px;
  }
  </style>