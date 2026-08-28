import storage from '@system.storage'


export default {


data:{


day:1,


family:{


ted:{
name:"泰德",
health:100,
hunger:0,
thirst:0,
crazy:0,
capacity:4
},


dolores:{
name:"多洛雷斯",
health:100,
hunger:0,
thirst:0,
crazy:0,
capacity:2
},


mary:{
name:"玛丽·简",
health:100,
mutated:false,
capacity:3
},


timmy:{
name:"蒂米",
health:100,
hunger:0,
thirst:0,
crazy:0,
capacity:3
}


},



items:{


can:5,
water:5,
medkit:1,
mask:1,
flashlight:1,
book:1,
axe:1,
gun:1,
bullet:3,
radio:1,
card:1,
chess:1,
case:1


},



eventText:
"避难所建立完成，等待第一天。",



options:[

"打开门",

"保持安静"

]


},



onInit(){

this.loadGame()

},



// 下一天

nextDay(){


this.day++


// 消耗资源

this.consume()



// 随机事件

this.randomEvent()



// 保存

this.saveGame()


},



// 每日资源消耗

consume(){


// 有水就减少口渴

if(this.items.water>0){

this.items.water--

}else{


this.family.ted.thirst+=20
this.family.timmy.thirst+=20


}



// 有罐头减少饥饿

if(this.items.can>0){

this.items.can--

}else{


this.family.ted.hunger+=20
this.family.dolores.hunger+=20
this.family.timmy.hunger+=20


}



// 娱乐不足增加疯狂

this.family.ted.crazy+=5
this.family.dolores.crazy+=5
this.family.timmy.crazy+=5


},



// 随机事件

randomEvent(){


let list=[


{

text:"疯狂敲门声响起，外面有人求救。",

a:"打开门",
b:"不开门"

},


{

text:"蟑螂开始大量繁殖。",

a:"使用斧头",
b:"继续观察"

},


{

text:"收音机收到微弱军方信号。",

a:"继续收听",
b:"关闭收音机"

},


{

text:"绿色液体从管道流出。",

a:"调查",
b:"忽略"

}


]



let r=Math.floor(
Math.random()*list.length
)


this.eventText=list[r].text

this.options[0]=list[r].a

this.options[1]=list[r].b


},



// 事件选择

choose(i){


if(i==0){


this.eventText=
"你选择了第一个方案，结果未知。"


}else{


this.eventText=
"你选择等待。"


}


this.saveGame()


},



// 保存

saveGame(){


let data={


day:this.day,

family:this.family,

items:this.items


}



storage.set({

key:"60s_save",

value:JSON.stringify(data)

})


},



// 读取

loadGame(){


storage.get({

key:"60s_save",


success:(data)=>{


if(data){


let save=JSON.parse(data)


this.day=save.day

this.family=save.family

this.items=save.items


}


}


})


}



}
