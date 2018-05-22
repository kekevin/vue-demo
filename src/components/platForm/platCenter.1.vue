<template>
    <div class="main">
        <!--myflow_tools 可拖拽必须ID,全项目搜索-->

    <div id="myflow_tools" style="position: absolute; top: 10; left: 10; background-color: #fff; width: 110px; cursor: default; padding: 3px;" class="ui-tools-content">
        <div id="myflow_tools_handle" class="ui-tools-header">系统资源</div>
        <hr />
        <ul id="toolsBox" class="toolsBox"></ul>
        <hr />
        <div class="node" id="myflow_save">
            <img src="myflow/img/save.gif" />&nbsp;&nbsp;保存到本地</div>
        <div>
            <hr />
        </div>
        <div class="node selectable" id="cclick">
            &nbsp;&nbsp;cclick</div>
        <div class="node selectable" id="pointer">
            <img src="myflow/img/select16.gif" />&nbsp;&nbsp;选择</div>
        <div class="node selectable" id="path">
            <img src="myflow/img/16/flow_sequence.png" />&nbsp;&nbsp;连接</div>


        <!-- <hr /> -->

    </div>

    <!--myflow_tools 可拖拽必须ID,全项目搜索-->
    <div id="myflow_tools" class="ui-top-content">
        <div class="topMenuIcon">
            <div class="topMenuIconInner">
                <span>分析动作</span>
            </div>
        </div>

        <ul id="topBox" class="topBox">
            <!-- <li>
                <a href="#">字段过滤</a>
            </li>
            <li>
                <a href="#">条件过滤</a>
            </li>
            <li>
                <a href="#">频率分析</a>
            </li>
            <li>
                <a href="#">分类统计</a>
            </li>
            <li>
                <a href="#">条件碰撞</a>
            </li>
            <li>
                <a href="#">交集比对</a>
            </li>
            <li>
                <a href="#">数据合并</a>
            </li>
            <li>
                <a href="#">差集比对</a>
            </li> -->
        </ul>
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
export default {};
</script>


    <script type="text/javascript" src="myflow/lib/raphael-min.js"></script>
    <script type="text/javascript" src="myflow/lib/jquery-ui-1.8.4.custom/js/jquery-1.4.2.min.js"></script>
    <script type="text/javascript" src="myflow/lib/jquery-ui-1.8.4.custom/js/jquery-ui-1.8.4.custom.min.js"></script>


    <script type="text/javascript">
export default {};
</script>


    <script type="text/javascript" src="myflow/myflow.js"></script>
    <script type="text/javascript" src="myflow/myflow.jpdl4.js"></script>
    <script type="text/javascript" src="myflow/myflow.editors.js"></script>
    <script type="text/javascript">
export default {};
</script>

    
<style scoped>
main {
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
  margin: -56px;
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
  width: 660px;
  cursor: default;
  padding: 3px;
  margin-top: 10px;
  margin-left: 127px;
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

/* li {
            float: left;
            width: 60px;
            height: 40px
        } */
</style>
