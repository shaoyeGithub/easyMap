<template v-loading.fullscreen.lock="$store.state.global.ajax_loading">
    <div class="home">
			  <!-- <img src="../../../assets/A2.png"> -->
        <head-nav></head-nav>
        <el-row class="dashcontent">
        	 <el-col :span="3" class="left-menu">
		      		 <el-row class="tac">
						</el-row>
		      		</el-col>
		      		<el-col :span="21" class="right-menu">
        <div   class="dash">
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
        	<div class="component">
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
        </el-col>
        </el-row>
        <!-- <div class="formatLayout">
        	<el-dialog
			  title="版式布局"
			  :visible.sync="formatLayoutVisible"
			  :close-on-click-modal="false"
			  :show-close="false"
			  custom-class="dashDialog"
			  size="small">
			  <div class="content">
			  	<el-row>
				  <el-col :span="22" :push="1">
				  	<div class="header bg-purple-dark">选择版式布局</div>
				  </el-col>
				</el-row>
				<el-row :gutter="10" style="padding-left: 10%;">
				  <el-col :span="4"  v-for="(item) in layTable" :key="item.id">
				  	<div class="grid-content bg-purple-light"  @click="layView(item)">
				  	<img v-bind:src="item.src" />
				  </div>
				  </el-col>
				</el-row>
			  </div>
			  <span slot="footer" class="dialog-footer">
			    <el-button @click="formatLayoutVisible = false">取 消</el-button>
			  </span>
			</el-dialog>
        </div> -->
        <!--添加看板-->
         <!-- <div class="formatLayout">
        	<el-dialog
			  title="统计工具"
			  :visible.sync="addDashVisiable"
			  :close-on-click-modal="false"
			  :show-close="false"
			  custom-class="addDashDialog"
			  size="small"> -->
			  <!-- <div slot="title" class="dialog-title">
			  	<el-row :gutter="20">
			  	<el-col :span="8"><h4>统计小工具</h4></el-col>
			  	<el-col :span="8" :push="7">
			  		<el-input v-model="addDashInput" placeholder="请输入内容" size="small"></el-input>
			  	</el-col>
			   </el-row>
			  </div>
			  <div class="addDashContent">
			  	 <el-row :gutter="20">
				  <el-col :span="5"  class="leftmenu">
				  	<div class="grid-content bg-purple-dark">
				  		<ul>
				  			<li v-for="(item,index) in searchType" :key ="item.id"
				  				 @click="searchType_Click(index)"
				  				 v-bind:class="index==searchIndex ? 'typeselect' : ''">
				  				{{item.name}} ({{item.num}})
				  			</li>
				  		</ul>
				  	</div>
				  </el-col>
				  <el-col :span="19" class="rightmenu">
				  	<div class="grid-content bg-purple-dark">
				  		<el-row>
						  <el-col v-for="item in gadgetList" :key="item.id"  class="componentlist">
						    
						      <img src="../../../assets/tab.png" class="image">
						      <ul>
						      	<li><b>{{item.title}}</b></li>
						      	<li><span>{{item.description}}</span></li>
						      </ul>
						      <div>
						        <div class="bottom clearfix">
						          <el-button type="button" class="button" >马上添加</el-button>
						        </div>
						      </div>
						  </el-col>
						</el-row>
				  	</div>
				  </el-col>
				</el-row>
			  </div>
			  <span slot="footer" class="dialog-footer">
			    <el-button @click="addDashVisiable = false">取 消</el-button>
			  </span>
			</el-dialog>
         </div> -->
    </div>
    
</template>
<script>
    import dashView from './dashView.js';
     export default dashView;
   
</script>
<style lang="less">
	@import url("./dashView.less");
</style>
