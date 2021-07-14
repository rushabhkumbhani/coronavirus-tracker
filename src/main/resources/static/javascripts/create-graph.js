/*
 * Parse the data and create a graph with the data.
 */
function parseData(createGraph) {
	Papa.parse("https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv", {
		download: true,
		complete: function(results) {
			console.log(results);
			createGraph(results.data);
		}
	});
}

function createGraph(data) {
	var states = [];
	var cases = ["cases"];
	var pre_cases = ["Previous Cases"];

	for (var i = 1; i < data.length; i++) {
		if(data[i][0]== "")
			states.push(data[i][1]);
		else
			states.push(data[i][0]);
		if(i < (data.length)-1)
			cases.push(data[i][(data[0].length)-1]);
		if(i < (data.length)-1)
			pre_cases.push(data[i][(data[0].length)-2]);
	}

	console.log(states);
	console.log(cases);
	console.log(pre_cases);

	var chart = c3.generate({
		bindto: '#chart1',
	    data: {
	        columns: [
	        	pre_cases
	        ]
	    },
	    axis: {
	        x: {
	            type: 'category',
	            categories: states,
	            tick: {
	            	multiline: false,
                	culling: {
                    	max: 30
                	}
            	}
	        }
	    },
	    zoom: {
        	enabled: true
    	},
	    legend: {
	        position: 'right'
	    }
	});

	var chart = c3.generate({
		bindto: '#chart',
		data: {
			columns: [
	        	cases
	        ],
			type: 'bar'
		},
		bar: {
			width: {
				ratio: 1 // this makes bar width 50% of length between ticks
			}
		},
		axis: {
	        x: {
				type: 'category',
	            categories: states,
	            tick: {
	            	multiline: false,
                	culling: {
                    	max: 15
                	}
            	}
	        }
	    },
	    zoom: {
        	enabled: true
    	},
	    legend: {
	        position: 'right'
	    }
	});
}

parseData(createGraph);