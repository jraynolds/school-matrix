<template>
  <v-container
    class="fill-height pt-10"
    fluid>
    <ProfileInput v-if="user" />
    <UserMatrices v-if="user && $store.getters.user.matrices" />
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
	computed: {
		user() {
			return !!this.$store.getters.user;
		}
	}
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