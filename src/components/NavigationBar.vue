<template>
  <header style="background-color: black">
    <nav class="navbar navbar-expand-custom navbar-mainbg">
      <a class="navbar-brand navbar-logo" href="#"
        >Land Aquisition BlockChain</a
      >
      <button
        class="navbar-toggler"
        type="button"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i class="fas fa-bars text-white"></i>
      </button>
      <div
        class="collapse navbar-collapse"
        id="navbarSupportedContent"
        ref="navbarSupportedContent"
      >
        <ul class="navbar-nav ml-auto">
          <div class="hori-selector">
            <div class="left"></div>
            <div class="right"></div>
          </div>
          <li
            v-if="!isAuth"
            class="nav-item"
            @click="isActive = 'Home'"
            :class="{ active: isActive === 'Home' }"
          >
            <router-link class="nav-link" to="/"
              ><i class="fas fa-home"></i>Home</router-link
            >
          </li>
          <li
            v-if="isAuth"
            class="nav-item"
            @click="isActive = 'Dashboard'"
            :class="{ active: isActive === 'Address Book' }"
          >
            <router-link class="nav-link" to="/dashboard"
              ><i class="far fa-address-book"></i>Dashboard</router-link
            >
          </li>
          <li
            v-if="isAuth"
            class="nav-item"
            @click="isActive = 'Components'"
            :class="{ active: isActive === 'Components' }"
          >
            <router-link class="nav-link" to="/blockchain"
              ><i class="fa fa-book"></i>Blockchain</router-link
            >
          </li>
          <li class="nav-item" v-if="isAuth">
            <router-link class="nav-link" to="/wallet"
              ><i class="far fa-calendar-alt"></i>Wallet</router-link
            >
          </li>
          <li class="nav-item" v-if="isAuth">
            <router-link class="nav-link" to="/transaction"
              ><i class="far fa-chart-bar"></i>Transactions</router-link
            >
          </li>
                    <li
            class="nav-item"
            v-if="role === 'government'"
            @click="isActive = 'Create Certificate'"
            :class="{ active: isActive === 'Create Certificate' }"
          >
            <router-link class="nav-link" to="/createCertificate"
              ><i class="fa fa-folder-plus"></i>Create Certificate</router-link
            >
          </li>
          <li
            class="nav-item"
            v-if="!isAuth"
            @click="isActive = 'Create Wallet'"
            :class="{ active: isActive === 'Create Wallet' }"
          >
            <router-link class="nav-link" to="/createwallet"
              ><i class="fa fa-folder-plus"></i>Create Wallet</router-link
            >
          </li>
          <li
            class="nav-item"
            v-if="!isAuth"
            @click="isActive = 'Access Wallet'"
            :class="{ active: isActive === 'Access Wallet' }"
          >
            <router-link class="nav-link" to="/accesswallet"
              ><i class="fa fa-wallet"></i>Access Wallet</router-link
            >
          </li>
          <li class="nav-item" v-if="isAuth">
            <router-link
              class="nav-link"
              @click.prevent="onLogout()"
              to="/login"
              >Close Wallet</router-link
            >
          </li>
          <li class="nav-item" v-if="isAuth">
            <a class="nav-link" to="/about"><i class="far fa-user"></i>{{userName}}</a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import {
  IS_USER_AUTHENTICATE_GETTER,
  LOGOUT_ACTION,
  USER_NAME_GETTER,
  USER_ROLE_GETTER
} from "../store/StoreConstants";
export default {
  computed: {
    ...mapGetters("auth", {
      isAuth: IS_USER_AUTHENTICATE_GETTER,
      role: USER_ROLE_GETTER,
      userName: USER_NAME_GETTER
    }),
  },
  mounted() {
    this.matchHeight();
  },
  data() {
    return {
      isActive: "Home",
      navColor: "transparent",
      height: "100%",
      top: "0",
      left: "0",
      width: "0",
    };
  },
  methods: {
    matchHeight() {
      // var tabsNewAnim = this.$refs.navbarSupportedContent;
      // var selectorNewAnim = tabsNewAnim.getElementsByTagName("li").length;
      // var activeItemNewAnim = tabsNewAnim.querySelector(".active");
      // var activeWidthNewAnimHeight = activeItemNewAnim.clientHeight;
      // var activeWidthNewAnimWidth = activeItemNewAnim.clientWidth;
      // var itemPosNewAnimTop = activeItemNewAnim.clientTop;
      // var itemPosNewAnimLeft = activeItemNewAnim.clientLeft;
      // this.top = itemPosNewAnimTop+"px";
      // this.height = activeWidthNewAnimHeight+"px";
      // this.left = itemPosNewAnimLeft+"px";
      // this.width = activeWidthNewAnimWidth+"px";
      // console.log(this.width);
      // console.log(this.left);
      // console.log(tabsNewAnim);
      // console.log(selectorNewAnim);
      // console.log(activeItemNewAnim);
      // console.log(activeWidthNewAnimHeight);
      // console.log(activeWidthNewAnimWidth);
      // console.log(itemPosNewAnimTop);
      // console.log(itemPosNewAnimLeft);
    },
    toogle(item) {
      if (item == "nav1") {
        this.isItem1Active = !this.isItem1Active;
      }
    },
    ...mapActions("auth", {
      logout: LOGOUT_ACTION,
    }),
    onLogout() {
      this.logout();
      this.$router.replace("/login");
    },
  },
};
</script>

<style scoped>
#navbarSupportedContent ul li a:hover {
  color: green;
  background-color: #ffffff;
  transition: all 0.7s;
}
.active {
  background-color: white;
  border-bottom-left-radius: 2px;
}
.curl {
  border-bottom-left-radius: 2px;
  border-bottom-right-radius: 2px;
}
@import url("https://fonts.googleapis.com/css?family=Roboto");

body {
  font-family: "Roboto", sans-serif;
}
* {
  margin: 0;
  padding: 0;
}
i {
  margin-right: 10px;
}
/*----------bootstrap-navbar-css------------*/
.navbar-logo {
  padding: 15px;
  color: #fff;
}
.navbar-mainbg {
  /* background-color: v-bind('navColor'); */
  background-color: green;
}
#navbarSupportedContent {
  overflow: hidden;
  position: relative;
}
#navbarSupportedContent ul {
  padding: 0px;
  margin: 0px;
}
#navbarSupportedContent ul li a i {
  margin-right: 10px;
}
#navbarSupportedContent li {
  list-style-type: none;
  float: left;
}
#navbarSupportedContent ul li a {
  /* color: rgba(255, 255, 255, 0.5); */
  color: #ffffff;
  text-decoration: none;
  font-size: 15px;
  display: block;
  padding: 20px 20px;
  transition-duration: 0.6s;
  transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
  position: relative;
}
#navbarSupportedContent > ul > li.active > a {
  color: green;
  background-color: transparent;
  transition: all 0.7s;
}
#navbarSupportedContent a:not(:only-child):after {
  content: "\f105";
  position: absolute;
  right: 20px;
  top: 10px;
  font-size: 14px;
  font-family: "Font Awesome 5 Free";
  display: inline-block;
  padding-right: 3px;
  vertical-align: middle;
  font-weight: 900;
  transition: 0.5s;
}
#navbarSupportedContent .active > a:not(:only-child):after {
  transform: rotate(90deg);
}
/* .hori-selector {
  display: inline-block;
  position: absolute;
  height: v-bind('height');
  top: v-bind('top');
  left: v-bind('left');
  width: 115px;
  transition-duration: 0.6s;
  transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
  background-color: #fff;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  margin-top: 10px;
} */
.hori-selector .right,
.hori-selector .left {
  position: absolute;
  width: 25px;
  height: 25px;
  background-color: #fff;
  bottom: 10px;
}
.hori-selector .right {
  right: -25px;
}
.hori-selector .left {
  left: -25px;
}
.hori-selector .right:before,
.hori-selector .left:before {
  content: "";
  position: absolute;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #5161ce;
}
.hori-selector .right:before {
  bottom: 0;
  right: -25px;
}
.hori-selector .left:before {
  bottom: 0;
  left: -25px;
}

@media (min-width: 992px) {
  .navbar-expand-custom {
    -ms-flex-flow: row nowrap;
    flex-flow: row nowrap;
    -ms-flex-pack: start;
    justify-content: flex-start;
  }
  .navbar-expand-custom .navbar-nav {
    -ms-flex-direction: row;
    flex-direction: row;
  }
  .navbar-expand-custom .navbar-toggler {
    display: none;
  }
  .navbar-expand-custom .navbar-collapse {
    display: -ms-flexbox !important;
    display: flex !important;
    -ms-flex-preferred-size: auto;
    flex-basis: auto;
  }
}

@media (max-width: 991px) {
  #navbarSupportedContent ul li a {
    padding: 12px 30px;
  }
  .hori-selector {
    margin-top: 0px;
    margin-left: 10px;
    border-radius: 0;
    border-top-left-radius: 25px;
    border-bottom-left-radius: 25px;
  }
  .hori-selector .left,
  .hori-selector .right {
    right: 10px;
  }
  .hori-selector .left {
    top: -25px;
    left: auto;
  }
  .hori-selector .right {
    bottom: -25px;
  }
  .hori-selector .left:before {
    left: -25px;
    top: -25px;
  }
  .hori-selector .right:before {
    bottom: -25px;
    left: -25px;
  }
}
</style>
