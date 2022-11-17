<script setup lang="ts">
interface Props {
  authorized: boolean
}

const props = defineProps<Props>()
</script>

<template>
  <div class="auth-personal-wrap"
    v-if="!authorized"
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

</template>

<style lang="scss">

</style>
