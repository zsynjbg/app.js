export default {

data: {

day: 1,


// 四名家庭成员

family: {

ted: {
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


// 初始物资

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
"地下避难所很安静，外面传来奇怪声音。",


options:[

"打开避难所门",

"保持安静"

]

},



// 翻开下一天

nextDay(){


this.day++;


let events=[


"疯狂敲门声响起，也许是救援，也许是强盗。",

"蟑螂开始大量繁殖。",

"通风管道传来奇怪声音。",

"收音机收到微弱信号。",

"发现绿色液体泄漏。"

];


let r=Math.floor(
Math.random()*events.length
);


this.eventText=
"第"+this.day+"天："+
events[r];


},



// 选择事件

choose(index){


if(index===0){


this.eventText=
"你选择打开门，结果未知……";


}else{


this.eventText=
"你选择等待，暂时安全。";


}


}

}
