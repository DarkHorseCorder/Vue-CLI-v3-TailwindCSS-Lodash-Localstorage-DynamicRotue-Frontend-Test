<template>
    <img :src="src" :alt="alt">
  </template>
  
  <script>
  export default {
      name: 'RequestableIcon',
      props: {
          isRequestable: {
              type: Boolean
          }
      },
      computed: {
          src(){
              return require(`../../../assets/${this.isRequestable ? 'Yes' : 'No'}.svg`)
          },
          alt(){
              return this.isRequestable ? 'Can request friendship' : 'Cannot request friendship'
          }
      }
  }
  </script>
  
  <style>
  
  </style>