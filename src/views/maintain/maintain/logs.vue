<template>
  <div class="app-container">
    <el-steps direction="vertical" :active="0" :space="200">
      <el-step title="2023.08.01">
        <template slot="description">
          <el-row>
            <el-col :span="24">处理时间 : 2023.08.01 12:12:23</el-col>
            <el-col :span="24">处理人 : 王大锤</el-col>
            <el-col :span="24">
              <!-- <image-preview :src="img1" :width="100" :height="100">
              </image-preview> -->
              <div>图片：</div>
              <el-image
                style="width: 100px; height: 100px; margin: 10px 0"
                :src="url"
                :preview-src-list="srcList"
              >
              </el-image>
              <el-image
                style="width: 100px; height: 100px; margin: 10px"
                :src="img2"
                :preview-src-list="srcList"
              >
              </el-image>
            </el-col>
            <el-col :span="24">详细信息 : 房顶修好了一部分</el-col>
          </el-row>
        </template>
      </el-step>
      <el-step title="2023.09.01">
        <template slot="description">
          <el-row>
            <el-col :span="24">处理时间 : 2023.09.01 12:12:23</el-col>
            <el-col :span="24">处理人 : 王大锤</el-col>
            <el-col :span="24">
              <!-- <image-preview :src="img1" :width="100" :height="100">
              </image-preview> -->
              <div>图片：</div>
              <el-image
                style="width: 100px; height: 100px; margin: 10px 0"
                :src="img3"
                :preview-src-list="srcList"
              >
              </el-image>
              <el-image
                style="width: 100px; height: 100px; margin: 10px"
                :src="img2"
                :preview-src-list="srcList"
              >
              </el-image>
            </el-col>
            <el-col :span="24">详细信息 : 房顶修好了一部分</el-col>
          </el-row>
        </template>
      </el-step>
      <el-step title="2023.10.01">
        <template slot="description">
          <el-row>
            <el-col :span="24">处理时间 : 2023.09.01 12:12:23</el-col>
            <el-col :span="24">处理人 : 王大锤</el-col>
            <el-col :span="24">
              <!-- <image-preview :src="img1" :width="100" :height="100">
              </image-preview> -->
              <div>图片：</div>
              <el-image
                style="width: 100px; height: 100px; margin: 10px 0"
                :src="img4"
                :preview-src-list="srcList"
              >
              </el-image>
              <el-image
                style="width: 100px; height: 100px; margin: 10px"
                :src="img5"
                :preview-src-list="srcList"
              >
              </el-image>
            </el-col>
            <el-col :span="24">详细信息 : 房顶修好了一部分</el-col>
          </el-row>
        </template>
      </el-step>
      <el-step title="2023.11.01">
        <template slot="description">
          <el-row>
            <el-col :span="24">处理时间 : 2023.09.01 12:12:23</el-col>
            <el-col :span="24">处理人 : 王大锤</el-col>
            <el-col :span="24">
              <!-- <image-preview :src="img1" :width="100" :height="100">
              </image-preview> -->
              <div>图片：</div>
              <el-image
                style="width: 100px; height: 100px; margin: 10px 0"
                :src="url"
                :preview-src-list="srcList"
              >
              </el-image>
              <el-image
                style="width: 100px; height: 100px; margin: 10px"
                :src="img2"
                :preview-src-list="srcList"
              >
              </el-image>
            </el-col>
            <el-col :span="24">详细信息 : 房顶修好了一部分</el-col>
          </el-row>
        </template>
      </el-step>
    </el-steps>
  </div>
</template>
<script>
import ImagePreview from "@/components/ImagePreview/index";
import img1 from "@/assets/images/1.jpg";
import img2 from "@/assets/images/2.png";
import img3 from "@/assets/images/3.jpg";
import img4 from "@/assets/images/4.jpg";
import img5 from "@/assets/images/5.jpg";
export default {
  name: "MaintainLog",
  components: [ImagePreview],
  data() {
    return {
      img1,
      img2,
      img3,
      img4,
      img5,
      url: img1,
      srcList: [img1, img2, img3, img4, img5],
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.el-col {
  margin: 5px 0;
}
</style>
