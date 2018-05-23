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

// $(function() {
//   $("#myflow_outTest").click(function() {
//     console.log(this);
//     outTest("1");
//     console.log("outTest-no value");
//   });
// });


//myFLow.js
$(function() {
   var myflow = {};
    myflow.config = {
        editable: true,
        lineHeight: 15,
        basePath: '',
        rect: { // 状态
            attr: {
                x: 10,
                y: 10,
                width: 100,
                height: 50,
                r: 5,
                fill: '90-#fff-#C0C0C0',
                stroke: '#000',
                "stroke-width": 1
            },
            showType: 'image&text', // image,text,image&text
            type: 'state',
            name: {
                text: 'state',
                'font-style': 'italic'
            },
            text: {
                text: '状态',
                'font-size': 13
            },
            margin: 5,
            props: [],
            img: {}
        },
        path: { // 路径转换
            attr: {
                path: {
                    path: 'M10 10L100 100',
                    stroke: '#808080',
                    fill: "none",
                    "stroke-width": 2
                },
                arrow: {
                    path: 'M10 10L10 10',
                    stroke: '#808080',
                    fill: "#808080",
                    "stroke-width": 2,
                    radius: 4
                },
                fromDot: {
                    width: 5,
                    height: 5,
                    stroke: '#fff',
                    fill: '#000',
                    cursor: "move",
                    "stroke-width": 2
                },
                toDot: {
                    width: 5,
                    height: 5,
                    stroke: '#fff',
                    fill: '#000',
                    cursor: "move",
                    "stroke-width": 2
                },
                bigDot: {
                    width: 5,
                    height: 5,
                    stroke: '#fff',
                    fill: '#000',
                    cursor: "move",
                    "stroke-width": 2
                },
                smallDot: {
                    width: 5,
                    height: 5,
                    stroke: '#fff',
                    fill: '#000',
                    cursor: "move",
                    "stroke-width": 3
                },
                text: {
                    cursor: "move",
                    'background': '#000'
                }
            },
            text: {
                patten: 'TO {to}',
                textPos: {
                    x: 0,
                    y: -10
                }
            },
            props: {
                text: {
                    name: 'text',
                    label: '显示',
                    value: '',
                    editor: function() {
                        return new myflow.editors.textEditor();
                    }
                }
            }
        },
        tools: { // 工具栏
            attr: {
                left: 10,
                top: 10
            },
            pointer: {},
            path: {},
            states: {},
            save: {
                onclick: function(data) {
                    console.log(data)
                    // alert(data);
                }
            }
        },
        props: { // 属性编辑器
            attr: {
                top: 160, //属性编辑器初始位置kkkkkk
                right: 10
            },
            props: {}
        },
        restore: '',
        activeRects: { // 当前激活状态
            rects: [],
            rectAttr: {
                stroke: '#ff0000',
                "stroke-width": 2
            }
        },
        historyRects: { // 历史激活状态
            rects: [],
            pathAttr: {
                path: {
                    stroke: '#00ff00'
                },
                arrow: {
                    stroke: '#00ff00',
                    fill: "#00ff00"
                }
            }
        }
    };

    //工具集
    myflow.util = {
        isLine: function(p1, p2, p3) { // 三个点是否在一条直线上
            var s, p2y;
            if ((p1.x - p3.x) == 0)
                s = 1;
            else
                s = (p1.y - p3.y) / (p1.x - p3.x);
            p2y = (p2.x - p3.x) * s + p3.y;
            // $('body').append(p2.y+'-'+p2y+'='+(p2.y-p2y)+', ');
            if ((p2.y - p2y) < 10 && (p2.y - p2y) > -10) {
                p2.y = p2y;
                return true;
            }
            return false;
        },
        center: function(p1, p2) { // 两个点的中间点
            return {
                x: (p1.x - p2.x) / 2 + p2.x,
                y: (p1.y - p2.y) / 2 + p2.y
            };
        },
        nextId: (function() {
            var uid = 0;
            return function() {
                return ++uid;
            };
        })(),

        connPoint: function(rect, p) { // 计算矩形中心到p的连线与矩形的交叉点
            var start = p,
                end = {
                    x: rect.x + rect.width / 2,
                    y: rect.y + rect.height / 2
                };
            // 计算正切角度
            var tag = (end.y - start.y) / (end.x - start.x);
            tag = isNaN(tag) ? 0 : tag;

            var rectTag = rect.height / rect.width;
            // 计算箭头位置
            var xFlag = start.y < end.y ? -1 : 1,
                yFlag = start.x < end.x ?
                -1 :
                1,
                arrowTop, arrowLeft;
            // 按角度判断箭头位置
            if (Math.abs(tag) > rectTag && xFlag == -1) { // top边
                arrowTop = end.y - rect.height / 2;
                arrowLeft = end.x + xFlag * rect.height / 2 / tag;
            } else if (Math.abs(tag) > rectTag && xFlag == 1) { // bottom边
                arrowTop = end.y + rect.height / 2;
                arrowLeft = end.x + xFlag * rect.height / 2 / tag;
            } else if (Math.abs(tag) < rectTag && yFlag == -1) { // left边
                arrowTop = end.y + yFlag * rect.width / 2 * tag;
                arrowLeft = end.x - rect.width / 2;
            } else if (Math.abs(tag) < rectTag && yFlag == 1) { // right边
                arrowTop = end.y + rect.width / 2 * tag;
                arrowLeft = end.x + rect.width / 2;
            }
            return {
                x: arrowLeft,
                y: arrowTop
            };
        },

        arrow: function(p1, p2, r) { // 画箭头，p1 开始位置,p2 结束位置, r前头的边长
            var atan = Math.atan2(p1.y - p2.y, p2.x - p1.x) * (180 / Math.PI);

            var centerX = p2.x - r * Math.cos(atan * (Math.PI / 180));
            var centerY = p2.y + r * Math.sin(atan * (Math.PI / 180));

            var x2 = centerX + r * Math.cos((atan + 120) * (Math.PI / 180));
            var y2 = centerY - r * Math.sin((atan + 120) * (Math.PI / 180));

            var x3 = centerX + r * Math.cos((atan + 240) * (Math.PI / 180));
            var y3 = centerY - r * Math.sin((atan + 240) * (Math.PI / 180));
            return [p2, {
                x: x2,
                y: y2
            }, {
                x: x3,
                y: y3
            }];
        }
    }

    myflow.rect = function(o, r, id) { //o参数就是对象
        var _this = this,
            _uid = myflow.util.nextId(),
            _o = $.extend(true, {},
                myflow.config.rect, o),
            _id = 'rect' + _uid,
            _r = r, // Raphael画笔
            _rect, _img, // 图标
            _name, // 状态名称
            _text, // 显示文本
            _ox, _oy; // 拖动时，保存起点位置;
        _o.text.text = id;
        _o.name.text = "";
        console.log('myflow.rect');
        // console.log(_this);
        // console.log(this);
        // console.log(_o);
        // console.log(o);
        // console.log(r);
        // console.log(id);
        console.log('myflow.rect');

        _rect = _r.rect(_o.attr.x, _o.attr.y, _o.attr.width, _o.attr.height,
            _o.attr.r).hide().attr(_o.attr);

        _img = _r.image(myflow.config.basePath + _o.img.src,
            _o.attr.x + _o.img.width / 2,
            _o.attr.y + (_o.attr.height - _o.img.height) / 2, _o.img.width,
            _o.img.height).hide();
        _name = _r.text(
                _o.attr.x + _o.img.width + (_o.attr.width - _o.img.width) / 2,
                _o.attr.y + myflow.config.lineHeight / 2, _o.name.text).hide()
            .attr(_o.name);
        _text = _r.text(
                _o.attr.x + _o.img.width + (_o.attr.width - _o.img.width) / 2,
                _o.attr.y + (_o.attr.height - myflow.config.lineHeight) / 2 +
                myflow.config.lineHeight, _o.text.text).hide()
            .attr(_o.text); // 文本

        // 拖动处理----------------------------------------
        _rect.drag(function(dx, dy) {
            dragMove(dx, dy);
        }, function() {
            dragStart()
        }, function() {
            dragUp();
        });
        _img.drag(function(dx, dy) {
            dragMove(dx, dy);
        }, function() {
            dragStart()
        }, function() {
            dragUp();
        });
        _name.drag(function(dx, dy) {
            dragMove(dx, dy);
        }, function() {
            dragStart()
        }, function() {
            dragUp();
        });
        _text.drag(function(dx, dy) {
            dragMove(dx, dy);
        }, function() {
            dragStart()
        }, function() {
            dragUp();
        });

        var dragMove = function(dx, dy) { // 拖动中
            if (!myflow.config.editable)
                return;

            var x = (_ox + dx); // -((_ox+dx)%10);
            var y = (_oy + dy); // -((_oy+dy)%10);

            _bbox.x = x - _o.margin;
            _bbox.y = y - _o.margin;
            resize();
        };

        var dragStart = function() { // 开始拖动
            _ox = _rect.attr("x");
            _oy = _rect.attr("y");
            _rect.attr({
                opacity: 0.5
            });
            _img.attr({
                opacity: 0.5
            });
            _text.attr({
                opacity: 0.5
            });
        };

        var dragUp = function() { // 拖动结束
            _rect.attr({
                opacity: 1
            });
            _img.attr({
                opacity: 1
            });
            _text.attr({
                opacity: 1
            });
        };

        // 改变大小的边框
        var _bpath, _bdots = {},
            _bw = 5,
            _bbox = {
                x: _o.attr.x - _o.margin,
                y: _o.attr.y - _o.margin,
                width: _o.attr.width + _o.margin * 2,
                height: _o.attr.height + _o.margin * 2
            };

        _bpath = _r.path('M0 0L1 1').hide();
        _bdots['t'] = _r.rect(0, 0, _bw, _bw).attr({
            fill: '#000',
            stroke: '#fff',
            cursor: 's-resize'
        }).hide().drag(function(dx, dy) {
            bdragMove(dx, dy, 't');
        }, function() {
            bdragStart(this.attr('x') + _bw / 2, this.attr('y') + _bw /
                2, 't');
        }, function() {}); // 上
        _bdots['lt'] = _r.rect(0, 0, _bw, _bw).attr({
            fill: '#000',
            stroke: '#fff',
            cursor: 'nw-resize'
        }).hide().drag(function(dx, dy) {
            bdragMove(dx, dy, 'lt');
        }, function() {
            bdragStart(this.attr('x') + _bw / 2, this.attr('y') + _bw /
                2, 'lt');
        }, function() {}); // 左上
        _bdots['l'] = _r.rect(0, 0, _bw, _bw).attr({
            fill: '#000',
            stroke: '#fff',
            cursor: 'w-resize'
        }).hide().drag(function(dx, dy) {
            bdragMove(dx, dy, 'l');
        }, function() {
            bdragStart(this.attr('x') + _bw / 2, this.attr('y') + _bw /
                2, 'l');
        }, function() {}); // 左
        _bdots['lb'] = _r.rect(0, 0, _bw, _bw).attr({
            fill: '#000',
            stroke: '#fff',
            cursor: 'sw-resize'
        }).hide().drag(function(dx, dy) {
            bdragMove(dx, dy, 'lb');
        }, function() {
            bdragStart(this.attr('x') + _bw / 2, this.attr('y') + _bw /
                2, 'lb');
        }, function() {}); // 左下
        _bdots['b'] = _r.rect(0, 0, _bw, _bw).attr({
            fill: '#000',
            stroke: '#fff',
            cursor: 's-resize'
        }).hide().drag(function(dx, dy) {
            bdragMove(dx, dy, 'b');
        }, function() {
            bdragStart(this.attr('x') + _bw / 2, this.attr('y') + _bw /
                2, 'b');
        }, function() {}); // 下
        _bdots['rb'] = _r.rect(0, 0, _bw, _bw).attr({
            fill: '#000',
            stroke: '#fff',
            cursor: 'se-resize'
        }).hide().drag(function(dx, dy) {
            bdragMove(dx, dy, 'rb');
        }, function() {
            bdragStart(this.attr('x') + _bw / 2, this.attr('y') + _bw /
                2, 'rb');
        }, function() {}); // 右下
        _bdots['r'] = _r.rect(0, 0, _bw, _bw).attr({
            fill: '#000',
            stroke: '#fff',
            cursor: 'w-resize'
        }).hide().drag(function(dx, dy) {
            bdragMove(dx, dy, 'r');
        }, function() {
            bdragStart(this.attr('x') + _bw / 2, this.attr('y') + _bw /
                2, 'r')
        }, function() {}); // 右
        _bdots['rt'] = _r.rect(0, 0, _bw, _bw).attr({
            fill: '#000',
            stroke: '#fff',
            cursor: 'ne-resize'
        }).hide().drag(function(dx, dy) {
            bdragMove(dx, dy, 'rt');
        }, function() {
            bdragStart(this.attr('x') + _bw / 2, this.attr('y') + _bw /
                2, 'rt')
        }, function() {}); // 右上
        $([_bdots['t'].node, _bdots['lt'].node, _bdots['l'].node, _bdots['lb'].node, _bdots['b'].node, _bdots['rb'].node, _bdots['r'].node, _bdots['rt'].node]).click(function() { return false; });

        var bdragMove = function(dx, dy, t) {
            if (!myflow.config.editable)
                return;
            var x = _bx + dx,
                y = _by + dy;
            switch (t) {
                case 't':
                    _bbox.height += _bbox.y - y;
                    _bbox.y = y;
                    break;
                case 'lt':
                    _bbox.width += _bbox.x - x;
                    _bbox.height += _bbox.y - y;
                    _bbox.x = x;
                    _bbox.y = y;
                    break;
                case 'l':
                    _bbox.width += _bbox.x - x;
                    _bbox.x = x;
                    break;
                case 'lb':
                    _bbox.height = y - _bbox.y;
                    _bbox.width += _bbox.x - x;
                    _bbox.x = x;
                    break;
                case 'b':
                    _bbox.height = y - _bbox.y;
                    break;
                case 'rb':
                    _bbox.height = y - _bbox.y;
                    _bbox.width = x - _bbox.x;
                    break;
                case 'r':
                    _bbox.width = x - _bbox.x;
                    break;
                case 'rt':
                    _bbox.width = x - _bbox.x;
                    _bbox.height += _bbox.y - y;
                    _bbox.y = y;
                    break;
            }
            resize();
            // $('body').append(t);
        };
        var bdragStart = function(ox, oy, t) {
            _bx = ox;
            _by = oy;
        };

        // 事件处理--------------------------------
        $([_rect.node, _text.node, _name.node, _img.node]).bind('click',
            function() {
                if (!myflow.config.editable)
                    return;

                showBox();
                var mod = $(_r).data('mod');
                switch (mod) {
                    case 'pointer':
                        break;
                    case 'path':
                        var pre = $(_r).data('currNode');
                        if (pre && pre.getId() != _id &&
                            pre.getId().substring(0, 4) == 'rect') {
                            $(_r).trigger('addpath', [pre, _this]);
                        }
                        break;
                }
                $(_r).trigger('click', _this);
                $(_r).data('currNode', _this);
                console.log('事件处理')
                return false;
            });

        var clickHandler = function(e, src) {
            console.log('clickHandler')
            if (!myflow.config.editable)
                return;
            if (src.getId() == _id) {
                $(_r).trigger('showprops', [_o.props, src]);
            } else {
                hideBox();
            }
        };
        $(_r).bind('click', clickHandler);

        var textchangeHandler = function(e, text, src) {
            console.log('textchangeHandler')
            if (src.getId() == _id) {
                _text.attr({
                    text: text
                });
            }
        };
        $(_r).bind('textchange', textchangeHandler);

        // 私有函数-----------------------
        // 边框路径
        function getBoxPathString() {
            console.log('边框路径 私有函数')
            return 'M' + _bbox.x + ' ' + _bbox.y + 'L' + _bbox.x + ' ' +
                (_bbox.y + _bbox.height) + 'L' + (_bbox.x + _bbox.width) +
                ' ' + (_bbox.y + _bbox.height) + 'L' +
                (_bbox.x + _bbox.width) + ' ' + _bbox.y + 'L' + _bbox.x +
                ' ' + _bbox.y;
        }
        // 显示边框
        function showBox() {
            console.log('显示边框')
            _bpath.show();
            for (var k in _bdots) {
                _bdots[k].show();
            }
        }
        // 隐藏
        function hideBox() {
            console.log('隐藏边框')
            _bpath.hide();
            for (var k in _bdots) {
                _bdots[k].hide();
            }
        }

        // 根据_bbox，更新位置信息
        function resize() {
            var rx = _bbox.x + _o.margin,
                ry = _bbox.y + _o.margin,
                rw = _bbox.width -
                _o.margin * 2,
                rh = _bbox.height - _o.margin * 2;

            _rect.attr({
                x: rx,
                y: ry,
                width: rw,
                height: rh
            });
            switch (_o.showType) {
                case 'image':
                    _img.attr({
                        x: rx + (rw - _o.img.width) / 2,
                        y: ry + (rh - _o.img.height) / 2
                    }).show();
                    break;
                case 'text':
                    _rect.show();
                    _text.attr({
                        x: rx + rw / 2,
                        y: ry + rh / 2
                    }).show(); // 文本
                    break;
                case 'image&text':
                    _rect.show();
                    _name.attr({
                        x: rx + _o.img.width + (rw - _o.img.width) / 2,
                        y: ry + myflow.config.lineHeight / 2
                    }).show();
                    _text.attr({
                        x: rx + _o.img.width + (rw - _o.img.width) / 2,
                        y: ry + (rh - myflow.config.lineHeight) / 2 +
                            myflow.config.lineHeight
                    }).show(); // 文本
                    _img.attr({
                        x: rx + _o.img.width / 2,
                        y: ry + (rh - _o.img.height) / 2
                    }).show();
                    break;
            }

            _bdots['t'].attr({
                x: _bbox.x + _bbox.width / 2 - _bw / 2,
                y: _bbox.y - _bw / 2
            }); // 上
            _bdots['lt'].attr({
                x: _bbox.x - _bw / 2,
                y: _bbox.y - _bw / 2
            }); // 左上
            _bdots['l'].attr({
                x: _bbox.x - _bw / 2,
                y: _bbox.y - _bw / 2 + _bbox.height / 2
            }); // 左
            _bdots['lb'].attr({
                x: _bbox.x - _bw / 2,
                y: _bbox.y - _bw / 2 + _bbox.height
            }); // 左下
            _bdots['b'].attr({
                x: _bbox.x - _bw / 2 + _bbox.width / 2,
                y: _bbox.y - _bw / 2 + _bbox.height
            }); // 下
            _bdots['rb'].attr({
                x: _bbox.x - _bw / 2 + _bbox.width,
                y: _bbox.y - _bw / 2 + _bbox.height
            }); // 右下
            _bdots['r'].attr({
                x: _bbox.x - _bw / 2 + _bbox.width,
                y: _bbox.y - _bw / 2 + _bbox.height / 2
            }); // 右
            _bdots['rt'].attr({
                x: _bbox.x - _bw / 2 + _bbox.width,
                y: _bbox.y - _bw / 2
            }); // 右上
            _bpath.attr({
                path: getBoxPathString()
            });

            $(_r).trigger('rectresize', _this);

            console.log('根据_bbox，更新位置信息,_rect:')
            console.log(_rect)
        };

        // 函数----------------
        // 转化json字串
        this.toJson = function() {
            var data = "{type:'" + _o.type + "',text:{text:'" +
                _text.attr('text') + "'}, attr:{ x:" +
                Math.round(_rect.attr('x')) + ", y:" +
                Math.round(_rect.attr('y')) + ", width:" +
                Math.round(_rect.attr('width')) + ", height:" +
                Math.round(_rect.attr('height')) + "}, props:{";
            for (var k in _o.props) {
                data += k + ":{value:'" +
                    _o.props[k].value + "'},";
            }
            if (data.substring(data.length - 1, data.length) == ',')
                data = data.substring(0, data.length - 1);
            data += "}}";
            return data;
            console.log('转化json字串,输出data:')
            console.log(data)
        };
        // 从数据中恢复图
        this.restore = function(data) {
            var obj = data;
            // if (typeof data === 'string')
            // obj = eval(data);

            _o = $.extend(true, _o, data);

            _text.attr({
                text: obj.text.text
            });
            resize();
            console.log('从数据中恢复图')
        };

        this.getBBox = function() {
            console.log('getBBox')
            return _bbox;
        };
        this.getId = function() {
            console.log('getId')
            return _id;
        };
        this.remove = function() {
            _rect.remove();
            _text.remove();
            _name.remove();
            _img.remove();
            _bpath.remove();
            for (var k in _bdots) {
                _bdots[k].remove();
            }
            console.log('remove')

        };
        this.text = function() {
            console.log('text')
            return _text.attr('text');
        };
        this.attr = function(attr) {
            if (attr)
                _rect.attr(attr);
        };
        resize(); // 初始化位置
        console.log('myflow.rect ')
    };

    myflow.path = function(o, r, from, to) {
        var _this = this,
            _r = r,
            _o = $.extend(true, {}, myflow.config.path),
            _path, _arrow, _text, _textPos = _o.text.textPos,
            _ox, _oy, _from = from,
            _to = to,
            _id = 'path' +
            myflow.util.nextId(),
            _dotList, _autoText = true;

        // 点
        function dot(type, pos, left, right) {
            var _this = this,
                _t = type,
                _n, _lt = left,
                _rt = right,
                _ox, _oy, // 缓存移动前时位置
                _pos = pos; // 缓存位置信息{x,y}, 注意：这是计算出中心点

            switch (_t) {
                case 'from':
                    _n = _r.rect(pos.x - _o.attr.fromDot.width / 2,
                            pos.y - _o.attr.fromDot.height / 2,
                            _o.attr.fromDot.width, _o.attr.fromDot.height)
                        .attr(_o.attr.fromDot);
                    break;
                case 'big':
                    _n = _r.rect(pos.x - _o.attr.bigDot.width / 2,
                            pos.y - _o.attr.bigDot.height / 2,
                            _o.attr.bigDot.width, _o.attr.bigDot.height)
                        .attr(_o.attr.bigDot);
                    break;
                case 'small':
                    _n = _r.rect(pos.x - _o.attr.smallDot.width / 2,
                            pos.y - _o.attr.smallDot.height / 2,
                            _o.attr.smallDot.width, _o.attr.smallDot.height)
                        .attr(_o.attr.smallDot);
                    break;
                case 'to':
                    _n = _r.rect(pos.x - _o.attr.toDot.width / 2,
                            pos.y - _o.attr.toDot.height / 2,
                            _o.attr.toDot.width, _o.attr.toDot.height)
                        .attr(_o.attr.toDot);

                    break;
            }
            if (_n && (_t == 'big' || _t == 'small')) {
                _n.drag(function(dx, dy) {
                    dragMove(dx, dy);
                }, function() {
                    dragStart()
                }, function() {
                    dragUp();
                }); // 初始化拖动
                var dragMove = function(dx, dy) { // 拖动中
                    var x = (_ox + dx),
                        y = (_oy + dy);
                    _this.moveTo(x, y);
                };

                var dragStart = function() { // 开始拖动
                    if (_t == 'big') {
                        _ox = _n.attr("x") + _o.attr.bigDot.width / 2;
                        _oy = _n.attr("y") + _o.attr.bigDot.height / 2;
                    }
                    if (_t == 'small') {
                        _ox = _n.attr("x") + _o.attr.smallDot.width / 2;
                        _oy = _n.attr("y") + _o.attr.smallDot.height / 2;
                    }
                };

                var dragUp = function() { // 拖动结束

                };
            }
            $(_n.node).click(function() { return false; });

            this.type = function(t) {
                if (t)
                    _t = t;
                else
                    return _t;
            };
            this.node = function(n) {
                if (n)
                    _n = n;
                else
                    return _n;
            };
            this.left = function(l) {
                if (l)
                    _lt = l;
                else
                    return _lt;
            };
            this.right = function(r) {
                if (r)
                    _rt = r;
                else
                    return _rt;
            };
            this.remove = function() {
                _lt = null;
                _rt = null;
                _n.remove();
            };
            this.pos = function(pos) {
                if (pos) {
                    _pos = pos;
                    _n.attr({
                        x: _pos.x - _n.attr('width') / 2,
                        y: _pos.y - _n.attr('height') / 2
                    });
                    return this;
                } else {
                    return _pos
                }
            };

            this.moveTo = function(x, y) {
                this.pos({
                    x: x,
                    y: y
                });

                switch (_t) {
                    case 'from':
                        if (_rt && _rt.right() && _rt.right().type() == 'to') {
                            _rt.right().pos(myflow.util.connPoint(
                                _to.getBBox(), _pos));
                        }
                        if (_rt && _rt.right()) {
                            _rt
                                .pos(myflow.util.center(_pos, _rt.right()
                                    .pos()));
                        }
                        break;
                    case 'big':

                        if (_rt && _rt.right() && _rt.right().type() == 'to') {
                            _rt.right().pos(myflow.util.connPoint(
                                _to.getBBox(), _pos));
                        }
                        if (_lt && _lt.left() && _lt.left().type() == 'from') {
                            _lt.left().pos(myflow.util.connPoint(_from
                                .getBBox(), _pos));
                        }
                        if (_rt && _rt.right()) {
                            _rt
                                .pos(myflow.util.center(_pos, _rt.right()
                                    .pos()));
                        }
                        if (_lt && _lt.left()) {
                            _lt.pos(myflow.util.center(_pos, _lt.left().pos()));
                        }
                        // 三个大点在一条线上，移除中间的小点
                        var pos = {
                            x: _pos.x,
                            y: _pos.y
                        };
                        if (myflow.util.isLine(_lt.left().pos(), pos, _rt
                                .right().pos())) {
                            _t = 'small';
                            _n.attr(_o.attr.smallDot);
                            this.pos(pos);
                            var lt = _lt;
                            _lt.left().right(_lt.right());
                            _lt = _lt.left();
                            lt.remove();
                            var rt = _rt;
                            _rt.right().left(_rt.left());
                            _rt = _rt.right();
                            rt.remove();
                            // $('body').append('ok.');
                        }
                        break;
                    case 'small': // 移动小点时，转变为大点，增加俩个小点
                        if (_lt && _rt && !myflow.util.isLine(_lt.pos(), {
                                x: _pos.x,
                                y: _pos.y
                            }, _rt.pos())) {

                            _t = 'big';

                            _n.attr(_o.attr.bigDot);
                            var lt = new dot('small', myflow.util.center(_lt
                                    .pos(), _pos), _lt, _lt
                                .right());
                            _lt.right(lt);
                            _lt = lt;

                            var rt = new dot('small', myflow.util.center(_rt
                                    .pos(), _pos), _rt.left(),
                                _rt);
                            _rt.left(rt);
                            _rt = rt;

                        }
                        break;
                    case 'to':
                        if (_lt && _lt.left() && _lt.left().type() == 'from') {
                            _lt.left().pos(myflow.util.connPoint(_from
                                .getBBox(), _pos));
                        }
                        if (_lt && _lt.left()) {
                            _lt.pos(myflow.util.center(_pos, _lt.left().pos()));
                        }
                        break;
                }

                refreshpath();
            };
        }

        function dotList() {
            // if(!_from) throw '没有from节点!';
            var _fromDot, _toDot, _fromBB = _from.getBBox(),
                _toBB = _to
                .getBBox(),
                _fromPos, _toPos;

            _fromPos = myflow.util.connPoint(_fromBB, {
                x: _toBB.x + _toBB.width / 2,
                y: _toBB.y + _toBB.height / 2
            });
            _toPos = myflow.util.connPoint(_toBB, _fromPos);

            _fromDot = new dot('from', _fromPos, null, new dot('small', {
                x: (_fromPos.x + _toPos.x) / 2,
                y: (_fromPos.y + _toPos.y) / 2
            }));
            _fromDot.right().left(_fromDot);
            _toDot = new dot('to', _toPos, _fromDot.right(), null);
            _fromDot.right().right(_toDot);

            // 转换为path格式的字串
            this.toPathString = function() {
                if (!_fromDot)
                    return '';

                var d = _fromDot,
                    p = 'M' + d.pos().x + ' ' + d.pos().y,
                    arr = '';
                // 线的路径
                while (d.right()) {
                    d = d.right();
                    p += 'L' + d.pos().x + ' ' + d.pos().y;
                }
                // 箭头路径
                var arrPos = myflow.util.arrow(d.left().pos(), d.pos(),
                    _o.attr.arrow.radius);
                arr = 'M' + arrPos[0].x + ' ' + arrPos[0].y + 'L' + arrPos[1].x +
                    ' ' + arrPos[1].y + 'L' + arrPos[2].x + ' ' +
                    arrPos[2].y + 'z';
                return [p, arr];
            };
            this.toJson = function() {
                var data = "[",
                    d = _fromDot;

                while (d) {
                    if (d.type() == 'big')
                        data += "{x:" + Math.round(d.pos().x) + ",y:" +
                        Math.round(d.pos().y) + "},";
                    d = d.right();
                }
                if (data.substring(data.length - 1, data.length) == ',')
                    data = data.substring(0, data.length - 1);
                data += "]";
                return data;
            };
            this.restore = function(data) {
                var obj = data,
                    d = _fromDot.right();

                for (var i = 0; i < obj.length; i++) {
                    d.moveTo(obj[i].x, obj[i].y);
                    d.moveTo(obj[i].x, obj[i].y);
                    d = d.right();
                }

                this.hide();
            };

            this.fromDot = function() {
                return _fromDot;
            };
            this.toDot = function() {
                return _toDot;
            };
            this.midDot = function() { // 返回中间点
                var mid = _fromDot.right(),
                    end = _fromDot.right().right();
                while (end.right() && end.right().right()) {
                    end = end.right().right();
                    mid = mid.right();
                }
                return mid;
            };
            this.show = function() {
                var d = _fromDot;
                while (d) {
                    d.node().show();
                    d = d.right();
                }
            };
            this.hide = function() {
                var d = _fromDot;
                while (d) {
                    d.node().hide();
                    d = d.right();
                }
            };
            this.remove = function() {
                var d = _fromDot;
                while (d) {
                    if (d.right()) {
                        d = d.right();
                        d.left().remove();
                    } else {
                        d.remove();
                        d = null;
                    }
                }
            };
        }

        // 初始化操作
        _o = $.extend(true, _o, o);
        _path = _r.path(_o.attr.path.path).attr(_o.attr.path);
        _arrow = _r.path(_o.attr.arrow.path).attr(_o.attr.arrow);

        _dotList = new dotList();
        _dotList.hide();

        _text = _r.text(0, 0, _o.text.text || _o.text.patten.replace('{from}', _from.text()).replace('{to}',
            _to.text())).attr(_o.attr.text);
        _text.drag(function(dx, dy) {
            if (!myflow.config.editable)
                return;
            _text.attr({
                x: _ox + dx,
                y: _oy + dy
            });
        }, function() {
            _ox = _text.attr('x');
            _oy = _text.attr('y');
        }, function() {
            var mid = _dotList.midDot().pos();
            _textPos = {
                x: _text.attr('x') - mid.x,
                y: _text.attr('y') - mid.y
            };
        });

        refreshpath(); // 初始化路径

        // 事件处理--------------------
        $([_path.node, _arrow.node, _text.node]).bind('click', function() {
            if (!myflow.config.editable)
                return;
            $(_r).trigger('click', _this);
            $(_r).data('currNode', _this);
            return false;
        });

        // 处理点击事件，线或矩形
        var clickHandler = function(e, src) {
            console.log('clickHandler2处理点击事件，线或矩形')
            if (!myflow.config.editable)
                return;
            if (src && src.getId() == _id) {
                _dotList.show();
                $(_r).trigger('showprops', [_o.props, _this]);
            } else {
                _dotList.hide();
            }

            var mod = $(_r).data('mod');
            switch (mod) {
                case 'pointer':

                    break;
                case 'path':

                    break;
            }

        };
        $(_r).bind('click', clickHandler);

        // 删除事件处理
        var removerectHandler = function(e, src) {
            if (!myflow.config.editable)
                return;
            if (src &&
                (src.getId() == _from.getId() || src.getId() == _to
                    .getId())) {
                // _this.remove();
                $(_r).trigger('removepath', _this);
            }
        };
        $(_r).bind('removerect', removerectHandler);

        // 矩形移动时间处理
        var rectresizeHandler = function(e, src) {
            if (!myflow.config.editable)
                return;
            if (_from && _from.getId() == src.getId()) {
                var rp;
                if (_dotList.fromDot().right().right().type() == 'to') {
                    rp = {
                        x: _to.getBBox().x + _to.getBBox().width / 2,
                        y: _to.getBBox().y + _to.getBBox().height / 2
                    };
                } else {
                    rp = _dotList.fromDot().right().right().pos();
                }
                var p = myflow.util.connPoint(_from.getBBox(), rp);
                _dotList.fromDot().moveTo(p.x, p.y);
                refreshpath();
            }
            if (_to && _to.getId() == src.getId()) {
                var rp;
                if (_dotList.toDot().left().left().type() == 'from') {
                    rp = {
                        x: _from.getBBox().x + _from.getBBox().width / 2,
                        y: _from.getBBox().y + _from.getBBox().height / 2
                    };
                } else {
                    rp = _dotList.toDot().left().left().pos();
                }
                var p = myflow.util.connPoint(_to.getBBox(), rp);
                _dotList.toDot().moveTo(p.x, p.y);
                refreshpath();
            }
        };
        $(_r).bind('rectresize', rectresizeHandler);

        var textchangeHandler = function(e, v, src) {
            if (src.getId() == _id) { // 改变自身文本
                _text.attr({
                    text: v
                });
                _autoText = false;
            }
            //$('body').append('['+_autoText+','+_text.attr('text')+','+src.getId()+','+_to.getId()+']');
            if (_autoText) {
                if (_to.getId() == src.getId()) {
                    //$('body').append('change!!!');
                    _text.attr({
                        text: _o.text.patten.replace('{from}',
                            _from.text()).replace('{to}', v)
                    });
                } else if (_from.getId() == src.getId()) {
                    //$('body').append('change!!!');
                    _text.attr({
                        text: _o.text.patten.replace('{from}', v)
                            .replace('{to}', _to.text())
                    });
                }
            }
        };
        $(_r).bind('textchange', textchangeHandler);

        // 函数-------------------------------------------------
        this.from = function() {
            return _from;
        };
        this.to = function() {
            return _to;
        };
        // 转化json数据
        this.toJson = function() {
            var data = "{from:'" + _from.getId() + "',to:'" + _to.getId() +
                "', dots:" + _dotList.toJson() + ",text:{text:'" +
                _text.attr('text') + "',textPos:{x:" +
                Math.round(_textPos.x) + ",y:" + Math.round(_textPos.y) +
                "}}, props:{";
            for (var k in _o.props) {
                data += k + ":{value:'" +
                    _o.props[k].value + "'},";
            }
            if (data.substring(data.length - 1, data.length) == ',')
                data = data.substring(0, data.length - 1);
            data += '}}';
            return data;
        };
        // 恢复
        this.restore = function(data) {
            var obj = data;

            _o = $.extend(true, _o, data);
            //$('body').append('['+_text.attr('text')+','+_o.text.text+']');
            if (_text.attr('text') != _o.text.text) {
                //$('body').append('['+_text.attr('text')+','+_o.text.text+']');
                _text.attr({ text: _o.text.text });
                _autoText = false;
            }

            _dotList.restore(obj.dots);
        };
        // 删除
        this.remove = function() {
            _dotList.remove();
            _path.remove();
            _arrow.remove();
            _text.remove();
            try {
                $(_r).unbind('click', clickHandler);
            } catch (e) {}
            try {
                $(_r).unbind('removerect', removerectHandler);
            } catch (e) {}
            try {
                $(_r).unbind('rectresize', rectresizeHandler);;
            } catch (e) {}
            try {
                $(_r).unbind('textchange', textchangeHandler);
            } catch (e) {}
        };
        // 刷新路径
        function refreshpath() {
            var p = _dotList.toPathString(),
                mid = _dotList.midDot().pos();
            _path.attr({
                path: p[0]
            });
            _arrow.attr({
                path: p[1]
            });
            _text.attr({
                x: mid.x + _textPos.x,
                y: mid.y + _textPos.y
            });
            // $('body').append('refresh.');
        }

        this.getId = function() {
            return _id;
        };
        this.text = function() {
            return _text.attr('text');
        };
        this.attr = function(attr) {
            if (attr && attr.path)
                _path.attr(attr.path);
            if (attr && attr.arrow)
                _arrow.attr(attr.arrow);
            // $('body').append('aaaaaa');
        };
        console.log('myflow.path')
    };

    myflow.props = function(o, r) {
        console.log('myflow.props')
        var _this = this,
            _pdiv = $('#myflow_props').hide().draggable({
                handle: '#myflow_props_handle'
            }).resizable().css(myflow.config.props.attr).bind('click',
                function() {
                    return false;
                }),
            _tb = _pdiv.find('table'),
            _r = r,
            _src;

        var showpropsHandler = function(e, props, src) {
            console.log('连续点击不刷新')
            if (_src && _src.getId() == src.getId()) { // 连续点击不刷新
                return;
            }
            _src = src;
            $(_tb).find('.editor').each(function() {
                var e = $(this).data('editor');
                if (e)
                    e.destroy();
            });

            _tb.empty();
            _pdiv.show();
            for (var k in props) {
                _tb.append('<tr><th>' + props[k].label + '</th><td><div id="p' +
                    k + '" class="editor"></div></td></tr>');
                if (props[k].editor)
                    props[k].editor().init(props, k, 'p' + k, src, _r);
                // $('body').append(props[i].editor+'a');
            }
        };
        $(_r).bind('showprops', showpropsHandler);
        console.log('myflow.props')
    };

    // 属性编辑器
    myflow.editors = {
        textEditor: function() {
            var _props, _k, _div, _src, _r;
            this.init = function(props, k, div, src, r) {
                _props = props;
                _k = k;
                _div = div;
                _src = src;
                _r = r;

                $('<input  style="width:100%;"/>').val(_src.text()).change(
                    function() {
                        props[_k].value = $(this).val();
                        $(_r).trigger('textchange', [$(this).val(), _src]);
                    }).appendTo('#' + _div);
                // $('body').append('aaaa');

                $('#' + _div).data('editor', this);
            };
            this.destroy = function() {
                $('#' + _div + ' input').each(function() {
                    _props[_k].value = $(this).val();
                    $(_r).trigger('textchange', [$(this).val(), _src]);
                });
                // $('body').append('destroy.');
            };
            console.log('myflow.editors')
        }
    };

    // 初始化流程
    //初始化 画布
    myflow.init = function(c, o) {
        console.log('myflow.init')
        console.log(c)
        var _w = $(window).width(),
            _h = $(window).height() - 300, //kkkkkk 预留200给footer
            _r = Raphael(c, _w * 1, _h * 1),
            _states = {},
            _paths = {};
        $.extend(true, myflow.config, o);

        /**
         * 删除： 删除状态时，触发removerect事件，连接在这个状态上当路径监听到这个事件，触发removepath删除自身；
         * 删除路径时，触发removepath事件
         */
        $(document).keydown(function(arg) {
            if (!myflow.config.editable)
                return;
            if (arg.keyCode == 46) {
                var c = $(_r).data('currNode');
                if (c) {
                    if (c.getId().substring(0, 4) == 'rect') {
                        $(_r).trigger('removerect', c);
                    } else if (c.getId().substring(0, 4) == 'path') {
                        $(_r).trigger('removepath', c);
                    }

                    $(_r).removeData('currNode');
                }
            }
            // alert(arg.keyCode);
        });

        $(document).click(function() {
            console.log('dom.click,,document:')
            console.log(document)
            $(_r).data('currNode', null);
            $(_r).trigger('click', {
                getId: function() {
                    return '00000000';
                }
            });
            $(_r).trigger('showprops', [myflow.config.props.props, { //显示属性窗口kkkkkk
                getId: function() {
                    return '00000000';
                }
            }]);
        });

        // 删除事件
        var removeHandler = function(e, src) {
            if (!myflow.config.editable)
                return;
            if (src.getId().substring(0, 4) == 'rect') {
                _states[src.getId()] = null;
                src.remove();
            } else if (src.getId().substring(0, 4) == 'path') {
                _paths[src.getId()] = null;
                src.remove();
            }
        };
        $(_r).bind('removepath', removeHandler);
        $(_r).bind('removerect', removeHandler);

        // 添加状态
        $(_r).bind('addrect', function(e, type, o, id) {
            // $('body').append(type+', ');r
            var rect = new myflow.rect($.extend(true, {},
                myflow.config.tools.states[type], o), _r, id)
            _states[rect.getId()] = rect;
        });
        // 添加路径
        var addpathHandler = function(e, from, to) {
            var path = new myflow.path({}, _r, from, to);
            _paths[path.getId()] = path;
        };
        $(_r).bind('addpath', addpathHandler);

        // 模式
        $(_r).data('mod', 'point');
        console.log('myflow.config')
        console.log(myflow.config)
        if (myflow.config.editable) {
            // 工具栏
            $("#myflow_tools").draggable({
                handle: '#myflow_tools_handle'
            }).css(myflow.config.tools.attr);

            $('#myflow_tools .node').hover(function() {
                $(this).addClass('mover');
            }, function() {
                $(this).removeClass('mover');
            });
            $('#myflow_tools .selectable').click(function() {
                $('.selected').removeClass('selected');
                $(this).addClass('selected');
                $(_r).data('mod', this.id);

            });

            $('#myflow_tools .state').each(function() {
                $(this).draggable({
                    helper: 'clone'
                });
            });

            $(c).droppable({
                accept: '.state',
                drop: function(event, ui) {
                    console.log('ui.helper.context');
                    console.log(ui.helper.context);
                    var temp = ui.helper.context.innerHTML;
                    var id = temp.substring(temp.indexOf(">") + 1, temp.length);
                    $(_r).trigger('addrect', [ui.helper.attr('type'), {
                        attr: {
                            x: ui.helper.offset().left, //释放时位置信息kkkkkk
                            // y: ui.helper.offset().top
                            y: ui.helper.offset().top - 70 //kkkkk
                        }
                    }, id]);
                    // $('body').append($(ui).attr('type')+'drop.');
                }
            });

            $('#myflow_save').click(function() { // 保存
                var data = '{states:{';
                for (var k in _states) {
                    if (_states[k]) {
                        data += _states[k].getId() + ':' +
                            _states[k].toJson() + ',';
                    }
                }
                if (data.substring(data.length - 1, data.length) == ',')
                    data = data.substring(0, data.length - 1);
                data += '},paths:{';
                for (var k in _paths) {
                    if (_paths[k]) {
                        data += _paths[k].getId() + ':' +
                            _paths[k].toJson() + ',';
                    }
                }
                if (data.substring(data.length - 1, data.length) == ',')
                    data = data.substring(0, data.length - 1);
                data += '},props:{props:{';
                data += '}}}';

                myflow.config.tools.save.onclick(data);
            });
            //cclick
            $("#cclick").click(function() {
                // console.log(myflow.config.tools);
                console.log(this)
                // outTest("1");
            })



            $("#myflow_outTest").click(function() {
                console.log(this);
                outTest("1");
                console.log("outTest-no value");
            })

            // 属性框
            new myflow.props({}, _r);
        }
        // 恢复
        if (o.restore) {
            // var data = ((typeof o.restore === 'string') ? eval(o.restore) :
            // o.restore);
            var data = o.restore;
            var rmap = {};
            if (data.states) {
                for (var k in data.states) {
                    var rect = new myflow.rect(
                        $
                        .extend(
                            true, {},
                            myflow.config.tools.states[data.states[k].type],
                            data.states[k]), _r);
                    rect.restore(data.states[k]);
                    rmap[k] = rect;
                    _states[rect.getId()] = rect;
                }
            }
            if (data.paths) {
                for (var k in data.paths) {
                    var p = new myflow.path($.extend(true, {},
                            myflow.config.tools.path, data.paths[k]),
                        _r, rmap[data.paths[k].from],
                        rmap[data.paths[k].to]);
                    p.restore(data.paths[k]);
                    _paths[p.getId()] = p;
                }
            }
        }
        // 历史状态
        var hr = myflow.config.historyRects,
            ar = myflow.config.activeRects;
        if (hr.rects.length || ar.rects.length) {
            var pmap = {},
                rmap = {};
            for (var pid in _paths) { // 先组织MAP
                if (!rmap[_paths[pid].from().text()]) {
                    rmap[_paths[pid].from().text()] = {
                        rect: _paths[pid].from(),
                        paths: {}
                    };
                }
                rmap[_paths[pid].from().text()].paths[_paths[pid].text()] = _paths[pid];
                if (!rmap[_paths[pid].to().text()]) {
                    rmap[_paths[pid].to().text()] = {
                        rect: _paths[pid].to(),
                        paths: {}
                    };
                }
            }
            for (var i = 0; i < hr.rects.length; i++) {
                if (rmap[hr.rects[i].name]) {
                    rmap[hr.rects[i].name].rect.attr(hr.rectAttr);
                }
                for (var j = 0; j < hr.rects[i].paths.length; j++) {
                    if (rmap[hr.rects[i].name].paths[hr.rects[i].paths[j]]) {
                        rmap[hr.rects[i].name].paths[hr.rects[i].paths[j]]
                            .attr(hr.pathAttr);
                    }
                }
            }
            for (var i = 0; i < ar.rects.length; i++) {
                if (rmap[ar.rects[i].name]) {
                    rmap[ar.rects[i].name].rect.attr(ar.rectAttr);
                }
                for (var j = 0; j < ar.rects[i].paths.length; j++) {
                    if (rmap[ar.rects[i].name].paths[ar.rects[i].paths[j]]) {
                        rmap[ar.rects[i].name].paths[ar.rects[i].paths[j]]
                            .attr(ar.pathAttr);
                    }
                }
            }
        }
    }

    // 添加jquery方法
    $.fn.myflow = function(o) {
        console.log('$.fn.myflow')
        console.log(myflow.config.editable)
        console.log('$.fn.myflow')
        console.log(o)
        return this.each(function() {
            myflow.init(this, o);
        });
    };
    $.myflow = myflow;
    console.log('run')
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


//myflow.jpdl4.js
$(function() {
  var myflow = $.myflow;

	$.extend(true, myflow.config.rect, {
		attr: {
			r: 8,
			fill: '#F6F7FF',
			stroke: '#03689A',
			"stroke-width": 2
		}
	});

	$.extend(true, myflow.config.props.props, {
		name: { name: 'name', label: '名称', value: '新建项目', editor: function () { return new myflow.editors.inputEditor(); } },
		key: { name: 'key', label: '标识', value: '', editor: function () { return new myflow.editors.inputEditor(); } },
		desc: { name: 'desc', label: '描述', value: '', editor: function () { return new myflow.editors.inputEditor(); } }
	});

	$.extend(true, myflow.config.tools.states, {
		start: {
			showType: 'image',
			type: 'start',
			name: { text: '<<start>>' },
			text: { text: '开始' },
			img: { src: 'myflow/img/48/start_event_empty.png', width: 48, height: 48 },
			attr: { width: 50, heigth: 50 },
			props: {
				text: { name: 'text', label: '显示', value: '', editor: function () { return new myflow.editors.textEditor(); }, value: '开始' },
				temp1: { name: 'temp1', label: '文本', value: '', editor: function () { return new myflow.editors.inputEditor(); } },
				temp2: { name: 'temp2', label: '选择', value: '', editor: function () { return new myflow.editors.selectEditor([{ name: 'aaa', value: 1 }, { name: 'bbb', value: 2 }]); } }
			}
		},
		end: {
			showType: 'image', type: 'end',
			name: { text: '<<end>>' },
			text: { text: '结束' },
			img: { src: 'myflow/img/48/end_event_terminate.png', width: 48, height: 48 },
			attr: { width: 50, heigth: 50 },
			props: {
				text: { name: 'text', label: '显示', value: '', editor: function () { return new myflow.editors.textEditor(); }, value: '结束' },
				temp1: { name: 'temp1', label: '文本', value: '', editor: function () { return new myflow.editors.inputEditor(); } },
				temp2: { name: 'temp2', label: '选择', value: '', editor: function () { return new myflow.editors.selectEditor([{ name: 'aaa', value: 1 }, { name: 'bbb', value: 2 }]); } }
			}
		},
		'end-cancel': {
			showType: 'image', type: 'end-cancel',
			name: { text: '<<end-cancel>>' },
			text: { text: '取消' },
			img: { src: 'myflow/img/48/end_event_cancel.png', width: 48, height: 48 },
			attr: { width: 50, heigth: 50 },
			props: {
				text: { name: 'text', label: '显示', value: '', editor: function () { return new myflow.editors.textEditor(); }, value: '取消' },
				temp1: { name: 'temp1', label: '文本', value: '', editor: function () { return new myflow.editors.inputEditor(); } },
				temp2: { name: 'temp2', label: '选择', value: '', editor: function () { return new myflow.editors.selectEditor([{ name: 'aaa', value: 1 }, { name: 'bbb', value: 2 }]); } }
			}
		},
		'end-error': {
			showType: 'image', type: 'end-error',
			name: { text: '<<end-error>>' },
			text: { text: '错误' },
			img: { src: 'myflow/img/48/end_event_error.png', width: 48, height: 48 },
			attr: { width: 50, heigth: 50 },
			props: {
				text: { name: 'text', label: '显示', value: '', editor: function () { return new myflow.editors.textEditor(); }, value: '错误' },
				temp1: { name: 'temp1', label: '文本', value: '', editor: function () { return new myflow.editors.inputEditor(); } },
				temp2: { name: 'temp2', label: '选择', value: '', editor: function () { return new myflow.editors.selectEditor([{ name: 'aaa', value: 1 }, { name: 'bbb', value: 2 }]); } }
			}
		},
		state: {
			showType: 'text', type: 'state',
			name: { text: '<<state>>' },
			text: { text: '状态' },
			img: { src: 'myflow/img/48/task_empty.png', width: 48, height: 48 },
			props: {
				text: { name: 'text', label: '显示', value: '', editor: function () { return new myflow.editors.textEditor(); }, value: '状态' },
				temp1: { name: 'temp1', label: '文本', value: '', editor: function () { return new myflow.editors.inputEditor(); } },
				temp2: { name: 'temp2', label: '选择', value: '', editor: function () { return new myflow.editors.selectEditor([{ name: 'aaa', value: 1 }, { name: 'bbb', value: 2 }]); } }
			}
		},
		decision: {
			showType: 'image', type: 'decision',
			name: { text: '<<decision>>' },
			text: { text: '判断' },
			img: { src: 'myflow/img/48/gateway_exclusive.png', width: 48, height: 48 },
			attr: { width: 50, heigth: 50 },
			props: {
				text: { name: 'text', label: '显示', value: '', editor: function () { return new myflow.editors.textEditor(); }, value: '判断' },
				temp1: { name: 'temp1', label: '文本', value: '', editor: function () { return new myflow.editors.inputEditor(); } },
				temp2: { name: 'temp2', label: '选择', value: '', editor: function () { return new myflow.editors.selectEditor('select.json'); } }
			}
		},
		fork: {
			showType: 'image', type: 'fork',
			name: { text: '<<fork>>' },
			text: { text: '分支' },
			img: { src: 'myflow/img/48/gateway_parallel.png', width: 48, height: 48 },
			attr: { width: 50, heigth: 50 },
			props: {
				text: { name: 'text', label: '显示', value: '', editor: function () { return new myflow.editors.textEditor(); }, value: '分支' }
			}
		},
		join: {
			showType: 'image', type: 'join',
			name: { text: '<<join>>' },
			text: { text: '合并' },
			img: { src: 'myflow/img/48/gateway_parallel.png', width: 48, height: 48 },
			attr: { width: 50, heigth: 50 },
			props: {
				text: { name: 'text', label: '显示', value: '', editor: function () { return new myflow.editors.textEditor(); }, value: '合并' }
			}
		},
		task: {
			showType: 'text', type: 'task',
			name: { text: '<<task>>' },
			text: { text: '任务' },
			img: { src: 'myflow/img/48/task_empty.png', width: 48, height: 48 },
			props: {
				text: { name: 'text', label: '显示', value: '', editor: function () { return new myflow.editors.textEditor(); }, value: '任务' },
				assignee: { name: 'assignee', label: '用户', value: '', editor: function () { return new myflow.editors.inputEditor(); } },
				form: { name: 'form', label: '表单', value: '', editor: function () { return new myflow.editors.inputEditor(); } },
				desc: { name: 'desc', label: '描述', value: '', editor: function () { return new myflow.editors.inputEditor(); } }
			}
		},
		//上网人员记录
		records: {
			showType: 'text', type: 'records',
			name: { text: '<<records>>' },
			text: { text: '上网人员记录' },
			img: { src: 'myflow/img/48/task_empty.png', width: 48, height: 48 },
			props: {
				text: { name: 'text', label: '显示', value: '', editor: function () { return new myflow.editors.textEditor(); }, value: '任务' },
				assignee: { name: 'assignee', label: '用户', value: '', editor: function () { return new myflow.editors.inputEditor(); } },
				form: { name: 'form', label: '表单', value: '', editor: function () { return new myflow.editors.inputEditor(); } },
				desc: { name: 'desc', label: '描述', value: '', editor: function () { return new myflow.editors.inputEditor(); } }
			}
		},
		//失控重点人员
		outOfControl: {
			showType: 'text', type: 'outOfControl',
			name: { text: '<<outOfControl>>' },
			text: { text: '失控重点人员' },
			img: { src: 'myflow/img/48/task_empty.png', width: 48, height: 48 },
			props: {
				text: { name: 'text', label: '显示', value: '', editor: function () { return new myflow.editors.textEditor(); }, value: '任务' },
				assignee: { name: 'assignee', label: '用户', value: '', editor: function () { return new myflow.editors.inputEditor(); } },
				form: { name: 'form', label: '表单', value: '', editor: function () { return new myflow.editors.inputEditor(); } },
				desc: { name: 'desc', label: '描述', value: '', editor: function () { return new myflow.editors.inputEditor(); } }
			}
		},
		//盘查人员信息
		checkInfo: {
			showType: 'text', type: 'checkInfo',
			name: { text: '<<checkInfo>>' },
			text: { text: '盘查人员信息' },
			img: { src: 'myflow/img/48/task_empty.png', width: 48, height: 48 },
			props: {
				text: { name: 'text', label: '显示', value: '', editor: function () { return new myflow.editors.textEditor(); }, value: '任务' },
				assignee: { name: 'assignee', label: '用户', value: '', editor: function () { return new myflow.editors.inputEditor(); } },
				form: { name: 'form', label: '表单', value: '', editor: function () { return new myflow.editors.inputEditor(); } },
				desc: { name: 'desc', label: '描述', value: '', editor: function () { return new myflow.editors.inputEditor(); } }
			}
		},
		//出租屋信息
		rental: {
			showType: 'text', type: 'rental',
			name: { text: '<<rental>>' },
			text: { text: '出租屋信息' },
			img: { src: 'myflow/img/48/task_empty.png', width: 48, height: 48 },
			props: {
				text: { name: 'text', label: '显示', value: '', editor: function () { return new myflow.editors.textEditor(); }, value: '任务' },
				assignee: { name: 'assignee', label: '用户', value: '', editor: function () { return new myflow.editors.inputEditor(); } },
				form: { name: 'form', label: '表单', value: '', editor: function () { return new myflow.editors.inputEditor(); } },
				desc: { name: 'desc', label: '描述', value: '', editor: function () { return new myflow.editors.inputEditor(); } }
			}
		},
		//字段过滤
		topId1: {
			showType: 'text', type: 'topId1',
			name: { text: '<<topId1>>' },
			text: { text: '字段过滤' },
			img: { src: 'myflow/img/48/task_empty_blue.png', width: 48, height: 48 },
			props: {
				text: { name: 'text', label: '显示', value: '', editor: function () { return new myflow.editors.textEditor(); }, value: '任务' },
				assignee: { name: 'assignee', label: '用户', value: '', editor: function () { return new myflow.editors.inputEditor(); } },
				form: { name: 'form', label: '表单', value: '', editor: function () { return new myflow.editors.inputEditor(); } },
				desc: { name: 'desc', label: '描述', value: '', editor: function () { return new myflow.editors.inputEditor(); } }
			}
		},
		//条件过滤
		topId2: {
			showType: 'text', type: 'topId2',
			name: { text: '<<topId2>>' },
			text: { text: '条件过滤' },
			img: { src: 'myflow/img/48/task_empty_blue.png', width: 48, height: 48 },
			props: {
				text: { name: 'text', label: '显示', value: '', editor: function () { return new myflow.editors.textEditor(); }, value: '任务' },
				assignee: { name: 'assignee', label: '用户', value: '', editor: function () { return new myflow.editors.inputEditor(); } },
				form: { name: 'form', label: '表单', value: '', editor: function () { return new myflow.editors.inputEditor(); } },
				desc: { name: 'desc', label: '描述', value: '', editor: function () { return new myflow.editors.inputEditor(); } }
			}
		},
		//频率分析
		topId3: {
			showType: 'text', type: 'topId3',
			name: { text: '<<topId3>>' },
			text: { text: '频率分析' },
			img: { src: 'myflow/img/48/task_empty_blue.png', width: 48, height: 48 },
			props: {
				text: { name: 'text', label: '显示', value: '', editor: function () { return new myflow.editors.textEditor(); }, value: '任务' },
				assignee: { name: 'assignee', label: '用户', value: '', editor: function () { return new myflow.editors.inputEditor(); } },
				form: { name: 'form', label: '表单', value: '', editor: function () { return new myflow.editors.inputEditor(); } },
				desc: { name: 'desc', label: '描述', value: '', editor: function () { return new myflow.editors.inputEditor(); } }
			}
		},
		//分类统计
		topId4: {
			showType: 'text', type: 'topId4',
			name: { text: '<<topId4>>' },
			text: { text: '分类统计' },
			img: { src: 'myflow/img/48/task_empty_blue.png', width: 48, height: 48 },
			props: {
				text: { name: 'text', label: '显示', value: '', editor: function () { return new myflow.editors.textEditor(); }, value: '任务' },
				assignee: { name: 'assignee', label: '用户', value: '', editor: function () { return new myflow.editors.inputEditor(); } },
				form: { name: 'form', label: '表单', value: '', editor: function () { return new myflow.editors.inputEditor(); } },
				desc: { name: 'desc', label: '描述', value: '', editor: function () { return new myflow.editors.inputEditor(); } }
			}
		},
		//条件碰撞
		topId5: {
			showType: 'text', type: 'topId5',
			name: { text: '<<topId5>>' },
			text: { text: '条件碰撞' },
			img: { src: 'myflow/img/48/task_empty_blue.png', width: 48, height: 48 },
			props: {
				text: { name: 'text', label: '显示', value: '', editor: function () { return new myflow.editors.textEditor(); }, value: '任务' },
				assignee: { name: 'assignee', label: '用户', value: '', editor: function () { return new myflow.editors.inputEditor(); } },
				form: { name: 'form', label: '表单', value: '', editor: function () { return new myflow.editors.inputEditor(); } },
				desc: { name: 'desc', label: '描述', value: '', editor: function () { return new myflow.editors.inputEditor(); } }
			}
		},
		//交集比对
		topId6: {
			showType: 'text', type: 'topId6',
			name: { text: '<<topId6>>' },
			text: { text: '交集比对' },
			img: { src: 'myflow/img/48/task_empty_blue.png', width: 48, height: 48 },
			props: {
				text: { name: 'text', label: '显示', value: '', editor: function () { return new myflow.editors.textEditor(); }, value: '任务' },
				assignee: { name: 'assignee', label: '用户', value: '', editor: function () { return new myflow.editors.inputEditor(); } },
				form: { name: 'form', label: '表单', value: '', editor: function () { return new myflow.editors.inputEditor(); } },
				desc: { name: 'desc', label: '描述', value: '', editor: function () { return new myflow.editors.inputEditor(); } }
			}
		},
		//数据合并
		topId7: {
			showType: 'text', type: 'topId7',
			name: { text: '<<topId7>>' },
			text: { text: '数据合并' },
			img: { src: 'myflow/img/48/task_empty_blue.png', width: 48, height: 48 },
			props: {
				text: { name: 'text', label: '显示', value: '', editor: function () { return new myflow.editors.textEditor(); }, value: '任务' },
				assignee: { name: 'assignee', label: '用户', value: '', editor: function () { return new myflow.editors.inputEditor(); } },
				form: { name: 'form', label: '表单', value: '', editor: function () { return new myflow.editors.inputEditor(); } },
				desc: { name: 'desc', label: '描述', value: '', editor: function () { return new myflow.editors.inputEditor(); } }
			}
		},
		//差集比对
		topId8: {
			showType: 'text', type: 'topId8',
			name: { text: '<<topId8>>' },
			text: { text: '差集比对' },
			img: { src: 'myflow/img/48/task_empty_blue.png', width: 48, height: 48 },
			props: {
				text: { name: 'text', label: '显示', value: '', editor: function () { return new myflow.editors.textEditor(); }, value: '任务' },
				assignee: { name: 'assignee', label: '用户', value: '', editor: function () { return new myflow.editors.inputEditor(); } },
				form: { name: 'form', label: '表单', value: '', editor: function () { return new myflow.editors.inputEditor(); } },
				desc: { name: 'desc', label: '描述', value: '', editor: function () { return new myflow.editors.inputEditor(); } }
			}
		},
	});
});

//myflow.editors.js
$(function() {
  var myflow = $.myflow;

	$.extend(true, myflow.editors, {
		inputEditor: function () {
			var _props, _k, _div, _src, _r;
			this.init = function (props, k, div, src, r) {
				_props = props; _k = k; _div = div; _src = src; _r = r;

				$('<input style="width:100%;"/>').val(props[_k].value).change(function () {
					props[_k].value = $(this).val();
				}).appendTo('#' + _div);

				$('#' + _div).data('editor', this);
			}
			this.destroy = function () {
				$('#' + _div + ' input').each(function () {
					_props[_k].value = $(this).val();
				});
			}
		},
		selectEditor: function (arg) {
			var _props, _k, _div, _src, _r;
			this.init = function (props, k, div, src, r) {
				_props = props; _k = k; _div = div; _src = src; _r = r;

				var sle = $('<select  style="width:100%;"/>').val(props[_k].value).change(function () {
					props[_k].value = $(this).val();
				}).appendTo('#' + _div);

				if (typeof arg == 'string') {
					$.ajax({
						type: "GET",
						url: arg,
						success: function (data) {
							var opts = eval(data);
							if (opts && opts.length) {
								for (var idx = 0; idx < opts.length; idx++) {
									sle.append('<option value="' + opts[idx].value + '">' + opts[idx].name + '</option>');
								}
								sle.val(_props[_k].value);
							}
						}
					});
				} else {
					for (var idx = 0; idx < arg.length; idx++) {
						sle.append('<option value="' + arg[idx].value + '">' + arg[idx].name + '</option>');
					}
					sle.val(_props[_k].value);
				}

				$('#' + _div).data('editor', this);
			};
			this.destroy = function () {
				$('#' + _div + ' input').each(function () {
					_props[_k].value = $(this).val();
				});
			};
		}
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