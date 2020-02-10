<template>
  <v-app id="app">
    <v-navigation-drawer
      v-model="showDrawer"
      app >
      <Drawer />
    </v-navigation-drawer>

    <Head v-on:expandDrawer="showDrawer = !showDrawer" 
      v-on:accountClicked="accountClicked()" />

    <Login :showLogin="showLogin" 
      v-on:hideDialog="showLogin = false" />

    <router-view>
    </router-view>
        
    <v-footer
      color="indigo"
      app >
      <span class="white--text">&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import Head from '@/components/Head'
import Drawer from '@/components/Drawer'
import Login from '@/components/Login'

export default {
  components: {
    Head,
    Drawer,
    Login
  },
  data() {
    return {
      showDrawer: false,
      showLogin: false,
      userLoggedIn: true,
      professors: [
        {
          id: 0,
          name: "Paul Huard",
          matrix: {
            "Instructive": 6,
            "Innovative": 4,
            "Inspirational": 2,
            "Skillful": 5,
            "Strict": 3,
            "Approachable": 1.5,
          },
          disciplines: [
            "History",
            "Geography"
          ],
          classes: [0,1],
          schools: [0],
          img: "https://i.imgur.com/rUltjlQ.png"
        }
      ],
      classes: [
        {
          id: 0,
          title: "AP US History",
          departments: ["History"],
          teachers: [0],
          schools: [0]
        },
        {
          id: 1,
          title: "Dueling 101",
          departments: ["Social Studies"],
          teachers: [0],
          schools: [0]
        },
        {
          id: 2,
          title: "Physics 101",
          departments: ["Science", "Physics"],
          teachers: [1],
          schools: [0]
        }
      ],
      schools: [
        {
          id: 0,
          img: "https://i.imgur.com/rUltjlQ.png", 
          name: "University of Puget Sound",
          matrix: {
            "Instructive": 6,
            "Innovative": 4,
            "Inspirational": 2,
            "Skillful": 5,
            "Strict": 3,
            "Approachable": 1.5,
          },
        }
      ],
      users: [
        {
          id: 0,
          username: "Jasper Raynolds",
          email: "jasperraynolds@gmail.com",
          password: "A)(*DU*AS3sdfd20",
          avatar: "https://i.imgur.com/rUltjlQ.png",
          classes: [
            {
              id: 1,
              taken: "Fall 2019",
              review: {
                writeup: "I hated it.",
                matrix: {
                  "Instructive": 6,
                  "Innovative": 3,
                  "Inspirational": 1,
                  "Skillful": 4,
                  "Strict": 2,
                  "Approachable": 1,
                },
              }
            }
          ],
          teachers: [
            {
              id: 0,
              classes: [0],
              review: {
                writeup: "I hated him.",
                matrix: {
                  "Instructive": 6,
                  "Innovative": 3,
                  "Inspirational": 1,
                  "Skillful": 4,
                  "Strict": 2,
                  "Approachable": 1,
                },
              }
            }
          ]
        },
        {
          id: 1,
          username: "Chanel Feemster",
          email: "cydfeemster@gmail.com",
          password: "#*sjdhka38DOWA",
          avatar: "https://i.imgur.com/rUltjlQ.png",
          classes: [
            {
              id: 1,
              taken: "Fall 2019",
              review: {
                writeup: "I loved it.",
                matrix: {
                  "Instructive": 6,
                  "Innovative": 5,
                  "Inspirational": 3,
                  "Skillful": 6,
                  "Strict": 4,
                  "Approachable": 2,
                },
              }
            }
          ],
          teachers: [
            {
              id: 0,
              classes: [0],
              review: {
                writeup: "I loved him.",
                matrix: {
                  "Instructive": 6,
                  "Innovative": 5,
                  "Inspirational": 3,
                  "Skillful": 6,
                  "Strict": 4,
                  "Approachable": 2,
                },
              }
            }
          ]
        }
      ]
    }
  },
  methods: {
    accountClicked() {
      if (this.userLoggedIn && this.$route.name != 'account') this.$router.push('account');
      else if (this.userLoggedIn) this.$router.go();
      else this.showLogin = true;
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
