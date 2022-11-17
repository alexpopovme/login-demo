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
const showRole = ref(false)

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
        <div class="table-wrap">
          <el-table :data="[userData.user]">
            <el-table-column prop="name" label="Имя" />
            <el-table-column prop="patronymic" label="Отчество" />
            <el-table-column prop="surname" label="Фамилия" />
            <el-table-column prop="phone" label="Тел." />
            <el-table-column label="Роль">
              <template #default>
                <span v-if="showRole">{{userData.identity.role}}</span>
                <el-button link type="primary" size="small" @click="showRole = true" v-if="!showRole">Show</el-button>
              </template>
            </el-table-column>
          </el-table>
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

.user-data-wrap {
  display: flex;
  @include flexCenter;
  margin: 3em;
}

.user-data {
  width: 100%;
}

</style>
