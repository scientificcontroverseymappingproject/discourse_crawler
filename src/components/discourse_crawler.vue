<template>
  <div id="body" class="dashboard">
    <input
      id="APIinput"
      type="text"
      v-model="apiKEY"
      v-if="showAPI"
      placeholder="Enter OpenAI API Key"
    /><br><span v-if="showAPI">Set up an OpenAI account and get an API key <a href="https://openai.com/product">here</a>.</span>
   <br><button v-if="showAPI" id="apiButton" @click="registerAPI">Set API Key</button>
    <br><br><br>
    <input
      id="URLInput"
      type="input"
      v-model="urlToScrape"
      placeholder="Enter URL to Crawl"
    /><p></p>
    <button id="startButton" @click="grabPage">Crawl Website</button>
<!-- 
    <button @click="getEmotionStats">Analyze Emotion</button>
    <button @click="getMoralFoundations">Analyze Moral Foundations</button>
    <button @click="returnJSON">Return Usable JSON</button>
    <button @click="renderVisuals">Visualize</button>
 -->

    <p v-if="!loading" id="loadingContainer">
      Initializing <br /><img id="loading" src= /><br /><span
        id="initialMessage"
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
    <p id="terminal"></p>
    <section id="visuals" class="visuals"></section>
    <section id="specificAnalysis"></section>
    <section id="specificAnalysis2"></section>
    <section id="specificAnalysis3"></section>
    <section id="specificAnalysis4"></section>
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
  name: "discourse_crawler",
  props: {},
  data() {
    return {
      msg: "Discourse Crawler",
      msg2: "An AI-powered tool for performing top-level analysis of websites.",
      msg3: "",
      urlToScrape: "https://rhetoricmatters.school.blog",
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
      showAPI: true, 
      anchorsForCrawl: [],
      secondIteration: false,
      JSON1: null,
      JSON2: null,
      JSON3: null,
      JSON4: null,
      moralFoundationAnalysis: "",
      apiKEY: "",
      unique: []
    };
  },

  created: function () {},

  methods: {
  
	registerAPI: function () {
		this.showAPI = false; 
	},
  
    grabPage: function () {
    let img = document.createElement('img');
    img.src ='https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExc3dqdTFidnN6enl2bmZ0b2RndGl0Y29oMWJiOHo0bDc2d3d6YnF3bCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/HN6GLlUsMvue652b2w/giphy.gif';
	img.setAttribute("id", 'thinkingIMG')
	document.getElementById('terminal').appendChild(img);
      const url = "https://api.allorigins.win/raw?url=" +
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
            

          if (this.secondIteration == false) {
            var anchors = [],
              l = html.links;
              const tickerA = html.links.length
            for (var i = 0; i < l.length; i++) {
				const counterTickerA = i
              if (html.links[i].href.includes(this.urlToScrape)) {
                anchors.push(l[i].href);
				}
				if (counterTickerA === tickerA -1) {
						this.pageText = htmlWithoutScripts;
						this.anchorsForCrawl =  anchors.filter(function(item, pos) {
							return anchors.indexOf(item) == pos;
							})
						console.log(this.anchorsForCrawl)
						
						setTimeout(() => {
							console.log("Delayed for 2 seconds.");
							this.grabSubpages();
							}, 2000);
									
				}
            
            }
            
            
          }
          
                  
			
        })
        .catch((errors) => {
          console.log(errors); 
           this.msg = errors// Errors and stuff
           
        });
        
        
    },

    grabSubpages: function () {
		let i, len = this.anchorsForCrawl.length;
			const ticker = this.anchorsForCrawl.length;
			const workingAnchorsArray = this.anchorsForCrawl
			for (i = 0; i < len; i++) {
				fire(i)
			}

	
	function fire(i) {
		setTimeout(function(){
        const usableURL = workingAnchorsArray[i];
        const counterTicker = i
        
        var url = "https://api.allorigins.win/raw?url=" +
          encodeURIComponent(usableURL) +
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
            console.log("Crawling: " + usableURL);
            
			if (htmlWithoutScripts.length <= 1999) {
				this.pageText = htmlWithoutScripts.replaceAll('"', "");
				const actualText = this.pageText.replaceAll("'", "");
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
				actualText +
				'"' +
				"},";
				div.appendChild(p);
				
			} else {
					this.pageText = htmlWithoutScripts.substring(0, 2000)
					this.pageText = htmlWithoutScripts.replaceAll('"', "");
					const actualText = this.pageText.replaceAll("'", "");
					var div2 = document.getElementById("specificAnalysis");
					var p2 = document.createElement("div");
					p2.innerHTML =
					'{"url":' +
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
						//this.getEmotionStats()
					}, 2000);
				}
          })
          .catch((errors) => {
            console.log(errors); 
             this.msg = errors// Errors
          });
      }, 500 * i );
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
        const ticker2 = this.JSON1.length;
        
        for (i = 0; i < len; i++) {
          const usableURL = this.JSON1[i].url;
          const counterTicker2 = i
          const usableText = this.JSON1[i].text;
          
          const client = axios.create({
            headers: {
              Authorization: "Bearer " + this.apiKEY,
            },
          });

          const params = {
            messages: [
              {
                role: "user",
                content:
                  "Peform sentiment analysis on this text, outputting scores between 1 and 10 for anger, fear, happiness, surprise, sadness, and disgust in JSON only, no explanation. " +
                  usableText,
              },
            ],
            model: "gpt-4",
            max_tokens: 1000,
            temperature: 0,
          };

          client
            .post("https://api.openai.com/v1/chat/completions", params)
            .then((result) => {
            this.msg = "Analyzing Emotion of:";
			this.msg2 = usableURL;
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
                '"anger":' +
                this.anger +
                "," +
                '"fear":' +
                this.fear +
                "," +
                '"surprise":' +
                this.surprise +
                "," +
                '"disgust":' +
                this.disgust +
                "," +
                '"sadness":' +
                this.sadness +
                "," +
                '"happiness":' +
                this.happiness +
                "},";
              div.appendChild(p);
              
            })
            .catch((error) => {
              console.log(error);
			this.msg = error
            });
            if (counterTicker2 === ticker2 - 1) {
				setTimeout(() => {
					console.log("Delayed for 5 seconds.");
					this.getMoralFoundations()
				}, 10000);
			}
        }
      }
    },

    getMoralFoundations: function () {
      var workingJSON = document.getElementById("specificAnalysis2").innerText;
      const middleJSON = "[" + workingJSON.slice(0, -1) + "]";
      this.JSON2 = JSON.parse(middleJSON);
      //const usableText = JSON.stringify(this.JSON1[0].text);
      // const dotenv = require("dotenv");
      // dotenv.config();

      if (this.JSON2 != null) {
        console.log("test");
        var i,
          len = this.JSON2.length;
          const ticker3 = this.JSON2.length;
          
        for (i = 0; i < len; i++) {
          const usableURL = this.JSON2[i].url;
          const counterTicker3 = i;
          const angry = this.JSON2[i].anger;
          const happy = this.JSON2[i].happiness;
          const disgusted = this.JSON2[i].disgust;
          const fearful = this.JSON2[i].fear;
          const surprised = this.JSON2[i].surprise;
          const sad = this.JSON2[i].sadness;
          const usableText = this.JSON2[i].text;
          const client = axios.create({
            headers: {
              Authorization: "Bearer " + this.apiKEY,
            },
          });

          const params = {
            messages: [
              {
                role: "user",
                content:
                  "Analyze this text to identify which of the moral foundations that it represents. Include an explanation." +
                  usableText,
              },
            ],
            model: "gpt-4",
            max_tokens: 1000,
            temperature: 0,
          };

          client
            .post("https://api.openai.com/v1/chat/completions", params)
            .then((result) => {
            this.msg = "Analyzing Moral Foundations of:";
			this.msg2 = usableURL;
              console.log(result.data.choices[0].message.content);
              const moralFoundationResults =
                result.data.choices[0].message.content.replaceAll('"', "");
              this.moralFoundationAnalysis = moralFoundationResults.replaceAll(
                "'",
                ""
              );

              var div = document.getElementById("specificAnalysis3");
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
                '"moralFoundation":' +
                '"' +
                this.moralFoundationAnalysis +
                '"' +
                "," +
                '"anger":' +
                angry +
                "," +
                '"fear":' +
                fearful +
                "," +
                '"surprise":' +
                surprised +
                "," +
                '"disgust":' +
                disgusted +
                "," +
                '"sadness":' +
                sad +
                "," +
                '"happiness":' +
                happy +
                "},";
              div.appendChild(p);
			
            })
            .catch((error) => {
              console.log(error);
              this.msg = error
            });
            if (counterTicker3 === ticker3 - 1) {
				setTimeout(() => {
					console.log("Delayed for 5 seconds.");
					this.returnJSON()
				}, 10000);
				}
        }
      }
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
					this.renderVisuals()
				}, 5000);
    },

    renderVisuals: function () {
		document.getElementById("visuals").style.display="block"
		document.getElementById("thinkingIMG").remove();
		let img = document.createElement('img');
		img.src ='https://media.giphy.com/media/QIRDfKwRFXz6nBCQkF/giphy.gif';
		img.setAttribute("id", 'thinkingIMG')
		document.getElementById('terminal').appendChild(img);
      var workingJSON = document.getElementById("specificAnalysis4").innerText;
      this.JSON4 = JSON.parse(workingJSON);
      //const usableText = JSON.stringify(this.JSON1[0].text);
      // const dotenv = require("dotenv");
      // dotenv.config();

      if (this.JSON4 != null) {
        console.log("test");
        var i,
          len = this.JSON4.length;
        for (i = 0; i < len; i++) {
          const usableURL = this.JSON4[i].url;
          const angry = this.JSON4[i].anger;
          const happy = this.JSON4[i].happiness;
          const disgusted = this.JSON4[i].disgust;
          const fearful = this.JSON4[i].fear;
          const surprised = this.JSON4[i].surprise;
          const sad = this.JSON4[i].sadness;
          const moralAnalysis = this.JSON4[i].moralFoundation;

          var div = document.getElementById("visuals");
          var p = document.createElement("div");
          p.innerHTML =
            "<h2>" +
            usableURL + "</h2>" +
            "<h3>Moral Foundations Analysis: </h3>" +
            moralAnalysis +
            "<h3>Emotional Analysis: </h3><ul>" +
            "<li> Anger: " +
            angry +
            "</li>" +
            "<li> Fear: " +
            fearful +
            "</li>" +
            "<li> Surpise: " +
            surprised +
            "</li>" +
            "<li> Disgust: " +
            disgusted +
            "</li>" +
            "<li> Sadness: " +
            sad +
            "</li>" +
            "<li> Happiness: " +
            happy +
            "</li>" +
            "</ul>";
          div.appendChild(p);
          
				setTimeout(() => {
					console.log("Delayed for 1 second.");
					document.getElementById("thinkingIMG").remove();
					this.msg = "Analysis Complete"
					this.msg2 = ""
				}, 5000);
        }
      }
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
#URLInput {
width: 50%;
font-size: 30px;
text-align: center;
background-color: #f7ec59; 
color: #252627;
border: none;
}

#APIinput {
width: 50%;
font-size: 20px;
text-align: center;
background-color: hotpink; 
color: #252627;
border: none;
}
#startButton {
background: #2f4858;
font-size: 30px;
color: white; 
border: none;
}

#startButton:hover{
background: purple;
}

#apiButton {
background: #2f4858;
font-size: 20px;
color: white; 
border: none;
}

#apiButton:hover{
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
#specificAnalysis4 {
  color: purple;
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
