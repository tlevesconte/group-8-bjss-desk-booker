var cities = [];
function getCanvas(){

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", '/office', true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhttp.onreadystatechange = function(){
        if (xhttp.readyState === 4 && xhttp.status === 200) {
            var test = xhttp.responseText;
            // console.log(test);
            desksData = JSON.parse(test);
            for(var i = 0; i< desksData.length; i++){
                cities.push(desksData[i].cities);
            }
            main();
        }
    };
    xhttp.send();

}
function main() {
    var admin_page_url = document.getElementById('link').href;
    console.log(admin_page_url);
    var pos_length = cities.length;
    var body = document.getElementsByTagName("body")[0];
    for (var i =0 ; i< Math.floor(pos_length/3)+1; i++){//For each row
        var bic = document.createElement("div");
        bic.className = "row";
        for (var j=3*i; j<Math.min(3*i+3, pos_length);j++){
            var in1 = document.createElement("div");
            in1.className="col-sm-3";
            var in2 = document.createElement("div");
            in2.className="card";
            var card = document.createElement("div");
            card.className="card-body";
            var title = document.createElement("h5");
            title.innerHTML = cities[j];
            var pas = document.createElement("p");
            pas.innerHTML = "This displays the sitting arrangements in "+ cities[j]+" office";
            var but = document.createElement("a");
            but.className= "btn btn-primary";
            but.innerHTML = "Book"
            but.href =admin_page_url+"?"+cities[j];
            card.appendChild(title);
            card.appendChild(pas);
            card.appendChild(but);
            in2.appendChild(card);
            in1.appendChild(in2);
            bic.appendChild(in1);
        }
        body.appendChild(bic);
    }
}
getCanvas();
