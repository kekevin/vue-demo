<template>
	<div class="platTableMain">
		<!--myflow_tools 可拖拽必须ID,全项目搜索-->

		<div id="myflow_tools" style="position: absolute; top: 10; left: 10; background-color: #fff; width: 110px; cursor: default; padding: 3px;" class="ui-tools-content">
			<div id="myflow_tools_handle" class="ui-tools-header">系统资源</div>
			<hr />
			<ul id="toolsBox" class="toolsBox"></ul>
			<hr />
			<div class="node" id="myflow_save">
				<img :src="imgSrc.picSave" />&nbsp;&nbsp;保存到本地</div>
      <div class="node" id="myflow_reset">&nbsp;&nbsp;重置</div>
      <div class="node" id="myflow_outTest">&nbsp;&nbsp;myflow_outTest</div>
			<div>
				<hr />
			</div>
			<div class="node selectable" id="cclick">
				&nbsp;&nbsp;cclick</div>
			<div class="node selectable" id="pointer">
				<img :src="imgSrc.picSelect" />&nbsp;&nbsp;选择</div>
			<div class="node selectable" id="path">
				<img :src="imgSrc.picConnect" />&nbsp;&nbsp;连接</div>

			<!-- <hr /> -->

		</div>

		<!--myflow_tools 可拖拽必须ID,全项目搜索-->
		<div id="myflow_tools" class="ui-top-content">
			<div class="topMenuIcon">
				<div class="topMenuIconInner">
					<span>分析动作</span>
				</div>
			</div>
			<ul id="topBox" class="topBox"></ul>
		</div>

		<div id="myflow_props" style="position: absolute; top:30; right: 50; background-color: #fff; width: 220px; padding: 3px;" class="ui-widget-content">
			<div id="myflow_props_handle" class="ui-widget-header">属性</div>
			<table border="1" width="100%" cellpadding="0" cellspacing="0">
				<tr>
					<td>aaa</td>
				</tr>
				<tr>
					<td>aaa</td>
				</tr>
			</table>
			<form action="flow_downloadZip.action" id="zip">
				<input type="hidden" name="json" id="json" />
			</form>
			<div>&nbsp;</div>
		</div>

		<div id="myflow"></div>
	</div>
</template>

<script>
function outTest(value) {
  console.log("outTest", value);
}

$(function() {
  $("#myflow_outTest").click(function() {
    console.log(this);
    outTest("1");
    console.log("outTest-no value");
  });
});

import picSave from "@/components/platForm/myflow/img/save.gif";
import picSelect from "@/components/platForm/myflow/img/select16.gif";
import picConnect from "@/components/platForm/myflow/img/16/flow_sequence.png";

// // 在坐标（10,50）创建宽320，高200的画布
// var paper = Raphael(10, 50, 320, 200);
// // 在坐标（x = 50, y = 40）绘制半径为 10 的圆
// var circle = paper.circle(50, 40, 10);
// // 给绘制的圆圈填充红色 (#f00)
// circle.attr("fill", "#f00");
// // 设置画笔（stroke）的颜色为白色
// circle.attr("stroke", "#fff");

function DialogBox(MainDlgID, DlgID, TitleID, ContentID) {
  this.MainID = MainDlgID; //背景层的ID
  this.DlgID = DlgID; //对话框 层ID
  this.TitleID = TitleID; //对话框标题栏 层Id
  this.ContentID = ContentID; //对话框信息框 层Id

  //---------------------------------------------------------大框(背景层)------------------------
  var MainNode = document.createElement("div");

  MainNode.setAttribute("id", this.MainID);
  MainNode.style.backgroundColor = "#000000";

  MainNode.style.left = "0px";
  MainNode.style.top = "0px";
  MainNode.style.width = "0px";
  MainNode.style.height = "0px";

  MainNode.innerHTML = "";
  MainNode.style.position = "absolute";
  MainNode.style.zIndex = "100";

  MainNode.style.display = "none";

  if (MainNode.filters) {
    MainNode.style.filter = "alpha(opacity=70)";
  } else {
    MainNode.style.opacity = "0.7";
  }

  //--------------------------------------------------------- 对话框----------------
  var dlgNode = document.createElement("div");
  dlgNode.setAttribute("id", this.DlgID);
  dlgNode.style.backgroundColor = "#FF7800";
  dlgNode.style.zIndex = "1020";
  dlgNode.style.display = "none";

  dlgNode.style.left = "0px";
  dlgNode.style.top = "0px";

  dlgNode.style.width = "300" + "px";
  dlgNode.style.height = "200" + "px";

  dlgNode.innerHTML = "";
  dlgNode.style.color = "#890987";
  dlgNode.style.position = "absolute";

  //-----------------------------------------------------title-----------------------

  var TitleNode = document.createElement("div");
  TitleNode.setAttribute("id", this.TitleID);
  TitleNode.style.backgroundColor = "#FFFFFF";
  TitleNode.style.width = "100%";
  TitleNode.style.height = "30" + "px";
  TitleNode.innerHTML = "Title";
  TitleNode.style.color = "#890117";

  //-----------------------------------------------------Information-----------------

  var InforNode = document.createElement("div");
  InforNode.setAttribute("id", this.ContentID);
  InforNode.style.backgroundColor = "#CCCCCC";
  InforNode.style.width = "100%";
  InforNode.style.height = "100%";
  InforNode.innerHTML = "Content";
  InforNode.style.color = "#890117";

  //-----------------------------------------------------各节点加入Dom------------

  dlgNode.appendChild(TitleNode);
  dlgNode.appendChild(InforNode);
  document.body.appendChild(dlgNode);
  document.body.appendChild(MainNode);
}
//====================================================================================

//打开对话框-------------------------------------------------------------------------
DialogBox.prototype.open = function(titleText, informaton) {
  document.getElementById(this.TitleID).innerHTML =
    "<table border='0px' width='100%'><tr><td style='text-align:left;width:70%;'>" +
    titleText +
    "</td><td style='text-align:right;width:30%;'><input type='button' onclick='javascript:document.getElementById(\"" +
    this.MainID +
    '").style.display="none";document.getElementById("' +
    this.DlgID +
    "\").style.display=\"none\";'  value='关闭'/></td></tr></table>";
  document.getElementById(this.ContentID).innerHTML = informaton;

  var Dwidth = document.documentElement.scrollWidth;
  var Dheight = document.documentElement.scrollHeight;

  var CHeight = document.documentElement.clientHeight;
  var CWidth = document.documentElement.clientWidth;

  var scrolltop = document.documentElement.scrollTop;

  var Dlgwidth = document.getElementById(this.DlgID).style.width;
  var DlgHeight = document.getElementById(this.DlgID).style.height;

  document.getElementById(this.MainID).style.width = Dwidth + "px";
  document.getElementById(this.MainID).style.height = Dheight + "px";

  document.getElementById(this.DlgID).style.left =
    CWidth / 2 - parseInt(Dlgwidth) / 2 + "px";
  document.getElementById(this.DlgID).style.top =
    scrolltop + CHeight / 2 - parseInt(DlgHeight) / 2 + "px";

  document.getElementById(this.MainID).style.display = "block";
  document.getElementById(this.DlgID).style.display = "block";
};

//数据
var toolsData = [
  {
    toolId: "records",
    toolName: "上网人员记录"
  },
  {
    toolId: "outOfControl",
    toolName: "失控重点人员"
  },
  {
    toolId: "checkInfo",
    toolName: "盘查人员信息"
  },
  {
    toolId: "rental",
    toolName: "出租屋信息"
  }
];
var toolsList = "";
var topData = [
  {
    topId: "topId1",
    topName: "字段过滤"
  },
  {
    topId: "topId2",
    topName: "条件过滤"
  },
  {
    topId: "topId3",
    topName: "频率分析"
  },
  {
    topId: "topId4",
    topName: "分类统计"
  },
  {
    topId: "topId5",
    topName: "条件碰撞"
  },
  {
    topId: "topId6",
    topName: "交集比对"
  },
  {
    topId: "topId7",
    topName: "数据合并"
  },
  {
    topId: "topId8",
    topName: "差集比对"
  }
];
var topList = "";
for (var i = 0; i < toolsData.length; i++) {
  toolsList +=
    '<li class="node state ui-draggable" id=' +
    toolsData[i].toolId +
    " type=" +
    toolsData[i].toolId +
    ">" +
    toolsData[i].toolName +
    "</li>";
  // list +="<li class=\"node state ui-draggable\" id="+toolsData[i].toolId+" type="+toolsData[i].toolId+"><img src=\"myflow/img/16/task_empty.png\" />"+toolsData[i].toolName +"</li>";
}
for (var i = 0; i < topData.length; i++) {
  topList +=
    '<li class="node state ui-draggable" id=' +
    topData[i].topId +
    " type=" +
    topData[i].topId +
    ">" +
    topData[i].topName +
    "</li>";
}
$(function() {
  $("#toolsBox").append(toolsList);
  $("#topBox").append(topList);

  $("#myflow").myflow({
    basePath: ""
    // restore: eval("({\"states\":{\"rect1\":{\"id\":\"rect1\",\"type\":\"start\",\"text\":{\"text\":\"开始\"}, \"attr\":{ \"x\":247, \"y\":14, \"width\":50, \"height\":50}, \"props\":{\"text\":{\"value\":\"开始\"},\"temp1\":{\"value\":\"\"},\"temp2\":{\"value\":\"\"}}},\"rect8\":{\"id\":\"rect8\",\"type\":\"end\",\"text\":{\"text\":\"结束\"}, \"attr\":{ \"x\":607, \"y\":16, \"width\":50, \"height\":50}, \"props\":{\"text\":{\"value\":\"结束\"},\"temp1\":{\"value\":\"\"},\"temp2\":{\"value\":\"\"}}},\"rect21\":{\"id\":\"rect21\",\"type\":\"task\",\"text\":{\"text\":\"提交申请\"}, \"attr\":{ \"x\":219, \"y\":121, \"width\":100, \"height\":50}, \"props\":{\"text\":{\"value\":\"提交申请\"},\"assignee\":{\"value\":\"\"}}},\"rect22\":{\"id\":\"rect22\",\"type\":\"task\",\"text\":{\"text\":\"审批任务1\"}, \"attr\":{ \"x\":114, \"y\":302, \"width\":100, \"height\":50}, \"props\":{\"text\":{\"value\":\"审批任务1\"},\"assignee\":{\"value\":\"\"}}},\"rect23\":{\"id\":\"rect23\",\"type\":\"task\",\"text\":{\"text\":\"审批任务2\"}, \"attr\":{ \"x\":344, \"y\":300, \"width\":100, \"height\":50}, \"props\":{\"text\":{\"value\":\"审批任务2\"},\"assignee\":{\"value\":\"\"}}},\"rect24\":{\"id\":\"rect24\",\"type\":\"fork\",\"text\":{\"text\":\"分支\"}, \"attr\":{ \"x\":243, \"y\":207, \"width\":50, \"height\":50}, \"props\":{\"text\":{\"value\":\"分支\"}}},\"rect29\":{\"id\":\"rect29\",\"type\":\"join\",\"text\":{\"text\":\"合并\"}, \"attr\":{ \"x\":244, \"y\":399, \"width\":50, \"height\":50}, \"props\":{\"text\":{\"value\":\"合并\"}}},\"rect32\":{\"id\":\"rect32\",\"type\":\"task\",\"text\":{\"text\":\"审批任务3\"}, \"attr\":{ \"x\":407, \"y\":400, \"width\":100, \"height\":50}, \"props\":{\"text\":{\"value\":\"审批任务3\"},\"assignee\":{\"value\":\"\"}}},\"rect33\":{\"id\":\"rect33\",\"type\":\"task\",\"text\":{\"text\":\"审批任务4\"}, \"attr\":{ \"x\":583, \"y\":403, \"width\":100, \"height\":50}, \"props\":{\"text\":{\"value\":\"审批任务4\"},\"assignee\":{\"value\":\"\"}}},\"rect34\":{\"id\":\"rect34\",\"type\":\"task\",\"text\":{\"text\":\"审批任务5\"}, \"attr\":{ \"x\":582, \"y\":201, \"width\":100, \"height\":50}, \"props\":{\"text\":{\"value\":\"审批任务5\"},\"assignee\":{\"value\":\"\"}}}},\"paths\":{\"path25\":{\"from\":\"rect1\",\"to\":\"rect21\", \"dots\":[],\"text\":{\"text\":\"TO 提交申请\"},\"textPos\":{\"x\":0,\"y\":-10}, \"props\":{\"text\":{\"value\":\"\"}}},\"path26\":{\"from\":\"rect21\",\"to\":\"rect24\", \"dots\":[],\"text\":{\"text\":\"TO 分支\"},\"textPos\":{\"x\":0,\"y\":-10}, \"props\":{\"text\":{\"value\":\"\"}}},\"path27\":{\"from\":\"rect24\",\"to\":\"rect22\", \"dots\":[{\"x\":164,\"y\":231}],\"text\":{\"text\":\"TO 审批任务1\"},\"textPos\":{\"x\":18,\"y\":-15}, \"props\":{\"text\":{\"value\":\"TO 审批任务1\"}}},\"path28\":{\"from\":\"rect24\",\"to\":\"rect23\", \"dots\":[{\"x\":393,\"y\":231}],\"text\":{\"text\":\"TO 审批任务2\"},\"textPos\":{\"x\":4,\"y\":-15}, \"props\":{\"text\":{\"value\":\"TO 审批任务2\"}}},\"path30\":{\"from\":\"rect22\",\"to\":\"rect29\", \"dots\":[{\"x\":162,\"y\":426}],\"text\":{\"text\":\"TO 合并\"},\"textPos\":{\"x\":5,\"y\":-16}, \"props\":{\"text\":{\"value\":\"TO 合并\"}}},\"path31\":{\"from\":\"rect23\",\"to\":\"rect29\", \"dots\":[],\"text\":{\"text\":\"TO 合并\"},\"textPos\":{\"x\":0,\"y\":-10}, \"props\":{\"text\":{\"value\":\"\"}}},\"path35\":{\"from\":\"rect29\",\"to\":\"rect32\", \"dots\":[],\"text\":{\"text\":\"TO 审批任务3\"},\"textPos\":{\"x\":0,\"y\":-10}, \"props\":{\"text\":{\"value\":\"\"}}},\"path36\":{\"from\":\"rect32\",\"to\":\"rect33\", \"dots\":[],\"text\":{\"text\":\"TO 审批任务4\"},\"textPos\":{\"x\":0,\"y\":-10}, \"props\":{\"text\":{\"value\":\"\"}}},\"path37\":{\"from\":\"rect33\",\"to\":\"rect34\", \"dots\":[],\"text\":{\"text\":\"TO 审批任务5\"},\"textPos\":{\"x\":0,\"y\":-10}, \"props\":{\"text\":{\"value\":\"\"}}},\"path38\":{\"from\":\"rect34\",\"to\":\"rect8\", \"dots\":[],\"text\":{\"text\":\"TO 结束\"},\"textPos\":{\"x\":0,\"y\":-10}, \"props\":{\"text\":{\"value\":\"\"}}},\"path39\":{\"from\":\"rect32\",\"to\":\"rect34\", \"dots\":[],\"text\":{\"text\":\"TO 审批任务5\"},\"textPos\":{\"x\":0,\"y\":-10}, \"props\":{\"text\":{\"value\":\"\"}}}},\"props\":{\"props\":{\"name\":{\"value\":\"流程模板\"}}}})"),
    // tools: {
    //     save: {
    //         onclick: function (data) {
    //             alert('save:\n' + data);
    //         }
    //     }
    // }
  });
});

export default {
  methods: {
    testMethod(){
      console.log('testMethod')
    }
  },
  data() {
    return {
      imgSrc: {
        picSave,
        picSelect,
        picConnect
      }
    };
  },
  computed: {},
  mounted() {}
};
</script>

<style>
.platTableMain {
  margin: 0;
  pading: 0;
  text-align: left;
  font-family: Arial, sans-serif, Helvetica, Tahoma;
  font-size: 12px;
  line-height: 1.5;
  color: black;
  background-image: url(myflow/img/bg.png);
}
/* .node {
            width: 110px;
            text-align: center;
            vertical-align: middle;
            border: 1px solid #fff;
        }*/

.node {
  width: 110px;
  text-align: center;
  vertical-align: middle;
  border: 1px solid #fff;
}

.mover {
  border: 1px solid #ddd;
  background-color: #ddd;
}

.selected {
  background-color: #ddd;
}

.state {
}

#myflow_props table {
}

#myflow_props th {
  letter-spacing: 2px;
  text-align: left;
  padding: 6px;
  background: #ddd;
}

#myflow_props td {
  background: #fff;
  padding: 6px;
}

#pointer {
  background-repeat: no-repeat;
  background-position: center;
}

#path {
  background-repeat: no-repeat;
  background-position: center;
}

#task {
  background-repeat: no-repeat;
  background-position: center;
}

#state {
  background-repeat: no-repeat;
  background-position: center;
}

.topMenuIcon {
  width: 60px;
  height: 61px;
  float: left;
  overflow: hidden;
}

.topMenuIconInner {
  margin: -24px 0px 0px 0px;
  width: 0;
  height: 0;
  border: 56px solid transparent;
  border-left: 57px solid #00ccff;
  float: left;
}

.topMenuIconInner span {
  display: block;
  margin-left: -56px;
  color: white;
  line-height: 0px;
}

ul {
  list-style: none;
}

.toolsBox {
  padding: 0 0;
}

.toolsBox li {
  text-align: left;
}

.ui-top-content {
  border: 1px solid #aaa;
  position: absolute;
  background-color: #fff;
  width: 600px;
  cursor: default;
  padding: 3px;
  margin-top: 10px;
  margin-left: 127px;
}

.topBox {
  margin-top: 10px;
}

.topBox li {
  display: block;
  float: left;
  width: 60px;
  height: 40px;
  background-color: #009dd9;
  line-height: 40px;
  margin-right: 3px;
  margin-bottom: 10px;
  text-decoration: none;
  color: white !important;
}

.ui-tools-content {
  border: 1px solid #aaa;
}

.ui-tools-header {
  text-align: center;
  height: 30px;
  line-height: 30px;
}

.ui-tools-content li a {
  text-decoration: none;
}

.uiNode {
  width: 100px;
  margin-left: -36px;
}

.uiState {
}
</style>