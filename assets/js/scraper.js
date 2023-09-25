function listenForInput() { 
			// Get the input field
			var input = document.getElementById("urlInput");
			// Execute a function when the user presses a key on the keyboard
			input.addEventListener("keypress", function(event) {
				// If the user presses the "Enter" key on the keyboard
				if (event.key === "Enter") {
					// Cancel the default action, if needed
					event.preventDefault();
					// Trigger the function
					var urlToScrape = document.getElementById("urlInput").value;
					
					let currentURL = ""
					
					currentURL = urlToScrape
					
					var div = document.getElementById('terminal');
					var p = document.createElement('h2');
					p.setAttribute("id", 'crawling')
					p.setAttribute("class", 'blink')
					p.innerHTML = "Currently Crawling..."     				
					div.appendChild(p);		
					
					var p = document.createElement('h3');
					p.setAttribute("id", 'crawlingURL')
					p.setAttribute("class", 'blink')
					p.innerHTML = currentURL    				
					div.appendChild(p);	
					
					let img = document.createElement('img');
					img.src ='https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaWJkNWVzYWNubngxZ2c3cGwwZmd3dmY4dWJ6NTM4enBjcXl1djRxNyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/HN6GLlUsMvue652b2w/giphy.gif';
					img.setAttribute("id", 'thinkingIMG')
					document.getElementById('terminal').appendChild(img);
					
					var url = "https://api.allorigins.win/raw?url=" + 
					encodeURIComponent(urlToScrape) + "&callback=?";
			//HOMEPAGE
					$.get(url, function(response) {  
						console.log("page retrieved");
						var div = document.getElementById('terminal');
         				
         				var p = document.createElement('hr');
         				div.appendChild(p);
         				
         				var p = document.createElement('h1');
						p.innerHTML = urlToScrape     				
         				div.appendChild(p);
         				
         				var p = document.createElement('div');
						p.innerHTML = ""     				
         				div.appendChild(p);
         				
						const parser = new DOMParser();
						const html = parser.parseFromString(response, 'text/html');
						const workingHTML = html
						var p = document.createElement('p');
						workingHTML.querySelectorAll('script, style').forEach(s => s.remove());

						let htmlWithoutScripts = workingHTML.querySelector('body').innerText.trim();
         				p.textContent = htmlWithoutScripts
         				div.appendChild(p);
         				
         				var p = document.createElement('hr');
         				div.appendChild(p);
         				
         				var div = document.getElementById('overallAnalysis')
						var p = document.createElement('h1')
						p.innerHTML = 'Overall Analysis Results'
						div.appendChild(p);
         				
         				
         				var div = document.getElementById('overallAnalysis')
						var p = document.createElement('div')
						p.innerHTML = '<div class="box"><a href="' + urlToScrape + '"><h2>' + urlToScrape + '</h2></a><ul class="emotions"> <h3>EMOTIONS:</h3><li>Happiness</li><li>Sadness</li><li>Fear</li><li>Anger</li><li>Disgust</li><li>Surprise</li></ul><ul class="topics"> <h3>TOPICS:</h3><li>Vaccines</li><li>Safety</li><li>Etc.</li></ul><ul class="foundations"> <h3>MORAL FOUNDATIONS:</h3><li>Care</li><li>Fairness</li><li>Loyalty</li><li>Authority</li><li>Purity</li><li>Equality</li><li>Proportionality</li><li>Liberty</li><li>Honor</li><li>Ownership</li></ul></div>'
						div.appendChild(p);
						
						var anchors = [], l = html.links;
							for(var i=0; i<l.length; i++) {
  							anchors.push(l[i].href);
						}
						
						function removeDuplicates(anchors) {
    						return anchors.filter((item,
       						index) => anchors.indexOf(item) === index);
						}
						
						
						var anchors2 = removeDuplicates(anchors)
						
						var i, len = anchors2.length;
						
												
							for( i = 0; i < len; i++ ) {
    							
    							
    							
    							
    							
										if (anchors2[i].includes(urlToScrape)) {
										
											console.log(anchors2[i]);
    										const domainSpecificUrls = anchors2[i]
    										
											currentURL = anchors2[i]
    							
    										document.getElementById("crawlingURL").remove();
    							
    										var div = document.getElementById('crawling');
											var p = document.createElement('h3');
											p.setAttribute("id", 'crawlingURL')
											p.setAttribute("class", 'blink')
											p.innerHTML = currentURL  				
											div.appendChild(p);	
											
											var urlAgain = "https://api.allorigins.win/raw?url=" + 
											encodeURIComponent(domainSpecificUrls) + "&callback=?";
											
											

											
											$.get(urlAgain, function(response2){
         										const parser = new DOMParser();
												const html = parser.parseFromString(response2, 'text/html');
																														
												const workingHTML = html
												var p = document.createElement('p');
												workingHTML.querySelectorAll('script, style').forEach(s => s.remove());
												
												let htmlWithoutScripts = workingHTML.querySelector('body').innerText.trim();
												
         										$.ajax({
													url: 'https://apis.paralleldots.com/v4/emotion',
													type: 'post',
													data: {
														'api_key': 'hL7rOIhghKLZtrI6w04cFjxVvAOHQ7BiNhjMLAVnMPw', 
														'text': htmlWithoutScripts
													},
													dataType: 'json',
													success: function (data) {
														console.log(data);
														
														let obj = JSON.parse(data)
														const anger = Math.round(obj.emotion.Angry * 10) 
														console.log("anger: " + anger);
														const fear = Math.round(obj.emotion.Fear * 10) 
														const excitement = Math.round(obj.emotion.Excited * 10)
														const boredom = Math.round(obj.emotion.Bored * 10)
														const sadness = Math.round(obj.emotion.Sad * 10)
														const happiness = Math.round(obj.emotion.Happy * 10)
														
														var div = document.getElementById('terminal');
														var p = document.createElement('h1');
														p.textContent = domainSpecificUrls
														div.appendChild(p);
															
														var p = document.createElement('div');
														p.innerHTML = ""     				
														div.appendChild(p);
						
														p.textContent = htmlWithoutScripts
														div.appendChild(p);
																								
														var div = document.getElementById('specificAnalysis')
														var p = document.createElement('h1')
														p.innerHTML = 'Specific Page Analysis Results'
														div.appendChild(p);
												
														if (anger && anger >= 0.5) {
															var angerOutput = "<span style='color:red'><strong>Anger: " + anger + "</strong></span>"
														}
														if (fear && fear >= 0.5) {
															var fearOutput = "<span style='color:yellow'><strong>Fear: " + fear + "</strong></span>"
														}
														if (excitement && excitement >= 0.5) {
															var excitementOutput = "<span style='color:pink'><strong>Excitement: " + excitement + "</strong></span>"
														}
														if (boredom && boredom >= 0.5) {
															var boredomOutput = "<span style='color:brown'><strong>Boredom<: " + boredom + "/strong></span>"
														}
														if (sadness && sadness >= 0.5) {
															var sadnessOutput = "<span style='color:blue'><strong>Sadness: " + sadness + "</strong></span>"
														}
														if (happiness && happiness >= 0.5) {
															var happinessOutput = "<span style='color:orange'><strong>Happiness: " + happiness + "</strong></span>"
														}
												
														var div = document.getElementById('specificAnalysis')
														var p = document.createElement('div')
														p.innerHTML = '<div class="box"><a href="' + domainSpecificUrls + '"><h2>' + domainSpecificUrls + '</h2></a><ul class="emotions"> <h3>EMOTIONS:</h3><li>' + happinessOutput + '</li><li>' + sadnessOutput + '</li><li>' + fearOutput + '</li><li>' + angerOutput + '</li><li>' + boredomOutput + '</li><li>' + excitementOutput + '</li></ul><ul class="topics"> <h3>TOPICS:</h3><li>Vaccines</li><li>Safety</li><li>Etc.</li></ul><ul class="foundations"> <h3>MORAL FOUNDATIONS:</h3><li>Care</li><li>Fairness</li><li>Loyalty</li><li>Authority</li><li>Purity</li><li>Equality</li><li>Proportionality</li><li>Liberty</li><li>Honor</li><li>Ownership</li></ul></div>'
														div.appendChild(p);
												
														document.getElementById("thinkingIMG").remove();
														document.getElementById("crawling").remove();
												
															},
															error: function (xhr, ajaxOptions, thrownError) {
																console.log(xhr.status);
																console.log(thrownError);
															}
														});
											});	//subpage GET
										
										
										
										
										
										
											// useful utility for forming calls: https://curlconverter.com/javascript-jquery/		
										 // else if (!domainSpecificUrls.includes("http")) {
// 										
// 											if (!domainSpecificUrls.includes("///")) {
// 		    										urlToScrape = urlToScrape.replace(/\/$/, '');
// 		         									domainSpecificUrls = urlToScrape + domainSpecificUrls
// 		         									let img = document.createElement('img');
// 								img.src ='https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExd2Vpb21pems1eWpqbDU4ODA2bDN2YzdxcDNqd254bG81eWFnNzFneiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/FnDyWPGGkg10TwiqCq/giphy.gif';
// 								img.setAttribute("id", 'thinkingIMG')
// 								document.getElementById('terminal').appendChild(img);
// 						
// 									var urlAgain = "https://api.allorigins.win/raw?url=" + 
// 									encodeURIComponent(domainSpecificUrls) + "&callback=?";
//          							$.get(urlAgain, function(response2) { 
//          							
// 										var div = document.getElementById('terminal');
// 										var p = document.createElement('h2');
// 										p.setAttribute("id", 'crawling')
// 										p.setAttribute("class", 'blink')
// 										p.innerHTML = "crawling"     				
// 										div.appendChild(p);
// 										var p = document.createElement('h1');
// 										p.textContent = domainSpecificUrls;
// 										div.appendChild(p);
// 										
// 										
// 										console.log(response2);
// 										var div = document.getElementById('terminal');
// 						
// 										var p = document.createElement('div');
// 										p.innerHTML = ""     				
// 										div.appendChild(p);
// 						
// 										const parser = new DOMParser();
// 										const html = parser.parseFromString(response2, 'text/html');
// 						
// 										const workingHTML = html
// 										var p = document.createElement('p');
// 										workingHTML.querySelectorAll('script, style').forEach(s => s.remove());
// 
// 										let htmlWithoutScripts = workingHTML.querySelector('body').innerText.trim();
// 										p.textContent = htmlWithoutScripts
// 										div.appendChild(p);
// 								document.getElementById("crawling").remove();
//          						document.getElementById("thinkingIMG").remove();
//          							});	//subpage GET
// 		         							}
// 		         						}
								}
         					}//loop through URLS
							
							
					});//hommepage GET
				}
			});//keypress
			

				
}	