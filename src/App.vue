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
        <v-row>
            <v-col cols=12>
              <!-- <Matrix :matrixable="prof" /> -->
              <Card :matrixable="pHuard" />
            </v-col>
        </v-row>
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
// import Matrix from '@/components/Matrix/Matrix'
import Card from '@/components/Card/Card'

export default {
  components: {
    Head,
    Drawer,
    // Matrix,
    Card
  },
  data() {
    return {
      showDrawer: false,
      pHuard: {
        type: "professor",
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
        classes: [
          "AP US History",
          "Dueling 101"
        ],
        img: "https://i.imgur.com/rUltjlQ.png"
      }
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
