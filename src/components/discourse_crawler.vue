<template>
  <div id="body" class="dashboard">
    <h1 v-if="showProcess3" id="mainTitle">{{ msg }}</h1>
    <p v-if="showProcess2" id="messageTwo">
      {{ msg2 }}
    </p>
    <p v-if="showProcess" id="messageThree">
      {{ msg3 }}
    </p>

    <input
      v-if="showPassword2"
      id="variableSixInput"
      type="input"
      v-model="userPassword"
      placeholder="PWord"
    /><br />
    <button v-if="showPassword2" id="startButton" @click="checkPassWord">
      Submit
    </button>

    <section v-if="showPassword">
      <p id="results">
        <span id="overallMoralFoundations"></span
        ><span id="overallVariables"></span>
      </p>
      <section v-if="!showProcess2" id="overalExplanation">
        {{ overallOutputExplanation }}
      </section>
      <section v-if="showPrompt">
        <hr class="quantLine" />
        <h2 id="quant">Quantitative Module</h2>
        Priming Text<br />
        <textarea
          rows="4"
          cols="50"
          id="promptInput"
          type="text"
          v-model="promptInput"
          v-if="showPrompt"
          placeholder="Analyze the following text, outputting scores between 1 and 10 for "
        /><br />

        Variables<br />
        <input
          v-if="showPrompt"
          id="variableOneInput"
          type="input"
          v-model="variableOne"
          placeholder="Variable One"
        /><br />

        <input
          v-if="showPrompt"
          id="variableTwoInput"
          type="input"
          v-model="variableTwo"
          placeholder="Variable Two"
        /><br />

        <input
          v-if="showPrompt"
          id="variableThreeInput"
          type="input"
          v-model="variableThree"
          placeholder="Variable Three"
        /><br />

        <input
          v-if="showPrompt"
          id="variableFourInput"
          type="input"
          v-model="variableFour"
          placeholder="Variable Four"
        /><br />

        <input
          v-if="showPrompt"
          id="variableFiveInput"
          type="input"
          v-model="variableFive"
          placeholder="Variable Five"
        /><br />

        <input
          v-if="showPrompt"
          id="variableSixInput"
          type="input"
          v-model="variableSix"
          placeholder="Variable Six"
        /><br /><br />

        <hr class="quantLine" />
        <h2 id="qual">Qualitative Module</h2>
        Prompt<br />
        <textarea
          rows="4"
          cols="50"
          id="promptInput"
          type="text"
          v-model="promptInput2"
          v-if="showPrompt"
          placeholder="Perform sentiment analysis on the following text, outputting scores between 1 and 10 for "
        /><br /><br />
        <hr class="quantLine" />
        <br />
        URL to Crawl<br />
        <input
          v-if="showProcess"
          id="URLInput"
          type="input"
          v-model="urlToScrape"
          placeholder="Enter URL to Crawl"
        />
        <br />

        <input id="fileUpload" v-if="dataInput" type="file" />

        <p></p>
        <button
          v-if="showProcess"
          id="startButton"
          @click="checkForQualQuantSummary"
        >
          Crawl Website</button
        ><br />
        <button v-if="showDataButon" id="startButton" @click="runPromptsOnData">
          Run Prompts on Data
        </button>
      </section>
      <br /><button v-if="!showPrint" id="apiButton" @click="pdfResults">
        Save Results as PDF
      </button>
      <!-- <button @click="renderVisuals">Overall</button> 

   
    <button @click="getEmotionStats">Analyze Emotion</button>
    
    <button @click="returnJSON">Return Usable JSON</button>
    <button @click="renderVisuals">Visualize</button>
 -->

      <p id="terminal"></p>
      <section id="visuals" class="visuals"></section>
      <section id="specificAnalysis"></section>
      <section id="specificAnalysis2"></section>
      <section id="specificAnalysis3"></section>
      <section id="specificAnalysis4"></section>
      <section id="specificAnalysis5"></section>
    </section>
  </div>
</template>

<script>
//import paralleldots from "paralleldots";
import * as rs from "text-readability";
//import * as cheerio from 'cheerio';
import axios from "axios";
import Plotly from "plotly.js-dist";
import dotenv from "dotenv";
//import OpenAI from "openai";
dotenv.config();
export default {
  name: "discourse_crawler",
  props: {},
  data() {
    return {
      msg: "Discourse Crawler",
      msg2: "An AI-powered tool for performing top-level analysis of websites.",
      msg3: "",
      urlToScrape: "https://www.milesccoleman.com/test$",
      pageText: "",
      pageType: "whole",
      one: 0,
      two: 0,
      three: 0,
      four: 0,
      five: 0,
      six: 0,
      showPassword: false,
      password: process.env.VUE_APP_ROOT_PASSWORD,
      showPassword2: true,
      userPassword: "",
      readability: 0,
      loading: true,
      showProcess: true,
      showProcess2: true,
      showProcess3: true,
      showPrompt: true,
      anchorsForCrawl: [],
      secondIteration: false,
      JSON1: null,
      JSON2: null,
      JSON3: null,
      JSON4: null,
      moralFoundationAnalysis: "",
      apiKEY: process.env.VUE_APP_ROOT_API,
      promptInput:
        "Perform sentiment analysis on the following text, outputting scores between 1 and 10 for ",
      promptInput2:
        "Analyze this text to identify which of these five moral foundations that it best represents: care, fairness, loyalty, authority, and purity. Include an explanation. If a moral foundation is not identified in the text do not mention it. Text: ",
      variableOne: "anger",
      variableTwo: "fear",
      variableThree: "happiness",
      variableFour: "surprise",
      variableFive: "sadness",
      variableSix: "disgust",
      unique: [],
      overallSummaryOutput: "",
      overallOutputExplanation: "",
      showPrint: true,
      qualQuantSummary: false,
      dataSet: "",
      JSONHolder: "",
      dataInput: false,
      showDataButon: false,
      delayTime: 1000,
    };
  },

  created: function () {},

  methods: {
    registerVariables: function () {
      this.showPrompt = false;
      const workingUrl = this.urlToScrape;
      if (this.variableOne == "" || this.promptInput2 == "") {
        alert("Please fill out the prompt parameters fully.");
      }
      if (!workingUrl.endsWith("/")) {
        this.urlToScrape = this.urlToScrape + "/";
        console.log("added slash");
      }
    },

    checkPassWord: function () {
      if (this.userPassword == this.password) this.showPassword = true;
      this.showPassword2 = false;
    },

    checkForQualQuantSummary: function () {
      const workingUrl2 = this.urlToScrape;
      console.log(workingUrl2);

      if (workingUrl2 == "data") {
        this.dataInput = true;
        this.showDataButon = true;
        this.delayTime = 660;
      }

      if (workingUrl2 != "data") {
        if (workingUrl2.endsWith("$")) {
          this.qualQuantSummary = true;
          this.urlToScrape = workingUrl2.slice(0, -1);
          console.log("qualquant summary for " + this.urlToScrape);
          this.grabPage();
        } else {
          this.grabPage();
        }
      }
    },

    runPromptsOnData: function () {
      this.registerData();

      setTimeout(() => {
        this.getEmotionStats();
      }, 3000);
    },

    registerData: function () {
      const instance = this;
      var files = document.getElementById("fileUpload").files;
      if (files.length <= 0) {
        return false;
      }

      var fr = new FileReader();

      fr.onload = function (e) {
        var result = JSON.parse(e.target.result);
        instance.dataSet = result;
      };

      fr.readAsText(files.item(0));
    },

    grabPage: function () {
      this.registerVariables();
      this.msg = "Initializing";
      this.msg2 = "";
      this.showProcess = false;
      const url =
        "https://api.allorigins.win/raw?url=" +
        encodeURIComponent(this.urlToScrape); //+"&callback=?";

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

          if (this.secondIteration == false) {
            var anchors = [],
              l = html.links;
            anchors.push(this.urlToScrape);
            const tickerA = html.links.length;
            for (var i = 0; i < l.length; i++) {
              const counterTickerA = i;
              if (html.links[i].href.includes(this.urlToScrape)) {
                if (!html.links[i].href.includes(".pdf" || "%")) {
                  anchors.push(l[i].href);
                }
              }

              if (html.links[i].href.includes(window.location.origin)) {
                if (!html.links[i].href.includes(".pdf" || "%")) {
                  const htmlConstructor =
                    this.urlToScrape +
                    html.links[i].href.replace(
                      window.location.origin + "/",
                      ""
                    );
                  anchors.push(htmlConstructor);
                }
              }
              if (counterTickerA === tickerA - 1) {
                this.pageText = htmlWithoutScripts;
                this.anchorsForCrawl = anchors.filter(function (item, pos) {
                  return anchors.indexOf(item) == pos;
                });

                setTimeout(() => {
                  console.log("Delayed for 3 seconds.");
                  this.grabSubpages();
                }, 3000);
              }
            }
          }
        })
        .catch((errors) => {
          console.log(errors);
          this.msg = errors; // Errors and stuff
        });
    },

    grabSubpages: function () {
      let i,
        len = this.anchorsForCrawl.length;
      console.log(this.anchorsForCrawl);
      const ticker = this.anchorsForCrawl.length;
      const workingAnchorsArray = this.anchorsForCrawl;
      const instance = this;
      for (i = 0; i < len; i++) {
        fire(i);
      }

      function fire(i) {
        setTimeout(function () {
          const usableURL = workingAnchorsArray[i];
          console.log(usableURL);
          const counterTicker = i;

          var url =
            "https://api.allorigins.win/raw?url=" +
            encodeURIComponent(usableURL); //+ "&callback=?";
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
              console.log("Crawling:" + i + " " + usableURL);

              instance.msg = "Crawling";
              const numberA = i + 1;
              instance.msg2 = numberA + ": " + workingAnchorsArray[i];
              var actualText = "";
              const workingActualText = htmlWithoutScripts;
              const workingActualText2 = workingActualText.replace(/"/g, " ");
              const actualText2 = workingActualText2.replace(/'/g, " ");

              if (actualText2.length <= 49999) {
                if (actualText2.endsWith(".")) {
                  actualText = actualText2;
                  console.log("period");
                }

                if (!actualText2.endsWith(".")) {
                  actualText = actualText2 + ".";
                  console.log("no period");
                }
                this.pageType = "whole";
                var div = document.getElementById("specificAnalysis");
                var p = document.createElement("div");
                p.innerHTML =
                  '{"name":' +
                  '"' +
                  usableURL +
                  '"' +
                  "," +
                  '"text":' +
                  '"' +
                  actualText +
                  '"' +
                  "},";
                div.appendChild(p);
              }
              if (actualText2.length >= 49999) {
                if (actualText2.endsWith(".")) {
                  actualText = actualText2.substring(49999, 0);
                  console.log("period");
                }

                if (!actualText2.endsWith(".")) {
                  actualText = actualText2.substring(49999, 0) + ".";
                  console.log("no period");
                }
                this.pageType = "partial";
                var div2 = document.getElementById("specificAnalysis");
                var p2 = document.createElement("div");
                p2.innerHTML =
                  '{"name":' +
                  '"' +
                  usableURL +
                  '"' +
                  "," +
                  '"text":' +
                  '"' +
                  actualText +
                  '"' +
                  "},";
                div2.appendChild(p2);
              }
              if (counterTicker === ticker - 1) {
                setTimeout(() => {
                  console.log("Delayed for 2 seconds.");
                  instance.getEmotionStats();
                }, 3000);
              }
            })
            .catch((errors) => {
              console.log(errors);
              this.msg = errors; // Errors
            });
        }, 3000 * i);
      }
    },

    getEmotionStats: function () {
      if (this.dataInput === false) {
        var workingJSON = document.getElementById("specificAnalysis").innerText;
        const middleJSON = "[" + workingJSON.slice(0, -1) + "]";
        this.JSONHolder = JSON.parse(middleJSON);
      }

      if (this.dataInput === true) {
        this.JSONHolder = this.dataSet;
      }
      const workingJSON1 = this.JSONHolder;
      console.log(workingJSON1.length);
      let i2,
        len2 = workingJSON1.length;
      const ticker2 = workingJSON1.length;
      const instance = this;

      var commaOne = "";
      var commaTwo = "";
      var commaThree = "";
      var commaFour = "";
      var commaFive = "";
      var jsonOne = "";

      //all six variables
      if (
        instance.variableTwo != "" &&
        instance.variableThree != "" &&
        instance.variableFour != "" &&
        instance.variableFive != "" &&
        instance.variableSix != ""
      ) {
        commaOne = ", ";
        commaTwo = ", ";
        commaThree = ", ";
        commaFour = ", ";
        commaFive = ", and ";
        jsonOne =
          '{"' +
          instance.variableOne +
          '": number score,' +
          '"' +
          instance.variableTwo +
          '": number score,' +
          '"' +
          instance.variableThree +
          '": number score,' +
          '"' +
          instance.variableFour +
          '": number score,' +
          '"' +
          instance.variableFive +
          '": number score,' +
          '"' +
          instance.variableSix +
          '": number score}';
      }

      //five variables
      if (
        instance.variableTwo != "" &&
        instance.variableThree != "" &&
        instance.variableFour != "" &&
        instance.variableFive != "" &&
        instance.variableSix == ""
      ) {
        commaOne = ", ";
        commaTwo = ", ";
        commaThree = ", ";
        commaFour = ", and ";
        commaFive = "";
        jsonOne =
          '{"' +
          instance.variableOne +
          '": number score,' +
          '"' +
          instance.variableTwo +
          '": number score,' +
          '"' +
          instance.variableThree +
          '": number score,' +
          '"' +
          instance.variableFour +
          '": number score,' +
          '"' +
          instance.variableFive +
          '": number score}';
      }

      //four variables
      if (
        instance.variableTwo != "" &&
        instance.variableThree != "" &&
        instance.variableFour != "" &&
        instance.variableFive == "" &&
        instance.variableSix == ""
      ) {
        commaOne = ", ";
        commaTwo = ", ";
        commaThree = ", and ";
        commaFour = "";
        commaFive = "";
        jsonOne =
          '{"' +
          instance.variableOne +
          '": number score,' +
          '"' +
          instance.variableTwo +
          '": number score,' +
          '"' +
          instance.variableThree +
          '": number score,' +
          '"' +
          instance.variableFour +
          '": number score}';
      }

      //three variables
      if (
        instance.variableTwo != "" &&
        instance.variableThree != "" &&
        instance.variableFour == "" &&
        instance.variableFive == "" &&
        instance.variableSix == ""
      ) {
        commaOne = ", ";
        commaTwo = ", and ";
        commaThree = "";
        commaFour = "";
        commaFive = "";
        jsonOne =
          '{"' +
          instance.variableOne +
          '": number score,' +
          '"' +
          instance.variableTwo +
          '": number score,' +
          '"' +
          instance.variableThree +
          '": number score}';
      }

      //two variables
      if (
        instance.variableTwo != "" &&
        instance.variableThree == "" &&
        instance.variableFour == "" &&
        instance.variableFive == "" &&
        instance.variableSix == ""
      ) {
        commaOne = " and ";
        commaTwo = "";
        commaThree = "";
        commaFour = "";
        commaFive = "";
        jsonOne =
          '{"' +
          instance.variableOne +
          '": number score,' +
          '"' +
          instance.variableTwo +
          '": number score}';
      }

      //one variable
      if (
        instance.variableTwo == "" &&
        instance.variableThree == "" &&
        instance.variableFour == "" &&
        instance.variableFive == "" &&
        instance.variableSix == ""
      ) {
        commaOne = "";
        commaTwo = "";
        commaThree = "";
        commaFour = "";
        commaFive = "";
        jsonOne = '{"' + instance.variableOne + '": number score}';
      }

      for (i2 = 0; i2 < len2; i2++) {
        fire(i2);
      }

      function fire(i2) {
        setTimeout(function () {
          //const usableText = JSON.stringify(this.JSON1[0].text);
          // const dotenv = require("dotenv");
          // dotenv.config();

          console.log("Analyzing Emotion");

          const usableURL = workingJSON1[i2].name;
          const counterTicker2 = i2;
          const usableText = workingJSON1[i2].text;

          console.log(
            instance.promptInput +
              instance.variableOne +
              commaOne +
              instance.variableTwo +
              commaTwo +
              instance.variableThree +
              commaThree +
              instance.variableFour +
              commaFour +
              instance.variableFive +
              commaFive +
              instance.variableSix +
              ", returning the response in JSON only. Format as" +
              jsonOne +
              ". " +
              "Text: " +
              usableText
          );

          const client = axios.create({
            headers: {
              Authorization: "Bearer " + instance.apiKEY,
            },
          });

          const params = {
            model: "gpt-3.5-turbo-16k",
            messages: [
              {
                role: "user",
                content:
                  instance.promptInput +
                  instance.variableOne +
                  commaOne +
                  instance.variableTwo +
                  commaTwo +
                  instance.variableThree +
                  commaThree +
                  instance.variableFour +
                  commaFour +
                  instance.variableFive +
                  commaFive +
                  instance.variableSix +
                  ", returning the response in JSON only. Format as" +
                  jsonOne +
                  ". " +
                  "Text: " +
                  usableText,
              },
            ],
            temperature: 0,
            max_tokens: 500,
            top_p: 0,
            frequency_penalty: 0,
            presence_penalty: 0,
          };

          client
            .post("https://api.openai.com/v1/chat/completions", params)
            .then((result) => {
              instance.msg = "Running quantitative prompt on:";
              const number = i2 + 1;
              instance.msg2 = number + ": " + usableURL;
              const rawResult = result.data.choices[0].message.content;
              const justTheJSON = rawResult.substring(rawResult.indexOf("{"));
              console.log(i2 + ": " + justTheJSON);

              const emotionResults = JSON.parse(justTheJSON);
              instance.one = emotionResults[instance.variableOne];
              instance.two = emotionResults[instance.variableTwo];
              instance.three = emotionResults[instance.variableThree];
              instance.four = emotionResults[instance.variableFour];
              instance.five = emotionResults[instance.variableFive];
              instance.six = emotionResults[instance.variableSix];

              var div = document.getElementById("specificAnalysis2");
              var p = document.createElement("div");
              p.innerHTML =
                '{"pageType":' +
                '"' +
                instance.pageType +
                '"' +
                "," +
                '"name":' +
                '"' +
                usableURL +
                '"' +
                "," +
                '"text":' +
                '"' +
                usableText +
                '"' +
                "," +
                '"' +
                instance.variableOne +
                '":' +
                instance.one +
                "," +
                '"' +
                instance.variableTwo +
                '":' +
                instance.two +
                "," +
                '"' +
                instance.variableThree +
                '":' +
                instance.three +
                "," +
                '"' +
                instance.variableFour +
                '":' +
                instance.four +
                "," +
                '"' +
                instance.variableFive +
                '":' +
                instance.five +
                "," +
                '"' +
                instance.variableSix +
                '":' +
                instance.six +
                "},";
              div.appendChild(p);
            })
            .catch((error) => {
              console.log(error);
              instance.msg = error;
            });
          if (counterTicker2 === ticker2 - 1) {
            setTimeout(() => {
              console.log("Quant delayed for 3 seconds.");
              instance.getMoralFoundations();
            }, 5000);
          }
        }, instance.delayTime * i2);
      }
    },

    getMoralFoundations: function () {
      var workingJSON = document.getElementById("specificAnalysis2").innerText;
      const middleJSON2 = "[" + workingJSON.slice(0, -1) + "]";
      const workingJSON2 = JSON.parse(middleJSON2);
      let i3,
        len3 = workingJSON2.length;
      const ticker3 = workingJSON2.length;
      const instance = this;

      for (i3 = 0; i3 < len3; i3++) {
        fire(i3);
      }

      function fire(i3) {
        setTimeout(function () {
          console.log("Analyzing moral foundations");

          const usableURL2 = workingJSON2[i3].name;
          const counterTicker3 = i3;
          const uno = workingJSON2[i3][instance.variableOne];
          const dos = workingJSON2[i3][instance.variableTwo];
          const tres = workingJSON2[i3][instance.variableThree];
          const quatro = workingJSON2[i3][instance.variableFour];
          const cinco = workingJSON2[i3][instance.variableFive];
          const seis = workingJSON2[i3][instance.variableSix];
          const usableText2 = workingJSON2[i3].text;
          const client = axios.create({
            headers: {
              Authorization: "Bearer " + instance.apiKEY,
            },
          });

          const params = {
            model: "gpt-3.5-turbo-16k",
            messages: [
              {
                role: "user",
                content: instance.promptInput2 + usableText2,
              },
            ],
            temperature: 0,
            max_tokens: 500,
            top_p: 0,
            frequency_penalty: 0,
            presence_penalty: 0,
          };

          client
            .post("https://api.openai.com/v1/chat/completions", params)
            .then((result) => {
              instance.msg = "Running qualitative prompt on:";
              const number2 = i3 + 1;
              instance.msg2 = number2 + ": " + usableURL2;
              console.log(result.data.choices[0].message.content);
              const moralFoundationResults =
                result.data.choices[0].message.content.replaceAll('"', "");
              instance.moralFoundationAnalysis =
                moralFoundationResults.replaceAll("'", "");

              var div = document.getElementById("specificAnalysis3");
              var p = document.createElement("div");
              p.innerHTML =
                '{"pageType":' +
                '"' +
                instance.pageType +
                '"' +
                "," +
                '"name":' +
                '"' +
                usableURL2 +
                '"' +
                "," +
                '"text":' +
                '"' +
                usableText2 +
                '"' +
                "," +
                '"qualResponse":' +
                '"' +
                instance.moralFoundationAnalysis +
                '"' +
                "," +
                '"' +
                instance.variableOne +
                '":' +
                uno +
                "," +
                '"' +
                instance.variableTwo +
                '":' +
                dos +
                "," +
                '"' +
                instance.variableThree +
                '":' +
                tres +
                "," +
                '"' +
                instance.variableFour +
                '":' +
                quatro +
                "," +
                '"' +
                instance.variableFive +
                '":' +
                cinco +
                "," +
                '"' +
                instance.variableSix +
                '":' +
                seis +
                "},";
              div.appendChild(p);
            })
            .catch((error) => {
              console.log(error);
              this.msg = error;
            });
          if (counterTicker3 === ticker3 - 1) {
            setTimeout(() => {
              console.log("Qual delayed for 5 seconds.");
              instance.returnJSON();
            }, 5000);
          }
        }, instance.delayTime * i3); //timeout
      } //fire
    },

    returnJSON: function () {
      var workingJSON = document.getElementById("specificAnalysis3").innerText;
      var middleJSON = "[" + workingJSON.slice(0, -1) + "]";
      this.JSON3 = middleJSON;
      console.log("JSON2: " + this.JSON3);
      var div = document.getElementById("specificAnalysis4");
      var p = document.createElement("div");
      p.innerHTML = this.JSON3;
      div.appendChild(p);

      setTimeout(() => {
        console.log("Delayed for 1 second.");
        this.renderVisuals();
      }, 2000);
    },

    renderVisuals: function () {
      document.getElementById("visuals").style.display = "block";
      this.msg = "";
      this.msg2 = "";

      var workingJSON = document.getElementById("specificAnalysis4").innerText;
      this.JSON4 = JSON.parse(workingJSON);

      //const usableText = JSON.stringify(this.JSON1[0].text);

      if (this.JSON4 != null) {
        console.log("test");
        var i,
          len = this.JSON4.length;
        for (i = 0; i < len; i++) {
          const usableURL = this.JSON4[i].name;
          const uno = this.JSON4[i][this.variableOne];
          const dos = this.JSON4[i][this.variableTwo];
          const tres = this.JSON4[i][this.variableThree];
          const quatro = this.JSON4[i][this.variableFour];
          const cinco = this.JSON4[i][this.variableFive];
          const seis = this.JSON4[i][this.variableSix];
          const moralAnalysis = this.JSON4[i].qualResponse;

          var div = document.getElementById("visuals");
          var p = document.createElement("div");
          p.innerHTML =
            "<h2>" +
            usableURL +
            "</h2>" +
            "<h3>Qualitative: </h3>" +
            moralAnalysis +
            "<h3>Emotional Analysis: </h3><ul>" +
            "<li>" +
            this.variableOne +
            ": " +
            uno +
            "</li>" +
            "<li>" +
            this.variableTwo +
            ": " +
            dos +
            "</li>" +
            "<li>" +
            this.variableThree +
            ": " +
            tres +
            "</li>" +
            "<li>" +
            this.variableFour +
            ": " +
            quatro +
            "</li>" +
            "<li>" +
            this.variableFive +
            ": " +
            cinco +
            "</li>" +
            "<li>" +
            this.variableSix +
            ": " +
            seis +
            "</li>" +
            "<h3>Whole Or Partial</h3><ul>" +
            "<li>" +
            this.pageType +
            "</li>" +
            "</ul>";
          div.appendChild(p);

          if (i === len - 1) {
            setTimeout(() => {
              console.log("Delayed for 4 seconds.");
              this.msg = "Analysis Complete";
              this.msg2 = "";
              this.renderOverallEmotion();
              if (this.qualQuantSummary == true) {
                this.getOverallMoralFoundationScores();
              }
              if (this.qualQuantSummary == false) {
                this.getOverallQualSummary();
              }
            }, 4000);
          }
        }
      }
    },
    getOverallQualSummary: function () {
      this.showProcess2 = false;
      this.msg = this.urlToScrape;
      var workingJSON = document.getElementById("specificAnalysis4").innerText;
      const test = JSON.parse(workingJSON);
      const instance = this;
      const pageType3 = "overallQual";
      let overallMoralAnalysis = "";

      const e = test.length;
      for (var i = 0; i < e; i++) {
        overallMoralAnalysis = overallMoralAnalysis += test[i].qualResponse; //.substring(0, 70);
        if (i === e - 1) {
          instance.overallSummaryOutput = overallMoralAnalysis;
          if (!instance.overallSummaryOutput.endsWith(".")) {
            instance.overallSummaryOutput = instance.overallSummaryOutput + ".";
          }

          if (instance.overallSummaryOutput.endsWith(".")) {
            instance.overallSummaryOutput = instance.overallSummaryOutput + "";
          }

          const client = axios.create({
            headers: {
              Authorization: "Bearer " + instance.apiKEY,
            },
          });

          const params = {
            model: "gpt-3.5-turbo-16k",
            messages: [
              {
                role: "user",
                content:
                  "Synthesize the following statements into a brief analytic summary about the overall text that those statements are referring to. Statements:" +
                  instance.overallSummaryOutput,
              },
            ],
            temperature: 0,
            max_tokens: 500,
            top_p: 0,
            frequency_penalty: 0,
            presence_penalty: 0,
          };

          client
            .post("https://api.openai.com/v1/chat/completions", params)
            .then((result) => {
              instance.msg = instance.urlToScrape;
              const rawResultA = result.data.choices[0].message.content;
              instance.overallOutputExplanation = rawResultA;
              var div = document.getElementById("specificAnalysis3");
              var p = document.createElement("div");
              p.innerHTML =
                '{"pageType":' +
                '"' +
                pageType3 +
                '"' +
                "," +
                '"name":' +
                '"' +
                instance.urlToScrape +
                '"' +
                "," +
                '"qualResponse":' +
                '"' +
                rawResultA +
                '"' +
                "},";
              div.appendChild(p);

              setTimeout(() => {
                console.log("Delayed for 1 second.");
                this.renderOverallEmotion();
              }, 1000);
            })
            .catch((error) => {
              console.log(error);
              this.msg = error;
            });
        }
      }
    },

    getOverallMoralFoundationScores: function () {
      this.showProcess2 = false;
      this.msg = this.urlToScrape;
      var workingJSON = document.getElementById("specificAnalysis4").innerText;
      const test = JSON.parse(workingJSON);
      const instance = this;
      const pageType3 = "overallCount";
      let overallMoralAnalysis = "";

      const e = test.length;
      for (var i = 0; i < e; i++) {
        overallMoralAnalysis = overallMoralAnalysis += test[i].qualResponse; //.substring(0, 70);
        if (i === e - 1) {
          instance.overallSummaryOutput = overallMoralAnalysis;
          if (!instance.overallSummaryOutput.endsWith(".")) {
            instance.overallSummaryOutput = instance.overallSummaryOutput + ".";
          }

          if (instance.overallSummaryOutput.endsWith(".")) {
            instance.overallSummaryOutput = instance.overallSummaryOutput + "";
          }

          const client = axios.create({
            headers: {
              Authorization: "Bearer " + instance.apiKEY,
            },
          });

          const params = {
            model: "gpt-3.5-turbo-16k",
            messages: [
              {
                role: "user",
                content:
                  'Give me scores between 1 and 100 that indicate the mentions of care, fairness, loyalty, authority, and purity in the following text formatted in JSON as {"care": number score,"fairness": number score,"loyalty": number score,"authority": number score,"purity": number score}. Explain those scores. Text:' +
                  instance.overallSummaryOutput,
              },
            ],
            temperature: 0,
            max_tokens: 500,
            top_p: 0,
            frequency_penalty: 0,
            presence_penalty: 0,
          };

          client
            .post("https://api.openai.com/v1/chat/completions", params)
            .then((result) => {
              instance.msg = instance.urlToScrape;
              const rawResultA = result.data.choices[0].message.content;
              console.log(rawResultA);
              const justTheTextA = rawResultA.substring(
                rawResultA.indexOf("}") + 1
              );
              const justTheJSONA = rawResultA.substring(
                0,
                rawResultA.indexOf("}") + 1
              );
              console.log(justTheTextA + " : " + justTheJSONA);
              const moralResultsA = JSON.parse(justTheJSONA);
              const overallCare = moralResultsA.care;
              const overallFairness = moralResultsA.fairness;
              const overallLoyalty = moralResultsA.loyalty;
              const overallAuthority = moralResultsA.authority;
              const overallPurity = moralResultsA.purity;
              instance.overallOutputExplanation = justTheTextA;
              //const moralFoundationResults3 = justTheTextA;
              // justTheTextA.text.replaceAll('"', "");
              // 					instance.moralFoundationAnalysis = moralFoundationResults3.replaceAll("'", "");
              // 					instance.overallSummaryOutput = instance.moralFoundationAnalysis

              var div = document.getElementById("specificAnalysis3");
              var p = document.createElement("div");
              p.innerHTML =
                '{"pageType":' +
                '"' +
                pageType3 +
                '"' +
                "," +
                '"name":' +
                '"' +
                instance.urlToScrape +
                '"' +
                "," +
                '"overallCare":' +
                overallCare +
                "," +
                '"overallFairness":' +
                overallFairness +
                "," +
                '"overallLoyalty":' +
                overallLoyalty +
                "," +
                '"overallAuthority":' +
                overallAuthority +
                "," +
                '"overallPurity":' +
                overallPurity +
                "," +
                '"qualOverall":' +
                '"' +
                justTheTextA +
                '"' +
                "},";
              div.appendChild(p);

              var data = [
                {
                  x: ["Care", "Fairness", "Loyalty", "Authority", "Purity"],
                  y: [
                    overallCare,
                    overallFairness,
                    overallLoyalty,
                    overallAuthority,
                    overallPurity,
                  ],
                  type: "bar",
                  marker: {
                    color: [
                      "#bf4e30",
                      "#c6ccb2",
                      "#93ff96",
                      "#e5eafa",
                      "#78fecf",
                    ],
                  },
                },
              ];

              var layout = {
                height: 450,
                width: 450,
                showlegend: false,
                paper_bgcolor: "#2b2d42",
                plot_bgcolor: "#2b2d42",
                title: "Moral Foundations",
                font: {
                  family: "Arial, monospace",
                  size: 25,
                  color: "white",
                },
                margin: {
                  l: 50,
                  r: 50,
                  b: 100,
                  t: 100,
                  pad: 4,
                },
              };
              var config = { responsive: true };
              Plotly.newPlot("overallMoralFoundations", data, layout, config);
              setTimeout(() => {
                console.log("Delayed for 1 second.");
                this.renderOverallEmotion();
              }, 1000);
            })
            .catch((error) => {
              console.log(error);
              this.msg = error;
            });
        }
      }
    },

    renderOverallEmotion: function () {
      //var workingJSON =
      //this.JSON4 = JSON.parse(workingJSON);
      var workingJSONB = document.getElementById("specificAnalysis4").innerText;
      const test = JSON.parse(workingJSONB);
      let overallOne = 0;
      let overallTwo = 0;
      let overallThree = 0;
      let overallFour = 0;
      let overallFive = 0;
      let overallSix = 0;
      console.log(test.length);
      const instance = this;
      const e = test.length;
      for (var i = 0; i < e; i++) {
        overallOne = overallOne + test[i][instance.variableOne];
        overallTwo = overallTwo + test[i][instance.variableTwo];
        overallThree = overallThree + test[i][instance.variableThree];
        overallFour = overallFour + test[i][instance.variableFour];
        overallFive = overallFive + test[i][instance.variableFive];
        overallSix = overallSix + test[i][instance.variableSix];
        if (i === e - 1) {
          overallOne = Math.round(overallOne / e) * 10;
          overallTwo = Math.round(overallTwo / e) * 10;
          overallThree = Math.round(overallThree / e) * 10;
          overallFour = Math.round(overallFour / e) * 10;
          overallFive = Math.round(overallFive / e) * 10;
          overallSix = Math.round(overallSix / e) * 10;

          var data = [
            {
              type: "pie",
              values: [
                overallOne,
                overallTwo,
                overallThree,
                overallFour,
                overallFive,
                overallSix,
              ],
              labels: [
                instance.variableOne,
                instance.variableTwo,
                instance.variableThree,
                instance.variableFour,
                instance.variableFive,
                instance.variableSix,
              ],
              textinfo: "label+percent",
              textposition: "outside",
              marker: {
                colors: [
                  "#ff0022",
                  "#ffbc42",
                  "#0496ff",
                  "#694d75",
                  "#1b5299",
                  "#40434e",
                ],
              },
            },
          ];

          var layout = {
            height: 450,
            width: 450,
            showlegend: false,
            paper_bgcolor: "#2b2d42",
            title: "Variables",
            font: {
              family: "Arial, monospace",
              size: 25,
              color: "white",
            },
            margin: {
              l: 50,
              r: 50,
              b: 100,
              t: 100,
              pad: 4,
            },
          };
          var config = { responsive: true };
          Plotly.newPlot("overallVariables", data, layout, config);

          setTimeout(() => {
            console.log("Delayed for 1 second.");
            instance.returnJSONAgain();
          }, 1000);
        }
      }
    },

    returnJSONAgain: function () {
      var workingJSON = document.getElementById("specificAnalysis3").innerText;
      var middleJSON = "[" + workingJSON.slice(0, -1) + "]";
      const middleWorkingJSON = middleJSON;
      console.log("JSON2: " + middleWorkingJSON);
      var div = document.getElementById("specificAnalysis5");
      var p = document.createElement("div");
      p.innerHTML = middleWorkingJSON;
      div.appendChild(p);
      this.showPrint = false;
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

#overallVariables {
  display: inline-block;
}

#overalExplanation {
  color: orange;
  font-size: 25px;
  margin-top: 25px;
  width: 65%;
  display: inline-block;
}

#results {
  display: flex;
  margin: auto;
  width: 65%;
}
#overallMoralFoundatations {
  display: inline-block;
  margin: auto;
  display: none;
}

#URLInput {
  width: 50%;
  font-size: 30px;
  text-align: center;
  background-color: #f7ec59;
  color: #252627;
  border: none;
}

#variableOneInput {
  width: 20%;
  font-size: 30px;
  text-align: center;
  background-color: #ff0022;
  color: #252627;
  border: none;
}

#variableTwoInput {
  width: 20%;
  font-size: 30px;
  text-align: center;
  background-color: #ffbc42;
  color: #252627;
  border: none;
}

#variableThreeInput {
  width: 20%;
  font-size: 30px;
  text-align: center;
  background-color: #0496ff;
  color: #252627;
  border: none;
}

#variableFourInput {
  width: 20%;
  font-size: 30px;
  text-align: center;
  background-color: #694d75;
  color: #252627;
  border: none;
}

#variableFiveInput {
  width: 20%;
  font-size: 30px;
  text-align: center;
  background-color: #1b5299;
  color: #252627;
  border: none;
}

#variableSixInput {
  width: 20%;
  font-size: 30px;
  text-align: center;
  background-color: #40434e;
  color: #252627;
  border: none;
}

#promptInput {
  width: 50%;
  font-size: 20px;
  background-color: hotpink;
  color: #252627;
  border: none;
  white-space: normal;
}

#quant {
  color: hotpink;
}

#quant,
#qual {
  color: orange;
}

.quantLine {
  width: 50%;
}
.input-element {
  font-size: 100px;
  width: 400px;
}
#startButton {
  background: #2f4858;
  font-size: 30px;
  color: white;
  border: none;
}

#startButton:hover {
  background: purple;
}

#promptButton {
  background: #2f4858;
  font-size: 30px;
  color: white;
  border: none;
}
#promptButton:hover {
  background-color: purple;
}

#apiButton:hover {
  background: purple;
}
.visuals {
  color: #ff66d8;
  border: solid;
  font-size: 20px;
  width: 75%;
  margin: auto;
  padding: 10px;
  display: none;
}

#specificAnalysis {
}
#specificAnalysis2 {
  color: pink;
}
#specificAnalysis3 {
  color: blue;
}
#specificAnalysis5 {
  color: orange;
  font-size: 20px;
}

#specificAnalysis4 {
  color: limegreen;
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
  color: #92dce5;
  font-size: 25px;
}

#messageThree {
  color: white;
  font-size: 25px;
  margin-left: 10%;
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
