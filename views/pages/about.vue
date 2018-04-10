<template>
  <div>
    <p>姓名：{{user.name}}</p>
    <p>性别：{{user.sex}}</p>
    <p>婚姻：{{user.marriage}}</p>
    <p>出生：{{user.birthdate}}</p>
    <p>QQ: {{user.qq}}</p>
    <p>Email: {{user.email}}</p>

    <p>积极生活，热爱前端，喜欢足球运动，偶尔骑骑自行车。</p>
    <p>喜欢游戏，至于多喜欢--高中献给了传奇，大学交给了WOW</p>
    <p>对于dota 英雄联盟 竞技游戏也有一定的功底</p>
    <p>喜欢动漫，偶尔也会画画 ( ^_^ )</p>
    <p>希望认识更多相同爱好的朋友！</p>
    <p>有什么问题可以发邮件或者QQ交流</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: '王明明',
        sex: '男',
        marriage: '已婚',
        birthdate: '1989.12',
        qq: '421543076',
        email: '421543076@qq.com'
      }
    }
  }
}
</script>

<style lang="less">

</style>

