import storage from '@system.storage'

export default {

data:{

mode:"scavenge",

day:1,

time:60,

location:"客厅",

eventText:
"核爆发生！60秒搜刮开始。寻找家人和物资。",

options:[

"厨房",

"卧室",

"浴室",

"客厅"

],

family:{

ted:{
name:"泰德",
alive:true,
health:100,
hunger:0,
thirst:0,
crazy:0,
injured:false,
sick:false,
tired:false,
capacity:4
},

dolores:{
name:"多洛雷斯",
alive:false,
health:100,
hunger:0,
thirst:0,
crazy:0,
injured:false,
sick:false,
tired:false,
capacity:2
},

mary:{
name:"玛丽·简",
alive:false,
health:100,
mutated:false,
capacity:3
},

timmy:{
name:"蒂米",
alive:false,
health:100,
hunger:0,
thirst:0,
crazy:0,
injured:false,
sick:false,
tired:false,
capacity:3
}

},

items:{

can:0,

water:0,

medkit:0,

mask:0,

flashlight:0,

book:0,

axe:0,

gun:0,

bullet:0,

radio:0,

card:0,

chess:0,

case:0

},

loot:{

can:0,

water:0,

medkit:0,

mask:0,

flashlight:0,

book:0,

axe:0,

radio:0,

card:0,

chess:0

},

story:{

radioMission:0,

maryMutation:false,

survivorAlliance:false,

bandit:false,

cockroach:false,

pipeLeak:false

}

},

onInit(){

this.loadGame()

},

startGame(){

this.mode="scavenge";

this.time=60;

this.eventText=
"60秒搜刮开始！控制泰德寻找家人。";

},

startScavenge(){

this.mode="scavenge";

this.time=60;

this.eventText=
"开始搜刮房屋。";

},
// 搜索房间

searchRoom(room){

if(this.mode!="scavenge"){

return;

}

this.location=room;

this.time-=10;

let r=Math.floor(Math.random()*12);

switch(r){

case 0:

this.loot.can++;

this.eventText=
"找到一个罐头。";

break;

case 1:

this.loot.water++;

this.eventText=
"找到一瓶水。";

break;

case 2:

this.loot.medkit++;

this.eventText=
"找到医疗包。";

break;

case 3:

this.family.dolores.alive=true;

this.eventText=
"找到了妈妈多洛雷斯。";

break;

case 4:

this.family.mary.alive=true;

this.eventText=
"找到了玛丽·简。";

break;

case 5:

this.family.timmy.alive=true;

this.eventText=
"找到了蒂米。";

break;

case 6:

this.loot.mask++;

this.eventText=
"找到防毒面具。";

break;

case 7:

this.loot.flashlight++;

this.eventText=
"找到手电筒。";

break;

case 8:

this.loot.book++;

this.eventText=
"找到童子军手册。";

break;

case 9:

this.loot.radio++;

this.eventText=
"找到收音机。";

break;

case 10:

this.loot.axe++;

this.eventText=
"找到斧头。";

break;

default:

this.eventText=
"搜索失败，没有发现物资。";

break;

}

if(this.time<=0){

this.finishScavenge();

}

},

// 结束搜刮

finishScavenge(){

this.mode="shelter";

for(let item in this.loot){

this.items[item]+=this.loot[item];

}

this.eventText=
"60秒结束，全家进入地下避难所。";

this.day=1;

this.saveGame();

},

// 下一天

nextDay(){

this.day++;

this.dailyUpdate();

this.randomEvent();

this.saveGame();

},

// 每日状态

dailyUpdate(){

for(let key in this.family){

let p=this.family[key];

if(!p.alive){

continue;

}

if(key!="mary" || !p.mutated){

p.hunger+=10;

p.thirst+=15;

if(p.hunger>=70){

p.health-=5;

}

if(p.thirst>=70){

p.health-=8;

}

}

p.crazy+=3;

if(p.health<=0){

p.alive=false;

}

}

if(this.items.card>0){

this.family.ted.crazy-=5;

}

if(this.items.chess>0){

this.family.timmy.crazy-=5;

}

},

// 随机事件

randomEvent(){

let r=Math.floor(Math.random()*6);

switch(r){

case 0:

this.story.cockroach=true;

this.eventText=
"蟑螂开始大量繁殖。";

break;

case 1:

this.story.bandit=true;

this.eventText=
"有人敲响避难所大门，可能是强盗。";

break;

case 2:

if(this.items.radio>0){

this.story.radioMission++;

}

this.eventText=
"收音机收到军方广播。";

break;

case 3:

this.story.pipeLeak=true;

this.eventText=
"绿色液体从管道泄漏。";

this.checkMutation();

break;

case 4:

this.story.survivorAlliance=true;

this.eventText=
"流浪幸存者请求帮助。";

break;

default:

this.eventText=
"今天没有特殊事件。";

break;

}

},
// 事件选择

choose(index){

if(index==0){

this.eventText=
"你选择了第一个方案。";

}else{

this.eventText=
"你选择了第二个方案。";

}

this.saveGame();

},

// 医疗包治疗

heal(person){

if(this.items.medkit<=0){

return;

}

if(this.family[person]){

this.family[person].health=100;

this.family[person].injured=false;

this.family[person].sick=false;

this.items.medkit--;

this.eventText=
"医疗包使用成功。";

}

this.saveGame();

},

// 玛丽变异

checkMutation(){

if(
this.story.maryMutation==false
&&
this.family.mary.alive==true
&&
(
this.story.pipeLeak==true
||
this.story.cockroach==true
)

){

this.family.mary.mutated=true;

this.family.mary.capacity=99;

this.story.maryMutation=true;

this.eventText=
"玛丽·简发生变异！她不再需要水，不会受伤，可以独自生存。";

}

},

// 强盗攻击

banditAttack(){

if(
this.items.axe>0
||
(
this.items.gun>0
&&
this.items.bullet>0
)

){

this.eventText=
"成功击退强盗。";

if(this.items.bullet>0){

this.items.bullet--;

}

}else{

this.items.can=0;

this.items.water=0;

this.eventText=
"没有防御装备，强盗抢走了物资。";

}

this.story.bandit=false;

this.saveGame();

},

// 使用物品

useItem(item){

if(this.items[item]>0){

this.items[item]--;

this.eventText=
"使用了"+item;

}

this.saveGame();

},

// 结局判断

checkEnding(){

let alive=0;

for(let key in this.family){

if(this.family[key].alive){

alive++;

}

}

if(alive==0){

return "全员死亡结局";

}

if(this.family.mary.mutated){

return "女儿变异生存结局";

}

if(
this.story.radioMission>=5
&&
this.items.radio>0
){

return "军方救援结局";

}

if(this.story.survivorAlliance){
