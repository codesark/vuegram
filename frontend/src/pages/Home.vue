<template>
  <q-page class="q-pa-sm width-constrain">
    <div class="row q-col-gutter-lg">
      <div class="col-12 col-sm-8">
        <q-card v-for="post in posts" :key="post.id" class="card-post q-mb-md">
          <q-item>
            <q-item-section avatar>
              <q-avatar>
                <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-bold">iam_alexa</q-item-label>
              <q-item-label caption>{{ post.location }}</q-item-label>
            </q-item-section>
          </q-item>

          <img class="post-image" :src="post.imageUrl" />

          <q-card-section>
            <div>{{ post.caption }}</div>
            <div class="text-caption text-grey">
              {{ post.date | cleanDate }}
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 col-sm-4 large-screen-only">
        <q-item class="fixed">
          <q-item-section avatar>
            <q-avatar size="48px">
              <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-bold">iam_alexa</q-item-label>
            <q-item-label caption>Patna, India</q-item-label>
          </q-item-section>
        </q-item>
      </div>
    </div>
  </q-page>
</template>

<script>
import { date } from "quasar";
export default {
  name: "HomePage",
  data() {
    return {
      posts: [
        {
          id: 1,
          caption: "Golden Gate Bridge",
          location: "San Francisco, US",
          date: 1617164274936,
          imageUrl: "https://cdn.quasar.dev/img/parallax2.jpg"
        },
        {
          id: 2,
          caption: "Golden Gate Bridge",
          location: "San Francisco, US",
          date: 1617164274936,
          imageUrl: "https://cdn.quasar.dev/img/parallax2.jpg"
        },
        {
          id: 3,
          caption: "Golden Gate Bridge",
          location: "San Francisco, US",
          date: 1617164274936,
          imageUrl: "https://cdn.quasar.dev/img/parallax2.jpg"
        },
        {
          id: 4,
          caption: "Golden Gate Bridge",
          location: "San Francisco, US",
          date: 1617164274936,
          imageUrl: "https://cdn.quasar.dev/img/parallax2.jpg"
        },
        {
          id: 5,
          caption: "Golden Gate Bridge",
          location: "San Francisco, US",
          date: 1617164274936,
          imageUrl: "https://cdn.quasar.dev/img/parallax2.jpg"
        }
      ]
    };
  },
  filters: {
    cleanDate(timeStamp) {
      let formt = date.formatDate(timeStamp, "MMMM D, H:mmA");
      console.log(formt);
      return formt;
    }
  }
};
</script>

<style lang="sass">
.post-image
  min-height: 200px
</style>
