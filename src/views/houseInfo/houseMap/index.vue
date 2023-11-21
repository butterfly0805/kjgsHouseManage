<template>
  <div>
    房产地图
  </div>
</template>

<script>
export default {
  methods: {
    toDetail() {
      this.$router.push({
        path: "/houseInfo/house-map/detail",
      });
    },
  },
};
</script>
