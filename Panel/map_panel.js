
var icons = [];//Total of 9 icons, use for sample to create icon in canvas
for(var i =0; i < 9; i++){ 
	icons[i] = new Image;
	icons[i].src = "./icons/"+(i)+".png";
	icons[i].id = i;
	icons[i].width = 20;
	icons[i].height = 20;
}

var table_changes = [{},{}]; //Array that goes to the server
 
function main(){
	var status_copy = JSON.parse(JSON.stringify(table_status)); //Copy for restore
	function table_changes_listener(type, array_item){//array_item: {date, name/0}
	//Send request to server, let server decide what to do
		if(type){//room
			
			
			
		}
		else{ //desk, table_changes[0][index][date] = 0/1/2, 0: block the desk, 1: release the desk, 2: Delete the date to make the desk availiable 3: change the people assign to the desk
			if(typeof table_changes[0][index] !== 'undefined'){ //If there are changes about this desk before
				table_changes[0][index][Object.keys(array_item)[0]] = array_item[Object.keys(array_item)[0]]; //If the date isn't written
				return;
			}
			table_changes[0][index]= array_item;
		}
	}
	var revert = [];//Store the changes, allow admin to revert it
	function array_change_listener(change,array_item){// pos:the pos of item, change:add/delete/change pos
		//Save the change into revert, revert it in another function
		//Store up to 5 changes
		if(revert.length > 4){//there are 5 changes already
			revert.shift(); //Remove the oldest change
		}
		var cache = [tool_sele, index ,change];
		revert.push([cache,array_item]);
	}
	function array_revert(){
		
		if(revert.length == 0){
			return;
		}
		var revert_item = revert.pop();//Get the latest change
		console.log(revert_item);
		if(revert_item[0][0] >= 3){//if the change is about desk, process separately 
			switch (revert_item[0][2]){//mode
				case 0://add
					desk_array_delete(revert_item[0][0]-3,table_pos[revert_item[0][0]-3].length-1);
					break;
				case 1://delete
					table_pos[revert_item[0][0]-3].splice(revert_item[0][1], 0, revert_item[1][0]); //Add the array element back
					table_status[revert_item[0][0]-3].splice(revert_item[0][1], 0, revert_item[1][1]);
					
					var deleted_index = table_pos[2][revert_item[0][0]-3].indexOf(revert_item[1][4]);
					if(deleted_index != -1){
						table_pos[2][revert_item[0][0]-3].splice(deleted_index,1);//Remove the index from deleted index array
					}
					break;			
				case 2://Edit
					table_pos[revert_item[0][0]-3][revert_item[0][1]] = revert_item[1];//Change it back
					break;
					
			}
			desk_creation(-1,-1,true);
			return;
		}
		//revert function for line,icon,text
		switch (revert_item[0][2]){//Changes that admin made
			case 0: //add
				delete_array_item(revert_item[0][0], canvas_item[revert_item[0][0]].length-1);//Delete the item
				break;
			case 1: //delete
				canvas_item[revert_item[0][0]].splice(revert_item[0][1], 0, revert_item[1]);
				break;
			case 2: //Edit
				canvas_item[revert_item[0][0]][canvas_item[revert_item[0][0]].length-1] = revert_item[1];
				break;
		}
		redraw(-1,-1);
	}
	
	function create_gadget(){ //Gadget for admin to save/cancel/revert/change mode
		var revert = document.createElement("img");
		revert.src = "./icons/revert-icon.png";
		revert.width = 50;
		revert.addEventListener("click", array_revert);
		
		var mode = document.createElement("img");
		mode.src = "./icons/detail-icon.png"
		mode.width = 50;
		mode.addEventListener("click", toggle);
		function toggle(){ //Change to (grid/detail) mode
			this.src = "./icons/detail-icon.png";
			detail_mode = !detail_mode;
			if(!detail_mode){
				this.src = "./icons/grid-view.png";
				
			}
			redraw(tool_sele,index);
			if(index == -1){
				return;
			}
			// console.log(tool_sele, index);
			if(tool_sele == 0){
				selected_line_drawer(true);
			}
			
			if(tool_sele == 1){
				ctx.font = canvas_item[1][index][3]+"px Arial";
				ctx.fillStyle = "#ff0000";
				ctx.fillText(canvas_item[1][index][2],canvas_item[1][index][0] ,canvas_item[1][index][1]);
			}
			if(tool_sele == 2){
				ctx.fillStyle = "#ff0000";
				ctx.fillRect(canvas_item[2][index][0],canvas_item[2][index][1], canvas_item[2][index][3], canvas_item[2][index][3]);
				ctx.drawImage(icons[canvas_item[2][index][2]],	canvas_item[2][index][0],canvas_item[2][index][1],canvas_item[2][index][3],canvas_item[2][index][3]);
			}
			
			// remove_all_listener();
			// remove_all_support();
		}
		
		var sub_button = document.createElement("img");
		sub_button.src = "./icons/submit-icon.png";
		sub_button.width = 50;
		sub_button.addEventListener("click", sub_to_ser);
		function sub_to_ser(){
			var xhttp = new XMLHttpRequest();
			var url = '/insertDeskpos';
			xhttp.open("POST", url, true);
			xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xhttp.onreadystatechange = function(){
				if (xhttp.readyState === 4 && xhttp.status === 200) {
					var test = xhttp.responseText;
				}
			};
			xhttp.send("Deskpos=" + JSON.stringify(table_pos));
			
		}
		
		document.getElementsByClassName("column_left")[0].appendChild(revert);
		document.getElementsByClassName("column_left")[0].appendChild(mode);
		document.getElementsByClassName("column_left")[0].appendChild(sub_button);
	}
	
	
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');
	var date = "";
	var container = document.getElementById("container"); //Stores desk 
	var nowDate = document.getElementById('selectDate'); 
	
	var cursorX;
	var cursorY;
	var offset_x = canvas.offsetLeft;
	var offset_y = canvas.offsetTop ;
	
	//Test function
	var detail_mode = true; //Bool for admin to edit position in pixel instead of grid
	
	//Test function
	
	// console.log(offset_x,offset_y)
	document.onmousemove = function(e){
		cursorX = e.pageX-offset_x;
        cursorY = e.pageY-offset_y;
	}
	

	// canvas.style.background = "lightblue"; 
	
	var size = 10; // block size
	var padding = 5; //Padding, Offset for the grid
	var margin = 3;
	var icon_size = 2; //It would take 2*2 grid
	var index = -1; //Index of the selected item
	var tool_sele = -1;
	var colour = ["#ffff00","#ff00ff","#0000ff","#7f00ff","#ff8000", "#00ffff"]; //List of colour for meeting room
	function drawBoard(){ //Gridline for background
		ctx.beginPath();
		for (var i = 0; i <= canvas.width ; i += size) { //Drawing horizontal grid lines
			ctx.moveTo(0.5 + i + padding, padding);
			ctx.lineTo(0.5 + i + padding, canvas.height -padding +1); //Plus 1 for forming corner at bottom right 
		}

		for (var i = 0; i <= canvas.height; i += size) { //Drawing vertical grid lines
			ctx.moveTo(padding, 0.5 + i + padding);
			ctx.lineTo(canvas.width - padding +1, 0.5 + i + padding); //Plus 1 for forming corner at bottom right 
		}
		ctx.strokeStyle = "lightgrey";
		ctx.stroke();
	}
	function date_formatting(days_bf_booking){ //formatting the date
		container.style.position = "absolute";
		container.style.top = offset_y;
		container.style.left = offset_x;
		
		var dateToday = new Date();
		var dateMax = new Date(dateToday);
		dateMax.setDate(dateToday.getDate() + days_bf_booking); // selected max date

		var dateToday_year = dateToday.getFullYear();
		var dateToday_month = ("0" + (dateToday.getMonth() + 1)).slice(-2);
		var dateToday_day = ("0" + dateToday.getDate()).slice(-2);

		var dateMax_year = dateMax.getFullYear();
		var dateMax_month = ("0" + (dateMax.getMonth() + 1)).slice(-2);
		var dateMax_day = ("0" + dateMax.getDate()).slice(-2);
		
		var str = dateToday_year + '-' + dateToday_month + '-' + dateToday_day;//Set format like yyyy-mm-dd
		var strMax = dateMax_year + '-' + dateMax_month + '-' + dateMax_day;

		nowDate.min = str;
		nowDate.max = strMax;
		nowDate.value = str;
		// console.log(str);
		date = str;
	}

	function desk_removal(){//Delete all desk in container
		var container = document.getElementById("container");
		while(container.firstChild){
			// container.childNodes[0].removeEventListener("click", desk_selection_admin);
			// container.childNodes[0].removeEventListener("click",desk_tool_selection);
			container.removeChild(container.firstChild);
		}
	}
	function isDeskAvailable(i){ //Set the corresponding img according to the data
			if(table_pos[0][i][3] >= 10){
				return "./icons/"+table_pos[0][i][3]+".png";
			}
			var imgSrc = "./icons/0"+table_pos[0][i][3]+".png";
				if(typeof table_status[0][i][date]  !== 'undefined'){
					imgSrc = "./icons/1"+table_pos[0][i][3]+".png";
					if(table_status[0][i][date] != 0){
						imgSrc = "./icons/2"+table_pos[0][i][3]+".png";
					}
				}
			
			return imgSrc;
		}
	function desk_creation(desk_type, pos, mode){ //overlap desk icon on canvas, 'type' uses for user search function, pos for drawing function, filter the desk at i index
		//Mode: true for editor, false for default menu
		var html_inner_desk = [];
		
		desk_removal();

		for (var i = 0; i < table_pos[0].length; i++) {
			if((desk_type !=-1 && table_pos[0][i][3] != desk_type)){ //Draw desk type that user selected 
				continue;
			}
			var newDiv = document.createElement("div");
			var newImg = document.createElement("img");
			html_inner_desk.push(newDiv);
			html_inner_desk[i].id = "desk"+i;
			html_inner_desk[i].style.position = "absolute";
			html_inner_desk[i].style.top=table_pos[0][i][1];
			html_inner_desk[i].style.left=table_pos[0][i][0];
			html_inner_desk[i].style.transform='rotate(' + table_pos[0][i][2] + 'deg)';

			newImg.style.width= icon_size*size+1; //+1 for better visual 
			newImg.style.height= icon_size*size+1;
			container.appendChild(html_inner_desk[i]);
			html_inner_desk[i].appendChild(newImg);
			html_inner_desk[i].firstChild.src = isDeskAvailable(i);
			if(mode){
				html_inner_desk[i].addEventListener("click", desk_tool_selection);
			}
			else{
				html_inner_desk[i].addEventListener("click", desk_selection_admin);
			}
			
		}
		for (var i = 0; i < table_pos[1].length; i++){
			var newDiv = document.createElement("div");
			newDiv.id = "room"+i;
			newDiv.style.position = "absolute";
			newDiv.style.top=table_pos[1][i][1];
			newDiv.style.left=table_pos[1][i][0];
			newDiv.style.transform='rotate(' + table_pos[1][i][5] + 'deg)';
			newDiv.style.opacity = "0.6";
			newDiv.style.width= table_pos[1][i][2]; //+1 for better visual 
			newDiv.style.height= table_pos[1][i][3];
			if( table_pos[1][i][6] > 10){
				newDiv.style.backgroundColor = "#ff0000"; //Admin restricted room
			}
			newDiv.style.backgroundColor = colour[table_pos[1][i][6]];
			container.appendChild(newDiv);
			if(mode){ //If in edit tool
				newDiv.addEventListener("click", room_tool_selection);
			}
			else{
				newDiv.addEventListener("click", room_selection_admin);
			}
		}

	}
	function room_tool_selection(){ //Wrapping for room_selection_admin, change the background colour to red 
		// console.log("Previous node:" +index)
		
		if(index != -1){ //Remove the previous node's eventlistener 
			console.log("Previous node:" +index)
			if(index < table_pos[0].length){ //If admin selected desk instead of room
				container.childNodes[index].removeEventListener("mousedown",desk_moving);
				container.childNodes[index].removeEventListener("mouseup", desk_release);
				container.childNodes[index].lastChild.src = isDeskAvailable(index); //Change back to green icon
			}
			else{ //If admin selected desk instead of room
				container.childNodes[index].removeEventListener("mousedown",room_moving);
				container.childNodes[index].removeEventListener("mouseup", room_release);
				if( table_pos[1][index][6] > 10){
					container.childNodes[index].style.backgroundColor = "#ff0000"; //Admin restricted room
				}
				container.childNodes[index].style.backgroundColor = colour[table_pos[1][index][6]];
			}
		}
		
		this.addEventListener("mousedown",room_moving);
		
		this.ondragstart = function() {
			return false;
		};
		index = parseInt(this.id.slice(4))+table_pos[0].length;
		// console.log(index);
		redraw(-1,-1);
		//add ondrag effect
		
		//add delete and changing angle function, onkeypress
		document.addEventListener('keypress', room_rotate);
		document.addEventListener('keyup', room_delete);
		//Change table type / forever restricted, append button in support
		
		
		room_selection_admin();
	}
	function room_selection_admin(){ //Allow admin reserve desk/ modify booked desk
		
		// console.log(index);
		if(index != -1 ){
			// console.log("Previous node:" +index)
			if(index < table_pos[0].length){
				container.childNodes[index].lastChild.src = isDeskAvailable(index);; //Change back to green icon
			}
			else{
				if( table_pos[1][index-table_pos[0].length][6] > 10){
					container.childNodes[index].style.backgroundColor = "#ff0000"; //Admin restricted room
				}
				container.childNodes[index].style.backgroundColor = colour[table_pos[1][index-table_pos[0].length][6]];
			}
		}
		if(index == -1 || typeof this.id  !== 'undefined') { //Case for non desk tool selected
			index = parseInt(this.id.slice(4))+table_pos[0].length;
		}
		container.childNodes[index].style.backgroundColor = "#ff0000"; 
		console.log("Current node:" +index)
		// console.log(index);
		var table = document.createElement("table"); //Table for storing the info of booking
		var row = [];
		var table_item = [];
		if(table_pos[1][index-table_pos[0].length][6] > 10){
			row[0] = document.createElement("tr");
			row[0].innerHTML = "This desk is locked by admin"
			table.appendChild(row[0]);
			delete_table();
			document.getElementsByClassName("column_right")[0].appendChild(table);
			//Append unlock button for admin in support
			return;
		}
		row[0] = document.createElement("tr");
		table_item[0] = document.createElement("td");
		table_item[1] = document.createElement("td");
		table_item[0].innerHTML  = "Date";
		table_item[1].innerHTML  = "Desk"+ table_pos[1][index-table_pos[0].length][4];
		row[0].appendChild(table_item[0]);
		row[0].appendChild(table_item[1]);
		table.appendChild(row[0]);
		// console.log(date)
		var day_check = new Date(date.slice(0,4),date.slice(5,7)-1,date.slice(8));
		
		// console.log(day_check);
		for(var i = 1; i < 8; i++){ //7 days, nned to change for room

			row[i] = document.createElement("tr");
			//show 7days date 
			table_item[2*i] = document.createElement("td");
			table_item[2*i].innerHTML = day_check.getFullYear() + "-"+("0" + (day_check.getMonth() + 1)).slice(-2) + "-"
			+ ("0" + day_check.getDate()).slice(-2);
			
			
			table_item[2*i+1] = document.createElement("td");
			//Show status of booking
			var booking_status = document.createElement("input");
			var reserve_button = document.createElement("button");//Reserve the desk if not yet, delete after click
			var cancel_button = document.createElement("button");//Restore to original setting
			
			booking_status.value = table_status[1][index-table_pos[0].length][table_item[2*i].innerHTML];
			if(table_status[1][index-table_pos[0].length][table_item[2*i].innerHTML] == 0){
				booking_status.value = "Reserved by admin";
				booking_status.disabled = true;
			}
			// reserve_button.innerHTML = "Reserve"
			reserve_button.addEventListener("click", reserve);
			function reserve(){
				this.parentNode.firstChild.value = "Reserved by admin";
				this.parentNode.firstChild.disabled = true;
				this.parentNode.removeChild(this);
			}
			
			if(typeof table_status[1][index-table_pos[0].length][table_item[2*i].innerHTML]  === 'undefined'){
				booking_status.value = "Available";
			}
			table_item[2*i+1].appendChild(booking_status);
			table_item[2*i+1].appendChild(reserve_button);
			table_item[2*i+1].appendChild(cancel_button);
			//Search the date in array for user if j = 1
			row[i].appendChild(table_item[2*i]);
			row[i].appendChild(table_item[2*i+1]);
			
			table.appendChild(row[i]);
			day_check.setDate(day_check.getDate() + 1);
		}
		//Add save and restrict button
		
		// container.childNodes[index].removeEventListener("click", desk_selection_admin);
		// console.log(table_pos[0][index][3]%10);
		delete_table();
		document.getElementsByClassName("column_right")[0].appendChild(table);
		// tr = a row, td inside tr
	}
	function room_adding(){ //Add it later
		var newDiv = document.createElement("div");
		var i = table_pos[1].length;
		newDiv.id = "room"+i;
		newDiv.style.position = "absolute";
		// newDiv.style.top=;
		// newDiv.style.left=;
		newDiv.style.transform='rotate(' + table_pos[1][i][5] + 'deg)';
		newDiv.style.opacity = "0.6";
		// newDiv.style.width= ; 
		// newDiv.style.height= ;
		
		
		desk_creation(-1,-1,true); //redraw to arrage the room and desk
	}
	function room_moving(){ //Allow admind to change the size of the room by dragging, also change x,y position
		
		
		
		
	}
	function room_release(){
		
		
		
	}
	function room_rotate(){
		
		
		
	}
	function room_delete(){
		if(event.which == 46 ){
			// clearInterval(intervalLoop);
			// console.log(table_pos[0][index][4])
			tool_sele = 4;
			array_change_listener(1,[table_pos[1][index-table_pos[0].length],table_status[1][index-table_pos[0].length]]);
			desk_array_delete(1,index-table_pos[0].length);
			document.removeEventListener('keyup', desk_delete);//deleted desk
			// container.childNodes[index].removeEventListener("mousedown", desk_moving);
			container.removeChild(container.childNodes[index]);
			index = -1; 
			// redraw(-1,-1);
			delete_table();
			desk_creation(-1,-1, true);
			
		}
	}
	function desk_adding(){ //Add desk if admin click for new desk
		var newDiv = document.createElement("div");
		var newImg = this.cloneNode();
		var i = table_pos[0].length; //Index of the new item
		newDiv.id = "desk"+i;
		
		var select_table = document.getElementById("support").lastChild;
		var select_index = parseInt(select_table.selectedIndex);
		table_pos[0].push([~~(Math.random()*0.8*w)+1,~~(Math.random()*h*0.8)+1,0, parseInt(this.id.slice(-1)), parseInt(select_table.value)]);
		
		//delete the index when it is used, if it last, add the seleted index +1
		if(select_index == table_pos[2][0].length-1){
			table_pos[2][0].push(parseInt(select_table.value)+1); //Append the next index
			var new_option = document.createElement("option");
			new_option.text = parseInt(select_table.value)+1
			select_table.add(new_option);
		}
		table_pos[2][0].splice(select_index,1);
		select_table.remove(select_index);
		select_table.selectedIndex = table_pos[2][0].length-1; //Select the last index
		
		//array[5] = index in database, allow admin to choose the available index
		table_status[0].push({});
		newDiv.style.position = "absolute";
		newDiv.style.top=table_pos[0][i][1];
		newDiv.style.left=table_pos[0][i][0];
		newDiv.style.transform='rotate(' + table_pos[0][i][2] + 'deg)';

		newImg.style.width= icon_size*size+1; //+1 for better visual 
		newImg.style.height= icon_size*size+1;
		
		newDiv.appendChild(newImg);
		newDiv.addEventListener("click", desk_tool_selection); 
		//Add ondrag effect
		
		container.appendChild(newDiv);
		tool_sele = 3;
		array_change_listener(0,table_pos[0].at(-1));
		check_desk_arr_conse(0);
		desk_creation(-1,-1,true);
	}
	function desk_moving(){
		// console.log(index);
		checker = true;
		//Position checking
		// if(cursorX >= table_pos[0][i][0]|| cursorX <= table_pos[0][i][0]+icon_size*size+1|| cursorY >= table_pos[0][i][1] || 
		// cursorX <= table_pos[0][i][0]+icon_size*size+1){
		this.style.zIndex = 1000; //Make the drag item on top of all other
		this.removeEventListener("click", desk_tool_selection);
		this.addEventListener("mouseup", desk_release);
		// this.removeEventListener("mousedown", desk_moving);
		intervalLoop = setInterval(function(){ //Drag effect display
			if(index != -1){
				ctx.fillStyle = "#ff0000";
				if(detail_mode){ //Draw in pixel 				
					container.childNodes[index].style.left = cursorX-icon_size*size/2;
					container.childNodes[index].style.top = cursorY-icon_size*size/2;		
				}
				else{ //Draw in grid
					var gx = ~~(cursorX/size-(icon_size/2));
					var gy = ~~(cursorY/size-(icon_size/2));
					container.childNodes[index].style.left = gx*size + padding;
					container.childNodes[index].style.top = gy*size + padding;		
				}
				if (cursorX<0||cursorX> canvas.width || cursorY<0 || cursorY >=canvas.height) {//Stop moveing if exceed the canvas
					clearInterval(intervalLoop);
					container.childNodes[index].removeEventListener("mousedown",desk_moving);
					container.childNodes[index].zIndex = 1;
					desk_tool();
					// console.log("nonono");
					checker = false;
				}
			}
			else{
				clearInterval(intervalLoop);
			}
				
		},10); //Set millisecond between each action 
		// }
	}
	function desk_release(){
		this.style.zIndex = 1;
		// console.log(index);
		clearInterval(intervalLoop);
		if(checker){ //Check for whether the cursor exceed the panel, if not, save the desk
			tool_sele = 3;
			array_change_listener(2,JSON.parse(JSON.stringify(table_pos[0][index])));//Deep clone
			console.log(table_pos[0][index]);
			if(detail_mode){
				table_pos[0][index][0] =  cursorX-icon_size*size/2;
				table_pos[0][index][1] =  cursorY-icon_size*size/2;
			}
			else{
				var release_x = ~~ (cursorX / size);
				var release_y = ~~ (cursorY / size);
				table_pos[0][index][0] = release_x*size + padding - icon_size*size/2;
				table_pos[0][index][1] = release_y*size + padding - icon_size*size/2;
			}
			
		}
		index = -1;
		this.removeEventListener("mousedown", desk_moving);
		this.removeEventListener("mouseup", desk_release);
		this.addEventListener("click", desk_tool_selection);
	}
	function desk_rotate(){
		// console.log(index, event.which);
		var increment = 15;//Grid mode change in 15 degree
		if(detail_mode){
			increment = 5; //Change to 5 degree increment if admin in detail mode
		}
		if(event.which == 101){//turn right 'increment' degree if admin press e
			table_pos[0][index][2] = (table_pos[0][index][2]+increment) %360;
			
		}
		if(event.which == 113){//turn left 'increment' degree if admin press q
			var cache = (table_pos[0][index][2]-increment) %360;
			if(cache <0){
				cache = 360+cache;
			}
			table_pos[0][index][2] = cache;
		}
		// console.log(table_pos[0][index][2] );
		container.childNodes[index].style.transform='rotate(' + table_pos[0][index][2] + 'deg)';
	}
	function desk_delete(){ //Delete a desk if admin click delete key
		if(event.which == 46 ){
			// clearInterval(intervalLoop);
			// console.log(table_pos[0][index][4])
			tool_sele = 3;
			array_change_listener(1,[table_pos[0][index],table_status[0][index]]);
			desk_array_delete(0,index);
			document.removeEventListener('keyup', desk_delete);//deleted desk
			// container.childNodes[index].removeEventListener("mousedown", desk_moving);
			container.removeChild(container.childNodes[index]);
			index = -1; 
			// redraw(-1,-1);
			delete_table();
			desk_creation(-1,-1, true);
			
		}
	}
	function check_desk_arr_conse(type){ //Combine the consecutive index at the end of the array
		var cache = table_pos[2][type].at(-1);
		for(var i = table_pos[2][type].length-2; i >-1 ; i--){
			if(cache != table_pos[2][type][i] +1){ //Break if not consecutive
				return;
			}
			cache = table_pos[2][type][i];
			table_pos[2][type].pop();
		}
	}
	function desk_array_delete(type, pos){//type: normal desk/ meeting room, pos: position that want to delete
		var append_index = 0;
		console.log([type,pos]);
		for(var i = table_pos[2][type].length-1; i >-1 ; i--){
			if(table_pos[2][type][i] < table_pos[type][pos][4]){
				append_index = i+1; 
				break;
			}
		}
		var new_option = document.createElement("option");
		var select_table = document.getElementById("support").lastChild;
		if(append_index == table_pos[2][type].length-1){//If it is the last item in the array
			select_table.remove(append_index);
			
		}
		table_pos[2][type].splice(append_index, 0, table_pos[type][pos][4]);//Add the index in sorted array
		
		new_option.text = table_pos[type][pos][4];
		select_table.add(new_option, append_index);
		select_table.selectedIndex = select_table.length-1;
		//Delete the last index if the deleted one is the last;
		//update the index selection tab, add index 
		check_desk_arr_conse(type);
		for(var i = 0; i < table_pos[type].length ; i++){ //Moving index -1
			if(i >= pos){
				table_pos[type][i] = table_pos[type][i+1]; 
				table_status[type][i] = table_status[type][i+1]; 
			}
		}
		
		table_pos[type].pop();
		table_status[type].pop();
	}
		
		
	
	function desk_tool_selection(){ //Wrapping for desk_selection_admin, draw red rect to highlight the desk
		// console.log("Previous node:" +index)
		
		if(index != -1){ //Remove the previous node's eventlistener 
			// console.log("Previous node:" +index)
			if(index < table_pos[0].length){ //If admin selected desk instead of room
				container.childNodes[index].removeEventListener("mousedown",desk_moving);
				container.childNodes[index].removeEventListener("mouseup", desk_release);
				container.childNodes[index].lastChild.src = isDeskAvailable(index); //Change back to green icon
			}
			else{ //If admin selected room instead of desk
				container.childNodes[index].removeEventListener("mousedown",room_moving);
				container.childNodes[index].removeEventListener("mouseup", room_release);
				if( table_pos[1][index-table_pos[0].length][6] > 10){
					container.childNodes[index].style.backgroundColor = "#ff0000"; //Admin restricted room
				}
				container.childNodes[index].style.backgroundColor = colour[table_pos[1][index-table_pos[0].length][6]];
			}
		}
		
		this.addEventListener("mousedown",desk_moving);
		
		this.ondragstart = function() {
			return false;
		};
		index = parseInt(this.id.slice(4));
		// console.log(index);
		redraw(-1,-1);
		//add ondrag effect
		
		//add delete and changing angle function, onkeypress
		document.addEventListener('keypress', desk_rotate);
		document.addEventListener('keyup', desk_delete);
		//Change table type / forever restricted, append button in support
		
		
		desk_selection_admin();
	}
	function desk_selection_admin(){ //Allow admin reserve desk/ modify booked desk
		
		// console.log(index);
		if(index != -1 ){
			// console.log("Previous node:" +index)
			if(index < table_pos[0].length){
				container.childNodes[index].lastChild.src = isDeskAvailable(index);; //Change back to green icon
			}
			else{
				if( table_pos[1][index-table_pos[0].length][6] > 10){
					container.childNodes[index].style.backgroundColor = "#ff0000"; //Admin restricted room
				}
				container.childNodes[index].style.backgroundColor = colour[table_pos[1][index-table_pos[0].length][6]];
			}
		}
		if(index == -1 || typeof this.id  !== 'undefined') { //Case for non desk tool selected
			index = parseInt(this.id.slice(4));
		}
		// console.log("Current node:" +index)
		// console.log(index);
		var table = document.createElement("table"); //Table for storing the info of booking
		var row = [];
		var table_item = [];
		container.childNodes[index].lastChild.src = "./icons/3"+ table_pos[0][index][3]%10+".png"; //Change to purple icon
		if(table_pos[0][index][3] >= 10){
			row[0] = document.createElement("tr");
			row[0].innerHTML = "This desk is locked by admin"
			table.appendChild(row[0]);
			delete_table();
			document.getElementsByClassName("column_right")[0].appendChild(table);
			//Append unlock button for admin in support
			return;
		}
		row[0] = document.createElement("tr");
		table_item[0] = document.createElement("td");
		table_item[1] = document.createElement("td");
		table_item[0].innerHTML  = "Date";
		table_item[1].innerHTML  = "Desk"+ table_pos[0][index][4];
		row[0].appendChild(table_item[0]);
		row[0].appendChild(table_item[1]);
		table.appendChild(row[0]);
		// console.log(date)
		var day_check = new Date(date.slice(0,4),date.slice(5,7)-1,date.slice(8));
		
		// console.log(day_check);
		for(var i = 1; i < 8; i++){ //7 days

			row[i] = document.createElement("tr");
			//show 7days date 
			table_item[2*i] = document.createElement("td");
			var following_date = day_check.getFullYear() + "-"+("0" + (day_check.getMonth() + 1)).slice(-2) + "-"
			+ ("0" + day_check.getDate()).slice(-2);
			table_item[2*i].innerHTML = following_date;
			
			table_item[2*i+1] = document.createElement("td");
			//Show status of booking
			var booking_status = document.createElement("input");
			var reserve_button = document.createElement("button");//Reserve the desk if not yet, delete after click
			var cancel_button = document.createElement("button");//Restore to original setting

			booking_status.value = table_status[0][index][table_item[2*i].innerHTML];
			if(table_status[0][index][table_item[2*i].innerHTML] == 0){
				booking_status.value = "Reserved by admin";
				booking_status.disabled = true;
			}
			// reserve_button.innerHTML = "Reserve"
			reserve_button.addEventListener("click", reserve);
			reserve_button.id = following_date;
			function reserve(){
				if(this.parentNode.firstChild.disabled == false){
					// table_changes[0][table_changes[0].length] = [table_pos[0][index][4], 0, [this.id,0]];
					table_status[0][index][this.id] = 0;
					// console.log(table_status[0][index]);
					var cache = {};
					cache[this.id] = 0;
					table_changes_listener(false, cache, 0);
					this.parentNode.firstChild.value = "Reserved by admin";
					this.parentNode.firstChild.disabled = true;
					// this.parentNode.removeChild(this);
				}
				else{ //If the desk is already restricted
					this.parentNode.firstChild.disabled = false;
					var cache = {};
					cache[this.id] = 1;
					table_changes_listener(false, cache); //release the desk
					// console.log(table_status[0][index][this.id], status_copy[0][index][this.id]);
					table_status[0][index][this.id] = status_copy[0][index][this.id];
					
					if(table_status[0][index][this.id] == 0){ //If it was an admin restricted desk, remove the restriction, make it available
						delete table_status[0][index][this.id];
					}
					this.parentNode.firstChild.value = table_status[0][index][this.id];
					// table_changes[0][table_changes[0].length] = [table_pos[0][index][4], 1, [this.id]];
					if(typeof table_status[0][index][this.id]  === 'undefined'){
						this.parentNode.firstChild.value = "Available";
					}
					
				}
			}
			cancel_button.addEventListener("click", cancel);
			cancel_button.id = following_date;
			function cancel(){
				var cache = {};
				cache[this.id] = 2;
				table_changes_listener(false, cache); //cancel the desk booking
				delete table_status[0][index][this.id];
				this.parentNode.firstChild.value = "Available";
				this.parentNode.firstChild.disabled = false;
				
			}
			if(typeof table_status[0][index][table_item[2*i].innerHTML]  === 'undefined'){
				booking_status.value = "Available";
			}
			booking_status.id = following_date;
			booking_status.addEventListener("change", name_input);
			booking_status.addEventListener("focus", remove_name); //Remove default name if admin start editing
			booking_status.addEventListener("focusout", return_default_name);
			function name_input(){
				table_status[0][index][this.id]= this.value;
				var cache = {};
				cache[this.id] = this.value;
				table_changes_listener(false, cache);
			}
			function remove_name(){
				this.value = "";
			}
			function return_default_name(){
				// console.log("QAQ");
				if(typeof table_status[0][index][this.id]  === 'undefined'){
					this.parentNode.firstChild.value = "Available";
					// this.parentNode.firstChild.value = "Available";
					return;
				}
				this.value = table_status[0][index][this.id];
				// this.value = table_status[0][index][this.id];
			}
			table_item[2*i+1].appendChild(booking_status);
			table_item[2*i+1].appendChild(reserve_button);
			table_item[2*i+1].appendChild(cancel_button);
			//Search the date in array for user if j = 1
			row[i].appendChild(table_item[2*i]);
			row[i].appendChild(table_item[2*i+1]);
			
			table.appendChild(row[i]);
			day_check.setDate(day_check.getDate() + 1);
		}
		//Add save and restrict button
		
		
		// container.childNodes[index].removeEventListener("click", desk_selection_admin);
		// console.log(table_pos[0][index][3]%10);
		delete_table();
		document.getElementsByClassName("column_right")[0].appendChild(table);
		// tr = a row, td inside tr
		
		
	}
	function delete_table(){ // Delete booking table, check whether it is table first
		if(document.getElementsByClassName("column_right")[0].lastChild.tagName == "TABLE"){
			document.getElementsByClassName("column_right")[0].removeChild(document.getElementsByClassName("column_right")[0].lastChild);
		}
	}
	function draw_all_item(type, pos){ //Drawing all item in canvas, except specified type, pos
		ctx.beginPath();
		for(var i = 0; i< canvas_item[0].length; i++){//Drawing line
			if(type == 0 && i == pos){
				continue;//jump this iteration if no need to paint
			}
			ctx.moveTo(canvas_item[0][i][0],canvas_item[0][i][1]);
			ctx.lineTo(canvas_item[0][i][2],canvas_item[0][i][3]);
		}
		ctx.strokeStyle = '#000000';
		ctx.stroke();
		ctx.closePath();
		
		
		for(var i = 0; i < canvas_item[1].length; i++){//Writing text
			if(type == 1 && pos == i){
				continue;
			}
			ctx.font = canvas_item[1][i][3]+"px Arial";
			ctx.fillStyle = "#000000";
			ctx.fillText(canvas_item[1][i][2], canvas_item[1][i][0], canvas_item[1][i][1]);
		}
		
		for(var i = 0; i < canvas_item[2].length; i++){
			if(type == 2 && pos == i){
				continue;
			}
			ctx.drawImage(icons[canvas_item[2][i][2]],	canvas_item[2][i][0],canvas_item[2][i][1],canvas_item[2][i][3],canvas_item[2][i][3]);

		}
	}
	
	function redraw(type, pos){ //Draw grid and all item instead of the type and pos specified
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		if(!detail_mode){
			drawBoard();
		}
		draw_all_item(type, pos);
		
	}
	
	
	// how many cells fit on the canvas
	var w = ~~ (canvas.width / size);
	var h = ~~ (canvas.height / size);

	var firstClick = [0,0];
	var intervalLoop = null;
	var checker  = true;
	var text_cache;
	function line_table(){ //Create table for displaying parameter of line
		delete_table();
		var table = document.createElement("table");
		var row = [];
		var table_item = [];
		for(var i = 0 ; i < 4; i++){
			row[i] = document.createElement("tr")
			for (var j = 0 ; j < 3; j++){
				table_item[i*3+ j] = document.createElement("td");
				if(i> 0 && j >0){
					table_item[i*3+ j].id = "y"+i; //Else case, j = 2, y index;
					if(j == 1){
						table_item[i*3+ j].id = "x"+i; //If j = 1, x index
					}
					
				}
				table_item[i*3+ j].width = "100";
				row[i].appendChild(table_item[i*3+j]);
			}
			table.appendChild(row[i]);
		}
		table_item[1].innerHTML = "X";
		table_item[2].innerHTML = "Y";
		table_item[3].innerHTML = "Start";
		table_item[6].innerHTML = "End";
		table_item[9].innerHTML = "Length";
		row[4] = document.createElement("tr");
		var comment = document.createElement("td"); //Use for giving alarm to the admin
		comment.colSpan = "3";
		row[4].appendChild(comment);
		table.appendChild(row[4]);
		table.width = "400";
		document.getElementsByClassName("column_right")[0].appendChild(table);
	}
	function line_table_update(x1,x2,y1,y2){ //Changes create table's parameter
		if(document.getElementsByClassName("column_right")[0].lastChild.tagName == "TABLE"){
			if(Math.abs(x1-x2)+ Math.abs(y1-y2)>=10){
				var start = 0;
				var angle = Math.atan(Math.abs(y1-y2)/ Math.abs(x1-x2))
				var ending = angle;
				var rev = false;
				var dot_x = x1;
				var angle_x = x1;
				var angle_y = y1;
				if(x2>x1){
					angle_x+=10; //Default East to south case
					angle_y +=10;
					if(y1>y2){ //East to north
						
						ending = 2*Math.PI - ending;
						rev = true;
						angle_y -=15;
					}
					dot_x +=30;
				}
				else{
					start = Math.PI; //Default West to north case
					ending = Math.PI + ending;
					angle_x -= 35;
					angle_y -=5;
					if(y1<y2){ //West to south
						ending = 2* Math.PI - ending  ;
						rev = true;
						angle_y +=15;
					}
					dot_x -=30;
				}
				//Display the angle of the line toward horizontal line
				ctx.font = "10px Arial";
				ctx.fillText((angle*180/Math.PI).toFixed(1)+"\xB0",angle_x, angle_y);
				
				//Draw the horizontal line
				ctx.beginPath();
				ctx.setLineDash([5, 3]);
				ctx.moveTo(x1,y1);
				ctx.lineTo(dot_x,y1);
				ctx.stroke();
				
				//Draw circle to display the angle
				ctx.setLineDash([]);
				ctx.beginPath();
				ctx.fillStyle = "#000000";
				ctx.arc(x1,y1, 10, start, ending, rev);
				ctx.stroke();
				
				//Display the pixel pos of the line
				document.getElementsByClassName("column_right")[0].lastChild.lastChild.lastChild.innerHTML = "This line is good";
				document.getElementById("x1").innerHTML = x1;
				document.getElementById("x2").innerHTML = x2;
				document.getElementById("x3").innerHTML = Math.abs(x2-x1);
				document.getElementById("y1").innerHTML = y1;
				document.getElementById("y2").innerHTML = y2;
				document.getElementById("y3").innerHTML = Math.abs(y2-y1);
				return;
			}
			//If the line is too 
			document.getElementById("x1").innerHTML = x1;
			document.getElementById("x2").innerHTML = "N/A";
			document.getElementById("x3").innerHTML = Math.abs(x2-x1);
			document.getElementById("y1").innerHTML = y1;
			document.getElementById("y2").innerHTML = "N/A";
			document.getElementById("y3").innerHTML = Math.abs(y2-y1);
			document.getElementsByClassName("column_right")[0].lastChild.lastChild.lastChild.innerHTML = "The line is too short, please ensure the length is at lease 10px"
		}
	}
	function editing_grid(){ //Editing exiting line
		// console.log("calling editing")
		document.removeEventListener('keyup', line_delete);
		return grid_start_click(false);
	}
	function adding_grid(){ //Adding new line
		line_table();
		return grid_start_click(true);
	}
	function grid_start_click(mode) { //true for new line drawing, false for edit line
		checker = true;

		
		var gx = ~~ (cursorX / size)*size+padding; //Get the grid related to the pixel in click
		var gy = ~~ (cursorY / size)*size+padding;
		if(detail_mode){
			gx = cursorX;
			gy = cursorY;
		}
		// console.log(mode);
		if(!mode){//Check if the user click for the knob
			if(index < 0){
				return
			}
			// get mouse click position (init pos)
			// console.log("editing line")
			if(dist_sqr(cursorX,canvas_item[0][index][0] , cursorY,canvas_item[0][index][1] ) <= 10){ //if the edge and cursor is within 10px 
				gx = canvas_item[0][index][2];	//Make the other end of line be stationary 
				gy = canvas_item[0][index][3];
				canvas.addEventListener('mouseup', edit_stop_click, false);
			}
			else if(dist_sqr(cursorX,canvas_item[0][index][2] , cursorY,canvas_item[0][index][3] ) <= 10){
				gx = canvas_item[0][index][0]; //Make the other end of line be stationary 
				gy = canvas_item[0][index][1];
				canvas.addEventListener('mouseup', edit_stop_click, false);
			}
			else{
				return;
			}
		}
		
		firstClick = [gx, gy]; //Save the grid block in first click, for drawing line from there
		
		// console.log(firstClick);
		// make sure we're in bounds
		if (cursorX<0||cursorX> canvas.width || cursorY<0 || cursorY >=canvas.height) {
			return;
		}
		intervalLoop = setInterval(function(){ //Drag effect display
			
			if(mode){
				line_drawing();
			}
			else if(index >= 0){ //Selected line drawing
				selected_line_drawer(false);
			}
			if (cursorX >= canvas.width  || cursorX < 0|| cursorY >= canvas.height  || cursorY < 0){
				clearInterval(intervalLoop);
				delete_table();
				console.log(cursorX,cursorY, index);
				console.log("nonono");
				redraw(-1,-1);
				canvas.removeEventListener("mousedown",editing_grid);
				canvas.removeEventListener('mouseup', edit_stop_click);
				checker = false;
			}				
		},10); //Set millisecond between each action 
		
	}
	function grid_stop_click(){ //function when admin release mouse press, finish drawing
		clearInterval(intervalLoop);
		
		if(checker){ //Check for whether the cursor exceed the panel, if not, save the line
			
			var release_x = (~~(cursorX / size))*size+padding;
			var release_y = (~~(cursorY / size))*size+padding;
			if(detail_mode){
				release_x = cursorX;
				release_y = cursorY;
			}
			if((Math.abs(firstClick[0]-release_x)+Math.abs(firstClick[1]-release_y)) >= 10){
				//If length is longer than or equal to 10px
				// console.log("wew");
				line_drawing();
				// console.log(release_x,release_y)
				array_change_listener(0,);
				canvas_item[0].push([firstClick[0],firstClick[1],release_x,release_y]);
			}
			else{
				redraw(-1,-1);
			}
		}
	}
	function edit_stop_click(){ //Line editing release
		clearInterval(intervalLoop);
		if(checker){ //Check for whether the cursor exceed the panel, if not, save the line
			
			selected_line_drawer(false);
			var release_x = ~~ (cursorX / size)*size +padding;
			var release_y = ~~ (cursorY / size)*size + padding;
			if(detail_mode){
				release_x = cursorX;
				release_y = cursorY;
			}
			if((Math.abs(firstClick[0]-release_x)+Math.abs(firstClick[1]-release_y)) >= 10){
				array_change_listener(2,canvas_item[0][index]);
				delete_array_item(0,index);
				canvas_item[0].push([firstClick[0],firstClick[1],release_x,release_y]);
			}
			
			index = -1;
		}
		redraw(-1,-1);
		// console.log("remove editing_grid")
		canvas.removeEventListener("mousedown",editing_grid);
		canvas.removeEventListener('mouseup', edit_stop_click);
		// canvas.addEventListener("click",wall_selection);
	}
	function line_drawing(){ //Function for drawing line in grid
		redraw(-1,-1);
		var release_x = ~~ (cursorX / size)*size +padding;
		var release_y = ~~ (cursorY / size)*size +padding;
		if(detail_mode){
			release_x = cursorX;
			release_y = cursorY;
		}
		line_table_update(firstClick[0],release_x, firstClick[1], release_y);
		ctx.beginPath();
		ctx.moveTo(firstClick[0], firstClick[1]);
		if(release_x< canvas.width && release_y < canvas.height){
			ctx.lineTo(release_x, release_y, 6);
		}
		ctx.strokeStyle = '#000000';
		ctx.stroke();
		
	}

	function dist_sqr(x1,x2,y1,y2){ //Calculating the distance between two point
		return (x1-x2)**2 + (y1-y2)**2;
	}
	function dist_to_line(x1,x2,y1,y2, clickX, clickY){ //Calculating the line and point
		var base = dist_sqr(x1,x2,y1,y2);
		var t = ((clickX - x1)*(x2 - x1)+(clickY - y1)*(y2 - y1))/base;
		t = Math.max(0, Math.min(1, t)); //Lower and higher lim is 0, 1
		return Math.sqrt(dist_sqr(clickX, x1+t*(x2-x1), clickY, y1+t*(y2-y1)))
	}
	
	function wall_selection(){
		
		var clickX = cursorX;
		var clickY = cursorY;
		for(var i = 0; i< canvas_item[0].length; i++){
			// if(dist_to_line(canvas_item[0][i][0],canvas_item[0][i][2],canvas_item[0][i][1], canvas_item[0][i][3], clickX, clickY))
			var cache = [];
			for (var j = 0; j < 4; j ++){
				cache[j] = canvas_item[0][i][j];
			}
			//console.log(dist_to_line(cache[0],cache[2],cache[1],cache[3], clickX, clickY));
			if(dist_to_line(cache[0],cache[2],cache[1],cache[3], clickX, clickY) <= 5){ //If admin selete a line
				line_table(); //Create table to show parameter of the line
				index = i;
				canvas.addEventListener('mousedown', editing_grid);
				document.addEventListener('keyup', line_delete);
				return selected_line_drawer(true);
			}
		}
		index = -1;
		return redraw(-1,-1);
	}
	function selected_line_drawer(mode){//
		
		// ctx.clearRect(0, 0, canvas.width, canvas.height);
		redraw(0,index);
		

		ctx.beginPath();
		if(mode){
			ctx.moveTo(canvas_item[0][index][0],canvas_item[0][index][1]);
			ctx.lineTo(canvas_item[0][index][2],canvas_item[0][index][3]);
		}
		else{
			ctx.moveTo(firstClick[0], firstClick[1]);
			release_x = ~~(cursorX/size)*size+padding;
			release_y = ~~(cursorY/size)*size+padding;
			if(detail_mode){
				release_x = cursorX;
				release_y = cursorY;
			}
			if(release_x< canvas.width && release_y < canvas.height){
				ctx.lineTo(release_x, release_y, 6);
			}
		}
		ctx.strokeStyle = '#FF0000';
		ctx.stroke();
		
		if(mode){
			for (var j = 0; j < 2 ; j++){
				ctx.fillStyle = '#FF0000';
				ctx.beginPath();
				ctx.arc(canvas_item[0][index][2*j], canvas_item[0][index][2*j+1], 2, 0, 2 * Math.PI);
				ctx.closePath();
				ctx.fill();
			}
			line_table_update(canvas_item[0][index][0],canvas_item[0][index][2], canvas_item[0][index][1], canvas_item[0][index][3]);
		}
		else{
			ctx.fillStyle = '#FF0000';
			ctx.beginPath();
			ctx.arc(firstClick[0],firstClick[1], 2, 0, 2 * Math.PI);
			ctx.closePath();
			ctx.fill();
			ctx.beginPath();
			if(detail_mode){
				ctx.arc(cursorX,cursorY, 2, 0, 2 * Math.PI);
			}
			else{
				ctx.arc(~~(cursorX/size)*size+padding,~~(cursorY/size)*size+padding, 2, 0, 2 * Math.PI);
			}
			ctx.closePath();
			ctx.fill();
			line_table_update(firstClick[0],release_x, firstClick[1], release_y);
			
		}
	}
	function line_delete(event){
		if(event.which == 68 || event.which == 46 ){
			array_change_listener(1,canvas_item[0][index]);
			delete_array_item(0,index);
			index = -1;
			redraw();
			document.removeEventListener('keyup', line_delete);
		}
		
	}
	function text_delete(event){
		if(event.which == 46 ){
			array_change_listener(1,canvas_item[1][index]);
			delete_array_item(1,index);
			index = -1;
			redraw();
			canvas.removeEventListener("mousedown",editing_text);
			canvas.removeEventListener('mouseup', stop_edit_text);
			document.removeEventListener('keyup', text_delete);
			document.removeEventListener('keydown', text_changing);
		}
	}
	function icon_delete(event){
		// console.log(event.which );
		
		if(event.which == 68 || event.which == 46){
			array_change_listener(1, canvas_item[2][index]);
			delete_array_item(2,index);
			index = -1;
			redraw();
			document.removeEventListener('keyup', icon_delete);
			document.removeEventListener('keydown', icon_changing);
		}
		
	}
	
	function text_changing(event){
		
		// console.log(event.which, event.key);	
		if(((event.which >= 48) && (event.which < 106)) || event.which == 32 ){
			text_cache += event.key;
		}
		if(event.which == 8){ //Backspace, delete last item in text
			text_cache = text_cache.slice(0,-1);
		}
		if(event.which == 13){ //Enter, save the text
			canvas_item[1][index][2] = text_cache ;
			console.log(text_cache.length)
			if(text_cache.length == 0){ //Delete text node if text is empty
				
				delete_array_item(1,index);
				canvas.removeEventListener("mousedown",editing_text);
				canvas.removeEventListener('mouseup', stop_edit_text);
				document.removeEventListener('keyup', text_delete);
				document.removeEventListener('keydown', text_changing);
				index = -1;
				return;
			}
		}
		if(event.which == 109|| event.which ==189){//Decrease size by 2 px
			if(canvas_item[1][index][3] > 6){ //Limit for smallest
				canvas_item[1][index][3] -=2;
			}
		}
		if(event.which == 107|| event.which ==187){//Increase size by 2 px
			if(canvas_item[1][index][3] < 30){ //Limit for largest
				canvas_item[1][index][3] +=2;
			}
		}
		// console.log(text_cache)
		if(!checker){
			redraw(1,index);
			ctx.fillStyle = "#ff0000";
			ctx.font = canvas_item[1][index][3]+"px Arial";
			ctx.fillText(text_cache,canvas_item[1][index][0] ,canvas_item[1][index][1]);
		}
	}
	function icon_changing(event){
		if(event.which == 109 || event.which ==189){//Decrease size by 2 px
			if(canvas_item[2][index][3] > 10){ //Limit for smallest
				canvas_item[2][index][3] -=2;
			}
		}
		if(event.which == 107|| event.which ==187){//Increase size by 2 px
			if(canvas_item[2][index][3] < 40){ //Limit for largest
				canvas_item[2][index][3] +=2;
			}
		}
		if(!checker){
			redraw(2,index);
			ctx.fillStyle = "#ff0000";
			ctx.fillRect(canvas_item[2][index][0],canvas_item[2][index][1], canvas_item[2][index][3], canvas_item[2][index][3]);
			ctx.drawImage(icons[canvas_item[2][index][2]],	canvas_item[2][index][0],canvas_item[2][index][1],canvas_item[2][index][3],canvas_item[2][index][3]);
		}
	}
	
	function delete_array_item(type,pos){
		for(var i = 0; i < canvas_item[type].length ; i++){
			if(i >= pos){
				canvas_item[type][i] = canvas_item[type][i+1]; 
			}
		}
		canvas_item[type].pop();
	}
	
	function adding_text(){ //function for adding text node
		submit_btn = document.createElement("button");
		submit_btn.innerHTML = "Add New Text";
		input = document.createElement("input");
		document.getElementById("support").appendChild(input);
		document.getElementById("support").appendChild(submit_btn);
		submit_btn.addEventListener("click",add_text_node );
		function add_text_node(){
			if(input.value.length > 0){
				
				canvas_item[1].push([~~(Math.random()*0.8*canvas.width)+1,~~(Math.random()*canvas.height*0.8)+1, input.value,14]); //Default 14px size text
				array_change_listener(0, canvas_item[1].at(-1));
				redraw(-1,-1);
				
			}
		}
	}
	function editing_text(){
		var text_height = ctx.measureText('M').width;
		checker = false;
		// console.log(index);
		if(index <0){
			return;
		}
		if((cursorX <=canvas_item[1][index][0]+ctx.measureText(canvas_item[1][index][2]).width +3)&&(cursorX >=canvas_item[1][index][0] - 3)&&(cursorY >=(canvas_item[1][index][1])-text_height-3)&& (cursorY <=(canvas_item[1][index][1]) +3)){//if the text is within 3pixels
			checker = true;
			canvas.removeEventListener("click", text_selection);
			intervalLoop = setInterval(function(){ //Drag effect display
				redraw(1,index);
				ctx.fillStyle = "#ff0000";
				ctx.font = canvas_item[1][index][3]+"px Arial";
				if(detail_mode){
					ctx.fillText(canvas_item[1][index][2],cursorX- Math.round(ctx.measureText(canvas_item[1][index][2]).width/2),cursorY+ Math.round(text_height/2));
				}
				else{
					// ~~((cursorX-(ctx.measureText(canvas_item[1][index][2]).width/2))/size)*size,(~~((cursorY)+text_height/2)/size)*size
					ctx.fillText(canvas_item[1][index][2],~~((cursorX-(ctx.measureText(canvas_item[1][index][2]).width/2))/size)*size,~~((cursorY+(text_height/2))/size)*size  );
				}
				if (cursorX >= canvas.width  || cursorX < 0|| cursorY >= canvas.height  || cursorY < 0){
					clearInterval(intervalLoop);
					// console.log("nonono");
					redraw(-1,-1);
					checker = false;
				}				
			},10); //Set millisecond between each action 
		}
		
		
		
	}
	function stop_edit_text(){
		if(checker){
			var text_height = ctx.measureText('M').width;
			clearInterval(intervalLoop);
			canvas.removeEventListener("mousedown",editing_text);
			canvas.removeEventListener('mouseup', stop_edit_text);
			if(detail_mode){
				canvas_item[1].push([cursorX- Math.round(ctx.measureText(canvas_item[1][index][2]).width/2), cursorY+ Math.round(text_height/2),canvas_item[1][index][2],canvas_item[1][index][3]])
			}
			else{
				canvas_item[1].push([~~((cursorX-(ctx.measureText(canvas_item[1][index][2]).width/2))/size)*size,~~((cursorY+(text_height/2))/size)*size ,canvas_item[1][index][2],canvas_item[1][index][3]]);
			}
			array_change_listener(2, canvas_item[1][index]);
			delete_array_item(1,index);
			index = -1;
			redraw(-1,-1);
			setTimeout(function(){
				canvas.addEventListener("click", text_selection);
			}, 300); //Delay prevent spaming key
			document.removeEventListener('keyup', text_delete);
			document.removeEventListener('keydown', text_changing);
		}
	}
	function text_selection(){
		var text_height = ctx.measureText('M').width;
		for(var i = 0; i< canvas_item[1].length; i++){
			if((cursorX <=canvas_item[1][i][0]+ctx.measureText(canvas_item[1][i][2]).width +3)&&(cursorX >=canvas_item[1][i][0] - 3)&&(cursorY >=(canvas_item[1][i][1])-text_height-3)&& (cursorY <=(canvas_item[1][i][1]) +3)){//if the text is within 3pixels
				// console.log("selected");
				checker = false;
				redraw(1,i);
				ctx.font = canvas_item[1][i][3]+"px Arial";
				ctx.fillStyle = "#ff0000";
				ctx.fillText(canvas_item[1][i][2],canvas_item[1][i][0] ,canvas_item[1][i][1]);
				
				index = i;
				text_cache = canvas_item[1][index][2];
				document.addEventListener('keyup',text_delete);
				document.addEventListener('keydown', text_changing);
				canvas.addEventListener("mousedown",editing_text);
				canvas.addEventListener('mouseup', stop_edit_text);
				return;
			}
		}
		document.removeEventListener('keyup',text_delete);
		document.removeEventListener('keydown', text_changing);
		
		redraw(-1,-1);
		index = -1;
	}
	function editing_icon(){
		checker = false;
		if(index <0){
			return;
		}
		
		if((cursorX >=canvas_item[2][index][0])&&(cursorX <=canvas_item[2][index][0]+canvas_item[2][index][3] )&&
		(cursorY >=(canvas_item[2][index][1]) ) && (cursorY <=(canvas_item[2][index][1])+canvas_item[2][index][3] )){
			
			checker = true;
			canvas.removeEventListener("click", icon_selection);
			intervalLoop = setInterval(function(){ //Drag effect display
				redraw(2,index);
				ctx.fillStyle = "#ff0000";
				if(detail_mode){
					ctx.fillRect(cursorX-canvas_item[2][index][3]/2 ,cursorY-canvas_item[2][index][3]/2, canvas_item[2][index][3], canvas_item[2][index][3]);
					ctx.drawImage(icons[canvas_item[2][index][2]],	cursorX-canvas_item[2][index][3]/2 ,cursorY-canvas_item[2][index][3]/2, canvas_item[2][index][3], canvas_item[2][index][3]);
				}
				else{
					ctx.fillRect(~~((cursorX-canvas_item[2][index][3]/2)/size)*size + padding ,~~((cursorY-canvas_item[2][index][3]/2)/size)*size + padding, canvas_item[2][index][3], canvas_item[2][index][3]);
					ctx.drawImage(icons[canvas_item[2][index][2]],~~((cursorX-canvas_item[2][index][3]/2)/size)*size + padding ,~~((cursorY-canvas_item[2][index][3]/2)/size)*size + padding, canvas_item[2][index][3], canvas_item[2][index][3]);
				}
				
				if (cursorX >= canvas.width  || cursorX < 0|| cursorY >= canvas.height  || cursorY < 0){
					clearInterval(intervalLoop);
					// console.log("nonono");
					redraw(-1,-1);
					checker = false;
				}				
			},10); //Set millisecond between each action 
		}
		
	}
	function stop_edit_icon(){
		if(checker){
			clearInterval(intervalLoop);
			canvas.removeEventListener("mousedown",editing_icon);
			canvas.removeEventListener('mouseup', stop_edit_icon);
			if(detail_mode){
				canvas_item[2].push([cursorX-canvas_item[2][index][3]/2 ,cursorY-canvas_item[2][index][3]/2,canvas_item[2][index][2], canvas_item[2][index][3]]);
			}
			else{
				canvas_item[2].push([~~((cursorX-canvas_item[2][index][3]/2)/size)*size + padding ,~~((cursorY-canvas_item[2][index][3]/2)/size)*size + padding,canvas_item[2][index][2], canvas_item[2][index][3]]);
			}
			array_change_listener(2, canvas_item[2][index]);
			delete_array_item(2,index);
			index = -1;
			redraw(-1,-1);
			setTimeout(function(){
				canvas.addEventListener("click", icon_selection);
			}, 300);
			document.removeEventListener('keyup', icon_delete);
			document.removeEventListener('keydown', icon_changing);
		}
		
	}
	function icon_creation(){
		canvas_item[2].push([~~(Math.random()*0.8*canvas.width)+1,~~(Math.random()*canvas.height*0.8)+1, parseInt(this.id), 20]);
		array_change_listener(0, canvas_item[2].at(-1));
		redraw(-1,-1);
	}
	function icon_selection(){
		// console.log(cursorX,cursorY)
		for(var i = 0 ; i < canvas_item[2].length; i++){
			
			if(cursorX >= canvas_item[2][i][0] && cursorX<= canvas_item[2][i][0] +canvas_item[2][i][3]
			&& cursorY >= canvas_item[2][i][1] && cursorY <= canvas_item[2][i][1]+ canvas_item[2][i][3]){
				//console.log("KIL:LLLLL");
				checker = false;
				index = i;
				redraw(2,i);
				ctx.fillStyle = "#ff0000";
				ctx.fillRect(canvas_item[2][i][0],canvas_item[2][i][1], canvas_item[2][i][3], canvas_item[2][i][3]);
				ctx.drawImage(icons[canvas_item[2][i][2]],	canvas_item[2][i][0],canvas_item[2][i][1],canvas_item[2][i][3],canvas_item[2][i][3]);
				document.addEventListener('keyup', icon_delete);
				document.addEventListener('keydown', icon_changing);
				canvas.addEventListener("mousedown",editing_icon);
				canvas.addEventListener('mouseup', stop_edit_icon);
				return;
			}
		}
		document.removeEventListener('keyup', icon_delete);
		document.removeEventListener('keydown', icon_changing);
		redraw(-1,-1);
		index = -1;
	}
	function remove_all_listener(){//Everytime admin changes tool, remove all previous listener
		index = -1;
		canvas.removeEventListener("click",wall_selection);
		canvas.removeEventListener('mousedown', adding_grid);
		canvas.removeEventListener('mouseup', grid_stop_click, false);
		canvas.removeEventListener('mouseup', stop_edit_icon);
		canvas.removeEventListener("click", text_selection);
		canvas.removeEventListener("click", icon_selection);
		canvas.removeEventListener("mousedown",editing_icon);
		
		// document.removeEventListener("mousemove", move_to);
		document.removeEventListener('keypress', desk_rotate);
		document.removeEventListener('keyup', desk_delete);
		document.removeEventListener('keyup',text_delete);
		document.removeEventListener('keydown', text_changing);
		document.removeEventListener('keyup', icon_delete);
		document.removeEventListener('keydown', icon_changing);
		canvas.removeEventListener("mousedown",editing_text);
		canvas.removeEventListener('mouseup', stop_edit_text);
		canvas.removeEventListener("mousedown",editing_grid);
		canvas.removeEventListener('mouseup', edit_stop_click);
	}
	function remove_all_support(){//Everytime admin changes tool, remove all support button
		var container = document.getElementById("support");
		while(container.firstChild){
			container.removeChild(container.firstChild);
		}
	}
	function line_tool(){
		tool_sele = 0;
		redraw(-1,-1);
		remove_all_listener();
		remove_all_support();
		desk_removal();
		var add_line = document.createElement("button");
		add_line.innerHTML= "Add new line";
		var edit_line = document.createElement("button");
		edit_line.innerHTML = "Edit existing line";
		function line_editer(){
			delete_table();
			remove_all_listener();
			redraw(-1,-1);
			canvas.addEventListener("click",wall_selection);
		}
		function line_adder(){
			delete_table();
			remove_all_listener();
			redraw(-1,-1);
			canvas.addEventListener('mousedown', adding_grid);
			canvas.addEventListener('mouseup', grid_stop_click, false);
		}
		add_line.addEventListener("click", line_adder );
		edit_line.addEventListener("click", line_editer );
		document.getElementById("support").appendChild(add_line);
		document.getElementById("support").appendChild(edit_line);
	}
	function text_tool(){
		tool_sele = 1;
		redraw(-1,-1);
		remove_all_listener();
		remove_all_support();
		desk_removal();
		delete_table();
		canvas.addEventListener("click", text_selection);
		adding_text();
	}
	function icon_tool(){
		tool_sele = 2;
		redraw(-1,-1);
		remove_all_listener();
		remove_all_support();
		desk_removal();
		delete_table();
		canvas.addEventListener("click", icon_selection);
		var toolbar = document.getElementById("support");
		
		for(var i =0; i < 9; i++){ //Total of 9 icons
			toolbar.appendChild(icons[i]);
			icons[i].addEventListener("click", icon_creation);
		}
	}
	function desk_tool(){
		tool_sele = 3;
		redraw(-1,-1);
		remove_all_listener();
		remove_all_support();
		delete_table();
		desk_creation(-1, -1, true);
		// console.log(container.childNodes );
		// for (var i= 0 ; i< container.childElementCount; i++ ){
			// container.childNodes[i].removeEventListener("click", desk_selection_admin);
			// container.childNodes[i].addEventListener("click", desk_tool_selection); //Create new function for that
			// Onclick function, draw red rect if admin click in, allow to change position or delete
			
			
		// }
		var toolbar = document.getElementById("support");
		for (var i = 0; i < 4; i++){
			var newImg = document.createElement("img");
			newImg.style.width= 2*icon_size*size+1; //+1 for better visual 
			newImg.style.height= 2*icon_size*size+1;
			newImg.src = "./icons/0"+i+".png";
			newImg.id = "demo"+i;
			toolbar.appendChild(newImg);
			newImg.addEventListener("click", desk_adding); //Will be implemented in desk editing tool
		}
		check_desk_arr_conse(0);
		var index_sele = document.createElement("select");
		for (var i =0; i < table_pos[2][0].length; i++){
			var index_option = document.createElement("option");
			index_option.text = table_pos[2][0][i];
			index_sele.options.add(index_option);
			index_sele.selectedIndex = i;
		}
		
		toolbar.appendChild(index_sele);
	}
	function create_toolbar(){
		var toolbar = document.getElementById("toollist");
		var tool = [];
		for(var i=0 ; i<4; i++){
			tool[i] = document.createElement("input");
			tool[i].type = "image";
			tool[i].src = "./icons/ma"+(i+1)+".png";
			tool[i].width = 75;
			tool[i].height = 75;
			toolbar.appendChild(tool[i]);
		}
		tool[0].addEventListener("click", line_tool);
		tool[1].addEventListener("click", text_tool);
		tool[2].addEventListener("click", icon_tool);
		tool[3].addEventListener("click", desk_tool);
	}
	function select_date(){
		redraw(-1,-1);
		delete_table();
		remove_all_listener();
		remove_all_support();
		date = nowDate.value;
		desk_creation(-1, -1,false);
	}
	document.getElementsByClassName('dateSelector_button')[0].addEventListener("click", select_date);
	days_bf_booking = 90; //This will be changed by admin, save to server to limit user's booking date;
	//Should be unlimited for admin
	date_formatting(days_bf_booking);
	desk_creation(-1, -1,false);  
	redraw(-1,-1);
	create_toolbar();
	create_gadget();
}

function re(){
	var size = 10;
	var padding = 5;
	var str = "[";
	for (var i =0 ; i < canvas_item.length; i++){
		str += "\n[";
		for(var j = 0; j < canvas_item[i].length; j ++){
			str += "\n[";
			for(var k = 0; k < canvas_item[i][j].length; k++){
				
				str += canvas_item[i][j][k]
				
				if(k != canvas_item[i][j].length-1){
					str += ","
				}
			}
			str += "]";
			if(j != canvas_item[i].length-1){
				str += ","
			}
		}
		str += "\n]";
		if(i != canvas_item.length-1){
			str += ","
		}
	}
	str += "\n]";
	console.log(str);
	str = "[";
	for (var i =0 ; i < table_pos.length; i++){
		str += "\n[";
		for(var j = 0; j < table_pos[i].length; j ++){
			str += "\n[";
			for(var k = 0; k < table_pos[i][j].length; k++){
				
				str += table_pos[i][j][k]
				
				if(k != table_pos[i][j].length-1){
					str += ","
				}
			}
			str += "]";
			if(j != table_pos[i].length-1){
				str += ","
			}
		}
		str += "\n]";
		if(i != table_pos.length-1){
			str += ","
		}
	}
	console.log(str);
	
	console.log(JSON.stringify(table_status));
	
}
window.onload= main;

