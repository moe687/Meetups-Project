import Vue from "vue";
import Router from "vue-router";
import Home from "../components/Home";
import Meetups from "../components/Meetup/Meetups.vue";
import CreateMeetup from "../components/Meetup/CreateMeetup.vue";
import Profile from "../components/User/Profile";
import Signup from "../components/User/Signup";
import Signin from "../components/User/Signin";
import Meetup from "../components/Meetup/Meetup.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/meetups",
      name: "Meetups",
      component: Meetups,
    },
    {
      path: "/meetup/new",
      name: "CreateMeetup",
      component: CreateMeetup,
    },
    {
      path: "/meetups/:id",
      props: true,
      name: "Meetup",
      component: Meetup,
    },
    {
      path: "/profile",
      name: "Profile",
      component: Profile,
    },
    {
      path: "/signup",
      name: "Signup",
      component: Signup,
    },
    {
      path: "/signin",
      name: "Signin",
      component: Signin,
    },
  ],

  mode: "history",
});
