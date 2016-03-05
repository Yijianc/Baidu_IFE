/**
 * @description     Baidu IFE 2015 summer training program - vis_qihang
 * @author          Yijian Cao
 * @task         	01
 * @update          2016-03-05
 */

var MONTH = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May.', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'],
	AQI_BAD_MIN = 300,					//Minimum of bad quality
	AQI_COMMON_MIN = 200,				//Minimum of common quality
	AQI_LIGHT_MIN = 100;				//Minimum of light quality

// -------------------------------------------------------------------------
//  A) RANDOM NUMBER GENERATOR FOR AIR QUALITY INDEX SOURCES
// -------------------------------------------------------------------------
//Random number generator according to amount of days in a single month
function randomNum(month) {

	var aqiSourceData = [],					//Air quality data
		numTotal = monthDay(month),
		RANGE = 600;

		//console.log(numTotal);
	for (var i = 0; i < numTotal; i++) {
		aqiSourceData.push(Math.round(Math.random()* RANGE + 1));
	}

	return aqiSourceData;
}

//Pass month parameter and return the total days of the specific month
function monthDay(month){	
	var time= new Date();
	//console.log(time);
	return new Date(time.getFullYear(), month, 0).getDate();
}

// -------------------------------------------------------------------------
//  B) TRANSFER MONTH DATA AND APPEND TO THE DOCUMENT DYNAMICALLY
// -------------------------------------------------------------------------
function transMonthDataFormat(src){

	var outputData = {
		"aqiBad": 0,
		"aqiCommon": 0,
		"aqiLight": 0,
		"aqiGood": 0,
	};

	for (var i = 0, len = src.length; i < len; i++) {
		if (src[i] >= AQI_BAD_MIN) {
			outputData.aqiBad++;
		} else if (src[i] >= AQI_COMMON_MIN) {
			outputData.aqiCommon++;
		} else if (src[i] >= AQI_LIGHT_MIN) {
			outputData.aqiLight++;
		} else {
			outputData.aqiGood++;
		}
	}

	return outputData;
}

function renderMonthChart(month, data) {
	
	var returnHtml = '';

	returnHtml += '<li>';
	returnHtml += month + ': ';
	returnHtml += '<span class="aqi-bad" style="width: ' + data.aqiBad * 20 + 'px"></span>';
	returnHtml += '<span class="aqi-common" style="width: ' + data.aqiCommon * 20 + 'px"></span>';
	returnHtml += '<span class="aqi-light" style="width: ' + data.aqiLight * 20 + 'px"></span>';
	returnHtml += '<span class="aqi-good" style="width: ' + data.aqiGood * 20 + 'px"></span>';
	returnHtml += '</li>';

	return returnHtml;
}

function aqiChartGenerator() {

	var chartHtml = '',
		PASSMONTH = 3,
		d = new Date(),
		month = d.getMonth();

	//console.log(d.getMonth());

	for (var i = PASSMONTH; i > 0; i--) {
			var monthText = MONTH[month],
				singleMonth = randomNum(month + 1),
				monthData = transMonthDataFormat(singleMonth);

			month--;
			chartHtml += renderMonthChart(monthText, monthData);
			
			//console.log(monthText);
	}

	document.getElementById('chart-wrapper').innerHTML = chartHtml;

}

aqiChartGenerator();

function aqiFilter(e) {

	if (!e) {
		e = window.event;
	}
	target = e.target || e.srcElement;
	
	var el = document.getElementsByClassName(target.id.toLowerCase());
	//console.log(el);

	if (target.style.background == '') {
		
		target.style.background = 'gray';

		for (var i = 0, len = el.length; i < len; i++) {
			el[i].style.display = 'none';
		} 
	}
	else {
			target.style.background = '';

			for (var i = 0, len = el.length; i < len; i++) {
				el[i].style.display = 'inline-block';
			}
		}

	//alert(target.style.background);
}

// -------------------------------------------------------------------------
//  C) ADD EVENT LISTENER TO TARGETS
// -------------------------------------------------------------------------
//Add event listener to each click element
var li = document.querySelectorAll('ul.aqi-chart-tooltip li');
//console.log(li);
for (var i = 0, len = li.length; i < len; i++) {
	if (li[i].addEventListener) {
	  li[i].addEventListener('click', function(e){
	    aqiFilter(e);
	  }, false);
	} else {
	  li[i].attachEvent('onclick', function(e){
	    aqiFilter(e);
	  })
	}
}

