import storage from '@system.storage'


export default {


data:{


mode:"shelter",


day:1,


searchTime:60,


location:"客厅",



family:{


ted:{
name:"泰德",
alive:true,
capacity:4
},


dolores:{
name:"多洛雷斯",
alive:false,
capacity:2
},


mary:{
name:"玛丽·简",
alive:false,
mutated:false,
capacity:3
},


timmy:{
name:"蒂米",
alive:false,
capacity:3
}


},



items:{


can:0,
water:0,
medkit:0,
mask:0,
radio:0,
axe:0,
bullet:0

},



loot:{


can:0,
water:0,
medkit:0,
radio:0

},



eventText:
"核爆发生！60秒搜刮开始！",



options:[

"进入厨房",

"进入卧室"

]

},




onInit(){

this.loadGame()

},




// 开始60秒搜刮


startScavenge(){


this.mode="scavenge";


this.searchTime=60;


this.eventText=
"快！寻找家人和物资！";


},





// 房间移动


moveRoom(room){


if(this.mode!="scavenge"){

return;

}



this.location=room;


this.searchTime-=10;



let r=Math.floor(
Math.random()*5
);



if(r==0){


this.loot.can++;

this.eventText=
"发现罐头！";


}



if(r==1){


this.loot.water++;

this.eventText=
"发现水瓶！";


}



if(r==2){


this.family.dolores.alive=true;

this.eventText=
"找到妈妈多洛雷斯！";


}



if(r==3){


this.family.mary.alive=true;

this.eventText=
"找到女儿玛丽·简！";


}



if(r==4){


this.family.timmy.alive=true;

this.eventText=
"找到儿子蒂米！";


}




if(this.searchTime<=0){


this.finishScavenge();


}


},





// 搜刮结束


finishScavenge(){


this.mode="shelter";


//物资进入避难所

this.items.can+=this.loot.can;

this.items.water+=this.loot.water;

this.items.medkit+=this.loot.medkit;

this.items.radio+=this.loot.radio;



this.eventText=
"60秒结束，进入地下避难所。";



this.saveGame();


},





// 下一天


nextDay(){


this.day++;



this.eventText=
"第"+this.day+"天，日记翻开。";



this.saveGame();


},





// 选择事件


choose(i){


if(i==0){

this.eventText=
"你选择了第一个方案。";

}else{

this.eventText=
"你选择了第二个方案。";

}


},





// 保存


saveGame(){


let save={


day:this.day,

family:this.family,

items:this.items

};



storage.set({

key:"60s_save",

value:JSON.stringify(save)

});


},





//读取


loadGame(){


storage.get({

key:"60s_save",


success:(data)=>{


if(data){


let save=JSON.parse(data);


this.day=save.day;

this.family=save.family;

this.items=save.items;


}


}


})


}



}
