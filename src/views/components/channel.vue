<template>
  <el-select :value="mychannel" @change="chooseOption" clearable placeholder="请选择活动区域">
    <el-option v-for="(item,index) in channelList" :key="index" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>

<script>
export default {
  data () {
    return {
      channelList: [],
      channelid: ''
    }
  },
  methods: {
    getChannels () {
      this.$http({
        url: '/channels',
        method: 'get'
      }).then(res => {
        this.channelList = res.channels
      })
    },
    chooseOption (value) {
      this.$emit('optionValue', value)
    }
  },
  props: ['mychannel'],
  created () {
    // this.channelid = this.mychannel
    this.getChannels()
  }
}
</script>

<style>
</style>
