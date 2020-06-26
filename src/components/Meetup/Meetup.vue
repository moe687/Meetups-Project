<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular indeterminate class="primary--text" :width="7" :size="70"></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title v-for="meetup in meetups" :key="meetup">
            <h6 class="primary--text">{{ meetup.title }}</h6>
          </v-card-title>
          <v-card v-bind:src="meetup.imageUrl" height="400px"></v-card>
          <v-card-text>
            <div class="info--text">{{ meetup.location }}</div>
            <div>{{ meetup.description }}</div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="primary">Register</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
export default {
  data() {
    return {
      meetups: []
    };
  },
  props: ["id"],
  methods: {
    meetup() {
      return this.$store.getters.loadedMeetup(this.id).then(data => {
        this.meetups.push(data);
      });
    }
  }
};
</script>
