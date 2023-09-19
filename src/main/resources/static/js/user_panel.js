var icons = [];
for(var i =0; i < 9; i++){ //Total of 9 icons
	icons[i] = new Image;
	icons[i].src = "./js/icons/"+(i)+".png";
	icons[i].id = i;
	icons[i].width = 20;
	icons[i].height = 20;
}
	var index_item = []; // array of index of the selected item
	var user_name;
	//GET username from body /api/username
	$("<div>").load("/api/username body", function (data) {
	user_name = data;
	});

	function main(){

	// console.log(table_status);
	
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');
	var container = document.getElementById("container");
	var date = "";

	var nowDate = document.getElementById('selectDate');


	var cursorX;
	var cursorY;
	var offset_x = canvas.offsetLeft;
	var offset_y = canvas.offsetTop +document.getElementById("toollist").offsetHeight;

	canvas.style.background = "#f8f9fa";
	var table_counter=1;
	var size = 10; // block size
	var size = 10; // block size
	var padding = 5; //Padding, Offset for the grid
	var margin = 3;
	var icon_size = 2; //It would take 2*2 grid
	var index = -1; //Index of the selected item
	

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
			container.removeChild(container.firstChild);
		}
	}
	function isDeskAvailable(i){ //Set the corresponding img according to the data
			if(table_pos[0][i][3] >= 10){
				return "./js/icons/"+table_pos[0][i][3]+".png";
			}
			var imgSrc = "./js/icons/0"+table_pos[0][i][3]+".png";

				if(typeof table_status[0][i][date]  !== 'undefined'){

					imgSrc = "./js/icons/1"+table_pos[0][i][3]+".png";
					if(table_status[0][i][date] != 0){
						imgSrc = "./js/icons/2"+table_pos[0][i][3]+".png";
					}
				}
				//console.log(imgSrc);
			return imgSrc;
		}
	function desk_creation(type, pos){ //overlap desk icon on canvas, 'type' uses for user search function, pos for drawing function, filter the desk at i index

		var html_inner_desk = [];
		desk_removal();

		for (var i = 0; i < table_pos[0].length; i++) {
			if(i == pos || (type !=-1 && table_pos[0][i][3] != type)){ //Draw desk type that user selected
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
			html_inner_desk[i].addEventListener("click", desk_selection_user); //Will be implemented in desk editing tool

		}

	}
	function desk_selection_booker(){ //Function for showing grey desk info only

			index = parseInt(this.id.slice(4));
			if (typeof table_status[0][index][date] !== 'undefined') { //if desk is booked

				// console.log(table_status[0][index], index);
				if (table_status[0][index][date] == "0") {
					return;
				}
				var toollist = document.getElementById("toollist");
				var text_to_user = document.createElement("p");
				text_to_user.innerHTML = "The desk is booked by " + table_status[0][index][date];
				toollist.appendChild(text_to_user);
				setTimeout(function () {
					toollist.removeChild(text_to_user)
				}, 3000);//delete the message after 3s
				return;
			}

	}
	function desk_selection_user(){ //Desk selection for desk booking, fill in form if user click into it

		console.log(index);
		if(index != -1){
			container.childNodes[index].lastChild.src = isDeskAvailable(index);
		}
		if(index == -1 || typeof this.id  !== 'undefined') {
			index = parseInt(this.id.slice(4));
		}
		// console.log(table_status[0][index] );
		if(typeof table_status[0][index][date] !== 'undefined'){ //if desk is booked
			if(table_status[0][index][date] == "0"){
				return;
			}
			var toollist = document.getElementById("toollist");
			var text_to_user = document.createElement("p");
			text_to_user.innerHTML = "The desk is booked by "+ table_status[0][index][date];
			toollist.appendChild(text_to_user);
			setTimeout(function(){toollist.removeChild(text_to_user)}, 3000 );//delete the message after 3s
			return;
		}
		if(table_pos[0][index][3] >= 10 || table_counter>=4){
			return;
		}
		if(isArrayRepeat(index_item, index, date)){ // if this desk is selected
			return;
		}
		var desk_details = [table_pos[0][index][4], date, user_name, cities];
		index_item.push(desk_details);
		var table = document.createElement("table");
		var row = [];
		var table_item = [];
		container.childNodes[index].lastChild.src = "./js/icons/3"+ table_pos[0][index][3]%10+".png";
		var title = document.createElement("caption");
		title.innerHTML ="Select up to 3 desks to queue";
		table.appendChild(title);
		//first click desk,show one desk info
		if(table_counter === 1){
			// the first line of table, the table title
			row[0] = document.createElement("tr");
			table_item[0] = document.createElement("td");
			table_item[0].innerHTML  = "Selected desk";
			table_item[1] = document.createElement("td");
			table_item[1].innerHTML  = "Date";
			table_item[2] = document.createElement("td");
			table_item[2].innerHTML  = "Booking";

			row[0].appendChild(table_item[0]);
			row[0].appendChild(table_item[1]);
			table.appendChild(row[0]);
			// the second line of table
			row[1] = document.createElement("tr");
			table_item[3] = document.createElement("td");
			var index_button = document.createElement("button");
			index_button.id = index;
			index_button.innerHTML = "No. " + table_pos[0][index][4];
			table_item[4] = document.createElement("td");
			table_item[4].innerHTML = date;
			table_item[5] = document.createElement("td");
			var cancel_button = document.createElement("button");
			cancel_button.innerHTML = "Cancel";

			table_item[3].appendChild(index_button);
			table_item[5].appendChild(cancel_button);
			row[1].appendChild(table_item[3]);
			row[1].appendChild(table_item[4]);
			row[1].appendChild(table_item[5]);
			table.appendChild(row[1]);

			document.getElementsByClassName("column_right")[0].appendChild(table);
		}
		//next click desk ,add other line in table
		if (table_counter > 1) {
			//the next line of table
			row[table_counter + 1] = document.createElement("tr");
			table_item[table_counter*3] = document.createElement("td");
			var index_button = document.createElement("button");
			index_button.id = index; 
			index_button.innerHTML = "No. " + table_pos[0][index][4];
			table_item[table_counter*3 + 1] = document.createElement("td");
			table_item[table_counter*3 + 1].innerHTML = date;
			table_item[table_counter*3 + 2] = document.createElement("td");
			var cancel_button = document.createElement("button");
			cancel_button.innerHTML = "Cancel";

			row[table_counter + 1].appendChild(table_item[table_counter*3]);
			row[table_counter + 1].appendChild(table_item[table_counter*3 + 1]);
			row[table_counter + 1].appendChild(table_item[table_counter*3 + 2]);
			table_item[table_counter*3].appendChild(index_button);
			table_item[table_counter*3 + 2].appendChild(cancel_button);
			var table_add = document.getElementsByTagName("table")[0];
			table_add.appendChild(row[table_counter + 1]);

		}
		index_button.addEventListener("click", showDesk);
		cancel_button.addEventListener("click", cancel);

		function showDesk(){
			var desk_date = this.parentNode.parentNode.childNodes[1].innerHTML;
			date = desk_date;
			nowDate.value = date;
			desk_creation(-1, -1);
			container.childNodes[index].lastChild.src = isDeskAvailable(index); // Initialize the desk color selected last time
			var desk_index = this.id;//The desk_id, index
			container.childNodes[desk_index].lastChild.src = "./js/icons/3"+ table_pos[0][desk_index][3]%10+".png";
			index = desk_index;
		}

		function cancel(){
			var trIndex = this.parentNode.parentNode;
			table_counter -=1;
			index_item.splice(trIndex.rowIndex-1,1);
			document.getElementsByTagName("table")[0].removeChild(trIndex);
			if(table_counter < 2) {
				delete_table();
			}
			desk_creation(-1,-1);
		}

		function isArrayRepeat(arr, item, date){//Determine whether the user has already selected the table
			var isRepeat = false;
			var count = 0;
			for(var i = 0; i < arr.length; i++){
				if(arr[i][0] === table_pos[0][item][4] && arr[i][1] === date){
					count++;
				}
			}
			if(count > 0) {
				isRepeat = true;
			}
			return isRepeat;
		}
		table_counter++;
		showConfirmButton();

	}

	function delete_table(){ // Delete booking table, check whether it is table first
		if(document.getElementsByClassName("column_right")[0].lastChild.tagName == "BUTTON"){
			document.getElementsByClassName("column_right")[0].removeChild(document.getElementsByClassName("column_right")[0].lastChild);
			document.getElementsByClassName("column_right")[0].removeChild(document.getElementsByClassName("column_right")[0].lastChild);
		}
	}

	function showConfirmButton(){
		if(document.getElementsByClassName("column_right")[0].lastChild.tagName == "BUTTON"){
			return;
		}
		var button = document.createElement("button");
		button.innerHTML = "Confirm";
		button.style.marginTop = 50;
		button.addEventListener("click", bookedConfirm);
		document.getElementsByClassName("column_right")[0].appendChild(button);
	}

	function bookedConfirm(){
		sendBookingDetails(index_item);
		//setBookingDetails('/BookingDetails',index_item)
		function sendBookingDetails(item){
			console.log(item);
			var xhttp = new XMLHttpRequest();
			var url = '/BookingDetails';
			xhttp.open("POST", url, true);
			xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xhttp.onreadystatechange = function(){
				if (xhttp.readyState === 4 && xhttp.status === 200) {
					var test = xhttp.responseText;
					var params = item;
					// setBookingDetails(url, params);
					//ajax_handler();
					//window.reload = ;
					location.reload();
				}
			};
			xhttp.send("bookingItem=" + item);
		}
	}

	function setBookingDetails(url, params){
		var temp_form = document.createElement("form");
		temp_form.action = url;
		temp_form.target = "_self";
		temp_form.method = "POST";
		temp_form.style.display = "none";
		// for (var i = 0; i < params.length; i++) {
			var opt = document.createElement("textarea");
			opt.name = "bookingItem";
			opt.value = params;
			temp_form.appendChild(opt);
		// }
		document.body.appendChild(temp_form);
		temp_form.submit();
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


    function booking_detials(){

    }

	function redraw(type, pos){ //Draw grid and all item instead of the type and pos specified
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		// drawBoard();
		draw_all_item(type, pos);

	}
	redraw(-1,-1);


	function select_date(){
		date = nowDate.value;
		// table_counter = 1;
		// index_item = [];
		// delete_table();
		desk_creation(-1, -1);
		index_item = [];
		delete_table();
		table_counter=1;
		var toollist = document.getElementById("toollist");
		while(toollist.lastChild){
			toollist.removeChild(toollist.lastChild);
		}
		check_booked();
	}
	function check_booked(){
		for(var j= 0 ; j < table_status[0].length; j++){
			// console.log(date, table_status[0][j][date]);
			if(table_status[0][j][date] == user_name){
				desk_removal();
				html_inner_desk =[];
				for (var i = 0; i < table_pos[0].length; i++) {
					var newDiv = document.createElement("div");
					var newImg = document.createElement("img");
					html_inner_desk.push(newDiv);
					html_inner_desk[i].id = "desk" + i;
					html_inner_desk[i].style.position = "absolute";
					html_inner_desk[i].style.top = table_pos[0][i][1];
					html_inner_desk[i].style.left = table_pos[0][i][0];
					html_inner_desk[i].style.transform = 'rotate(' + table_pos[0][i][2] + 'deg)';

					newImg.style.width = icon_size * size + 1; //+1 for better visual
					newImg.style.height = icon_size * size + 1;
					container.appendChild(html_inner_desk[i]);
					html_inner_desk[i].appendChild(newImg);
					html_inner_desk[i].firstChild.src = isDeskAvailable(i);
					html_inner_desk[i].addEventListener("click",desk_selection_booker);
					if(i == j){
						html_inner_desk[i].firstChild.src =  "./js/icons/3"+table_pos[0][i][3]+".png";
						html_inner_desk[i].removeEventListener("click",desk_selection_booker);
					}
				}
				var toollist = document.getElementById("toollist");
				var text_to_user = document.createElement("p");
				text_to_user.innerHTML = "You have booked a desk, the desk is coloured purple";
				toollist.appendChild(text_to_user);
				break;
			}
		}
	}
	document.getElementsByClassName('dateSelector_button')[0].addEventListener("click", select_date);
	date_formatting(30);
	desk_creation(-1,-1);
	check_booked();
}
function re(){
	console.log(canvas_item);
}
/*window.onload= function(){
	
    main();
}*/
