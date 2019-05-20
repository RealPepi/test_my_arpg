var fs = require("fs");
loadAllPlayerData = function (){
	var fileList = fs.readdirSync("角色/");
	var data = {};
	for (i in fileList){
		data[fileList[i]] = JSON.parse(fs.readFileSync("角色/"+fileList[i]).toString());
	}
	return(data);
}
getPlayerData = function (playerName){
	var fileList = fs.readdirSync("角色/");
	var data = {};
	data[fileList[i]] = JSON.parse(fs.readFileSync("角色/" + playerName).toString());
	return(data);
}
loadAttackData = function (){
	var data = {};
	data = JSON.parse(fs.readFileSync("attack.json").toString());
	return(data);
}
loadDefenceData = function (){
	var data = {};
	data = JSON.parse(fs.readFileSync("defence.json").toString());
	return(data);
}
getAllData = function (playerName){
	return(data);
}
getBasicData = function (playerName){
	answer = {};
	answer["角色名稱"] = data[playerName]["角色名稱"];
	answer["版本"] = data[playerName]["版本"];
	answer["玩家名稱"] = data[playerName]["玩家名稱"];
	answer["出現記錄"] = data[playerName]["出現記錄"];
	answer["稱號"] = data[playerName]["稱號"];
	answer["性別"] = data[playerName]["性別"];
	answer["年齡"] = data[playerName]["年齡"];
	answer["種族"] = data[playerName]["種族"];
	answer["信仰"] = data[playerName]["信仰"];
	answer["陣營"] = data[playerName]["陣營"];
	answer["背景"] = data[playerName]["背景"];
	answer["體型"] = data[playerName]["體型"];
	answer["髮色"] = data[playerName]["髮色"];
	answer["身高"] = data[playerName]["身高"];
	answer["體重"] = data[playerName]["體重"];
	answer["眼色"] = data[playerName]["眼色"];
	answer["個性描述"] = data[playerName]["個性描述"];
	answer["簡述"] = data[playerName]["簡述"];
	answer["職業"] = data[playerName]["職業"];
	return(answer);
}
getExcitation = function (playerName){
	return(Object.assign({}, data[playerName]["激勵"]));
}

getLevel = function (playerName){
	return(data[playerName]["角色等級"]);
}
getHp = function (playerName){
	return(Object.assign({}, data[playerName]["生命"]));
}
getAttribute = function (playerName){
	var answer = {};
	var answer = Object.assign({}, data[playerName]["屬性"]);
	for(i in data[playerName]["屬性"]){
		if(data[playerName]["屬性"][i]["暫時屬性"]){
			answer[i]["調整值"] = Math.floor((data[playerName]["屬性"][i]["暫時屬性"] - 10) / 2);
		}
		else{
			answer[i]["調整值"] = Math.floor((data[playerName]["屬性"][i]["屬性點"] - 10) / 2);
		}
	}
	return (answer);
}
getAttributeOne = function (playerName, target){
	if(data[playerName]["屬性"][target]["暫時屬性"]){
		var answer = Math.floor((data[playerName]["屬性"][target]["暫時屬性"] - 10) / 2);
	}
	else{
		var answer = Math.floor((data[playerName]["屬性"][target]["屬性點"] - 10) / 2);
	}
	return (answer);
}
getSkilledBonus = function (playerName){
	return(Math.floor((data[playerName]["角色等級"]-0.5)/4)+2);
}
getExemption = function (playerName){
	var answer = {};
	var answer = Object.assign({}, data[playerName]["豁免"]);
	var attribute;
	for(i in data[playerName]["豁免"]){
		attribute = getAttributeOne(playerName,i);
		answer[i]["加值"] = attribute + Math.floor(getSkilledBonus(playerName) * data[playerName]["豁免"][i]["熟練"]);
	}
	return (answer);
}
getExprience = function (playerName, val){
	return (data[playerName]["經驗"]);
}
getDefense = function (playerName){
	var  attribute = getAttributeOne(playerName,"敏捷");
	var  answer = data[playerName]["防禦等級"];
	if(data[playerName]["裝備詳細"]["護甲"]["敏捷上限"] < 0){
		if(data[playerName]["裝備詳細"]["護甲"]["敏捷上限"] < attribute){
			answer["敏捷"] = data[playerName]["裝備詳細"]["護甲"]["敏捷上限"];
		}
		else{
			answer["敏捷"] = attribute;
		}
	}
	else{
		answer["敏捷"] = attribute;
	}

	if(data[playerName]["裝備詳細"]["護甲"]["AC"]){
		answer["裝備"] = data[playerName]["裝備詳細"]["護甲"]["AC"];
	}
	else{
		answer["裝備"] = 10;
	}
	answer["裝備"] += data[playerName]["裝備詳細"]["盾牌"]["AC"];
	answer["防禦等級"] = answer["裝備"]+answer["敏捷"]+answer["其他"];
	return(answer);
}

getFirstAttackValue = function (playerName){
	var attribute = getAttributeOne(playerName,"敏捷");
	return (attribute+data[playerName]["先攻值"]["其他"]);
}

getSpeed = function (playerName){
	return (Object.assign({}, data[playerName]["速度"]));
}

getObserved = function (playerName){
	var answer = getAttributeOne(playerName,"感知")+getSkilledBonus(playerName)*data[playerName]["技能"]["觀察"]["熟"];
	return (answer+10+data[playerName]["被動感知"]["其他"]);
}
getSkill = function (playerName){
	var answer = Object.assign({}, data[playerName]["技能"]);
	var attribute;
	//var skilledBonus = getSkilledBonus(playerName);
	for(i in answer){
		switch(i){
			case "運動":
				answer[i]["加值"] = getAttributeOne(playerName,"力量");
				break;
			case "特技動作":
			case "手上把戲":
			case "隱匿":
				answer[i]["加值"] = getAttributeOne(playerName,"敏捷");
				break;
			case "奧秘":
			case "歷史":
			case "調查":
			case "自然":
			case "宗教":
				answer[i]["加值"] = getAttributeOne(playerName,"智力");
				break;
			case "馴養動物":
			case "察言觀色":
			case "醫藥":
			case "觀察":
			case "求生":
				answer[i]["加值"] = getAttributeOne(playerName,"感知");
				break;
			case "欺瞞":
			case "威嚇":
			case "表演":
			case "遊說":
				answer[i]["加值"] = getAttributeOne(playerName,"魅力");
				break;
		}
		answer[i]["加值"] += getSkilledBonus(playerName)*answer[i]["熟"];
	}
	return (answer);
}
getLanguage = function (playerName){
	return (Object.assign({},  data[playerName]["語言"]));
}
getSkilledTool = function (playerName){
	return (Object.assign({}, data[playerName]["熟練工具"]));
}
getNote = function (playerName){
	return (Object.assign({}, data[playerName]["冒險筆記"]));
}
getRemarks = function (playerName){
	return (Object.assign({}, data[playerName]["備註"]));
}
getRacialAbility = function (playerName){
	return (Object.assign({}, data[playerName]["種族能力"]));
}
getProfessionalOrSpecialAbility = function (playerName){
	return (Object.assign({}, data[playerName]["職業/特殊能力"]));
}
getSpellList = function (playerName){
	return (Object.assign({}, data[playerName]["法術列表"]));
}
getAbilityDetail = function (playerName){
	return (Object.assign({}, data[playerName]["能力詳述"]));
}
getMoney = function (playerName){
	var answer = Object.assign({}, data[playerName]["所持金"]);
	answer["總和"] = answer["銅幣"]*0.01+answer["銀幣"]*0.1+answer["銀金幣"]*0.5+answer["金幣"]+answer["白金幣"]*10;
	return (answer);
}
getLoad = function (playerName){
	var answer = {};
	answer["load"] = data[playerName]["屬性"]["力量"]["暫時屬性"]+data[playerName]["屬性"]["力量"]["屬性點"];
	answer["easyLoad"] = answer["load"] * 5;
	answer["normalLoad"] = answer["load"] * 10;
	answer["hardLoad"] = answer["load"] * 15;
	answer["nowLoad"] = 0;
	for(i in data[playerName]["道具列表"]){
		answer["nowLoad"] += data[playerName]["道具列表"][i]["重量"] * data[playerName]["道具列表"][i]["數量"];
	}
	for(i in data[playerName]["裝備詳細"]){
		answer["nowLoad"] += data[playerName]["裝備詳細"][i]["重量"];
	}
	answer["nowLoad"] += data[playerName]["所持金"]["銅幣"]/50;
	answer["nowLoad"] += data[playerName]["所持金"]["銀幣"]/50;
	answer["nowLoad"] += data[playerName]["所持金"]["銀金幣"]/50;
	answer["nowLoad"] += data[playerName]["所持金"]["金幣"]/50;
	answer["nowLoad"] += data[playerName]["所持金"]["白金幣"]/50;
	return (answer);
}
getEquipmentDetail = function (playerName){
	return (Object.assign({}, data[playerName]["裝備詳細"]));
}
getCasting = function (playerName){
	var answer = Object.assign({}, data[playerName]["施法"]);
	switch(answer["關鍵屬性"]){
		case "智力":
			answer["法術DC"] = getAttributeOne(playerName,"智力");
			break;
		case "感知":
			answer["法術DC"] = getAttributeOne(playerName,"感知");
			break;
		case "魅力":
			answer["法術DC"] = getAttributeOne(playerName,"魅力");
			break;
	}
	answer["法術DC"] += getSkilledBonus(playerName) + 8;
	return answer;
}
getItemList = function (playerName){
	return (Object.assign({}, data[playerName]["道具列表"]));
}


setMaxHp = function (playerName, val){
	data[playerName]["生命"]["最大"] = val;
}
setAttribute = function (playerName, val, target){
	data[playerName]["屬性"][target]["暫時屬性"] = val;
}
setExemptionAnother = function (playerName, val, target){
	data[playerName]["豁免"][target]["其他"] = val;
}
setDefenseAnother = function (playerName, val){
	data[playerName]["防禦等級"]["其他"] = val;
}
setFirstAttackValueAnother = function (playerName, val){
	data[playerName]["先攻值"]["其他"] = val;
}
setPassivePerceptionAnother = function (playerName, val){
	data[playerName]["被動感知"]["其他"] = val;
}


increaseHp = function (playerName, val){
	data[playerName]["生命"]["目前"] += val;
	if(data[playerName]["生命"]["暫時"] = 0){
		return ("昏迷");
	}
	if(data[playerName]["生命"]["暫時"] > data[playerName]["生命"]["最大"]){
		data[playerName]["生命"]["暫時"] = data[playerName]["生命"]["最大"];
	}
}
increaseTempHp = function (playerName, val){
	data[playerName]["生命"]["暫時"] += val;
	if(data[playerName]["生命"]["暫時"] < 0){
		data[playerName]["生命"]["暫時"] = 0;
	}
}
increaseCastingRing = function (playerName, ring, val){
	if(data[playerName]["施法"]["每日法術環"]["剩餘"][ring-1]>0) {
		data[playerName]["施法"]["每日法術環"]["剩餘"][ring-1]--;
	}
	else{
		return ("第"+ring.toString()+"環法術剩餘次數不足");
	}
}
increaseItem = function (playerName, item, weight, val){
	if(data[playerName]["道具列表"][item]){
		data[playerName]["道具列表"][item]["數量"] += val;
	}
	else{
		data[playerName]["道具列表"][item] = {};
		data[playerName]["道具列表"][item]["數量"] = val;
		data[playerName]["道具列表"][item]["重量"] = weight;
	}
}
increaseExprience = function (playerName, val){
	data[playerName]["經驗"] += val;
	var level = [0, 300, 900, 2700, 6500, 14000, 23000, 34000, 48000, 64000, 85000, 100000, 120000, 140000, 165000, 195000, 225000, 265000, 305000, 355000];
	if(data[playerName]["經驗"] >= level[data[playerName]["角色等級"]]){
		data[playerName]["角色等級"]++;
		return ("升級");
	}
}
changeEquipment = function(playerName, hand, item){
	if(!data[playerName]["道具列表"][item]){
		data[playerName]["道具列表"][item] = {};
	}
	if(data[playerName]["道具列表"][item]["數量"]){
		data[playerName]["道具列表"][item]["數量"]--;
		handName = data[playerName]["裝備詳細"][hand]["名稱"];
		data[playerName]["裝備詳細"][hand] = Object.assign({},  attackData[item]);
		if(data[playerName]["道具列表"][handName]){
			data[playerName]["道具列表"][handName]["數量"]++;
		}
		else{
			data[playerName]["道具列表"][handName] = Object.assign({},  attackData[handName]);
			data[playerName]["道具列表"][handName]["數量"] = 1;
		}

	}
	else{
		return ("沒有此裝備");
	}
}