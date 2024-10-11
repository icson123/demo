<template>
  <div class="body-login">
    <el-form v-model="loginForm" class="login-container">
      <h1>欢迎登录</h1>
      <el-form-item>
        <el-input type="input" placeholder="请输入账号" v-model="loginForm.username"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input type="password" placeholder="请输入密码" v-model="loginForm.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="login-btn" @click="handleLogin">登录</el-button>
      </el-form-item>
    </el-form>
    <el-button class="info-btn" plain @click="open">提示账号信息</el-button>
  </div>
</template>

<script setup>
import { reactive, getCurrentInstance } from 'vue'
import { ElMessageBox } from 'element-plus'
import { useAllDataStore } from '@/stores'
import { useRouter } from 'vue-router'
const { proxy } = getCurrentInstance()
const store = useAllDataStore()
const router = useRouter()
const loginForm = reactive({ username: '', password: '' })
// 使用数组来存储多个用户信息
const users = reactive([
  { username: 'admin', password: '123456' },
  { username: 'xiaoxiao', password: '100000' }
])
const handleLogin = async () => {
  const res = await proxy.$api.getMenu(loginForm)
  console.log(res)
  // 拿到菜单以后，在哪里显示
  store.updateMenuList(res.menuList)
  store.state.token = res.token
  store.addMenu(router)
  router.push('/home')
}

const open = async () => {
  const userInfo = users.map(user => `账号: ${user.username}, 密码: ${user.password}`).join('\n')

  try {
    await ElMessageBox.alert(userInfo, '账号信息', {
      confirmButtonText: 'OK'
    })
  } catch (error) {
    if (error === 'cancel') {
      // 用户点击了关闭
      console.log('用户点击了关闭')
    }
  }
}

</script>

<style lang="less" scoped>
.body-login {
  height: 100%;
  width: 100%;
  background-image: url("../assets/images/background.png");
  background-size: 100%;
  overflow: hidden;
}

.login-container {
  width: 390px;
  background-color: #fff;
  border: 1px solid #eaeaea;
  border-radius: 15px;
  padding: 35px 35px 15px 35px;
  box-shadow: 0 0 25px #cacaca;
  margin: 250px auto;

  h1 {
    text-align: center;
    margin-bottom: 20px;
    color: #3b3b3c;
  }


  :deep(.el-form-item__content) {
    justify-content: center;
  }
}

.login-btn {
  background-color: #c3e4fb;
}

.info-btn {
  position: absolute;
  left: 20px;
  bottom: 20px;
}
</style>