const http     = require('http');
const url      = require('url');
const fs       = require('fs');
const socketIO = require('socket.io');
const express  = require('express');

const app = express();

require('./charactersAttributes');
require('./dice');

app.get('/', function (request, response) {
	fs.readFile('index.html', function(error, data) {
		response.writeHead(200);
		response.end(data);
	});
});
app.get('/socketFunction.js', function (request, response) {
	fs.readFile('socketFunction.js', function(error, data) {
		response.writeHead(200);
		response.end(data);
	});
});
app.get('/indexStyles.css', function (request, response) {
	fs.readFile('indexStyles.css', function(error, data) {
		response.writeHead(200);
		response.end(data);
	});
});
app.get('/mapFunctions.js', function (request, response) {
	fs.readFile('mapFunctions.js', function(error, data) {
		response.writeHead(200);
		response.end(data);
	});
});
var server = app.listen(2704, "127.0.0.1");
console.log("Server start!!");

// const server = http.createServer(function(request, response) {
// 	var path = url.parse(request.url).pathname;
// 	fs.readFile(__dirname + '/index.html', function(error, data) {
// 		if(path == '/' && !error) {
// 			response.writeHead(200, {"Content-Type": "text/html"});
// 			response.write(data, "utf8");
// 		}
// 		else {
// 			response.writeHead(404);
// 			response.write("Oops! This page doesn't exist - 404");
// 		}
// 		response.end();
// 	});
// }).listen(2704);
// console.log("Server start!!");

var io = socketIO.listen(server);
mapInfo = {};
talkingRecord = {"major":[], "gossip":[]};

data = loadAllPlayerData();

io.on('connection', function(socket) {

	// 有人連上之後會獲得的資訊（地圖資料，聊天室對話紀錄）
	socket.emit("connected", {
		"all_obj_json": mapInfo,
		"chat_record": talkingRecord
	});

	socket.on("major_chat_Message", function(chat) {
		var dice = rollingDice(chat["message"]);

		talkingRecord["major"].push(chat["player"] + ": " + chat["message"]);
		io.emit("major_chat_record", {"content": chat["player"] + ": " + chat["message"]});
		
		if(dice["check"]) {
			talkingRecord["major"].push("'" + chat['player'] + "'擲骰: " + dice["result"]);
			io.emit("major_chat_record", {"content": "'" + chat['player'] + "'擲骰: " + dice["result"]});
			return;
		}

		console.log(talkingRecord["major"]);
	});

	socket.on("gossip_chat_Message", function(chat) {
		var dice = rollingDice(chat["message"]);

		talkingRecord["gossip"].push(chat["player"] + ": " + chat["message"]);
		io.emit("gossip_chat_record", {"content": chat["player"] + ": " + chat["message"]});
		
		if(dice["check"]) {
			talkingRecord["gossip"].push("'" + chat['player'] + "'擲骰: " + dice["result"]);
			io.emit("gossip_chat_record", {"content": "'" + chat['player'] + "'擲骰: " + dice["result"]});
			return;
		}

		console.log(talkingRecord["gossip"]);
	});

	// DM 做好地圖
	socket.on("create_map", function(json) {
		mapInfo = json;
		io.emit("receive_create_map", json);
	});

	// DM 生成物件
	socket.on("create_object", function(package) {
		mapInfo["object"][package["name"]] = package["json"];
		io.emit("receive_create_object", package);
	});

	// DM 拖曳物件
	socket.on("update_object_location", function(json) {
		io.emit("receive_update_object_location", json);
	});

	// 請求：取得角色資料
	socket.on("getPlayerData", function(name_in_game) {
		io.emit("rtn_getPlayerData", getPlayerData(name_in_game + ".json"));
	});

	// 請求：取得武器列表
	socket.on("loadAttackData", function() {
		io.emit("rtn_loadAttackData", loadAttackData());
	});

	// 請求：取得防具列表
	socket.on("loadDefenceData", function() {
		io.emit("rtn_loadDefenceData", loadDefenceData());
	});


	socket.on("getBasicData", function(name_in_game) {
		io.emit("rtn_getBasicData", getBasicData(name_in_game + ".json"));
	});

	socket.on("getExcitation", function(name_in_game) {
		io.emit("rtn_getExcitation", getExcitation(name_in_game + ".json"));
	});

	socket.on("getLevel", function(name_in_game) {
		io.emit("rtn_getLevel", getLevel(name_in_game + ".json"));
	});

	socket.on("getHp", function(name_in_game) {
		io.emit("rtn_getHp", getHp(name_in_game + ".json"));
	});

	socket.on("getAttribute", function(name_in_game) {
		io.emit("rtn_getAttribute", getAttribute(name_in_game + ".json"));
	});

	socket.on("getSkilledBonus", function(name_in_game) {
		io.emit("rtn_getSkilledBonus", getSkilledBonus(name_in_game + ".json"));
	});

	socket.on("getExemption", function(name_in_game) {
		io.emit("rtn_getExemption", getExemption(name_in_game + ".json"));
	});

	socket.on("getExprience", function(name_in_game) {
		io.emit("rtn_getExprience", getExprience(name_in_game + ".json"));
	});

	socket.on("getDefense", function(name_in_game) {
		io.emit("rtn_getDefense", getDefense(name_in_game + ".json"));
	});

	socket.on("getFirstAttackValue", function(name_in_game) {
		io.emit("rtn_getFirstAttackValue", getFirstAttackValue(name_in_game + ".json"));
	});

	socket.on("getSpeed", function(name_in_game) {
		io.emit("rtn_getSpeed", getSpeed(name_in_game + ".json"));
	});

	socket.on("getObserved", function(name_in_game) {
		io.emit("rtn_getObserved", getObserved(name_in_game + ".json"));
	});

	socket.on("getSkill", function(name_in_game) {
		io.emit("rtn_getSkill", getSkill(name_in_game + ".json"));
	});

	socket.on("getLanguage", function(name_in_game) {
		io.emit("rtn_getLanguage", getLanguage(name_in_game + ".json"));
	});
	
	socket.on("getSkilledTool", function(name_in_game) {
		io.emit("rtn_getSkilledTool", getSkilledTool(name_in_game + ".json"));
	});
	
	socket.on("getNote", function(name_in_game) {
		io.emit("rtn_getNote", getNote(name_in_game + ".json"));
	});
	
	socket.on("getRemarks", function(name_in_game) {
		io.emit("rtn_getRemarks", getRemarks(name_in_game + ".json"));
	});

	socket.on("getRacialAbility", function(name_in_game) {
		io.emit("rtn_getRacialAbility", getRacialAbility(name_in_game + ".json"));
	});

	socket.on("getProfessionalOrSpecialAbility", function(name_in_game) {
		io.emit("rtn_getProfessionalOrSpecialAbility", getProfessionalOrSpecialAbility(name_in_game + ".json"));
	});

	socket.on("getSpellList", function(name_in_game) {
		io.emit("rtn_getSpellList", getSpellList(name_in_game + ".json"));
	});
	
	socket.on("getAbilityDetail", function(name_in_game) {
		io.emit("rtn_getAbilityDetail", getAbilityDetail(name_in_game + ".json"));
	});
	
	socket.on("getMoney", function(name_in_game) {
		io.emit("rtn_getMoney", getMoney(name_in_game + ".json"));
	});
	
	socket.on("getLoad", function(name_in_game) {
		io.emit("rtn_getLoad", getLoad(name_in_game + ".json"));
	});
	
	socket.on("getEquipmentDetail", function(name_in_game) {
		io.emit("rtn_getEquipmentDetail", getEquipmentDetail(name_in_game + ".json"));
	});

	
	socket.on("getCasting", function(name_in_game) {
		io.emit("rtn_getCasting", getCasting(name_in_game + ".json"));
	});
	
	socket.on("getItemList", function(name_in_game) {
		io.emit("rtn_getItemList", getItemList(name_in_game + ".json"));
	});

	socket.on("setMaxHp", function(name_in_game, value) {
		setMaxHp(name_in_game + ".json", value);
	});

	socket.on("setAttribute", function(name_in_game, value, target) {
		setAttribute(name_in_game + ".json", value, target);
	});

	socket.on("setExemptionAnother", function(name_in_game, value, target) {
		setExemptionAnother(name_in_game + ".json", value, target);
	});
	
	socket.on("setDefenseAnother", function(name_in_game, value) {
		setDefenseAnother(name_in_game + ".json", value);
	});
	
	socket.on("setFirstAttackValueAnother", function(name_in_game, value) {
		setFirstAttackValueAnother(name_in_game + ".json", value);
	});
	
	socket.on("setPassivePerceptionAnother", function(name_in_game, value) {
		setPassivePerceptionAnother(name_in_game + ".json", value);
	});

	socket.on("increaseHp", function(name_in_game, value) {
		var result = increaseHp(name_in_game + ".json", value);
		if(result != undefined) {
			io.emit("rtn_increaseHp", result);
		}
	});

	socket.on("increaseTempHp", function(name_in_game, value) {
		increaseTempHp(name_in_game + ".json", value);
	});

	socket.on("increaseCastingRing", function(name_in_game, ring, value) {
		var result = increaseCastingRing(name_in_game + ".json", ring, value);
		if(result != undefined) {
			io.emit("rtn_increaseCastingRing", result);
		}
	});

	socket.on("increaseItem", function(name_in_game, item, weight, value) {
		increaseItem(name_in_game + ".json", item, weight, value);
	});

	socket.on("increaseExprience", function(name_in_game, value) {
		var result = increaseExprience(name_in_game + ".json", value);
		if(result != undefined) {
			io.emit("rtn_increaseExprience", result);
		}
	});

	socket.on("changeEquipment", function(name_in_game, hand, value) {
		var result = changeEquipment(name_in_game + ".json", hand, value);
		if(result != undefined) {
			io.emit("rtn_changeEquipment", result);
		}
	});
});