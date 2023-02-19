<template>
    <p :class="[`title-text text-${size}`, 'font-bold', `text-${color}`]"><slot /></p>
  </template>
  
  <script>
  export default {
    name: "Title",
    props: {
      size: {
        type: String,
        default: "2xl",
      },
      color: {
        type: String,
        default: "black",
      },
    },
  };
  </script>
  
  <style lang="scss">
  .title-text {
      font-family: "Work Sans", Helvetica, Arial, sans-serif;
      font-weight: 700;
  }
  </style>