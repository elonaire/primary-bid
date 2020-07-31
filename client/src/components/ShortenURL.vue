<template>
  <div class="shorten">
    <h1>{{ msg }}</h1>
    <div class="form-container">
      <dynamic-form
        v-on:submit="submitForm($event)"
        :id="testForm.id"
        :fields="testForm.fields"
        @change="valuesChanged($event)"
      />
      <button type="submit" :disabled="!formIsValid" :form="testForm.id">Submit</button>
    </div>

    <div class="shortened-urls">
      <span v-if="statusCode === 0">
        <h3 class="error">Cannot establish a connection to the server. Try again.</h3>
      </span>

      <span v-if="shortenedURL.original">
        <h3>Your URL has been shortened to:</h3>
        <a :href="shortenedURL.original" target="_blank">{{
          shortenedURL.shortened
        }}</a>
      </span>

      <span v-if="urls.length > 0">
        <h4>All shortened URLS:</h4>
        <ul v-for="(url, index) in urls" v-bind:key="index">
          <li>
            <a :href="url.original" target="_blank">{{ url.shortened }}</a>
          </li>
        </ul>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { FormField } from "@asigloo/vue-dynamic-forms";
import Axios from "axios";

interface Response {
  original: string;
  shortened: string;
}

interface FormValue {
  url: string;
}

@Component
export default class ShortenURL extends Vue {
  @Prop() private msg!: string;
  private urls: Response[] = [];
  private shortenedURL: Response = {
    original: "",
    shortened: "",
  };
  private statusCode = 200;
  private formIsValid = false;

  testForm = {
    id: "test-form",
    fields: [
      new FormField({
        type: "text",
        name: "url",
        placeholder: "URL"
      }),
    ],
  };

  valuesChanged(e: FormValue) {
    // console.log('changed', e);
    e.url ? this.formIsValid = true : this.formIsValid = false;
  }

  private async submitForm(e: FormValue) {
    try {
      const response = await Axios({
        method: "post",
        url: `http://localhost:3000/urls/shorten`,
        data: e,
      });

      console.log("data", response.data);
      this.shortenedURL = response.data;
      this.fetchUrls();
    } catch (error) {
      if (!error.response) {
        console.log('Network error', error);
        this.statusCode = 0;
      } else {
        console.log("error", error.response);
      }
    }
  }

  private async fetchUrls() {
    try {
      const response = await Axios({
        method: "get",
        url: `http://localhost:3000/urls/fetch`,
      });

      console.log("data", response.data);
      this.urls = [...response.data];
    } catch (error) {
      if (!error.response) {
        console.log('Network error', error);
        this.statusCode = 0;
      } else {
        console.log("error", error.response);
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.error {
  color: rgb(170, 21, 21);
}

.shorten {
  display: flex;
  flex-direction: column;
}
.form-container {
  display: flex;
  flex-direction: row;
  margin: 2% auto;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
