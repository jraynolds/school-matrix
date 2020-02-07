<template>
  <v-app id="app">
    <v-navigation-drawer
      v-model="showDrawer"
      app
    >
      <Drawer />
    </v-navigation-drawer>

    <Head v-on:expandDrawer="showDrawer = !showDrawer"/>

    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <!-- <v-row>
            <v-col cols=12>
              <Card v-for="professor in professors" 
              :key="professor.id" 
              :matrixable="professor" 
              type="professor"
              :classes="classes" 
              :users="users" />
            </v-col>
        </v-row> -->
        <!-- <v-row
          align="center"
          justify="center"
        >
          <v-col class="text-center">
            <v-tooltip left>
              <template v-slot:activator="{ on }">
                <v-btn
                  :href="source"
                  icon
                  large
                  target="_blank"
                  v-on="on"
                >
                  <v-icon large>mdi-code-tags</v-icon>
                </v-btn>
              </template>
              <span>Source</span>
            </v-tooltip>

            <v-tooltip right>
              <template v-slot:activator="{ on }">
                <v-btn
                  icon
                  large
                  href="https://codepen.io/johnjleider/pen/zgxeLQ"
                  target="_blank"
                  v-on="on"
                >
                  <v-icon large>mdi-codepen</v-icon>
                </v-btn>
              </template>
              <span>Codepen</span>
            </v-tooltip>
          </v-col>
        </v-row> -->
        <v-row>
          <v-col>
            <h1>School Matrix</h1>
            <h2><i>Rate your teachers, classes and schools!</i></h2>
          </v-col>
        </v-row>
        <v-row>
          <v-col>

          </v-col>
          <v-col>
            <h3>Explore 10k+ user-submitted ratings</h3>
            <h4><i>Learn what you can before taking the class!</i></h4>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <h3>Build a model based on what works for you</h3>
            <h4><i>Discover what makes a teacher, class or school a good fit for you!</i></h4>
          </v-col>
          <v-col>

          </v-col>
        </v-row>
        <v-row>
          <v-col>

          </v-col>
          <v-col>
            <h3>Search and compare based on your model</h3>
            <h4><i>Make informed decisions and find your best fits!</i></h4>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <h3>Search for a class, teacher or school!</h3>
          </v-col>
          <v-col>
            <h3>Register an account and start!</h3>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
    <v-footer
      color="indigo"
      app
    >
      <span class="white--text">&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import Head from '@/components/Head'
import Drawer from '@/components/Drawer'
// import Card from '@/components/Card/Card'

export default {
  components: {
    Head,
    Drawer,
    // Card
  },
  data() {
    return {
      showDrawer: false,
      showLogin: false,
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
          img: "https://i.imgur.com/rUltjlQ.png"
        }
      ],
      classes: [
        {
          id: 0,
          title: "AP US History",
          departments: ["History"],
          teachers: [0]
        },
        {
          id: 1,
          title: "Dueling 101",
          departments: ["Social Studies"],
          teachers: [0]
        },
        {
          id: 2,
          title: "Physics 101",
          departments: ["Science", "Physics"],
          teachers: [1]
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
