//右下 任务列表 start
let selectedRow = null;

// 编辑任务
function editTask(cell) {
    cell.setAttribute('contenteditable', 'true'); // 设置任务单元格为可编辑
    cell.focus(); // 让任务单元格获得焦点
}

// 保存任务
function saveTasks() {
    const tasks = document.querySelectorAll('.task-list td.editable');
    tasks.forEach(task => {
        if (task.parentElement.classList.contains('selected')) {
            task.removeAttribute('contenteditable'); // 移除选中任务的编辑状态
            task.addEventListener('click', function () {
                editTask(this); // 保留点击事件监听器，以便用户可以继续编辑
            });
        }
    });
    sendTableContentToParent();
}
// 把任务列表数据发送给父页面，并保存在本地数据库
function sendTableContentToParent() {
    var table = document.getElementById('task-list-id');  // 替换成实际的表格 id
    var tableData = [];
    var tableData_send = {
        flag: 'tableinformation',
        data: tableData
    };

    // 遍历表格行和单元格，将内容存储到 tableData 数组中
    for (var i = 1; i < table.rows.length; i++) {
        var rowData = [];
        for (var j = 0; j < (table.rows[i].cells.length - 2); j++) {
            rowData.push(table.rows[i].cells[j].innerText);
        }
        tableData.push(rowData);
    }

    // 将表格数据发送给父页面
    window.parent.postMessage(tableData_send, '*');
}


// 新建任务(创建表格行)
function addNewTask() {
    const taskList = document.querySelector('.task-list');
    const rowCount = taskList.rows.length;
    const newRow = taskList.insertRow(rowCount); // 插入新行
    newRow.innerHTML = '<td>' + rowCount + '</td>' + // 编号列
        '<td class="editable" contenteditable="true">新建任务</td>' + // 任务列
        '<td><input type="checkbox" onclick="toggleCheckbox(this)"></td>' + // 新添加的勾选按钮列
        '<td><button onclick="deleteRow(this)">删除</button></td>'; // 新添加的删除按钮列
}

//加载页面之后初始化任务列表
window.addEventListener("load", () => {
    var pageload = {
        flag: 'pageloadinformation'
    };
    window.parent.postMessage(pageload, '*');
    var tasknum = new Object();
    // 监听message事件
    window.addEventListener('message', function (event) {
        // 确定消息来源是否可信
        if (event.origin !== 'file://') {
            return;
        }
        if (event.data.flag === 'taskinformation') {
            console.log('-------taskadd开始同步任务列表-------');
            // 处理接收到的消息
            tasknum = event.data;
            // console.log('taskadd接收到的消息: ', tasknum.data);
            // console.log('taskadd接收到的消息: ' + tasknum.tasknums);
            //添加指定的行数
            for (let i = 1; i < tasknum.tasknums; i++) {
                addNewTask();
                //console.log('新建一行');
            }
            //修改任务行的内容
            let tablecom = document.getElementById('task-list-id');
            let rows = tablecom.getElementsByTagName("tr");
            for (let i = 1; i < rows.length; i++) {
                let cells = rows[i].getElementsByTagName("td");
                for (let j = 1; j < (cells.length) - 2; j++) {
                    cells[j].innerText = tasknum.data[i - 1].name
                    // console.log('这是第二个测试', tasknum.data[i - 1].name);
                }
            }
        }
    }, false);
    //console.log(tablecom);
    console.log('-------taskadd完成同步任务列表-------');
})

// 选择任务
function selectTask(row) {
    if (selectedRow !== null) {
        selectedRow.classList.remove('selected');
    }
    row.classList.add('selected');
    selectedRow = row;
}

// 切换勾选按钮状态
var selectedId;
function toggleCheckbox(checkbox) {
    let checkboxes = document.querySelectorAll('.task-list input[type="checkbox"]');
    checkboxes.forEach(cb => {
        if (cb !== checkbox) {
            cb.checked = false; // 只允许一个勾选按钮被选中
        }
        if (cb === checkbox) {
            // 通过勾选框获取到父容器所在的行
            let selectedRow = checkbox.parentElement.parentElement;
            // console.log(selectedRow.cells[1].textContent);
            selectedId = selectedRow.cells[0].textContent;
            let secondCellContent = selectedRow.cells[1].textContent;// 获取被勾选任务的名称
            // 根据勾选框任务的名称来同步当前任务清单
            var isclick_name = {
                flag: 'isclick_nameinformation',
                data: secondCellContent
            };
            window.parent.postMessage(isclick_name, '*');

            // 同步勾选框任务的时间
            var checkboxId = new Object();
            checkboxId.data = selectedId;
            checkboxId.flag = 'checkboxIdinformation';
            //alert('测试复选框id' + selectedId);
            window.parent.postMessage(checkboxId, '*');
        }
    });
}

// 删除行
function deleteRow(button) {
    const row = button.parentNode.parentNode;
    row.parentNode.removeChild(row); // 删除所在行
    updateTaskNumbers(); // 更新任务编号
}

// 更新任务编号
function updateTaskNumbers() {
    const rows = document.querySelectorAll('.task-list tr');
    rows.forEach((row, index) => {
        if (index > 0) { // 跳过表头
            row.cells[0].textContent = index; // 更新任务编号
        }
    });
}
//右下 任务列表 end



