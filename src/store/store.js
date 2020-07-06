import Vue from "vue";
import Vuex from "vuex";
import * as firebase from "firebase";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    meetups: [
      {
        imageUrl:
          "https://upload.wikimedia.org/wikipedia/commons/4/47/New_york_times_square-terabass.jpg",
        id: "afajfjadfaadfa323",
        title: "Meetup in New York",
        date: "2019-07-19",
      },
      {
        imageUrl:
          "https://upload.wikimedia.org/wikipedia/commons/7/7a/Paris_-_Blick_vom_gro%C3%9Fen_Triumphbogen.jpg",
        id: "aadsfhbkhlk1241",
        title: "Meetup in Paris",
        date: "2020-07-19",
      },
    ],
    user: null,
    loading: false,
  },

  mutations: {
    increment(state, payload) {
      state.meetups = payload;
    },

    createMeetup(state, payload) {
      state.meetups.push(payload);
    },

    setSign(state, payload) {
      state.user = payload;
    },

    setLoading(state) {
      state.loading = false;
    },
  },

  actions: {
    increment({ commit }) {
      commit("setLoading", true);
      firebase
        .database()
        .ref("meetups")
        .once("value")
        .then((data) => {
          const meetups = [];
          const obj = data.val();
          for (let key in obj) {
            meetups.push({
              id: key,
              title: obj[key].title,
              description: obj[key].description,
              imageUrl: obj[key].imageUrl,
              location: obj[key].location,
              creatorId: obj[key].creatorId,
            });
          }
          commit("increment", meetups);
          commit("setLoading", false);
        });
    },

    createMeetup({ commit, getters }, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        description: payload.description,
        creatorId: getters.user.id,
      };
      let key;
      let imageUrl;
      firebase
        .database()
        .ref("meetups")
        .push(meetup)
        .then((data) => {
          key = data.key;
          return key;
        })
        .then((key) => {
          const filename = payload.image.name;
          console.log(filename);
          const ext = filename.slice(filename.lastIndexOf("."));
          return firebase
            .storage()
            .ref("meetups/" + key + "." + ext)
            .put(payload.image);
        })
        // .then((fileData) => {
        //   imageUrl = fileData.ref.getDownloadURL().then((firebaseUrl) => {
        //     return firebase
        //       .database()
        //       .ref("meetups")
        //       .child(key)
        //       .update({ imageUrl: firebaseUrl });
        //   });
        // })

        .then(() => {
          commit("createMeetup", {
            ...meetup,
            imageUrl: imageUrl,
            id: key,
          });
        });
    },

    signIn({ commit }, payload) {
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then((fireData) => {
          const userData = {
            id: fireData.uid,
          };
          commit("setSign", userData);
        });
    },
    signUp({ commit }, payload) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then((fireData) => {
          const userData = {
            id: fireData.uid,
          };
          commit("setSign", userData);
        });
    },
    autoLoad({ commit }, payload) {
      commit("setSign", { id: payload.uid, registerdUse: [] });
    },
  },

  getters: {
    sortMeth(state) {
      return state.meetups.sort((a, b) => {
        return a.date > b.date;
      });
    },
    slicedMeth: (state, getters) => {
      return getters.sortMeth.slice(0, 5);
    },

    loadedMeetup(getters) {
      return (meetupId) => {
        return getters.slicedMeth.find((meetup) => {
          return meetup.id === meetupId;
        });
      };
    },

    user(state) {
      return state.user;
    },
  },

  loading(state) {
    return state.loading;
  },
});
