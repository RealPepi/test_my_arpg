// 所有的函數 sockit.emit 那邊，emit 意思為：傳送資料給伺服器
// 左邊的意思是：呼叫伺服器裡面名為 .. 的函式
// 右邊會掛一個參數參數 = 角色 json 檔檔名

// 所有的 sockit.on 都是“從伺服器接收到東西”

// 傳送到主要聊天室的訊息
socket.on("major_chat_record", function(record) {
	var chat = document.getElementById('major_chat_lobby');
	chat.innerHTML += "<div>" + record["content"] + "</div>";
	chat.scrollTop = chat.scrollHeight;
});

// 傳送到閒聊聊天室的訊息
socket.on("gossip_chat_record", function(record) {
	var chat = document.getElementById('gossip_chat_lobby');
	chat.innerHTML += "<div>" + record["content"] + "</div>";
	chat.scrollTop = chat.scrollHeight;
});

// 取得角色資料
function getPlayerData(name_in_game) {
	socket.emit('getPlayerData', name_in_game);
}

socket.on("rtn_getPlayerData", function(player_data) {
	console.log(player_data);
});

// 取得武器資料
function loadAttackData(name_in_game) {
	socket.emit('loadAttackData', name_in_game);
}

socket.on("rtn_loadAttackData", function(load_attack_data) {
	console.log(load_attack_data);
});

// 取得防具資料
function loadDefenceData(name_in_game) {
	socket.emit('loadDefenceData', name_in_game);
}

socket.on("rtn_loadDefenceData", function(load_defense_data) {
	console.log(load_defense_data);
});

// 取得基本資料
function getBasicData(name_in_game) {
	socket.emit('getBasicData', name_in_game);
}

socket.on("rtn_getBasicData", function(basicData) {
	console.log(basicData);
});

// 取得激勵值
function getExcitation(name_in_game) {
	socket.emit('getExcitation', name_in_game);
}

socket.on("rtn_getExcitation", function(excitation) {
	console.log(excitation);
});

// 取得等級
function getLevel(name_in_game) {
	socket.emit('getLevel', name_in_game);
}

socket.on("rtn_getLevel", function(level) {
	console.log(level);
});

// 取得生命值
function getHp(name_in_game) {
	socket.emit('getHp', name_in_game);
}

socket.on("rtn_getHp", function(hp) {
	console.log(hp);
});

// 取得角色屬性
function getAttributes(name_in_game) {
	socket.emit('getAttribute', name_in_game);
}

socket.on("rtn_getAttribute", function(attribute) {
	console.log(attribute);
});

// 取得技能加成
function getSkilledBonus(name_in_game) {
	socket.emit('getSkilledBonus', name_in_game);
}

socket.on("rtn_getSkilledBonus", function(skill_bonus) {
	console.log(skill_bonus);
});

//取得豁免值
function getExemption(name_in_game) {
	socket.emit('getExemption', name_in_game);
}

socket.on("rtn_getExemption", function(exemption) {
	console.log(exemption);
});

// 取得角色當前經驗
function getExprience(name_in_game) {
	socket.emit('getExprience', name_in_game);
}

socket.on("rtn_getExprience", function(exprience) {
	console.log(exprience);
});

// 取得防禦力(?)
function getDefense(name_in_game) {
	socket.emit('getDefense', name_in_game);
}

socket.on("rtn_getDefense", function(defence) {
	console.log(defence);
});

// 取得先攻值
function getFirstAttackValue(name_in_game) {
	socket.emit('getFirstAttackValue', name_in_game);
}

socket.on("rtn_getFirstAttackValue", function(first_attack_value) {
	console.log(first_attack_value);
});

//取得速度值
function getSpeed(name_in_game) {
	socket.emit('getSpeed', name_in_game);
}

socket.on("rtn_getSpeed", function(speed) {
	console.log(speed);
});

// 取得感知值
function getObserved(name_in_game) {
	socket.emit('getObserved', name_in_game);
}

socket.on("rtn_getObserved", function(observed) {
	console.log(observed);
});

// 取得角色技藝
function getSkill(name_in_game) {
	socket.emit('getSkill', name_in_game);
}

socket.on("rtn_getSkill", function(skill) {
	console.log(skill);
});


// 取得角色習得的語言
function getLanguage(name_in_game) {
	socket.emit('getLanguage', name_in_game);
}

socket.on("rtn_getLanguage", function(language) {
	console.log(language);
});

// 取得角色熟練的工具
function getSkilledTool(name_in_game) {
	socket.emit('getSkilledTool', name_in_game);
}

socket.on("rtn_getSkilledTool", function(skilled_tool) {
	console.log(skilled_tool);
});

// 取得冒險日誌
function getNote(name_in_game) {
	socket.emit('getNote', name_in_game);
}

socket.on("rtn_getNote", function(note) {
	console.log(note);
});

// 取得標註
function getRemarks(name_in_game) {
	socket.emit('getRemarks', name_in_game);
}

socket.on("rtn_getRemarks", function(remark) {
	console.log(remark);
});

// 取得種族能力
function getRacialAbility(name_in_game) {
	socket.emit('getRacialAbility', name_in_game);
}

socket.on("rtn_getRacialAbility", function(racial_ability) {
	console.log(racial_ability);
});

// 取得職業(特殊)技能
function getProfessionalOrSpecialAbility(name_in_game) {
	socket.emit('getProfessionalOrSpecialAbility', name_in_game);
}

socket.on("rtn_getProfessionalOrSpecialAbility", function(external_ability) {
	console.log(external_ability);
});

// 取得法術列表
function getSpellList(name_in_game) {
	socket.emit('getSpellList', name_in_game);
}

socket.on("rtn_getSpellList", function(spell_list) {
	console.log(spell_list);
});


// 取得技能描述
function getAbilityDetail(name_in_game) {
	socket.emit('getAbilityDetail', name_in_game);
}

socket.on("rtn_getAbilityDetail", function(ability_detail) {
	console.log(ability_detail);
});

// 取得角色金錢
function getMoney(name_in_game) {
	socket.emit('getMoney', name_in_game);
}

socket.on("rtn_getMoney", function(money) {
	console.log(money);
});

// 取得附載
function getLoad(name_in_game) {
	socket.emit('getLoad', name_in_game);
}

socket.on("rtn_getLoad", function(load) {
	console.log(load);
});

// 取得角色裝備資料
function getEquipmentDetail(name_in_game) {
	socket.emit('getEquipmentDetail', name_in_game);
}

socket.on("rtn_getEquipmentDetail", function(equipment_detail) {
	console.log(equipment_detail);
});

// 取得施法
function getCasting(name_in_game) {
	socket.emit('getCasting', name_in_game);
}

socket.on("rtn_getCasting", function(casting) {
	console.log(casting);
});

// 取得角色道具列表
function getItemList(name_in_game) {
	socket.emit('getItemList', name_in_game);
}

socket.on("rtn_getItemList", function(iten_list) {
	console.log(iten_list);
});



// ==============================
//     下列這四項東西我還沒測試過
// ==============================

// 角色昏迷
socket.on("rtn_increaseHp", function(coma) {
	console.log(coma);
});

// 角色法術環不足
socket.on("rtn_increaseCastingRing", function(no_ring) {
	console.log(no_ring);
});

// 升級
socket.on("rtn_increaseExprience", function(level_up) {
	console.log(level_up);
});

// 找不到裝備
socket.on("rtn_changeEquipment", function(no_item) {
	console.log(no_item);
});