<template>
  <div>
    <h1>Quản lý kinh tế - xã hội</h1>

    <span>{{ new Date() | formatDate }}</span>

    <DonViDiaBan />
  </div>
</template>

<script>
import StringFilter from "@/components/Filter/StringFilter";
import DonViDiaBan from "../components/Dialog/Quantri/DonViDiaBan";

export default {
  components: {
    StringFilter,
    DonViDiaBan
  },

  data: () => ({
    tab1: null,
    tab: null,
    text: "Lorem ipsum dolor sit amete et dolore magna aliqua.",
    icons: false,
    centered: false,
    grow: false,
    vertical: true,
    prevIcon: false,
    nextIcon: false,
    right: false,
    tabs: 3
  })
};
</script>