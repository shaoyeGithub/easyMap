
import axios from 'axios';
import $ from 'jquery';

import HeadNav from '../../../layout/head-nav/HeadNav.vue';
import certificateSumLine from "views/dash/dashComponent/certificateSumLine.vue";
import privateScoreTop from "views/dash/dashComponent/privateScoreTop.vue";
import certificateCountColumn from "views/dash/dashComponent/certificateCountColumn.vue";
import unitScoreTop from "views/dash/dashComponent/unitScoreTop.vue";
import logisticsMap from "views/dash/dashComponent/logisticsMap.vue"


import vueGridLayout from 'vue-grid-layout';
import { throws } from 'assert';
var GridLayout = vueGridLayout.GridLayout;
var GridItem = vueGridLayout.GridItem;
export default {
	data() {
      return {
      	/*看板*/
    	//   layout:[
		//           {"x":0,"y":0,"w":6,"h":10,"i":"A0",component:"certificateSumLine"},
		//           {"x":0,"y":10,"w":6,"h":10,"i":"A1",component:"privateScoreTop"},
		//           {"x":0,"y":20,"w":6,"h":10,"i":"A2",component:"certificateCountColumn"},
		//           {"x":0,"y":30,"w":6,"h":10,"i":"A2",component:"logisticsMap"}
		//           ],
		layout:[
			{"x":0,"y":0,"w":1,"h":3,"i":"0"},
			{"x":1,"y":0,"w":1,"h":3,"i":"1"},
			{"x":2,"y":0,"w":1,"h":3,"i":"2"},
			{"x":3,"y":6,"w":1,"h":3,"i":"3"},
			// {"x":2,"y":6,"w":2,"h":6,"i":"4"},
			// {"x":4,"y":6,"w":2,"h":6,"i":"5"},
			],
		historyLayout:[
			{"x":0,"y":0,"w":1,"h":3,"i":"0"},
			{"x":1,"y":0,"w":1,"h":3,"i":"1"},
			{"x":2,"y":0,"w":1,"h":3,"i":"2"},
			{"x":3,"y":6,"w":1,"h":3,"i":"3"},
		],
    	  beforemove :{},
    	  aftermoved :{},
		 formatLayoutVisible : false, 
		 layTable:[{id:1,src:require("../../../assets/A12.png"),laytype:"A"},
		           {id:2,src:require("../../../assets/AA12.png"),laytype:"AA"},
		           {id:3,src:require("../../../assets/AAA2.png"),laytype:"AAA"},
		           {id:4,src:require("../../../assets/AB112.png"),laytype:"AB"},
		           {id:5,src:require("../../../assets/BA11.png"),laytype:"BA"}
		           ],
		  addDashVisiable:false,
		  searchType :[{"name":"所有",num : "46"},
		               {"name":"图表",num : "18"},
		               {"name":"列表",num : "17"},
		               {"name":"其他",num : "10"}
		              ],/*看板搜索类型*/
		  searchIndex :0, 
		  addDashInput :'',
		  gadgetList :[],
		  curBox:'',
		  
			  
		}
	},
    components:{
        HeadNav,
        privateScoreTop,
        GridLayout,
        GridItem,
        certificateSumLine,
        certificateCountColumn,
        logisticsMap
        
    },
	mounted() {
      
    },
    methods: {
		watchitem:function(item) {
			//if(item.y>y_max ||item.x>x_max){
				//item.y=
				//item.x=
			//}
			//如果不是当前移动的 使其位置保持不变
			console.log("watch：")
			
			let historyLayout1 = this.historyLayout
			console.log(historyLayout1)
			console.log("this.curbox:"+ this.curBox)
			console.log("this.i:"+ item.i)
			if(this.curBox != item.i) {
				console.log("赋值:"+ item.i)
			  for (let j = 0;historyLayout1[j] != undefined; j++) {
				if(historyLayout1[j].i == item.i) {
				  item.x = historyLayout1[j].x
				  item.y = historyLayout1[j].y
				  console.log("X:"+item.x+" Y:"+item.y)
				}
			  }
			}
			return item
		},
		toChangePosition:function(i){
			let layout = this.layout
			let hisLayout = this.historyLayout
			for (let j = 0; j < layout.length; j++) {
			  if(layout[j].i == i) {
				let item = layout[j]
				for (let k = 0; k<hisLayout.length;k++) {
				  if(hisLayout[k].i == i ) {
				   let hisItem = hisLayout[k]
					let beforeX = hisItem.x
					let beforeY = hisItem.y
					let afterX = item.x
					let afterY = item.y
					for (let l = 0; l < hisLayout.length; l++) {
					 if(hisLayout[l].i != i) {
					   let needMoveobj = hisLayout[l]
					   //可能写的看上去比较繁琐  肯定有更优的写法
					   if(afterY == beforeY && needMoveobj.y == beforeY &&
						 ((needMoveobj.x >= item.x  && needMoveobj.x <= beforeX) || (needMoveobj.x <= item.x  && needMoveobj.x >= beforeX))) {
						 if(item.x > beforeX) {
						   needMoveobj.x = needMoveobj.x - 1
						 } else {
						   needMoveobj.x = needMoveobj.x + 1
						 }
					   }else if((beforeY == 1 && afterY == 0) && ((needMoveobj.y == beforeY && needMoveobj.x < beforeX) || (needMoveobj.y == afterY && needMoveobj.x >= afterX))) {
						 needMoveobj.x = needMoveobj.x +1
						 if(needMoveobj.x > 4) {
						   needMoveobj.x = 0
						   needMoveobj.y = needMoveobj.y +1
						 }
					   }else if((beforeY == 0 && afterY==1) && ((needMoveobj.y == beforeY && needMoveobj.x > beforeX) || (needMoveobj.y == afterY && needMoveobj.x <= afterX))) {
						 needMoveobj.x = needMoveobj.x - 1
						 if(needMoveobj.x <0) {
						   needMoveobj.x = 4
						   needMoveobj.y = needMoveobj.y - 1
						 }
					   }
					 }
					}
					hisItem.x = item.x
					hisItem.y = item.y
				  }
				}
			  }
			}
			
		  },
        formatter(row, column) {
            return row.address;
          },
          formatLayout(){/*布局dialog打开*/
        	  this.formatLayoutVisible = true; 
          },
          layView(item){/*选择layout*/
        	  this.layouttype= item.laytype;
        	     /**
        	      * @author James
        	      * 用户是否保存过layout;保存过直接调数据库数据布局,没保存布局,以下列方式计算。
        	      * 默认列数为6
        	      * X 以前左上角为起点(0,0),x往右,y往下
        	      * w 所占 列数比例(列自由分配) 
        	      * h 所在高度 (单位未知),autoSize自动根据内容确定容器高度
        	      */
        	  if(item.laytype=="A"){
        		  /**
        		   * @desc 关系处理
        		   *  x 永远处于0
        		   *  y 之前组件h之和
        		   *  w 列数最大值(列数自由设置)
        		   */
        		  this.layout=[
		          {"x":0,"y":0,"w":6,"h":10,"i":"A0",component:"certificateSumLine"},
		          {"x":0,"y":6,"w":6,"h":10,"i":"A1",component:"privateScoreTop"},
		          {"x":0,"y":12,"w":6,"h":10,"i":"A2",component:"certificateCountColumn"}
    	          ]
        	  }else if(item.laytype=="AA"){
        		  /**
        		   * @desc 关系处理 两列布局
        		   *  x 奇数永远处于0 偶数列数/2 
        		   *  y 奇数==前奇数组件h之和  偶数==前偶数组件h之和
        		   *  w 列数最大值/2(列数自由设置)
        		   */
        		  this.layout=[
    	          {"x":0,"y":0,"w":3,"h":10,"i":"AA0",component:"certificateSumLine"},
    	          {"x":3,"y":0,"w":3,"h":10,"i":"AA1",component:"privateScoreTop"},
    	          {"x":0,"y":10,"w":3,"h":10,"i":"AA2",component:"certificateCountColumn"},
    	          {"x":3,"y":10,"w":3,"h":10,"i":"AA3",component:"certificateSumLine"},
    	          ]
        	  }else if(item.laytype=="AAA"){
        		  /**
        		   * @desc 关系处理 三列布局 m为组件个数
        		   *  x (m%3==1)为0, (m%3==2)为((列数/3)*1), (m%3==0)为((列数/3)*2)  
        		   *  y (m%3==1)为Math.floor((m/3))的h之和
        		   *    (m%3==2)为Math.floor((m/3))的h之和
        		   *    (m%3==0)为Math.floor((m/3))的h之和
        		   *  w (m%3==1)为(列数/3)
        		   *    (m%3==2)为(列数/3)
        		   *    (m%3==0)为(列数/3)
        		   */
        		  this.layout=[
    		    	          {"x":0,"y":0,"w":2,"h":6,"i":"0"},
    		    	          {"x":2,"y":0,"w":2,"h":6,"i":"1"},
    		    	          {"x":4,"y":0,"w":2,"h":6,"i":"2"},
    		    	          {"x":0,"y":6,"w":2,"h":6,"i":"3"},
    		    	          ]
        	  }else if(item.laytype=="AB"){
        		  /**
        		   * @desc 关系处理 两列布局
        		   *  x A列永远处于0 B列为(列数/3)*2 
        		   *  y A列==前A列组件h之和  B列==前偶数组件h之和
        		   *  w A列==(列数最大值/3)*2(列数自由设置) B列==(列数最大值/3)*1
        		   */
        		  this.layout=[
    		    	          {"x":0,"y":0,"w":4,"h":6,"i":"AB0"},
    		    	          {"x":4,"y":0,"w":2,"h":6,"i":"AB1"},
    		    	          {"x":0,"y":6,"w":4,"h":6,"i":"AB2"},
    		    	          {"x":4,"y":6,"w":2,"h":6,"i":"AB3"}]
        	  }else if(item.laytype=="BA"){
        		  /**
        		   * @desc 关系处理 两列布局
        		   *  x A列永远处于0 B列为(列数/3)*1 
        		   *  y A列==前A列组件h之和  B列==前偶数组件h之和
        		   *  w A列==(列数最大值/3)*1(列数自由设置) B列==(列数最大值/3)*2
        		   */
        		  this.layout=[
    		    	          {"x":0,"y":0,"w":2,"h":6,"i":"BA0"},
    		    	          {"x":2,"y":0,"w":4,"h":6,"i":"BA1"},
    		    	          {"x":0,"y":6,"w":2,"h":6,"i":"BA2"},
    		    	          {"x":2,"y":6,"w":4,"h":6,"i":"BA3"}]
        	  }
        	this.formatLayoutVisible = false;
		  },
		   
           cellClick(row, column, cell, event){
        	   this.$message({type:"info",message:"点我"});
		   },
           moveEvent: function(i, newX, newY,e){
			   this.curBox = i 
            //    console.log("MOVE i=" + i + ", X=" + newX + ", Y=" + newY);
            //    this.beforemove={i:i,x:newX,y:newY};
           },
           movedEvent: function(i, newX, newY,e){
			   this.toChangePosition(i)
			//    console.log(this.layout)
			//    console.log(this.historyLayout)
			//    this.historyLayout = this.layout
            //    console.log("MOVED i=" + i + ", X=" + newX + ", Y=" + newY);
               
		   },
		   deleteItem(index){
			console.log(index)
			this.layout.splice(index,1)
			this.historyLayout.splice(index,1)
		    },
		   rowAddItem(index){
				console.log(this.layout[index])
				//如果是第一行
				if (this.layout[index].y == 0)
				{
					console.log("第一行")
					for(var i = 0 ;i< this.layout.length;i++)
					{
						if ((this.layout[i].y == this.layout[index].y)&&(this.layout[i].x > this.layout[index].x))
						{
							this.layout[i].x += 1
						}
					}
					var x = this.layout[index].x + 1
					var y = this.layout[index].y
					var i = (this.layout.length).toString()
					var newItem = {"x": x,"y":y,"w":1,"h":3,"i":i}
					this.layout.push(newItem)
					this.historyLayout.push(newItem)
				}
				//如果是第二行
				if(this.layout[index].y == 3)
				{
					console.log("第二行")
					for(var i = 0 ;i< this.layout.length;i++)
					{
						if ((this.layout[i].y <= this.layout[index].y)&&(this.layout[i].x > this.layout[index].x))
						{
							this.layout[i].x += 1
						}
					}
					var x = this.layout[index].x + 1
					var y = this.layout[index].y
					console.log(y)
					var i = (this.layout.length).toString()
					var newItem = {"x": x,"y":y,"w":1,"h":3,"i":i}
					this.layout.push(newItem)
					this.historyLayout.push(newItem)

				}
			//    console.log(this.layout[index])
			//    console.log(index)
			//    var x = int(this.layout[index])
			//   
			//  console.log(this.layout)
		   },
		   colAddItem(index){
			console.log(this.layout[index])
			for(var i = 0 ;i< this.layout.length;i++)
			{
				if ((this.layout[i].x == this.layout[index].x)&&(this.layout[i].y > this.layout[index].y))
				{
					  this.layout[i].y += 3
				}
			}
			var x = this.layout[index].x 
			var y = this.layout[index].y + 3
			var i = (this.layout.length).toString()
			var newItem = {"x": x,"y":y,"w":1,"h":3,"i":i}
			   this.layout.push(newItem)
			   this.historyLayout.push(newItem)
		   },
           handleCommand(param){
			this.$message(param);
				
           },
           addDashButton(){
           	this.addDashVisiable = true;
           	this.$$api_dashBoard_getGadgetList({
           		data :{queryCriteria :{}},
           		fn   :data=>{
           			this.gadgetList = data.data;
           		},
           		errFn:(err)=>{
           			this.$message.error(err.msg);
           		},
           		tokenFlag   : true
           	})
           },
           searchType_Click(index){
           	this.searchIndex = index;
           },
           getTemplate(templateName){
           	return require("./../dashComponent/"+templateName+".vue");
           }
           
      },
      watch:{/*
    	  layout: {
    	      handler: function (val, oldVal) { 
    	    	  console.log( val)
    	    	   },
    	      deep: true
    	    }*/
    	  
      },
}