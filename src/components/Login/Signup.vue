<template>
  <v-card>
    <v-card-text>
      <v-container>
        <v-row class="mt-n6">
          <v-col cols="12" sm="6" md="4">
            <v-text-field label="Name*" 
              required v-model="name" />
          </v-col>
          <v-col cols="12">
            <v-text-field label="Email*" 
              hint="valid .edu domain preferred." 
              persistent-hint 
              required 
              v-model="email" />
          </v-col>
          <v-col cols="12">
            <v-text-field label="Current place of schooling*" 
              required 
              v-model="school" />
          </v-col>
          <v-col cols="12">
            <v-text-field label="Password*" 
              type="password" 
              required 
              v-model="password" />
          </v-col>
          <v-col cols="12">
            <v-text-field label="Confirm password*" 
            type="password" 
            required 
            v-model="passwordConfirm" />
          </v-col>
        </v-row>
      </v-container>
      <small>*indicates required field</small>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" 
        :disabled="!signupValid" 
        @click="userSignup()">Sign Up</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      school: "",
      email: "",
      password: "",
      passwordConfirm: ""
    }
  }
}
</script>

<style>

</style>