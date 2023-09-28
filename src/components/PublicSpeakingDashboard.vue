<template>
  <div id="body" class="dashboard">
    <input
      id="URLInput"
      type="text"
      v-model="urlToScrape"
      placeholder="Enter URL"
    />

    <button @click="grabPage">Crawl</button>
    <button @click="getEmotionStats">Analyze</button>
    <button @click="returnJSON">Return Usable JSON</button>

    <p v-if="!loading" id="loadingContainer">
      Initializing <br /><img
        id="loading"
        src="https://media.giphy.com/media/Ky5F5Rhn1WRVZmvE5W/giphy.gif"
      /><br /><span id="initialMessage"
        >(Make sure your webcam is facing you.)</span
      >
    </p>
    <h1 v-if="showProcess" id="mainTitle">{{ msg }}</h1>
    <p v-if="showProcess" id="messageTwo">
      {{ msg2 }}
    </p>
    <p v-if="showProcess" id="messageThree">
      {{ msg3 }}
    </p>
    <section id="specificAnalysis"></section>
    <section id="specificAnalysis2"></section>

    <section id="specificAnalysis3"></section>
  </div>
</template>

<script>
//import paralleldots from "paralleldots";
import * as rs from "text-readability";
//import * as cheerio from 'cheerio';
import axios from "axios";
//import Plotly from 'plotly.js-dist'
//import OpenAI from "openai";
export default {
  name: "publicSpeakingDashboard",
  props: {},
  data() {
    return {
      msg: "Discourse Crawler",
      msg2: "An AI-powered tool for performing top-level analysis of websites.",
      msg3: "",
      urlToScrape: "https://rhetoricmatters.school.blog/",
      pageText: "",
      anger: 0,
      fear: 0,
      surprise: 0,
      disgust: 0,
      sadness: 0,
      happiness: 0,
      readability: 0,
      loading: true,
      showProcess: true,
      anchorsForCrawl: "",
      secondIteration: false,
      JSON1: null,
      JSON2: "",
    };
  },

  created: function () {},

  methods: {
    grabPage: function () {
      var url =
        "https://api.allorigins.win/raw?url=" +
        encodeURIComponent(this.urlToScrape) +
        "&callback=?";

      axios
        .get(url)
        .then((response) => {
          const data = response.data;
          const data2 = data.replace(/\s+/g, " ").trim();
          const parser = new DOMParser();
          const html = parser.parseFromString(data2, "text/html");
          const workingHTML = html;
          workingHTML
            .querySelectorAll("script, style")
            .forEach((s) => s.remove());
          let htmlWithoutScripts = workingHTML
            .querySelector("body")
            .innerText.trim();
          console.log("Crawling: " + this.urlToScrape);

          if (this.secondIteration == false) {
            var anchors = [],
              l = html.links;
            for (var i = 0; i < l.length; i++) {
              if (html.links[i].href.includes(this.urlToScrape)) {
                anchors.push(l[i].href);
                console.log("Subpage to be crawled: " + html.links[i].href);
              }
            }
            this.anchorsForCrawl = removeDuplicates(anchors);
            var div = document.getElementById("specificAnalysis");
            var p = document.createElement("div");
            p.innerHTML =
              '{"url":' +
              '"' +
              this.urlToScrape +
              '"' +
              "," +
              '"text":' +
              '"' +
              htmlWithoutScripts +
              '"' +
              "},";
            div.appendChild(p);
          }

          function removeDuplicates(anchors) {
            return anchors.filter(
              (item, index) => anchors.indexOf(item) === index
            );
          }

          this.pageText = htmlWithoutScripts;
          this.grabSubpages();
        })
        .catch((errors) => {
          console.log(errors); // Errors
        });
    },

    grabSubpages: function () {
      var i,
        len = this.anchorsForCrawl.length;
      for (i = 0; i < len; i++) {
        const usableURL = this.anchorsForCrawl[i];
        this.msg = "Crawling";
        this.msg2 = usableURL;
        var url =
          "https://api.allorigins.win/raw?url=" +
          encodeURIComponent(this.anchorsForCrawl[i]) +
          "&callback=?";
        axios
          .get(url)
          .then((response) => {
            const data = response.data;
            const data2 = data.replace(/\s+/g, " ").trim();
            const parser = new DOMParser();
            const html = parser.parseFromString(data2, "text/html");
            const workingHTML = html;
            workingHTML
              .querySelectorAll("script, style")
              .forEach((s) => s.remove());
            let htmlWithoutScripts = workingHTML
              .querySelector("body")
              .innerText.trim();
            console.log("Crawling: " + this.urlToScrape);
            this.pageText = htmlWithoutScripts;

            var div = document.getElementById("specificAnalysis");
            var p = document.createElement("div");
            p.innerHTML =
              '{"url":' +
              '"' +
              usableURL +
              '"' +
              "," +
              '"text":' +
              '"' +
              this.pageText +
              '"' +
              "},";
            div.appendChild(p);

            //this.renderData()
          })
          .catch((errors) => {
            console.log(errors); // Errors
          });
      }
    },

    getEmotionStats: function () {
      var workingJSON = document.getElementById("specificAnalysis").innerText;
      const middleJSON = "[" + workingJSON.slice(0, -1) + "]";
      this.JSON1 = JSON.parse(middleJSON);
      //const usableText = JSON.stringify(this.JSON1[0].text);
      // const dotenv = require("dotenv");
      // dotenv.config();

      if (this.JSON1 != null) {
        console.log("test");
        var i,
          len = this.JSON1.length;
        for (i = 0; i < len; i++) {
          const usableURL = this.JSON1[i].url;
          const usableText = this.JSON1[i].text.substring(0, 500);

          const API_KEY = ;
          const client = axios.create({
            headers: {
              Authorization: "Bearer " + API_KEY,
            },
          });

          const params = {
            messages: [
              {
                role: "user",
                content:
                  "Peform sentiment analysis on this text, outputting scores between 1 and 10 for anger, fear, happiness, surprise, sadness, and discust in JSON. " +
                  usableText,
              },
            ],
            model: "gpt-3.5-turbo",
            max_tokens: 500,
            temperature: 0,
          };

          client
            .post("https://api.openai.com/v1/chat/completions", params)
            .then((result) => {
              console.log(result.data.choices[0].message.content);
              const emotionResults = JSON.parse(
                result.data.choices[0].message.content
              );
              this.anger = emotionResults.anger;
              this.fear = emotionResults.fear;
              this.surprise = emotionResults.surprise;
              this.disgust = emotionResults.disgust;
              this.sadness = emotionResults.sadness;
              this.happiness = emotionResults.happiness;

              var div = document.getElementById("specificAnalysis2");
              var p = document.createElement("div");
              p.innerHTML =
                '{"url":' +
                '"' +
                usableURL +
                '"' +
                "," +
                '"text":' +
                '"' +
                usableText +
                '"' +
                "," +
                '"Angry":' +
                this.anger +
                "," +
                '"Fear":' +
                this.fear +
                "," +
                '"Excited":' +
                this.surprise +
                "," +
                '"Bored":' +
                this.disgust +
                "," +
                '"Sad":' +
                this.sadness +
                "," +
                '"Happy":' +
                this.happiness +
                "},";
              div.appendChild(p);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }
    },

    returnJSON: function () {
      var workingJSON = document.getElementById("specificAnalysis2").innerText;
      var middleJSON = "[" + workingJSON.slice(0, -1) + "]";
      this.JSON2 = middleJSON;
      console.log("JSON2: " + this.JSON2);
      var div = document.getElementById("specificAnalysis3");
      var p = document.createElement("div");
      p.innerHTML = this.JSON2;
      div.appendChild(p);
    },
    getReadabilityStats: function () {
      this.readability = rs.gunningFog(this.workingOutput);
      console.log(this.readability + " " + this.workingOutput);
    },

    reset: function () {
      location.reload();
    },

    unhideData: function () {
      document.getElementById("rawData").style.display = "inline-block";
    },

    hideData: function () {
      document.getElementById("rawData").style.display = "none";
    },

    renderData: function () {
      const promise1 = new Promise((resolve, reject) => {
        this.getEmotionStats();
        this.getReadabilityStats();
        resolve("Data rendered!");
        reject("Data render failed");
      });

      promise1.then(() => {
        this.constructJSON();
        this.visualizeData();
        this.resetWorkingOutput();
        console.log("JSON and charts constructed");
      });
    },

    constructJSON: function () {
      this.currentDataObject =
        '{"time":' +
        '"' +
        this.workingTime +
        '"' +
        "," +
        '"wpm":' +
        '"' +
        this.wpm +
        '"' +
        "," +
        '"content":' +
        '"' +
        this.workingOutput +
        '"' +
        "," +
        '"Angry":' +
        this.anger +
        "," +
        '"Fear":' +
        this.fear +
        "," +
        '"Excited":' +
        this.excitement +
        "," +
        '"Bored":' +
        this.boredom +
        "," +
        '"Sad":' +
        this.sadness +
        "," +
        '"Happy":' +
        this.happiness +
        "," +
        '"volume":' +
        this.volumeValue +
        "," +
        '"readability":' +
        this.readability +
        "," +
        '"faceAnger":' +
        this.faceAngry +
        "," +
        '"faceDisgust":' +
        this.faceDisgusted +
        "," +
        '"faceFear":' +
        this.faceFearful +
        "," +
        '"faceHappiness":' +
        this.faceHappy +
        "," +
        '"faceNeutral":' +
        this.faceNeutral +
        "," +
        '"faceSadness":' +
        this.faceSad +
        "," +
        '"faceSurprise":' +
        this.faceSurprised +
        "},";
      var div = document.getElementById("rawData");
      div.innerHTML += this.currentDataObject;
      this.overallDataObject = document.getElementById("rawData").innerHTML;
    },

    pdfResults: function () {
      window.print();
    },
  }, //
}; //
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url("https://fonts.cdnfonts.com/css/lcd");
#textEmotion,
#faceEmotion,
#voiceEmotion,
#wpm {
  display: inline-block;
}

#specificAnalysis {
}
#specificAnalysis2 {
  color: pink;
}
#specificAnalysis3 {
  color: blue;
}
div {
  background-color: none;
  color: #71c68b;
}
.chartWindow {
  position: relative;
  display: inline-block;
  width: 80%;
}
.optionsButton {
  height: 50px;
  width: 75px;
  padding: 12px;
  font-size: 10px;
  margin: 5px;
  border: none;
  font-weight: bold;
  color: black;
  font-family: Arial, sans-serif;
}

.title {
  color: white;
}

#messageTwo {
  color: #f48d79;
  font-size: 25px;
}

#messageThree {
  color: white;
  font-size: 25px;
}

#begin {
  background-color: #c300ff;
  border: none;
  height: 50px;
  width: 100px;
  font-weight: bold;
  color: black;
  font-family: Arial, sans-serif;
  font-size: 20px;
  margin-top: 40px;
  margin-bottom: -20px;
}

#begin:hover {
  background-color: #fdfd96;
}

#start {
  background-color: #cbc3e3;
  border: none;
  height: 50px;
  width: 100px;
  font-weight: bold;
  color: black;
  font-family: Arial, sans-serif;
  font-size: 20px;
  margin: 10px;
}

#start:hover {
  background-color: lightgreen;
}

#stop {
  background-color: #cbc3e3;
  border: none;
  height: 50px;
  width: 100px;
  font-weight: bold;
  color: black;
  font-family: Arial, sans-serif;
  font-size: 20px;
  margin: 10px;
}

#stop:hover {
  background-color: #ff726f;
}

#reset {
  background-color: #cbc3e3;
  border: none;
  height: 50px;
  width: 100px;
  font-weight: bold;
  color: black;
  font-family: Arial, sans-serif;
  font-size: 20px;
  margin: 10px;
}

#reset:hover {
  background-color: lightyellow;
}

#pdf {
  background-color: #c300ff;
  border: none;
  height: 50px;
  width: 100px;
  font-weight: bold;
  color: black;
  font-family: Arial, sans-serif;
  font-size: 20px;
  margin: 10px;
}

#pdf:hover {
  background-color: #00ffc3;
}

#next {
  background-color: #7766c6;
  border: none;
  height: 50px;
  width: 100px;
  font-weight: bold;
  color: black;
  font-family: Arial, sans-serif;
  font-size: 20px;
  margin-top: 40px;
  margin-bottom: -20px;
}

#next:hover {
  background-color: #ffc300;
}

#output {
  margin: auto;
  color: #f48d79;
  background-color: #222831;
  width: 80%;
  text-align: left;
  overflow: auto;
  height: 170px;
  font-size: 25px;
  margin-top: 0px;
  margin-bottom: 0px;
}

#wpmChart {
  overflow: auto;
  width: 80%;
  display: inline-block;
  margin-top: 3px;
  margin-bottom: 0px;
}

#readabilityChart {
  overflow: auto;
  width: 80%;
  display: inline-block;
  margin-top: 3px;
  margin-bottom: 0px;
}

#volumeChart {
  overflow: auto;
  width: 80%;
  display: inline-block;
  margin-top: -3px;
}

#textEmotionChart {
  overflow: auto;
  width: 80%;
  display: inline-block;
  margin-top: -3px;
}

#faceEmotionChart {
  overflow: auto;
  width: 80%;
  display: inline-block;
  margin-top: -3px;
}

#rawData {
  margin: auto;
  color: lawngreen;
  background-color: #222831;
  width: 80%;
  text-align: left;
  overflow: scroll;
  height: 100px;
  font-size: 25px;
  margin: 0px;
}

#dataHideButton {
  margin: auto;
  color: #222831;
  background-color: #222831;
  width: 40%;
  text-align: center;
  height: 30px;
  font-size: 10px;
  margin: 0px;
  border: none;
}

#dataShowButton {
  margin: auto;
  color: #222831;
  background-color: #222831;
  width: 40%;
  text-align: center;
  height: 30px;
  font-size: 10px;
  margin: 0px;
  border: none;
}

h1 {
  font-size: 50px;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0px;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

#talking {
  height: 100px;
  margin-bottom: -20px;
  -webkit-filter: invert(1);
  filter: invert(1);
}

#timer {
  background: #222831;
  color: white;
  font-size: 50px;
  font-family: "LCD", sans-serif;
  height: 100px;
  width: 80%;
  border: none;
  font-weight: bold;
  text-align: center;
  margin-bottom: 0px;
}

#timeHolder {
  background-color: #123b52;
  color: white;
  display: none;
  margin-bottom: 0px;
}

#speakingTime {
  background-color: #00ffc3;
  outline: none;
  scroll-behavior: smooth;
  height: 50px;
  width: 100px;
  font-weight: bold;
  color: black;
  font-family: Arial, sans-serif;
  font-size: 21px;
  margin: 10px;
  text-align: center;
  border: none;
}

#speakingTime:hover {
  background-color: #c300ff;
}

#volume-visualizer-wrapper {
  background-color: #222831;
  margin-top: 0px;
  padding: 0px;
  margin-bottom: 0px;
  width: 80%;
  display: inline-block;
  padding-bottom: 10px;
}

#volume-visualizer {
  --volume: 0%;
  position: relative;
  height: 10px;
  background-color: #222831;
  margin-top: 0px;
  margin-bottom: 0px;
  width: 100%;
  border: none;
  display: inline-block;
}

#volume-visualizer::before {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: var(--volume);
  background-color: #c300ff;
  transition: width 100ms linear;
}
#container {
  height: 200px;
  margin-bottom: 0px;
  display: none;
  margin-top: -100px;
}

.video-container {
  position: relative;
  margin-top: 0px;
  background-color: #222831;
  width: 80%;
  display: inline-block;
}

canvas {
  position: absolute;
  left: 0;
  top: 0px;
}
.result-container {
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.result-container > div {
  font-size: 1.3rem;
  padding: 0.5rem;
  margin: 5px 0;
  color: white;
  text-transform: capitalize;
}

video {
  width: 100%;
  margin-bottom: -150px;
  margin-top: 0px;
}

#loading {
  height: 50px;
}

#loadingContainer {
  color: #fdfd96;
  margin-bottom: 150%;
  font-size: 50px;
}

#initialMessage {
  font-size: 20px;
  color: #c300ff;
}

#footer {
  display: flex;
  position: float;
  bottom: 0;
  margin-top: 27%;
  height: 3rem;
  text-align: left;
}

#bugs {
  color: white;
  font-size: 12px;
}

@page {
  size: A3 landscape;
  counter-increment: page;
  margin: none;
}
</style>
