(function ($) {
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
		name: { name: 'name', label: '名称', value: '新建流程', editor: function () { return new myflow.editors.inputEditor(); } },
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
		//出租屋信息
		topId1: {
			showType: 'text', type: 'topId1',
			name: { text: '<<topId1>>' },
			text: { text: '字段过滤' },
			img: { src: 'myflow/img/48/task_empty.png', width: 48, height: 48 },
			props: {
				text: { name: 'text', label: '显示', value: '', editor: function () { return new myflow.editors.textEditor(); }, value: '任务' },
				assignee: { name: 'assignee', label: '用户', value: '', editor: function () { return new myflow.editors.inputEditor(); } },
				form: { name: 'form', label: '表单', value: '', editor: function () { return new myflow.editors.inputEditor(); } },
				desc: { name: 'desc', label: '描述', value: '', editor: function () { return new myflow.editors.inputEditor(); } }
			}
		},
	});
})(jQuery);