<script setup lang="ts">
import { reactive, ref } from 'vue'
import userService from '../services/userService'
import accountService from '@/services/accountService'

const authPersonalData = reactive({
  login: '',
  password: ''
})
const authorized = ref(false)
const userAuthData = ref()
const userData = ref()

const auth = async () => {
  const response = await userService.auth({
    body: authPersonalData
  })
  authorized.value = response.success
  userAuthData.value = response.data
}

const getUserData = async () => {
  const user = await accountService.getUserById(userAuthData.value.identity)
  const identity = await accountService.getIdentityById(userAuthData.value.identity)
  const company = await accountService.getCompanyById(identity.data.data.company)
  userData.value = {
    user: user.data.data,
    identity: identity.data.data,
    company: company.data.data
  }
}



</script>

<template>
  <div
    v-if="!authorized"
    class="auth-personal-wrap"
  >
    <div class="auth-personal">
      <!-- No validation! -->
      <el-form
        class="auth-personal__form"
        :model="authPersonalData"
      >
        <el-form-item
          class="auth-personal__form-item"
          prop="login"
          label="Login"
        >
          <el-input v-model="authPersonalData.login" />
        </el-form-item>
        <el-form-item
          prop="password"
          label="Password"
        >
          <el-input
            v-model="authPersonalData.password"
            type="password"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="auth">OK</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
  <div v-else>
    <div class="user-data-wrap">
      <el-button
        v-if="!userData"
        @click="getUserData">
        Get user data
      </el-button>
      <div class="user-data"
           v-if="userData"
      >
        <div class="description-wrap">
          <el-descriptions title="User Info">
            <el-descriptions-item label="">{{userData.user.surname}}</el-descriptions-item>
            <el-descriptions-item label="">{{userData.user.name}}</el-descriptions-item>
            <el-descriptions-item label="">{{userData.user.patronymic}}</el-descriptions-item>
            <el-descriptions-item label="">{{userData.user.phone}}</el-descriptions-item>
          </el-descriptions>
          <el-descriptions title="Company Info">
            <el-descriptions-item label="Компания">{{userData.company.name}}</el-descriptions-item>
          </el-descriptions>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use '../styles/mixins' as *;

.auth-personal-wrap {
  margin: 3rem;
}

.auth-personal {
  font-size: 1rem;
  display: flex;
  @include flexCenter;
  & .el-input {
    width: 13em;
  }
  & .el-form-item__content {
    justify-content: flex-end;
  }
}

.description-wrap {
  width: 20em
}

.user-data-wrap {
  display: flex;
  @include flexCenter;
  margin: 3em;
}
</style>
