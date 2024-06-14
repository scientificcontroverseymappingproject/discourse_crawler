<template>
  <div id="body" class="dashboard">
    
    <br /><button v-if="!showPrint" id="startButton" @click="pdfResults">
      Save Results as JSON and PDF
    </button>
    
    

   
  <span v-if="showProcess3" id="mainTitle">{{ msga }}{{ msgb }}</span><img id="logo" v-if="showPassword2" src="logo.svg"><img id="logo2" v-if="showPassword2" src="logo.svg">
    <h1 v-if="showProcess3" >{{ msg7 }}</h1>
    <div v-if="!progress" class="progress">
      <div id="progressColor" class="color"></div>
    </div>
    <div v-if="!pacman" class="pacman">
      <!-- <div class="pacman__eye"></div> -->
      <div class="pacman__mouth"></div>
      <!-- <div class="pacman__food">{{ msg6 }}</div> -->
    </div>

    <p v-if="showProcess2" id="messageTwo">
      {{ msg2 }}
    </p>
    <div v-if="space" id="spacer"> </div>
    <h1 v-if="showProcess3" id="mainTitle2">{{ msg5 }}</h1>
    <div v-if="!loader" class="loader"></div>
    <div v-if="!loader2" class="loader2"></div>
   
    
  
    <p v-if="showTagline" id="messageThree">
      {{ msg3 }}
    </p>
    
    <input
      v-if="showPassword2"
      id="passWordInput"
      type="password"
      v-model="apiKEY"
      placeholder="OpenAI API Key"
    /><br>
    <input
    v-if="showPassword2"
    id="passWordInput"
    type="password"
    v-model="apiKEY2"
    placeholder="Mistral API Key"
    /><br />
    <button v-if="showPassword2" id="startButton" @click="checkPassWord">
      Submit
    </button>

    <section id="overallVariables2" v-if="showPassword">
      
      <section v-if="showPrompt">
        <h2 id="quant">Model Selection</h2>
          <span id="model1">Mistral  </span><label class="switch">
            <input type="checkbox" id="myCheckbox" @change="toggleCheck()" checked>
            <span class="slider round"></span>
          </label><span id="model2">  OpenAI</span><br><br>
          <span id="dropdownWrapper">
            
            <label for="analysisModel" alt="Choose model for analysis module"></label>
            Analysis Model / Summary Model<br>
            <select name="analysisModel" id="analysisModel">
              <option value="gpt-4-turbo">gpt-4-turbo</option>
              <option selected="selected" value="gpt-3.5-turbo">gpt-3.5-turbo</option>
              <option disabled="disabled" value="open-mistral-7b">open-mistral-7b</option>
              <option disabled="disabled" value="mistral-medium-latest">mistral-medium-latest</option>
              <option disabled="disabled" value="mistral-large-latest">mistral-large-latest</option>
            </select>
          </span>
    
          
      
          <span id="dropdownWrapper2">
            
            <label for="summaryModel" alt="Choose model for analysis summary"></label>
            
            <select name="summaryModel" id="summaryModel">
              <option selected="selected" value="gpt-4-turbo">gpt-4-turbo</option>
              <option value="gpt-3.5-turbo">gpt-3.5-turbo</option>
              <option disabled="disabled" value="open-mistral-7b">open-mistral-7b</option>
              <option disabled="disabled" value="mistral-medium-latest">mistral-medium-latest</option>
              <option disabled="disabled" value="mistral-large-latest">mistral-large-latest</option>
            </select>
          </span><br><br>
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
        <h2 id="urlInputHeader">URL Input</h2>
        <span id="urlInputHeaderInstructions" >URL(s) to Crawl</span><br />
        <textarea
          rows="4"
          cols="50"
          v-if="showProcess"
          id="URLInput"
          type="input"
          v-model="urlToScrape"
          placeholder="Enter URL to Crawl"
        />
        <br />

        <input id="fileUpload" v-if="dataInput" type="file" /><br>
        <hr class="quantLine" /><br>
        <p></p>
        <button
          v-if="showProcess"
          id="startButton"
          @click="checkForQualQuantSummary"
        >
          Crawl Website(s)</button
        ><br />
        <button v-if="showDataButon" id="startButton" @click="runPromptsOnData">
          Run Prompts on Data
        </button>
      </section>
      <p id="results">
        <span id="overallMoralFoundations"></span><br />
        <section id="overalExplanation2">
          <h2 v-if="overallQuant">
            Summary of
            <span style="color: hotpink">Quantitative</span>
            Analysis
            
          </h2>
          <span id="overallVariables"></span>
        </section>
        </p>
        <section v-if="!showProcess2" id="overalExplanation">
          <h2>
            Summary of <span style="color: orange">Qualitative</span> Analysis
          </h2>
          {{ overallOutputExplanation }}
        </section>
      <!-- <button @click="renderVisuals">Overall</button> 

   
    <button @click="getEmotionStats">Analyze Emotion</button>
    
    <button @click="returnJSON">Return Usable JSON</button>
    <button @click="renderVisuals">Visualize</button>
 -->



      <p id="terminal"></p>
      <section v-if="!showProcess2">
        <h2 id="overalExplanation3">
          <span style="color: white"
            ><span style="color: rgb(113, 198, 139)">Individual</span> Text
            Summaries</span
          >
        </h2>
        <br />
      </section>
      <section id="visuals" class="visuals"></section>
      
      <br />
      <section id="rawData2"></section>
      <section id="specificAnalysis5"></section><br><br>
      <section v-if="log"><hr><span id="logTitle">Crawl and Analysis Log</span><hr></section><section id="log"><ul id="logItems"></ul></section>
      <section id="specificAnalysis"></section>
      <section id="specificAnalysis2"></section>
      <section id="specificAnalysis3"></section>
      <section id="specificAnalysis4"></section>
     
    </section>
    <a id="downloadAnchorElem" style="display: none"></a>
  </div>
</template>

<script>
//import paralleldots from "paralleldots";
import * as rs from "text-readability";
//import * as cheerio from 'cheerio';
import axios from "axios";
import Plotly from "plotly.js-dist";
//import dotenv from "dotenv";
import robotsParser from 'robots-txt-parser'
//import OpenAI from "openai";
//dotenv.config();
export default {
  name: "discourse_crawler",
  props: {},
  data() {
    return {
      msga: "discourse _ ",
      msgb: "crawler", 
      msg2: "",
      msg3: "An AI-powered tool for performing top-level analysis of websites.",
      msg5: "",
      msg6: "",
      msg7: "", 
      pacman: true,
      progress: true,
      rawData: true,
      loader: true,
      loader2: true,
      overallQuant: false,
      urlToScrape: "https://www.milesccoleman.com/test$",
      urlToScrape2: "", 
      pageText: "",
      pageType: "whole",
      one: 0,
      two: 0,
      three: 0,
      four: 0,
      five: 0,
      six: 0,
      showPassword: false,
      password: "superSecretPassword",
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
      apiKEY: "",
      apiKEY2: "",
      apiURL: "https://api.openai.com/v1/chat/completions",
      apiURL2: "https://api.mistral.ai/v1/chat/completions",
      analysisModel: "gpt-3.5-turbo",
      analysisModel2: "mistral-medium-latest",
      summaryModel: "gpt-4-turbo",
      summaryModel2: "mistral-large-latest",
      promptInput: "Perform sentiment analysis on the following text, outputting scores between 1 and 10 for ",
      promptInput2: "Analyze this text to identify the moral foundations that it represents out of care, fairness, loyalty, authority, and purity. Include an explanation in under 50 words. Include in your response only identified moral foundations. Text: ",
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
      delayTime: 3000,
      mistralDelay: 5000,
      overallNumber: "",
      goAhead: false, 
      robotsDomain: "", 
      robotsDotText: "", 
      proxyRobotsUrl: "", 
      log: false, 
      logContent: "",
      openAI: true, 
      mistral: false, 
      showTagline: true, 
      space: false, 
      noQuantUsed: true, 
      elementInListOfURLs: "", 
      listCount: 0, 
      overallVariableOne: 0,
      overallVariableTwo: 0,
      overallVariableThree: 0,
      overallVariableFour: 0,
      overallVariableFive: 0,
      overallVariableSix: 0

    };
  },

  created: function () {},

  methods: {

    urlListMode: function() {
      this.registerVariables();
      this.msg = "Initializing";
      this.msg2 = "";
      this.showProcess = false;
      const listOfURLs1 = this.urlToScrape
      this.listCount = 0
      if (this.openAI === true) {
        this.logContent = "🌩️ discourse_crawler: model selected: openai: current models in use: " + this.analysisModel + " (quantitative analysis and qualitative analysis);" + this.summaryModel + " (qualitative summary)"
        this.outputToLog()
      }
      if (this.mistral === true) {
        this.logContent = "🌩️ discourse_crawler: model selected: mistral: current models in use: " + this.analysisModel + " (quantitative analysis and qualitative analysis);" + this.summaryModel + " (qualitative summary)"
        this.outputToLog()
      }
     
     if (listOfURLs1.endsWith('\r\n')) {
      const listOfURLs = listOfURLs1.slice(0, -4)
      const listOrURLsStepOne = '"' + listOfURLs.replace(/(\r\n|\r|\n)/g, '"'+ ','+ '"')
      const listOrURLsStepTwo = "[" + listOrURLsStepOne + '"' + "]"
      const listOfURLsStepThree = JSON.parse(listOrURLsStepTwo)
      const listCount = listOfURLsStepThree.length
      console.log(listCount + listOfURLsStepThree)
      listOfURLsStepThree.forEach((element) => this.checkBots2(element, listCount));

        setTimeout(() => {
          console.log(this.anchorsForCrawl)
          this.grabSubpages()
        }, 1000 * listCount);
         

     }
     if (listOfURLs1.endsWith('\r') || listOfURLs1.endsWith('\n')) {
      const listOfURLs = listOfURLs1.slice(0, -2)
      const listOrURLsStepOne = '"' + listOfURLs.replace(/(\r\n|\r|\n)/g, '"'+ ','+ '"')
      const listOrURLsStepTwo = "[" + listOrURLsStepOne + '"' + "]"
      const listOfURLsStepThree = JSON.parse(listOrURLsStepTwo)
      const listCount = listOfURLsStepThree.length
      console.log(listCount + listOfURLsStepThree)
      listOfURLsStepThree.forEach((element) => this.checkBots2(element, listCount));
      
      setTimeout(() => {
          console.log(this.anchorsForCrawl)
          this.grabSubpages()
        }, 1000 * listCount);

    } 

    else {
      const listOfURLs = listOfURLs1
      const listOrURLsStepOne = '"' + listOfURLs.replace(/(\r\n|\r|\n)/g, '"'+ ','+ '"')
      const listOrURLsStepTwo = "[" + listOrURLsStepOne + '"' + "]"
      const listOfURLsStepThree = JSON.parse(listOrURLsStepTwo)
      const listCount = listOfURLsStepThree.length
      console.log(listCount + listOfURLsStepThree)
      listOfURLsStepThree.forEach((element) => this.checkBots2(element, listCount));

      setTimeout(() => {
          console.log(this.anchorsForCrawl)
          this.grabSubpages()
        }, 1000 * listCount);

    }
      


    

    }, 

    outputToLog: function() {
      var node = document.createElement('li');
			node.appendChild(document.createTextNode(this.logContent));
			document.getElementById("logItems").appendChild(node);
			var elem = document.getElementById('log');
			elem.scrollTop = elem.scrollHeight;
    },

    toggleCheck: function() {
      if (document.getElementById("myCheckbox").checked === true){
        this.openAI = true; 
        this.mistral = false; 
        document.getElementById("model2").style.color = '#71c68b';
        document.getElementById("model1").style.color = 'white';
        console.log("OpenAI selected")
        document.getElementById("analysisModel").selectedIndex = 1;
        document.getElementById("summaryModel").selectedIndex = 0;
        document.getElementById("analysisModel").options[0].disabled = false;
        document.getElementById("analysisModel").options[1].disabled = false;
        document.getElementById("summaryModel").options[0].disabled = false;
        document.getElementById("summaryModel").options[1].disabled = false;
        document.getElementById("analysisModel").options[2].disabled = true;
        document.getElementById("analysisModel").options[3].disabled = true;
        document.getElementById("analysisModel").options[4].disabled = true;
        document.getElementById("summaryModel").options[2].disabled = true;
        document.getElementById("summaryModel").options[3].disabled = true;
        document.getElementById("summaryModel").options[4].disabled = true;
      } else {
        this.openAI = false; 
        this.mistral = true; 
        document.getElementById("model1").style.color = 'hotpink';
        document.getElementById("model2").style.color = 'white';
        console.log("Mistral selected")
        this.apiKEY = this.apiKEY2
        this.apiURL = this.apiURL2
        this.summaryModel = this.summaryModel2
        this.analysisModel = this.analysisModel2
        this.mistralDelay = 20000
        document.getElementById("analysisModel").selectedIndex = 3;
        document.getElementById("summaryModel").selectedIndex = 4;
        document.getElementById("analysisModel").options[0].disabled = true;
        document.getElementById("analysisModel").options[1].disabled = true;
        document.getElementById("summaryModel").options[0].disabled = true;
        document.getElementById("summaryModel").options[1].disabled = true;
        document.getElementById("analysisModel").options[2].disabled = false;
        document.getElementById("analysisModel").options[3].disabled = false;
        document.getElementById("analysisModel").options[4].disabled = false;
        document.getElementById("summaryModel").options[2].disabled = false;
        document.getElementById("summaryModel").options[3].disabled = false;
        document.getElementById("summaryModel").options[4].disabled = false;
        
      }
    },

    registerVariables: function () {
      this.showPrompt = false;
      const workingUrl = this.urlToScrape;
      if (this.variableOne == "" || this.promptInput2 == "") {
        alert("No variables have been entered. Quantitative analysis will not be performed. Click okay to proceed with only qualitative analysis. Otherwise refresh the page and start over.");
      }
      if (!workingUrl.endsWith("/") && !workingUrl.includes('\r\n') || !workingUrl.includes('\r') || !workingUrl.includes('\n')) {
        this.urlToScrape = this.urlToScrape + "/";
        console.log("added slash");
        
      }
    },

    checkPassWord: function () {
        this.showPassword = true;
        this.showPassword2 = false;
        this.msg = "";
        this.msg2 = ""; 
        this.showTagline = false; 
 
    },

    checkBots: function () {
      if (this.openAI === true) {
        this.logContent = "🌩️ discourse_crawler: model selected: openai: current models in use: " + this.analysisModel + " (quantitative analysis and qualitative analysis); " + this.summaryModel + " (qualitative summary)"
        this.outputToLog()
      }
      if (this.mistral === true) {
        this.logContent = "🌩️ discourse_crawler: model selected: mistral: current models in use: " + this.analysisModel + " (quantitative analysis and qualitative analysis); " + this.summaryModel + " (qualitative summary)"
        this.outputToLog()
      }
      var pathArray = this.urlToScrape.split( '/' );
      var protocol = pathArray[0];
      var host = pathArray[2];
      this.robotsDomain = protocol + '//' + host;
      this.proxyRobotsUrl =   "https://api.allorigins.win/raw?url=" +
              encodeURIComponent(this.robotsDomain + "/robots.txt")
      const robotsUrl = this.proxyRobotsUrl
      console.log(robotsUrl)

      this.logContent = "🌐 discourse_crawler: checking robots.txt at: " + this.robotsDomain
      this.outputToLog()

      axios
        .get(robotsUrl)
        .then((response) => {
          this.robotsDotText = response.data
          console.log(this.robotsDotText)
          this.logContent = "🤖 discourse_crawler: robots.txt: " + this.robotsDotText
          this.outputToLog()

          const robots = robotsParser(
            {
              userAgent: 'Googlebot', // The default user agent to use when looking for allow/disallow rules, if this agent isn't listed in the active robots.txt, we use *.
              allowOnNeutral: false, // The value to use when the robots.txt rule's for allow and disallow are balanced on whether a link can be crawled.
            },
          );
        
          robots.parseRobots(this.robotsDomain, this.robotsDotText)
          robots.canCrawlSync(this.robotsDomain); // Returns true if the link can be crawled, false if not.
          robots.canCrawl(this.robotsDomain, (value) => {
          console.log(this.robotsDomain + ': main Page Crawlable: ', value);
          this.goAhead = value;
            if (this.goAhead == true) {
              this.logContent = "✅ discourse_crawler: " + this.robotsDomain + ': main Page Crawlable: ' + value
              this.outputToLog()
              this.grabPage()
              this.goAhead = false
            }else {
              this.msg = "discourse_crawler: Cannot crawl page as per robots.txt"
              this.logContent = "🔴 discourse_crawler: " + this.robotsDomain + ': cannot crawl as per robots.txt'
              this.outputToLog()
              this.goAhead = false
            }
          }); 
        })
        .catch((errors) => {
              console.log(errors);
         })
    },

    checkBots2: function (element, listCount) {
      this.listCount = this.listCount + 1
      var pathArray = element.split( '/' );
      var protocol = pathArray[0];
      var host = pathArray[2];
      const robotsDomain = protocol + '//' + host;
      const proxyRobotsUrl =   "https://api.allorigins.win/raw?url=" +
              encodeURIComponent(robotsDomain + "/robots.txt")
      const robotsUrl = proxyRobotsUrl
      console.log(robotsUrl)

      axios
        .get(robotsUrl)
        .then((response) => {
          this.logContent = "🌐 discourse_crawler: checking robots.txt at: " + robotsDomain
          this.outputToLog()
          console.log("total" + listCount)
          console.log(this.listCount + " " + element)
          const robotsDotText = response.data
          console.log(robotsDotText)
          this.logContent = "🤖 discourse_crawler: robots.txt: " + robotsDotText
          this.outputToLog()

          const robots = robotsParser(
            {
              userAgent: 'Googlebot', // The default user agent to use when looking for allow/disallow rules, if this agent isn't listed in the active robots.txt, we use *.
              allowOnNeutral: false, // The value to use when the robots.txt rule's for allow and disallow are balanced on whether a link can be crawled.
            },
          );
        
          robots.parseRobots(robotsDomain, robotsDotText)
          robots.useRobotsFor(robotsDomain)
          robots.canCrawlSync(element); // Returns true if the link can be crawled, false if not.
          robots.canCrawl(element, (value) => {
          console.log(element + ': Page Crawlable: ', value);
          this.goAhead = value;
            if (this.goAhead == true) {
              this.logContent = "✅ discourse_crawler: " + element + ': main Page Crawlable: ' + value
              this.outputToLog()
              this.anchorsForCrawl.push(element);
              console.log(this.anchorsForCrawl)
              this.goAhead = false
            }else {
              this.logContent = "🔴 discourse_crawler: " + element + ': cannot crawl as per robots.txt'
              this.outputToLog()
              console.log(this.anchorsForCrawl)
              this.goAhead = false
            }
          }); 
        })
        .catch((errors) => {
              console.log(errors);
         })
    },

    checkForQualQuantSummary: function () {
      const workingUrl2 = this.urlToScrape;
      console.log(workingUrl2);
      this.progress = false;
      this.analysisModel = document.getElementById("analysisModel").value;
      this.analysisModel2 = document.getElementById("analysisModel").value;

      this.summaryModel = document.getElementById("summaryModel").value;
      this.summaryModel2 = document.getElementById("summaryModel").value;
      
      if (workingUrl2 == "data") {
        this.dataInput = true;
        this.showDataButon = true;
        this.msg = "Initializing";
        this.msg2 = "";
        this.showProcess = false;
        this.progress = true; 
        this.msg = ""; 
        document.getElementById("urlInputHeader").innerHTML = "Data Input";
        document.getElementById("urlInputHeaderInstructions").innerHTML = "Select JSON data file (should only contain values for 'name' and 'text').";
      }

      if (workingUrl2.includes('\r\n') || workingUrl2.includes('\r') || workingUrl2.includes('\n')) {
        if (workingUrl2.endsWith("$")) {
          this.log = true
          this.qualQuantSummary = true;
          this.urlToScrape = workingUrl2.slice(0, -1);
          console.log("qualquant summary for " + this.urlToScrape);
          this.urlListMode()
        } else {
          console.log("missed")
          this.log = true
          this.urlListMode()
        } 
      }

      if (workingUrl2 != "data" && !workingUrl2.includes('\r\n') && !workingUrl2.includes('\r') && !workingUrl2.includes('\n')) {
        if (workingUrl2.endsWith("$")) {
          this.log = true
          this.qualQuantSummary = true;
          this.urlToScrape = workingUrl2.slice(0, -1);
          console.log("qualquant summary for " + this.urlToScrape);
          this.checkBots()
        } else {
          console.log("missed")
          this.log = true
          this.checkBots()
        }
      }
    },

    runPromptsOnData: function () {
      this.log = true
      this.registerData();
      this.registerVariables();

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
        instance.overallNumber = result.length
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
      const robots = robotsParser(
        {
          userAgent: 'Googlebot', // The default user agent to use when looking for allow/disallow rules, if this agent isn't listed in the active robots.txt, we use *.
          allowOnNeutral: false, // The value to use when the robots.txt rule's for allow and disallow are balanced on whether a link can be crawled.
        },
      );
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
                if (html.links[i].href.includes(".pdf" || "%")) {
                this.logContent = "🔴 discourse_crawler: " + html.links[i].href + ': cannot crawl (broken link or uncrawlable file)'
                this.outputToLog()
                }
                
                if (!html.links[i].href.includes(".pdf" || "%")) {
                  robots.parseRobots(this.robotsDomain, this.robotsDotText)
                  robots.useRobotsFor(this.robotsDomain)
                  robots.canCrawlSync(html.links[i].href); // Returns true if the link can be crawled, false if not.
                  robots.canCrawl(html.links[i].href, (value) => {
                  this.goAhead = value

                  if (this.goAhead == true) {
                    anchors.push(l[i].href);
                    console.log(html.links[i].href + ': crawlable: ', value);
                    this.goAhead = false
                    this.logContent = "✅ discourse_crawler: " + html.links[i].href + ': crawlable: ' + value
                    this.outputToLog()
                  } else {
                    console.log(l[i].href + ": cannot crawl page as per robots.txt")
                    this.goAhead = false
                    this.logContent = "🔴 discourse_crawler: " + l[i].href + ": cannot crawl page as per robots.txt"
                    this.outputToLog()
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
        }); 

          }
              }

              if (html.links[i].href.includes(window.location.origin)) {
                if (html.links[i].href.includes(".pdf" || "%")) {
                this.logContent = "🔴 discourse_crawler: " + html.links[i].href + ': cannot crawl (broken link or uncrawlable file)'
                this.outputToLog()
                }
                
                if (!html.links[i].href.includes(".pdf" || "%")) {
                  const htmlConstructor =
                    this.urlToScrape +
                    html.links[i].href.replace(
                      window.location.origin + "/",
                      ""
                    );

                  robots.parseRobots(this.robotsDomain, this.robotsDotText)
                  robots.useRobotsFor(this.robotsDomain)
                  robots.canCrawlSync(htmlConstructor); // Returns true if the link can be crawled, false if not.
                  robots.canCrawl(htmlConstructor, (value) => {
                    this.goAhead = value

                    if (this.goAhead == true) {
                      anchors.push(htmlConstructor);
                      console.log(htmlConstructor + ': crawlable: ', value);
                      this.goAhead = false
                      this.logContent = "✅ discourse_crawler: " + html.links[i].href + ': crawlable: ' + value
                      this.outputToLog()
                    } else {
                      console.log(htmlConstructor + ": cannot crawl page as per robots.txt")
                      this.goAhead = false
                      this.logContent = "🔴 discourse_crawler: " + l[i].href + ": cannot crawl page as per robots.txt"
                      this.outputToLog()
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
                      });
                }
              }
            }
          }
        })
        .catch((errors) => {
          console.log(errors);
          this.msg = errors; // Errors and stuff
          this.logContent = "💀 discourse_crawler: " + errors
          this.outputToLog()
        });
    },

    grabSubpages: function () {
      let i,
        len = this.anchorsForCrawl.length;
      console.log(this.anchorsForCrawl);
      this.logContent = "🔗 discourse_crawler: URLs to be scraped: " + this.anchorsForCrawl.length + ": " + this.anchorsForCrawl
      this.outputToLog()
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
          instance.progress = true;
          instance.pacman = false;
          instance.msg6 = usableURL;
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
                .querySelectorAll("script, style, br, footer, nav, iframe")
                .forEach((s) => s.remove());
              let htmlWithoutScripts = workingHTML
                .querySelector("body")
                .innerText.trim();
              console.log("Crawling:" + i + " " + usableURL);

              instance.msg = "Crawling";
              const numberA = i + 1;
              instance.overallNumber = workingAnchorsArray.length;
              instance.msg2 =
                numberA +
                "/" +
                instance.overallNumber +
                ": " +
                workingAnchorsArray[i];
              var actualText = "";
              const workingActualText = htmlWithoutScripts;
              const workingActualText2 = workingActualText.replace(/"/g, " ");
              const actualText3 = workingActualText2.replace(/'/g, " ");
              const actualText4 = actualText3.replace(/(\r\n|\r|\n)/g, '');
              const actualText2 = actualText4.trim();

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
                instance.logContent = "📗 discourse_crawler: " + usableURL + ": page Type: whole: " + actualText2.substring(100, 0)
                instance.outputToLog()
                var div = document.getElementById("specificAnalysis");
                var p = document.createElement("div");
                  p.innerHTML =
                    '{"pageType":' +
                    '"' +
                    'whole' +
                    '"' +
                    ',' +
                    '"name":' +
                    '"' +
                    usableURL +
                    '"' +
                    ',' +
                    '"text":' +
                    '"' +
                    actualText +
                    '"' +
                    '},';
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
                instance.pageType = "partial";
                instance.logContent = "📙 discourse_crawler: " + usableURL + ": page type: partial: " + actualText2.substring(100, 0)
                instance.outputToLog()
                var div2 = document.getElementById("specificAnalysis");
                var p2 = document.createElement("div");
                  p2.innerHTML =
                    '{"pageType":' +
                    '"' +
                    'partial' +
                    '"' +
                    ',' +
                    '"name":' +
                    '"' +
                    usableURL +
                    '"' +
                    ',' +
                    '"text":' +
                    '"' +
                    actualText +
                    '"' +
                    '},';
                  div2.appendChild(p2);
              }
              if (counterTicker === ticker - 1) {
                setTimeout(() => {
                  instance.logContent = "📟 📣 discourse_crawler: quantitative prompt: " + instance.promptInput + " " +
                  instance.variableOne +
                  ", " +
                  instance.variableTwo +
                  ", " +
                  instance.variableThree +
                  ", " +
                  instance.variableFour +
                  ", " +
                  instance.variableFive +
                  ", " +
                  instance.variableSix;
                  instance.outputToLog()
                  console.log("Delayed for 2 seconds.");
                  instance.getEmotionStats();
                }, 3000);
              }
            })
            .catch((errors) => {
              console.log(errors);
              instance.msg = errors; 
              instance.pageType = "whole";
              instance.logContent = "📕 discourse_crawler: page type: not crawled: " + usableURL
              instance.outputToLog()
              var div = document.getElementById("specificAnalysis");
              var p = document.createElement("div");
                p.innerHTML =
                  '{"pageType":' +
                '"' +
                'not_crawled' +
                '"' +
                ',' +
                '"name":' +
                  '"' +
                  usableURL +
                  '"' +
                  ',' +
                  '"text":' +
                  
                  null +
                  
                  '},';
                div.appendChild(p);// Errors
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
      let modifier = ""
      console.log(workingJSON1.length);
      let i2,
        len2 = workingJSON1.length;
      const ticker2 = workingJSON1.length;
      const instance = this;
      let goAheadWithQuant = false
      let goAheadWithoutQuant = false

      if (
        instance.variableOne != "" ||
        instance.variableTwo != "" ||
        instance.variableTwo != "" ||
        instance.variableThree != "" ||
        instance.variableFour != "" ||
        instance.variableFive != "" ||
        instance.variableSix != ""
      ){
        goAheadWithQuant = true
        instance.noQuantUsed = false
      }

      if (
        instance.variableOne == "" &&
        instance.variableTwo == "" &&
        instance.variableThree == "" &&
        instance.variableFour == "" &&
        instance.variableFive == "" &&
        instance.variableSix == ""
      ){
        goAheadWithoutQuant = true
        instance.noQuantUsed = true
      }

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
        modifier = "Assign any instances of emptyValue a number score of null. "
        instance.variableSix = "emptyValue6"
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
          '": number score,' +
          '"' +
          instance.variableSix +
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
        modifier = "Assign any instances of emptyValue a number score of null. "
        instance.variableFive = "emptyValue5"
        instance.variableSix = "emptyValue6"
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
          '": number score,' +
          '"' +
          instance.variableFive +
          '": number score,' +
          '"' +
          instance.variableSix +
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
        modifier = "Assign any instances of emptyValue a number score of null. "
        instance.variableFour = "emptyValue4"
        instance.variableFive = "emptyValue5"
        instance.variableSix = "emptyValue6"
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

      //two variables
      if (
        instance.variableTwo != "" &&
        instance.variableThree == "" &&
        instance.variableFour == "" &&
        instance.variableFive == "" &&
        instance.variableSix == ""
      ) {
        modifier = "Assign any instances of emptyValue a number score of null. "
        instance.variableThree = "emptyValue3"
        instance.variableFour = "emptyValue4"
        instance.variableFive = "emptyValue5"
        instance.variableSix = "emptyValue6"
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

      //one variable
      if (
        instance.variableTwo == "" &&
        instance.variableThree == "" &&
        instance.variableFour == "" &&
        instance.variableFive == "" &&
        instance.variableSix == ""
      ) {
        modifier = "Assign any instances of emptyValue a number score of null. "
        instance.variableTwo = "emptyValue2"
        instance.variableThree = "emptyValue3"
        instance.variableFour = "emptyValue4"
        instance.variableFive = "emptyValue5"
        instance.variableSix = "emptyValue6"
        commaOne = "";
        commaTwo = "";
        commaThree = "";
        commaFour = "";
        commaFive = "";
        jsonOne = '{"' +
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

      if (
        goAheadWithQuant == true
      ) {

        for (i2 = 0; i2 < len2; i2++) {
          fire(i2);
        }
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
          const pType = workingJSON1[i2].pageType;

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
              ", returning the response in JSON." + modifier + "Format as" +
              jsonOne +
              ". Do not include any text other than the JSON in the response. " +
              "Text: " +
              usableText
          );
        if (usableText != null) {
          const client = axios.create({
            headers: {
              Authorization: "Bearer " + instance.apiKEY,
            },
          });

          const params = {
            model: instance.analysisModel,
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
                  ", returning the response in JSON. " + modifier + "Format as" +
                  jsonOne +
                  ". Do not include any text other than the JSON. " +
                  "Text: " +
                  usableText,
              },
            ],
            temperature: 0,
          };

          client
            .post(instance.apiURL, params)
            .then((result) => {
              instance.pacman = true;
              document.getElementById("mainTitle").style.color = "hotpink";
              instance.msg = "Running Quantitative Analysis";
              instance.loader = false;
              const number = i2 + 1;
              instance.msg2 =
                number + "/" + instance.overallNumber + ": " + usableURL;
              const rawResult = result.data.choices[0].message.content;
              const justTheJSON = rawResult.substring(rawResult.indexOf("{"));
              instance.logContent = "📟 discourse_crawler: quantitative results for: " + usableURL + ": " + justTheJSON
              instance.outputToLog()
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
                pType +
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
              instance.logContent = "💀 📟 discourse_crawler: quantitative analysis error: " + error
              instance.outputToLog()
            });
          if (counterTicker2 === ticker2 - 1) {
            setTimeout(() => {
              console.log("Quant delayed for 3 seconds.");
              instance.logContent = "💡 📣 discourse_crawler: qualitative prompt: " + instance.promptInput2
              instance.outputToLog()
              instance.getMoralFoundations();
            }, 5000);
          }
        }
        if (usableText == null ) {
              var div = document.getElementById("specificAnalysis2");
              var p = document.createElement("div");
              p.innerHTML =
                '{"pageType":' +
                '"' +
                "not_crawled" +
                '"' +
                "," +
                '"name":' +
                '"' +
                usableURL +
                '"' +
                "," +
                '"text":' +
                null +
                "," +
                '"' +
                instance.variableOne +
                '":' +
                null +
                "," +
                '"' +
                instance.variableTwo +
                '":' +
                null +
                "," +
                '"' +
                instance.variableThree +
                '":' +
                null +
                "," +
                '"' +
                instance.variableFour +
                '":' +
                null +
                "," +
                '"' +
                instance.variableFive +
                '":' +
                null +
                "," +
                '"' +
                instance.variableSix +
                '":' +
                null +
                "},";
              div.appendChild(p);

        }
        }, instance.delayTime * i2);
      }

      if (
        goAheadWithoutQuant == true
      ) {
        instance.variableOne = "emptyValue1"
        instance.variableTwo = "emptyValue2"
        instance.variableThree = "emptyValue3"
        instance.variableFour = "emptyValue4"
        instance.variableFive = "emptyValue5"
        instance.variableSix = "emptyValue6"
        instance.pacman = true;
        for (i2 = 0; i2 < len2; i2++) {

          const usableURL = workingJSON1[i2].name;
          const usableText = workingJSON1[i2].text;
          const pType = workingJSON1[i2].pageType;
         
              var div = document.getElementById("specificAnalysis2");
              var p = document.createElement("div");
              p.innerHTML =
                '{"pageType":' +
                '"' +
                pType +
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
          if (i2 == len2 -2){
            setTimeout(() => {
              instance.logContent = "💡 📣 discourse_crawler: qualitative prompt: " + instance.promptInput2
              instance.outputToLog()
              console.log("Quant delayed for 3 seconds.");
              instance.getMoralFoundations();
            }, 3000);
          }
        }
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
          const pType2 = workingJSON2[i3].pageType;
          
          if (usableText2 != null) {
          const client = axios.create({
            headers: {
              Authorization: "Bearer " + instance.apiKEY,
            },
          });

          const params = {
            model: instance.analysisModel,
            messages: [
              {
                role: "user",
                content: instance.promptInput2 + usableText2,
              },
            ],
            temperature: 0,
          };

          client
            .post(instance.apiURL, params)
            .then((result) => {
              instance.loader = true;
              document.getElementById("mainTitle").style.color = "orange";
              instance.msg = "Running Qualitative Analysis";
              instance.loader2 = false;
              const number2 = i3 + 1;
              instance.msg2 =
                number2 + "/" + instance.overallNumber + ": " + usableURL2;
              console.log(result.data.choices[0].message.content);
              const moralFoundationResults =
                result.data.choices[0].message.content.replaceAll('"', "");
              instance.moralFoundationAnalysis =
                moralFoundationResults.replaceAll("'", "");

              instance.logContent = "💡 discourse_crawler: qualitative analysis for: " + usableURL2 + ": " + instance.moralFoundationAnalysis
              instance.outputToLog()

              var div = document.getElementById("specificAnalysis3");
              var p = document.createElement("div");
              p.innerHTML =
                '{"pageType":' +
                '"' +
                pType2 +
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
              instance.msg = error;
              instance.logContent = "💀 💡 discourse_crawler: qualitative analysis error: " + error
              instance.outputToLog()
            });
          if (counterTicker3 === ticker3 - 1) {
            setTimeout(() => {
              console.log("Qual delayed for 5 seconds.");
              instance.returnJSON();
            }, instance.mistralDelay);
          }
          }
          if (usableText2 == null) {
              var div = document.getElementById("specificAnalysis3");
              var p = document.createElement("div");
              p.innerHTML =
                '{"pageType":' +
                '"' +
                "not_crawled" +
                '"' +
                "," +
                '"name":' +
                '"' +
                usableURL2 +
                '"' +
                "," +
                '"text":' +
                '"' +
                null +
                '"' +
                "," +
                 '"qualResponse":' +
                null +

                "," +
                '"' +
                instance.variableOne +
                '":' +
                null +
                "," +
                '"' +
                instance.variableTwo +
                '":' +
                null +
                "," +
                '"' +
                instance.variableThree +
                '":' +
                null +
                "," +
                '"' +
                instance.variableFour +
                '":' +
                null +
                "," +
                '"' +
                instance.variableFive +
                '":' +
                null +
                "," +
                '"' +
                instance.variableSix +
                '":' +
                null +
                "},";
              div.appendChild(p);

          }
        }, instance.delayTime * i3); //timeout
      } //fire
    },

    returnJSON: function () {
      document.getElementById("mainTitle").style.color = "#71c68b";
      this.loader2 = true;
      this.msg = "";
      this.msg2 = "";
      this.space = true;
      this.msg7 = "Finishing Up"; 
      this.progress = false;
      var workingJSON = document.getElementById("specificAnalysis3").innerText;
      var middleJSON = "[" + workingJSON.slice(0, -1) + "]";
      const middleJSON2 = middleJSON.replace(/(\r\n|\r|\n)/g, '');
      const middleJSON3 = middleJSON2.trim();
      this.JSON3 = middleJSON3;
      console.log("JSON2: " + this.JSON3);
      var div = document.getElementById("specificAnalysis4");
      var p = document.createElement("div");
      p.innerHTML = this.JSON3;
      div.appendChild(p);

      setTimeout(() => {
        console.log("Delayed for 1 second."); 
        document.getElementById("visuals").style.display = "block";
        this.renderVisuals();
      }, 2000);
    },

    renderVisuals: function () {

      var workingJSON = document.getElementById("specificAnalysis4").innerText;
      this.JSON4 = JSON.parse(workingJSON);
      this.msg2 = "Rendering Overall Text Summaries"
      //const usableText = JSON.stringify(this.JSON1[0].text);

      if (this.JSON4 != null) {
        document.getElementById('progressColor').style.backgroundColor="hotpink";
        document.getElementById('messageTwo').style.color="hotpink";
        this.msg2 = "Rendering Overall Text Summaries"
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
          const pType3 = this.JSON4[i].pageType;
          const itemNumber = i + 1;

          var div = document.getElementById("visuals");
          var p = document.createElement("div");
          p.innerHTML =
            "<h2 style='color:#66FF79;font-size:46px;'>" +
            itemNumber +
            "/" +
            this.overallNumber +
            "</h2>" +
            "<h2 style='color:hotpink;font-size:46px;'>" +
            usableURL +
            "</h2>" +
            "<h3 style='color:hotpink;'>Qualitative Analysis </h3><p style='color:white;'>" +
            moralAnalysis +
            "</p><h3 style='color:orange;'>Quantitative Analysis </h3><ul style='color:orange;list-style:none;margin:0;'>" +
            "<li style='color:#ff0022;'>" +
            this.variableOne +
            ": " +
            uno +
            "</li>" +
            "<li style='color:#ffbc42;'>" +
            this.variableTwo +
            ": " +
            dos +
            "</li>" +
            "<li style='color:#0496ff;'>" +
            this.variableThree +
            ": " +
            tres +
            "</li>" +
            "<li style='color:#694d75;'>" +
            this.variableFour +
            ": " +
            quatro +
            "</li>" +
            "<li style='color:#1b5299;'>" +
            this.variableFive +
            ": " +
            cinco +
            "</li>" +
            "<li style='color:lightgray;'>" +
            this.variableSix +
            ": " +
            seis +
            "</li>" +
            "<h3 style='color:#71c68b;'>Whole (crawled text is <49999 Characters), Partial (crawled text is >49999 characters, so only the first 49999 characters are included in analysis), Or Not Crawled (non-html/text content, or failed page fetch)</h3><ul style='color:white;list-style:none;margin:0;'>" +
            "<li>" +
            pType3 +
            "</li>" +
            "</ul>" +
            "<hr>";
          div.appendChild(p);

          if (i === len - 1) {
            setTimeout(() => {
              console.log("Delayed for 4 seconds.");
              this.msg2 = "";
              var div7 = document.getElementById("rawData2");
              var p7 = document.createElement("h2");
              p7.setAttribute("id", "overalExplanation3");
              p7.innerHTML = "Raw Data";
              div7.appendChild(p7);
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
      
      var workingJSON = document.getElementById("specificAnalysis4").innerText;
      const test = JSON.parse(workingJSON);
      const instance = this;
      const pageType3 = "overallQual";
      let overallMoralAnalysis = "";

      const e = test.length;
      for (var i = 0; i < e; i++) {
        document.getElementById('progressColor').style.backgroundColor="yellow";
        document.getElementById('messageTwo').style.color="yellow";
        this.msg2 = "Rendering Overall Qualitative Summary"
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
            model: instance.summaryModel,
            messages: [
              {
                role: "user",
                content:
                  "Synthesize the following statements into a brief 200 word summary that reports the overall conclusions of the statements. Statements:" +
                  instance.overallSummaryOutput,
              },
            ],
            temperature: 0,
          };

          client
            .post(instance.apiURL, params)
            .then((result) => {
              instance.msg5 = instance.urlToScrape;
              const rawResultA = result.data.choices[0].message.content
              const rawResultB = rawResultA.replaceAll("'", "")
              const rawResultC = rawResultB.replaceAll('"', '')
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
                rawResultC +
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
      var workingJSON = document.getElementById("specificAnalysis4").innerText;
      const test = JSON.parse(workingJSON);
      const instance = this;
      const pageType3 = "overallCount";
      let overallMoralAnalysis = "";

      const e = test.length;
      for (var i = 0; i < e; i++) {
        document.getElementById('progressColor').style.backgroundColor="yellow";
        document.getElementById('messageTwo').style.color="yellow";
        this.msg2 = "Rendering Overall Qualitative Summary"
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
            model: instance.summaryModel,
            messages: [
              {
                role: "user",
                content:
                'Analyze the contents of the following texts and give me numerical scores between 1 and 10 indicating the care, fairness, loyalty, authority, and purity represented in them formatted in JSON as {"care": numerical score,"fairness": numerical score,"loyalty": numerical score,"authority": numerical score,"purity": numerical score}. Include the json at the very beginning of the response and do not include ```s in the response. Explain those scores. Text:' +
                  instance.overallSummaryOutput,
              },
            ],
            temperature: 0,
          };

          client
            .post(instance.apiURL, params)
            .then((result) => {
              instance.msg5 = instance.urlToScrape;
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
              const rawResultB = justTheTextA.replaceAll("'", "")
              const rawResultC = rawResultB.replaceAll('"', '')
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
                rawResultC +
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
                this.msg7 = "Finishing Up"; 
                this.progress = false;
                this.renderOverallEmotion();
              }, 3000);
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

          if (instance.noQuantUsed == false){
            instance.overallQuant = true;
          }

          if (instance.noQuantUsed == true){
            document.getElementById("overallVariables").style.display = "none";
          }


          

      const e = test.length;
      for (var i = 0; i < e; i++) {
        document.getElementById('progressColor').style.backgroundColor="#92dce5";
        document.getElementById('messageTwo').style.color="#92dce5";
        this.msg2 = "Rendering Overall Quantitative Summary"
        overallOne = overallOne + test[i][instance.variableOne];
        overallTwo = overallTwo + test[i][instance.variableTwo];
        overallThree = overallThree + test[i][instance.variableThree];
        overallFour = overallFour + test[i][instance.variableFour];
        overallFive = overallFive + test[i][instance.variableFive];
        overallSix = overallSix + test[i][instance.variableSix];
        if (i === e - 1) {
          overallOne = Math.round(overallOne / e); 
          overallTwo = Math.round(overallTwo / e); 
          overallThree = Math.round(overallThree / e); 
          overallFour = Math.round(overallFour / e); 
          overallFive = Math.round(overallFive / e); 
          overallSix = Math.round(overallSix / e); 


                instance.overallVariableOne = overallOne
                instance.overallVariableTwo = overallTwo
                instance.overallVariableThree = overallThree
                instance.overallVariableFour = overallFour
                instance.overallVariableFive = overallFive
                instance.overallVariableSix = overallSix

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
            width: 550,
            showlegend: false,
            paper_bgcolor: "#2b2d42",
            title: "",
            font: {
              family: "Avenir, Helvetica, Arial, sans-serif",
              size: 30,
              color: "white",
              weight: "bold",
            },
            margin: {
              l: 0,
              r: 50,
              b: 100,
              t: 100,
              pad: 4,
            },
          };
          var config = { responsive: true };
          Plotly.newPlot("overallVariables", data, layout, config);
          var div = document.getElementById("specificAnalysis3");
              var p = document.createElement("div");
              p.innerHTML =
                '{"pageType":' +
                '"' +
                "overallQuant" +
                '"' +
                "," +
                '"name":' +
                '"' +
                instance.urlToScrape +
                '"' +
                "," +
                '"' +
                "overall_" + instance.variableOne +
                '":' +
                instance.overallVariableOne +
                "," +
                '"' +
                "overall_" + instance.variableTwo +
                '":' +
                instance.overallVariableTwo +
                "," +
                '"' +
                "overall_" + instance.variableThree +
                '":' +
                instance.overallVariableThree +
                "," +
                '"' +
                "overall_" + instance.variableFour +
                '":' +
                instance.overallVariableFour +
                "," +
                '"' +
                "overall_" + instance.variableFive +
                '":' +
                instance.overallVariableFive +
                "," +
                '"' +
                "overall_" + instance.variableSix +
                '":' +
                instance.overallVariableSix +
                "},";
              div.appendChild(p);
          instance.rawData = false;
          setTimeout(() => {
            console.log("Delayed for 1 second.");
            instance.returnJSONAgain();
          }, 3000);
        }
      }
    },

    returnJSONAgain: function () {
      var workingJSON = document.getElementById("specificAnalysis3").innerText;
      var middleJSON = workingJSON;
      const middleWorkingJSON = middleJSON;
      console.log("JSON2: " + middleWorkingJSON);
      const clearNode = document.getElementById("specificAnalysis5");
      clearNode.innerHTML = "";
      var div = document.getElementById("specificAnalysis5");
      var p = document.createElement("div");
      p.innerHTML = middleWorkingJSON;
      div.appendChild(p);
      this.showPrint = false;
      document.getElementById("specificAnalysis4").style.display = "none";
      document.getElementById("specificAnalysis").style.display = "none";
      this.msg5 = this.urlToScrape;
      this.logContent = "🎉 discourse_crawler: analysis complete" 
      this.outputToLog()
      const robots = robotsParser(
        {
          userAgent: 'Googlebot', // The default user agent to use when looking for allow/disallow rules, if this agent isn't listed in the active robots.txt, we use *.
          allowOnNeutral: false, // The value to use when the robots.txt rule's for allow and disallow are balanced on whether a link can be crawled.
        },
      );
      robots.clearCache()
      this.msg = ""
      this.msg7 = ""
      this.progress = true; 
      this.space = false;
      document.getElementById('progressColor').style.backgroundColor="#71c68b";
      document.getElementById('messageTwo').style.color="#71c68b";
        this.msg2 = "Rendering Overall Data Output"
      
      this.msg = ""
      this.showProcess2 = false;
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
      this.showPrint = true;
      this.msg = "";
      document.getElementById("log").style.height = "100%"
      setTimeout(() => {
        this.prepForPrinting();
      }, 500);
    },

    prepForPrinting: function () {

      this.saveJSON();
      window.print();
      this.showPrint = false;
      document.getElementById("log").style.height = "100%"
    },

    saveJSON: function () {
      const storageObj2 =
        document.getElementById("specificAnalysis5").innerText;
      const storageObj = "[" + storageObj2.slice(0, -1) + "]";
      console.log("downloadable data?" + storageObj);
      var dataStr =
        "data:text/json;charset=utf-8," + encodeURIComponent(storageObj);
      var dlAnchorElem = document.getElementById("downloadAnchorElem");
      dlAnchorElem.setAttribute("href", dataStr);
      dlAnchorElem.setAttribute("download", this.urlToScrape + ".json");
      dlAnchorElem.click();
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
#mainTitle2 {
  word-break: break-word;
  color: hotpink;
}

#mainTitle {
  font-size: 65px;
}
#overallVariables {
margin: 0 auto;

}

#overallVariables2 {
  margin-top: -75px;
}

#overalExplanation {
  color: orange;
  font-size: 30px;
  margin-top: 25px;
  width: 65%;
  display: inline-block;
}

#overalExplanation2 {
  color: orange;
  font-size: 30px;
  margin-top: 25px;
  width: 100%;
  display: inline-block;
}

#overalExplanation3 {
  color: white;
  font-size: 45px;
  margin-top: 25px;
  width: 65%;
  display: inline-block;
}

#rawData2 {
  color: white;
  font-size: 30px;
  margin-top: 25px;
  width: 65%;
  display: inline-block;
}

#results {
  margin: auto;
  display: hidden;
}
#overallMoralFoundations {
  display: inline-block;
  text-align: center;
}

#overallVariables {
  display: inline-block;
  text-align: center;
}

#URLInput {
  width: 70%;
  font-size: 30px;
  text-align: left;
  background-color: #f7ec59;
  color: #252627;
  border: none;
}

#variableOneInput {
  width: 25%;
  font-size: 30px;
  text-align: center;
  background-color: #ff0022;
  color: #252627;
  border: none;
}

#variableTwoInput {
  width: 25%;
  font-size: 30px;
  text-align: center;
  background-color: #ffbc42;
  color: #252627;
  border: none;
}

#variableThreeInput {
  width: 25%;
  font-size: 30px;
  text-align: center;
  background-color: #0496ff;
  color: #252627;
  border: none;
}

#variableFourInput {
  width: 25%;
  font-size: 30px;
  text-align: center;
  background-color: #694d75;
  color: #252627;
  border: none;
}

#variableFiveInput {
  width: 25%;
  font-size: 30px;
  text-align: center;
  background-color: #1b5299;
  color: #252627;
  border: none;
}
#passWordInput {
  width: 50%;
  font-size: 30px;
  text-align: center;
  background-color: lightgray;
  color: #252627;
  border: none;
  margin-bottom: 1px;
}
#variableSixInput {
  width: 25%;
  font-size: 30px;
  text-align: center;
  background-color: lightgray;
  color: #252627;
  border: none;
}

#promptInput {
  width: 70%;
  font-size: 20px;
  background-color: hotpink;
  color: #252627;
  border: none;
  white-space: normal;
}

#quant,
#qual {
  color: orange;
  font-size: 40px;
}

#urlInputHeader {

  color: orange;
  font-size: 40px;

}

.quantLine {
  width: 50%;
}
.input-element {
  font-size: 100px;
  width: 400px;
}
#startButton {
  font-size: 35px;
  color: orange;
  border-color: white;
  border-style: solid;
  margin-top:5px;
  background-color: #2b2d42;
}

#startButton:hover {
  background: #dd06d6;
}

#summaryModel {
font-size: 20px;
  color: orange;
  border-color: white;
  border-style: solid;
  margin-top:5px;
  background-color: #2b2d42;
  width: 140px;
}
#summaryModel:hover {
  background: #dd06d6;
}

#analysisModel {
font-size: 20px;
  color: orange;
  border-color: white;
  border-style: solid;
  margin-top:5px;
  background-color: #2b2d42;
  width: 140px;
}
#analysisModel:hover {
  background: #dd06d6;
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
#apiButton {
  background: orange;
  font-size: 25px;
  border-style: none;
}
#apiButton:hover {
  background: hotpink;
}
#visuals {
  color: #ff66d8;
  border: solid;
  font-size: 20px;
  width: 75%;
  margin: auto;
  padding: 10px;
  word-break: break-word;
  list-style: none;
  display: none;
}
#analysisContent {
  color: white;
}
h2 {
  color: white;
}

#specificAnalysis {
  display: block;
  color: #2b2d42;
}
#specificAnalysis2 {
  color: pink;
  display: none;
}
#specificAnalysis3 {
  color: blue;
  display: none;
}
#specificAnalysis5 {
  color: orange;
  font-size: 20px;
}

#specificAnalysis4 {
  color: limegreen;
  display: block;
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
  line-break: anywhere;
}

#messageThree {
  color: #92dce5;
  font-size: 18.5px; 
  margin-top: -4%; 
  margin-bottom: 8%; 
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

@import url("https://fonts.googleapis.com/css?family=Slabo+27px&display=swap");
*,
*:after,
*:before {
  box-sizing: border-box;
}

body {
  background: #000;
  color: #fff;
  padding: 0;
  margin: 0;
  font-family: "Slabo 27px", serif;
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
}

.pacman {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: hotpink;
  position: relative;
  margin: auto;
}

/* .pacman__eye {
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  top: 20px;
  right: 40px;
  background: #333333;
} */

.pacman__mouth {
  background: #2b2d42;
  position: absolute;
  width: 100%;
  height: 100%;
  clip-path: polygon(100% 74%, 44% 48%, 100% 21%);
  animation-name: eat;
  animation-duration: 0.7s;
  animation-iteration-count: infinite;
}

/* .pacman__food {
  position: absolute;
  width: 0px;
  height: 0px;
  font-size: 10px;
  background: #fff;
  border-radius: 0%;
  color: white;
  top: 40%;
  left: 120px;
  animation-name: food;
  animation-duration: 0.7s;
  animation-iteration-count: infinite;
} */

@keyframes eat {
  0% {
    clip-path: polygon(100% 74%, 44% 48%, 100% 21%);
  }
  25% {
    clip-path: polygon(100% 60%, 44% 48%, 100% 40%);
  }
  50% {
    clip-path: polygon(100% 50%, 44% 48%, 100% 50%);
  }
  75% {
    clip-path: polygon(100% 59%, 44% 48%, 100% 35%);
  }
  100% {
    clip-path: polygon(100% 74%, 44% 48%, 100% 21%);
  }
}

@keyframes food {
  0% {
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    transform: translateX(-50px);
    opacity: 0;
  }
}

.progress {
  position: relative;
  height: 10px;
  width: 100%;
}
.progress .color {
  position: absolute;
  background-color: orange;
  width: 0px;
  height: 10px;
  border-radius: 15px;
  animation: progres 4s infinite linear;
  margin-bottom: 10%;
}
@keyframes progres {
  0% {
    width: 0%;
  }
  10% {
    width: 10%;
  }
  20% {
    width: 20%;
  }
  30% {
    width: 30%;
  }
  40% {
    width: 40%;
  }
  50% {
    width: 50%;
  }
  60% {
    width: 60%;
  }
  70% {
    width: 70%;
  }
  80% {
    width: 80%;
  }
  90% {
    width: 90%;
  }
  100% {
    width: 100%;
  }
}

/* HTML: <div class="loader"></div> */
.loader {
  width: 50%;
  height: 20px;
  box-shadow: 0 3px 0 orange;
  display: grid;
  margin-left: 25%;
}
.loader:before,
.loader:after {
  content: "";
  grid-area: 1/1;
  background: radial-gradient(circle closest-side, var(--c, hotpink) 92%, #0000)
    0 0 / calc(100% / 4) 100%;
  animation: l4 1s infinite linear;
}
.loader:after {
  --c: #000;
  background-color: #92dce5;
  box-shadow: 0 0 0 0 #fff;
  clip-path: inset(-2px calc(50% - 10px));
}
@keyframes l4 {
  100% {
    background-position: calc(100% / 3) 0;
  }
}

.loader2 {
  width: 50%;
  height: 20px;
  box-shadow: 0 3px 0 hotpink;
  display: grid;
  margin-left: 25%;
}
.loader2:before,
.loader2:after {
  content: "";
  grid-area: 1/1;
  background: radial-gradient(circle closest-side, var(--c, orange) 92%, #0000)
    0 0 / calc(100% / 4) 100%;
  animation: l4 1s infinite linear;
}
.loader2:after {
  --c: #000;
  background-color: #71c68b;
  box-shadow: 0 0 0 0 #fff;
  clip-path: inset(-2px calc(50% - 10px));
}
@keyframes l4 {
  100% {
    background-position: calc(100% / 3) 0;
  }
}

#log {
color: lawngreen; 
background-color: #2b2d42; 
width: 80%;  
text-align: left; 
overflow: scroll; 
height: 180px; 
font-size: 11px;
}
#logTitle {
color:white;

}

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  display: none;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: hotpink;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked+.slider {
  background-color: #71c68b;
}

input:focus+.slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked+.slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
#model2 {
color: #71c68b; 
  font-size: 25px; 
}
#model1 {
  font-size: 25px;
  color: white
}

#spacer {
  margin-bottom: 1000px; 

}
#logo {
  height: 50px;
  margin-top: -60px;
  margin-bottom: 20px; 
  transform: rotate(0deg);
  filter: brightness(0) saturate(100%) invert(67%) sepia(77%) saturate(2280%) hue-rotate(359deg) brightness(101%) contrast(106%);
}
#logo2 {
  height: 50px;
  margin-top: -60px;
  margin-left: -40px;
  transform: rotate(180deg);
  filter: brightness(0) saturate(100%) invert(68%) sepia(35%) saturate(6399%) hue-rotate(300deg) brightness(109%) contrast(102%);
  }
</style>
