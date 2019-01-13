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
				  		<el-button  :plain="true"  type="info" @click.native = "addDashButton"><i class="el-icon-plus el-icon--left" ></i> 新建MAP</el-button>
						<el-button  :plain="true"  type="info" @click.native ="formatLayout"><i class="el-icon-menu el-icon--left"></i>保存</el-button>
						<el-button  :plain="true"  type="info">
							 <!-- <el-dropdown @command="handleCommand" trigger="click"> -->
								 <el-dropdown  trigger="click">
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
			            :layout="layout1"
			            :col-num="10"
			            :row-height="30"
			            :autoSize="false"
									:is-draggable="true"
			            :is-resizable="false"
			            :useCssTransforms ="true"
			            :vertical-compact="false"
			            :margin="[10, 10]"
			            :use-css-transforms="true"
									@layout-updated="layoutUpdatedEvent"
									>  
			        <grid-item v-for="(item,index) in layout1"
												 v-if="item.type =='card'" 
												 :v-bind:item="watchitem(item)"
			        	       	 :key="item.i"
			                   :x="item.x"
			                   :y="item.y"
			                   :w="item.w"
			                   :h="item.h"
			                   :i="item.i"
												 :is-resizable ="false"
												 @move ="moveEvent"
			                   @moved="movedEvent"
													class="griditem"
													>
							 <el-row class="drag-title">
							 	<el-col :span="14">card:{{item.i}}</el-col>
							 	<el-col :span="6" class="ico">
							 		<!-- <el-dropdown   @command="handleCommand"> -->
										 <el-dropdown  >
									  <span class="el-dropdown-link">
									    <i class="el-icon-arrow-down el-icon--right"></i>
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
							<grid-item
			                   :x="0"
			                   :y="6"
			                   :w="200"
			                   :h="1"
			                   :i="1"
												 :is-resizable ="false"
			                   :is-draggable ="false"
													>
													<el-row>
														<el-col :span="12">
															<el-dropdown trigger="click">
																<span class="el-dropdown-link">
																	{{}}<i class="el-icon-arrow-down el-icon--right"></i>
																</span>
																<el-dropdown-menu slot="dropdown">
																	<el-dropdown-item @click.native="dialogFormVisible = true">Show release detail</el-dropdown-item>
																	<el-dropdown-item @click.native="editReleaseName()">Edit name</el-dropdown-item>
																	<el-dropdown-item>Add new release below</el-dropdown-item>
																	<el-dropdown-item>Delete release</el-dropdown-item>
																</el-dropdown-menu>
															</el-dropdown>
														</el-col>
													</el-row>
			        </grid-item>
							<el-dialog title="Release" :visible.sync="dialogFormVisible">
									<el-form :model="form">
										<el-form-item label="name" :label-width="formLabelWidth">
											<el-input v-model="form.name" autocomplete="off"></el-input>
										</el-form-item>
										<el-form-item label="description" :label-width="formLabelWidth">
											<el-select v-model="form.region" placeholder="请选择活动区域">
												<el-option label="区域一" value="shanghai"></el-option>
												<el-option label="区域二" value="beijing"></el-option>
											</el-select>
										</el-form-item>
									</el-form>
									<div slot="footer" class="dialog-footer">
										<el-button @click="dialogFormVisible = false">取 消</el-button>
										<el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
									</div>
							</el-dialog>
			    </grid-layout> 
        </div>
  </div>
  <!-- </el-col> -->
  <!-- </el-row> -->
</div>
</template>
<script>
// import HelloWorld from './HelloWorld.js'
// export default HelloWorld
// export default {
//   name: 'HelloWorld',
import MapClass from './MapClass.js'
export default MapClass
  
// }
</script>
<style lang="less">
  @import url("./HelloWorld.less");
</style>
