<template>
  <v-container
    class="fill-height pt-10"
    fluid 
    v-if="$store.getters.getUser.name">
    <ProfileInput />
    <UserMatrices />
  </v-container>
</template>

<script>
import ProfileInput from '@/components/Account/ProfileInput'
import UserMatrices from '@/components/Account/UserMatrices'

export default {
  name: 'account',
  components: {
    ProfileInput,
    UserMatrices
  },
  
}
</script>

<style>
#uploadAvatar {
  opacity: 0.5;
  transition: opacity 1s;
}

#uploadAvatar:hover {
  opacity: 1.0;
}
</style>