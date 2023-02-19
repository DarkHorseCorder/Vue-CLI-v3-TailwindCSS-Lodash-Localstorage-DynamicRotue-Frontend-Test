
<template>
    <p :class="[`body-text text-${size}`, `text-${color}`]"><slot /></p>
  </template>
  
  <script>
  export default {
    name: "Title",
    props: {
      size: {
        type: String,
        default: "md",
      },
      color: {
        type: String,
        default: "black",
      },
    },
  };
  </script>
  
  <style lang="scss">
  .body-text {
      font-family: "Work Sans", Helvetica, Arial, sans-serif;
      font-weight: 400;
  }
  </style>