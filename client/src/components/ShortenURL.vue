<template>
  <div class="shorten">
    <h1>{{ msg }}</h1>
    <div class="form-container">
      <dynamic-form
        v-on:submit="submitForm($event)"
        :id="testForm.id"
        :fields="testForm.fields"
      />
      <button type="submit" :form="testForm.id">Submit</button>
    </div>

    <div class="shortened-urls">
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

@Component
export default class ShortenURL extends Vue {
  @Prop() private msg!: string;
  private urls: Response[] = [];
  private shortenedURL: Response = {
    original: "",
    shortened: "",
  };

  testForm = {
    id: "test-form",
    fields: [
      new FormField({
        type: "text",
        name: "url",
        placeholder: "URL",
      }),
    ],
  };

  onCancel() {
    console.log("cancelled");
  }

  private async submitForm(e: Event) {
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
      console.log("error", error.response);
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
      console.log("error", error.response);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.form-label {
  display: inline-block;
  margin-bottom: 0.5rem;
  order: 1;
}

.form-hint {
  font-size: 12px;
}

.form-group {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 1rem;
}
.form-group > div {
  order: 2;
}
.form-group--error .form-label {
  color: #dc3545;
}
.form-group--error .form-control {
  border-color: #dc3545;
  background-color: #fae3e5;
}
.form-group .error {
  font-size: 11px;
  color: #dc3545;
}

.form-control {
  display: block;
  order: 2;
  width: 100%;
  background-color: #fff;
  color: #495057;
  padding: 0.375rem 0.75rem;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  font-size: 1rem;
  font-weight: 400;
  border: 1px solid #e9ecef;
  border-radius: 0.25rem;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
}
.form-control:not(textarea) {
  height: calc(1.5em + 0.75rem + 2px);
}
.form-control::placeholder {
  color: #e9ecef;
  opacity: 1;
}
.form-control:disabled,
.form-control[readonly] {
  background-color: #e9ecef;
  opacity: 1;
}
.form-control:focus {
  color: #495057;
  background-color: #fff;
  border-color: #d0dfef;
  outline: 0;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
    inset 0 1px 1px rgba(0, 0, 0, 0.075);
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
