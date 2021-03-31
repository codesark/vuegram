<template>
  <q-layout view="lHh Lpr lFf">
    <q-header bordered class="text-grey-10 bg-white">
      <q-toolbar class="width-constrain">
        <q-btn
          class="large-screen-only"
          flat
          round
          dense
          to="/camera"
          icon="eva-camera-outline"
        />

        <q-separator class="large-screen-only" vertical inset spaced />

        <q-toolbar-title class="font-rochester text-bold">
          Vuegram
        </q-toolbar-title>

        <q-btn
          class="large-screen-only"
          flat
          round
          dense
          to="/"
          icon="eva-home-outline"
        />
      </q-toolbar>
    </q-header>

    <q-footer bordered class="bg-white text-grey-10 small-screen-only">
      <q-tabs indicator-color="transparent">
        <q-route-tab to="/" icon="eva-home-outline" />
        <q-route-tab to="/camera" icon="eva-camera-outline" />
      </q-tabs>
    </q-footer>

    <q-page-container class="bg-grey-2">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "MainLayout"
};
</script>

<style lang="sass">
.q-toolbar__title
  font-size: 30px
  @media (max-width: $breakpoint-xs-max)
    text-align: center
    font-size: 27px
</style>
