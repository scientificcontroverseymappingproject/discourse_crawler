<template>
  <div id="body" class="dashboard">
  <input id="URLInput">
  <p v-if="!loading" id="loadingContainer">Initializing <br><img id="loading" src="https://media.giphy.com/media/Ky5F5Rhn1WRVZmvE5W/giphy.gif"><br><span id="initialMessage">(Make sure your webcam is facing you.)</span></p>
    <h1 v-if="showProcess" id="mainTitle"> <img id="talking" alt="image of voice waves leaving someone's mouth. Attribution: Speak Icon, by Voysla, 'https://www.flaticon.com/free-icons/speak'" src="talking.png"> {{ msg }} </h1>
		<p v-if="showProcess" id="messageTwo">
			{{ msg2 }} 
		</p>
		<p v-if="showProcess" id="messageThree"> 
			{{ msg3 }} 
		</p>
		
		
		
		
			<footer id="footer">
			<section id="version">Version 0.1 (Beta)<br>
					<div id="bugs">
					<section>If you find a bug please report it here: <a href="https://rowan.co1.qualtrics.com/jfe/form/SV_8AhIsft05UgIUqW">Bug/Error Report Form</a></section>
					
					</div>
			</section>
		</footer>	<!--<p v-if="!showWPM" id="wpm">{{ wpm }} <br><b>Overall Average Words Per Minute</b></p><br>-->
  </div>
</template>

<script>
import paralleldots from 'paralleldots'
import * as rs from 'text-readability'
//import Plotly from 'plotly.js-dist'
//import * as faceapi from 'face-api.js'
export default {
  name: 'publicSpeakingDashboard',
  props: {
  }, 
  data () {
		return {
			msg: 'Discourse Crawler',
			msg2: "An AI-powered tool for performing top-level analysis of websites.",
			msg3: "",
			anger: 0, 
			fear: 0, 
			excitement: 0, 
			boredom: 0, 
			sadness: 0, 
			happiness: 0,
			readability: 0, 
			loading: true, 
			showProcess: true
		}
	},
	
	created: function () {
	
	}, 

	methods: {
	
		begin: function () {
		},
		
		startVolumeMeter: function () {
		
			},
		
		
		getEmotionStats: function () {
		//send transcript data to be evaluated as per emotional content
			const pd = require('paralleldots' || paralleldots)
			pd.apiKey = "hL7rOIhghKLZtrI6w04cFjxVvAOHQ7BiNhjMLAVnMPw";
			pd.emotion(this.workingOutput,"en")
			.then((response) => {
				let obj = JSON.parse(response)
				this.textEmotionData = response.slice(1)
				this.anger = Math.round(obj.emotion.Angry * 100) 
				this.fear = Math.round(obj.emotion.Fear * 100) 
				this.excitement = Math.round(obj.emotion.Excited * 100)
				this.boredom = Math.round(obj.emotion.Bored * 100)
				this.sadness = Math.round(obj.emotion.Sad * 100)
				this.happiness = Math.round(obj.emotion.Happy * 100)
			})
				.catch((error) => {
				console.log(error);
			})
		
		}, 
		
		getReadabilityStats: function () {
			this.readability = rs.gunningFog(this.workingOutput)
			console.log(this.readability + " " + this.workingOutput)
		}, 
	
		reset: function () {
			location.reload()
		}, 
		
		unhideData: function () {
			document.getElementById("rawData").style.display="inline-block"
		}, 
		
		hideData: function () {
			document.getElementById("rawData").style.display="none"
		},
		
		renderData: function() {
		
			const promise1 = new Promise((resolve, reject) => {
				this.setVolume()
				//this.getEmotionStats()
				this.getReadabilityStats()
				this.registerWPM()
				resolve('Data rendered!');
				reject('Data render failed')
			});

			promise1.then(() => {
				this.constructJSON()
				this.visualizeData()
				this.resetWorkingOutput()
				console.log("JSON and charts constructed");
			});
		}, 
		
		constructJSON: function() {		
			this.currentDataObject = '{"time":' + '"' + this.workingTime + '"' + "," + '"wpm":' + '"' + this.wpm + '"' + "," + '"content":' + '"' + this.workingOutput + '"' + "," + '"Angry":' + this.anger + "," + '"Fear":' + this.fear + "," + '"Excited":' + this.excitement + "," + '"Bored":' + this.boredom + "," + '"Sad":' + this.sadness + "," + '"Happy":' + this.happiness + "," + '"volume":' + this.volumeValue + "," + '"readability":' + this.readability + "," + '"faceAnger":' + this.faceAngry + "," + '"faceDisgust":' + this.faceDisgusted + "," + '"faceFear":' + this.faceFearful + "," + '"faceHappiness":' + this.faceHappy + "," + '"faceNeutral":' + this.faceNeutral + "," + '"faceSadness":' + this.faceSad + "," + '"faceSurprise":' + this.faceSurprised + "},"
			var div = document.getElementById('rawData');
			div.innerHTML += this.currentDataObject;
			this.overallDataObject = document.getElementById("rawData").innerHTML
		},
		
		
		pdfResults: function () {
		window.print(); 
		}
		
	}//
}//	
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url('https://fonts.cdnfonts.com/css/lcd');
#textEmotion, #faceEmotion, #voiceEmotion, #wpm {
display: inline-block; 
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
.optionsButton  {
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
background-color: #CBC3E3; 
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
background-color: #CBC3E3; 
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
background-color: #CBC3E3; 
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
background-color: #FFC300; 
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
margin-bottom: 0px
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
display: none; 
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
color:  #222831; 
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
color:  #222831; 
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
font-family: 'LCD', sans-serif;
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

#speakingTime{
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
   content: '';
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

#loading{ 
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