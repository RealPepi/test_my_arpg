function drawDrid(outTarget){
	var x = allObjJson['size'][0];
	var y = allObjJson['size'][1];

    ctxHid.clearRect(0, 0, canvasMap.width, canvasMap.height);
    ctxHid.beginPath();
    ctxHid.drawImage(img["background"], 0, 0, size * x, size * y);
    for(var i in allObjJson["object"]) {
		if(i == outTarget) {
			continue;
		}
		var target = allObjJson["object"][i];
		ctxHid.drawImage(img[i], (target[0] - 1) * size, (target[1] - 1) * size, size, size);
	}
	for(var i = 0; i <= y; i++) {
		ctxHid.moveTo(0, i * size);
		ctxHid.lineTo(x * size, i * size);
	}
	for(var i = 0; i <= x; i++) {
		ctxHid.moveTo(i * size, 0);
		ctxHid.lineTo(i * size, y * size);
	}
}
function realXY(x, y) {
	var rect = canvasMap.getBoundingClientRect();
	var target = allObjJson["size"];
	var rx = (x - centerPoint.x + (rect.right - rect.left) * scale / 2) / scale;
	var ry = (y - centerPoint.y + (rect.bottom - rect.top) * scale / 2) / scale;
	return([rx,ry]);
}

function newMap(){
	allObjJson = {};
	allObjJson["name"] = prompt('輸入地圖名稱',"myMap");
	allObjJson["size"] = [];

	do {
		allObjJson["size"][0] = parseInt(prompt('輸入地圖X軸格數',"10"));
	} while(isNaN(allObjJson["size"][0]));

	do {
		allObjJson["size"][1] = parseInt(prompt('輸入地圖Y軸格數',"10"));
	} while(isNaN(allObjJson["size"][1] == NaN));
	
	allObjJson["src"] = prompt('輸入地圖背景連結','');
	allObjJson["object"] = {};

	socket.emit('create_map', allObjJson);

	var sizeX = canvasMap.width / (allObjJson["size"][0]);
	var sizeY = canvasMap.height / (allObjJson["size"][1]);
	size = (sizeX < sizeY)? sizeX: sizeY;

    centerPoint = {"x":allObjJson["size"][0]*sizeX/2,"y":allObjJson["size"][1]*sizeY/2};
	img = {};
	img["background"] = new Image();
	img["background"].src = allObjJson["src"];
	scale = 1;
	drawDrid("");
	ctxHid.stroke();
	drawMagnifier(canvasMapHid);
}

socket.on('connected', function(package) {
	allObjJson = package["all_obj_json"];
	socket.emit("create_map", package["all_obj_json"]);

	for(i in package["chat_record"]["major"]) {
		var chat = document.getElementById('major_chat_lobby');
		chat.innerHTML += "<div>" + package["chat_record"]["major"][i] + "</div>";
		chat.scrollTop = chat.scrollHeight;
	}

	for(i in package["chat_record"]["gossip"]) {
		var chat = document.getElementById('gossip_chat_lobby');
		chat.innerHTML += "<div>" + package["chat_record"]["gossip"][i] + "</div>";
		chat.scrollTop = chat.scrollHeight;
	}
});

socket.on('receive_create_map', function(new_allObjJson) {
	allObjJson = new_allObjJson;

	if(allObjJson["size"] == undefined) {
		return;
	}

	var sizeX = canvasMap.height / (allObjJson["size"][0]);
	var sizeY = canvasMap.width  / (allObjJson["size"][1]);
	size = (sizeX < sizeY)? sizeX: sizeY;

	centerPoint = {"x": allObjJson["size"][0] * sizeX / 2, "y": allObjJson["size"][1] * sizeY / 2};
	img = {};
	img["background"] = new Image();
	img["background"].src = allObjJson["src"];
	scale = 1;

	for(i in allObjJson["object"]){
    	img[i] = new Image();
    	img[i].src = allObjJson["object"][i][3];
    }
    
	drawDrid("");
	ctxHid.stroke();
	drawMagnifier(canvasMapHid);		
});

function newObj() {
	var name = prompt('輸入物件名稱',"myObj");
	allObjJson["object"][name] = [];

	do {
		allObjJson["object"][name][0] = parseInt(prompt('輸入物件座標X',"2"));
	} while(isNaN(allObjJson["object"][name][0]));

	do {
		allObjJson["object"][name][1] = parseInt(prompt('輸入物件座標Y',"2"));
	} while(isNaN(allObjJson["object"][name][1]));
	
	allObjJson["object"][name][2] = 1;
	allObjJson["object"][name][3] = prompt('輸入物件圖像連結 (預設為全黑圖像)',"https://pic.pimg.tw/pk19870730/1436362642-3674765222.jpg");

	var temp = allObjJson["object"][name];

	socket.emit('create_object', {"json": temp, "name": name});

	img[name] = new Image();
	img[name].src = allObjJson["object"][name][3];

	drawDrid("");
	ctxHid.stroke();
	drawMagnifier(canvasMapHid);
}

socket.on('receive_create_object', function(package) {
	allObjJson["object"][package['name']] = package['json'];
	img[package['name']] = new Image();
	img[package['name']].src = allObjJson["object"][package['name']][3];

	drawDrid("");
	ctxHid.stroke();
	drawMagnifier(canvasMapHid);
});

function handleFiles() {
		var files = document.getElementById('uploader').files;
		if (!files.length) {
			alert('Please select a file!');
			return;
		}
		var file   = files[0];
		var start  = 0;
		var stop   = file.size - 1;
		var reader = new FileReader();
		reader.onloadend = function(evt) {
			if (evt.target.readyState == FileReader.DONE) { // DONE == 2
			    var content = evt.target.result;
			    var objJson = JSON.parse(content);
			    allObjJson = objJson;
			    for(i in allObjJson["object"]){
			    	img[i] = new Image();
			    	img[i].src = allObjJson["object"][i][3];
			    }
				var sizeX = canvasMap.width / (allObjJson["size"][0]);
				var sizeY = canvasMap.height / (allObjJson["size"][1]);
				if(sizeX < sizeY){
			    	size = sizeX;
			    }else{
			    	size = sizeY;
			    }
			    centerPoint = {"x":allObjJson["size"][0]*sizeX/2,"y":allObjJson["size"][1]*sizeY/2};
				scale = 1;
			    img["background"] = new Image();
			    img["background"].src = allObjJson["src"];
			    drawDrid("");
			    ctxHid.stroke();
			    drawMagnifier(canvasMapHid);
			}
		};
		var blob = file.slice(start, stop + 1);
		reader.readAsBinaryString(blob,'utf-8');
}
function saveTextAsFile( _fileName, _text ) {
	var textFileAsBlob = new Blob([_text], {type:'text/plain'});
	var downloadLink = document.createElement("a");
	downloadLink.download = _fileName;
	downloadLink.innerHTML = "Download File";
	if (window.webkitURL != null) {
		// Chrome allows the link to be clicked
		// without actually adding it to the DOM.
		downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
	}
	else {
		// Firefox requires the link to be added to the DOM
		// before it can be clicked.
		downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
		downloadLink.onclick = destroyClickedElement;
		downloadLink.style.display = "none";
		document.body.appendChild(downloadLink);
	}
	downloadLink.click();
}
function destroyClickedElement(event) {
	document.body.removeChild(event.target);
}
function drawMagnifier(canvasImg){			//複製一個可縮放的canvas
	var originalRectangle = {};
	var scaleGlassRectangle = {};
	ctx.clearRect(0,0,canvasMap.width,canvasMap.height);
	var rect = canvasMap.getBoundingClientRect();
	var target = allObjJson["size"];

	originalRectangle.x = 0;
    originalRectangle.y = 0;
    originalRectangle.width = rect.right - rect.left;
    originalRectangle.height = rect.bottom - rect.top;
    scaleGlassRectangle.x = centerPoint.x - originalRectangle.width * scale / 2;
    scaleGlassRectangle.y = centerPoint.y - originalRectangle.height * scale / 2;
    scaleGlassRectangle.width = originalRectangle.width * scale;
	scaleGlassRectangle.height = originalRectangle.height * scale;

	ctx.drawImage(
		canvasImg,
		originalRectangle.x,
		originalRectangle.y,
		originalRectangle.width,
		originalRectangle.height,
		scaleGlassRectangle.x,
		scaleGlassRectangle.y,
		scaleGlassRectangle.width,
		scaleGlassRectangle.height
	);
}