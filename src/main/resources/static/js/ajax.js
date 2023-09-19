var table_pos = [[],[[0]]];
var canvas_item = [[],[],[]];
var table_status = [[]];
var cities = window.location.search;
cities= cities.slice(1);
console.log(cities);
var desksData;
var hash = {};
function getDesksData(){
    
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", '/AllDesksByCity?cities='+cities, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    
    xhttp.onreadystatechange = function(){
        if (xhttp.readyState === 4 && xhttp.status === 200) {
            var test = xhttp.responseText;
            // console.log(test);
            desksData = JSON.parse(test);
            console.log(desksData);
			for(var i = 0; i< desksData.length; i++){
				var deskIdIndex = desksData[i]["deskId"];
				var bookedDate_item = desksData[i]["bookedDate"];
				var bookedName_item = desksData[i]["bookedName"];
				if(typeof table_status[0][hash[deskIdIndex]] == 'undefined'){
					continue;
				}
				table_status[0][hash[deskIdIndex]][bookedDate_item] = bookedName_item;
			}
			getCanvas();
        }
    };
    // xhttp.send("desk_type=desk");
    xhttp.send();
    
    
}
function getDeskpos(){ //Call getDesksData after getting all pos data about the desk
	
	var xhttp = new XMLHttpRequest();
    xhttp.open("GET", '/Deskpos?cities='+cities, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    
    xhttp.onreadystatechange = function(){
        if (xhttp.readyState === 4 && xhttp.status === 200) {
            var test = xhttp.responseText;
            // console.log(test);
            desksData = JSON.parse(test);
            console.log(desksData);
			for(var i = 0; i< desksData.length; i++){ //the last one is deleted index for admin to append
				var desk_id = desksData[i]["desk_id"];
				var date_type = desksData[i]["desk_type"];
				var desk_pos = JSON.parse(desksData[i]["desk_position"]);
				if(desk_id == -1){//Case for deleted index
					//Remove the starting index for empty floor map
					table_pos[1][0]=(desk_pos); //Remove the -1 at the beginning
					continue;
				}
				desk_pos.push(desk_id);
				table_pos[0].push(desk_pos);
				
				//Prepare hash for table_status, laso create an empty array of length = deskpos
				hash[desk_id] = i;
				table_status[0].push({});
			}
			// table_pos[1].push(desksData[desksData.length-1]["desk_position"]);
			getDesksData();
        }
    };
    // xhttp.send("desk_type=desk");
    xhttp.send();
    
}function getCanvas(){
	
	var xhttp = new XMLHttpRequest();
    xhttp.open("GET", '/Canvas?cities='+cities, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    
    xhttp.onreadystatechange = function(){
        if (xhttp.readyState === 4 && xhttp.status === 200) {
            var test = xhttp.responseText;
            // console.log(test);
            desksData = JSON.parse(test);
            console.log(desksData);
			for(var i = 0; i< desksData.length; i++){
				var canvas_id = desksData[i]["canvas_id"];
				var canvas_type = desksData[i]["canvas_type"];
				//console.log(i);
				var canvas_data = JSON.parse(desksData[i]["canvas_data"]);
				
				canvas_item[canvas_type].push(canvas_data);
			}
			main();
        }
    };
    // xhttp.send("desk_type=desk");
    xhttp.send();
    
}

function ajax_handler(){
	getDeskpos();
	
	
}
ajax_handler();