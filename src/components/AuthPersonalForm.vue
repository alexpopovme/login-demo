<script setup lang="ts">
import { reactive, ref, watch, nextTick } from 'vue'
import userService from '../services/userService'
import accountService from '@/services/accountService'

const baseUrl = ref('http://dev-api.rnsb.ru/')
const authPersonalData = reactive({
  login: '',
  password: ''
})
const authorized = ref(false)
const userAuthData = ref()
const userData = reactive({})
const showRole = ref(false)
const userDataUpload = ref(null)
const avatarImageUrl = ref('--')

const auth = async () => {
  const response = await userService.auth({
    body: authPersonalData
  })
  authorized.value = response.success
  userAuthData.value = response.data
}

const getUserData = async () => {
  const id = userAuthData.value.identity
  const req = [
    ['user', accountService.getUserById(id)],
    ['identity', accountService.getIdentityById(id)],
    ['images', accountService.getUserImagesById(id)]
  ]
  const result = await Promise.all(req.map((item) => item[1]))

  req.forEach((item, idx) => {
    const key = item[0]
    const value = result[idx].data.data
    if (value) {
      userData[key] = value
    }
  })

  const company = await accountService.getCompanyById(userData.identity.company)
  userData.company = company.data.data
  userData.id = id

  await nextTick(() => {
    setAvatarImageUrl()
  })

}

watch(avatarImageUrl, (val) => {
   console.log(val)
})


const uploadUserImage = async () => {
  const formData = new FormData()
  formData.append('object_type', 'account__user')
  formData.append('object_id', userData.id)
  formData.append('title', 'test-img')
  formData.append('file', userDataUpload.value.files[0])
  const result = await accountService.uploadUserImage(formData)
  if (result.data.success) {
    if (!userData.images) {
      userData.images = [result.data.data]
    }else {
      userData.images[0] = result.data.data
    }
  }

  console.log(userData.images[0])

  await nextTick(() => {
    setAvatarImageUrl()
  })
}

const deleteUserImage = async () => {
   const result = await accountService.deleteUserImage(userData.images[0].id)
  avatarImageUrl.value = null
}

const setAvatarImageUrl = () => {
  if (userData.images && userData.images.length) {
    avatarImageUrl.value = `${baseUrl.value}${userData.images[0].thumbnail}`
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
        v-if="!userData.id"
        @click="getUserData">
        Get user data
      </el-button>
      <div class="user-data"
           v-if="userData.id"
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
          <div class="user-data__ava-wrap">
            <div class="user-data__ava">
              <span>Фото</span>
              <el-avatar shape="square" :size="50" :src="avatarImageUrl" />
              <el-link @click="deleteUserImage">Delete</el-link>
            </div>
            <div class="user-data__add-photo" v-if="!avatarImageUrl">
              <input ref="userDataUpload" type="file" @change="uploadUserImage">
            </div>
          </div>
          <div class="user-data__company">
            <h4>Компания</h4>
            <span>{{userData.company?.name}}</span>
          </div>
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
  &__company {
     margin-top: 1em;
  }
  &__ava-wrap {
    padding-top: 1em;
    display: flex;
    align-items: end;
  }
  &__ava {
    width: 4em;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  &__add-photo > div {
    display: flex;
    align-items: end;
  }
}

</style>
