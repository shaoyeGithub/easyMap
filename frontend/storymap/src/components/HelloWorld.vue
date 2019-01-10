<template>
<div class="home">
  <!-- <el-row class="dashcontent">
        	 <el-col :span="3" class="left-menu">
		      		 <el-row class="tac">
						  
						</el-row>
		      		</el-col>
		      		<el-col :span="21" class="right-menu"> -->
    <div  class="dash">
        	<div>
        		<el-row>
				  <el-col :span="5" class="dashtitle"><h2>test</h2><div class="grid-content bg-purple"></div></el-col>
				  <el-col :span="9" :push="10" style="padding-left: 2%;">
				  	<div class="grid-content bg-purple">
				  		<el-button  :plain="true"  type="info" @click = "addDashButton"><i class="el-icon-plus el-icon--left" ></i> 添加图表看板</el-button>
						<el-button  :plain="true"  type="info" @click ="formatLayout"><i class="el-icon-menu el-icon--left"></i>版式布局</el-button>
						<el-button  :plain="true"  type="info">
							 <el-dropdown @command="handleCommand" trigger="click">
								  <span class="el-dropdown-link">
								  	<i class="el-icon-setting el-icon--left"></i>
								  	工具
								    <i class="el-icon-caret-bottom el-icon--right"></i>
								  </span>
								  <el-dropdown-menu slot="dropdown">
								    <el-dropdown-item command="a">复制面板</el-dropdown-item>
								    <el-dropdown-item command="b">编辑面板</el-dropdown-item>
								    <el-dropdown-item command="c">共享面板</el-dropdown-item>
								    <el-dropdown-item command="d">删除面板</el-dropdown-item>
								    <el-dropdown-item command="e">查找面板</el-dropdown-item>
								    <el-dropdown-item command="f">创建面板</el-dropdown-item>
								  </el-dropdown-menu>
								</el-dropdown>
						</el-button>
				  	</div>
				  </el-col>
				</el-row>
        	</div>
  <div class = "component">
    <grid-layout
			            :layout="layout"
			            :col-num="10"
			            :row-height="30"
			            :autoSize="false"
									:is-draggable="true"
			            :is-resizable="false"
			            :useCssTransforms ="true"
			            :vertical-compact="false"
			            :margin="[10, 10]"
			            :use-css-transforms="true">  
			        <grid-item v-for="(item,index) in layout"
												 :v-bind:item="watchitem(item)"
			        	       	 :key="item.i"
			                   :x="item.x"
			                   :y="item.y"
			                   :w="item.w"
			                   :h="item.h"
			                   :i="item.i"
			                   @move="moveEvent"
			                   @moved="movedEvent"
			                    class="griditem">
							 <el-row class="drag-title">
							 	<el-col :span="20">card:{{item.i}}</el-col>
							 	<el-col :span="1" class="ico">
							 		<el-dropdown trigger="click"  @command="handleCommand">
									  <span class="el-dropdown-link">
									    <i class="fa fa-caret-square-o-down"></i>
									  </span>
									  <el-dropdown-menu slot="dropdown">
									    <el-dropdown-item command="edit">编辑</el-dropdown-item>
									    <el-dropdown-item @click.native="deleteItem(index)">删除</el-dropdown-item>
									    <el-dropdown-item command="reset">刷新</el-dropdown-item>
											<el-dropdown-item @click.native="rowAddItem(index)">横向添加</el-dropdown-item>
											<el-dropdown-item @click.native="colAddItem(index)">纵向添加</el-dropdown-item>
											<el-dropdown-item @click.native="moveItem(index)">移动</el-dropdown-item>
									  </el-dropdown-menu>
									</el-dropdown>
							 	</el-col>
							 </el-row>
							  <el-row class="drag-content">
							  	<el-col :span="21">
							  		<component v-bind:is="item.component"></component>
							  	</el-col>
							 </el-row>
			        </grid-item>
			    </grid-layout> 
        </div>
  </div>
  <!-- </el-col> -->
  <!-- </el-row> -->
</div>
</template>
<script>
import vueGridLayout from 'vue-grid-layout';
// import certificateSumLine from "../components/card/certificateSumLine.vue";
var GridLayout = vueGridLayout.GridLayout;
var GridItem = vueGridLayout.GridItem;

export default {
  name: 'HelloWorld',
  data () {
    return {
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
        addDashVisiable:false,
        curBox:''
      }
    },
    mounted() {
      
    },
    components:{
      GridLayout,
      GridItem
    },
    methods:{
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
      cellClick(row, column, cell, event){
            this.$message({type:"info",message:"点我"});
          },
      handleCommand(param){
           	 this.$message(param);
           },
      getTemplate(templateName){
           	return require("../components/"+templateName+".vue");
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
</script>
<style lang="less">
  @import url("./HelloWorld.less");
</style>
