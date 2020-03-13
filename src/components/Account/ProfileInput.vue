<template>
  <v-row>
    <v-col class="d-flex align-center flex-grow-0">
      <v-img src="@/assets/placeholderAvatar.png" class="text-bottom align-end" width="200">
        <v-btn id="uploadAvatar" color="primary">Upload Image</v-btn>
      </v-img>
    </v-col>
    <v-col>
      <v-row>
        <v-col sm="5">
          <v-text-field label="name" v-model="name" :loading="name == ''" />
        </v-col>
        <v-col sm="7">
          <v-text-field label="email" 
            v-model="email" 
            :rules="[ rules.email ]" 
            :loading="email == ''" />
        </v-col>
        <v-col sm="8">
          <v-combobox label="school" 
            v-model="school" 
            :loading="school == 'loading...'"
            :items="inputFields.schools" 
            clearable />
        </v-col>
        <v-col sm="4">
        </v-col>
        <v-col sm="4">
          <v-text-field label="new password" 
            v-model="inputFields.passwords.new"
            :rules="[rules.password]" 
            :append-icon="newShowPassword"
            :type="showPasswords.new ? 'text' : 'password'"
            :counter="inputFields.passwords.new.length < 8 ? 8 : false"
            @click:append="showPasswords.new = !showPasswords.new" />
        </v-col>
        <v-slide-x-transition>
          <v-row cols="8" v-show="inputFields.passwords.new.length > 0" >
            <v-col sm="6">
              <v-text-field label="confirm new password" 
                v-model="inputFields.passwords.confirm"
                :rules="[rules.confirmPassword]" 
                :append-icon="confirmShowPassword"
                :type="showPasswords.confirm ? 'text' : 'password'"
                @click:append="showPasswords.confirm = !showPasswords.confirm" />
            </v-col>
            <v-col sm="6">
              <v-text-field label="old password" 
                v-model="inputFields.passwords.old"
                :append-icon="oldShowPassword"
                :type="showPasswords.old ? 'text' : 'password'"
                @click:append="showPasswords.old = !showPasswords.old" />
            </v-col>
          </v-row>
        </v-slide-x-transition>
        <v-col cols="12">
          <v-btn :disabled="!userInfoChanged || updateButton.isDisabled" 
            @click="update()"
            :loading="updateButton.isLoading" >Update</v-btn>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { getSchools } from '@/scripts/dbActions.js'

export default {
  data() {
    let rules = {
      email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || 'Invalid e-mail.';
      },
      password: value => {
        return value.length > 7;
      },
      confirmPassword: value => {
        return value == this.inputFields.passwords.new || 'Must be the same as the first password.';
      }
    };
    return {
      inputFields: {
        name: '',
        email: '',
        school: 'loading...',
        lastTypedSchool: '',
        schools: [],
        passwords: {
          new: '',
          confirm: '',
          old: ''
        },
      },
      showPasswords: {
        new: false,
        confirm: false,
        old: false
      },
      rules: rules,
      updateButton: {
        isLoading: false,
        isDisabled: false
      }
    }
  },
  computed: {
    name: {
      get: function() {
        return this.$store.getters.getUser.name;
      },
      set: function(newVal) {
        this.inputFields.name = newVal;
      }
    },
    email: {
      get: function() {
        return this.$store.getters.getUser.email;
      },
      set: function(newVal) {
        this.inputFields.email = newVal;
      }
    },
    school: {
      get: function() {
        let school = this.$store.getters.getUser.school;
        if (!school) return "";
        if (school.name === "") return "";
        return `${school.name}, ${school.location.city} ${school.location.state.slice(0, 2).toUpperCase()}`;
      },
      set: function(newVal) {
        this.inputFields.school = newVal;
      }
    },
    newShowPassword() {
      if (this.inputFields.passwords.new.length < 1) return '';
      else if(!this.showPasswords.new) return "mdi-eye-off";
      return "mdi-eye";
    },
    confirmShowPassword() {
      if (this.inputFields.passwords.confirm.length < 1) return '';
      else if(!this.showPasswords.confirm) return "mdi-eye-off";
      return "mdi-eye";
    },
    oldShowPassword() {
      if (this.inputFields.passwords.old.length < 1) return '';
      else if(!this.showPasswords.old) return "mdi-eye-off";
      return "mdi-eye";
    },
    userInfoChanged() {
      if (!this.inputFields.name && !this.inputFields.email && !this.inputFields.school) return false;
      if (this.inputFields.email && /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.inputFields.email) == false) return false;
      if ((!this.inputFields.name || this.inputFields.name == this.name) && (!this.inputFields.email || this.inputFields.email == this.email) && (!this.inputFields.school || this.inputFields.school == this.school || this.inputFields.school == 'loading...')) return false;
      return true;
    },
  },
  methods: {
    updateSchools() {
      // eslint-disable-next-line no-console
      console.log(getSchools);
      getSchools(this.inputFields.schools);
    },
    schoolChanged() {
      // eslint-disable-next-line no-console
      console.log("Help");
      this.inputFields.schools.push(this.inputFields.school);
      if (this.lastTypedSchool) this.inputFields.schools = this.inputFields.schools.filter(s => s !== this.inputFields.lastTypedSchool);
      this.inputFields.lastTypedSchool = this.inputFields.school;
    }
  },
  created() {
    this.updateSchools();
  }
}
</script>

<style>

</style>