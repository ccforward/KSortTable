/*
combined files : 

gallery/KSortTable/1.0/index

*/
/**
 * @fileoverview 
 * @author 晨辰<cc.ccking@gmail.com>
 * @module KSortTable
 **/
KISSY.add('gallery/KSortTable/1.0/index',function(S){
    var E = S.Event,
        D = S.DOM,
        $ = S.all;

    function KSortTable(id) {
        // 初始化
        this.init(id);
    };

    KSortTable.prototype = {
        // 根据ID获取table
        // TODO 根据class  多个table排序
        init : function (id) {
            var self = this,
                table = S.get(id),
                i;

            self.fn = function (ev) {
                // 取th排序
                var th = $(ev.target),
                    tbody,
                    el;
                if (th.attr('data-sorttable') !== undefined) {
                    tbody = self.getTable('tbody', th.parent().parent().parent()[0]);
                    self.setTable(th[0], tbody);
                }
            }
            // table是可排序的
            if(D.attr(table,'data-sorttable')){
                E.on($(self.getTable('thead', table)), 'click', self.fn);
            }

            table = null;
        },

        // TODO 可扩展
        sortBy : {
            // 默认排序
            'default': function (row1, row2) {
                return row1.value < row2.value ? -1 : row1.value > row2.value ? 1 : 0;
            },
            // 按日期排序
            date: function (row1, row2) {
                // TODO   格式问题
            }
        },

        //  el --->  'tbody', 'thead', 'tfoot'
        getTable : function (el, table) {
            el = el === 'tbody' ? table.tBodies[0] : el === 'thead' ? table.tHead : el === 'tfoot' ? table.tFoot : null;

            try {
                return el;
            } finally {
                table = el = null;
            }
        },

        // TODO  kissy的table不完善  下一步table对象相关方法做封装
        // @param {object} th - 原生DOM元素
        // @param {object} tbody -原生DOM元素
        setTable : function (th, tbody) {
            var i,
                cellIndex = th.cellIndex,
                rowsLength = tbody.rows.length,
                totalRows = rowsLength,
                row,
                value,
                cells = [],
                sortType = $(th).attr('data-sorttable'),
                get = $(th).attr('data-reverse'),
                reverse = get === undefined ? false : get.toString() === 'true' ? true : false,
                selected = D.query('th', $(th).parent()),
                el,
                // TODO 可配置的
                active = 'st-active',
                newTr,
                temp;

                //从 thead 中删除active
                for (i = 0; i < selected.length; i += 1) {
                    el = selected[i];
                    if (D.hasClass(el, active)) {
                        D.removeClass(el, active);
                    }
                }
     
                D.addClass(th, active);

                for (i = 0; rowsLength > i; i += 1) {
                    row = tbody.rows[i];
                    // TODO  统一
                    // Hack一下 Firefox ---> textContent
                    value = row.cells[cellIndex].textContent || row.cells[cellIndex].innerText;
                    cells.push({
                        value: value,
                        content: row.innerHTML
                    });
                }

                // 排序
                cells.sort(this.sortBy[sortType]);

                // 反转  TODO
                if (reverse) {
                    cells.reverse();
                }

                // 反转
                $(th).attr('data-reverse', !reverse);

                for (i = 0; rowsLength > i; i += 1) {
                    // innerHTML 在 IE 的空 table中不起作用, 用deleteRow代替
                    tbody.deleteRow(--totalRows);

                    // Hack 方法
                    // 创建一个div
                    // temp = document.createElement('div');
                    temp = D.create('<div>');
                    // 插入一个新的table
                    // temp.innerHTML = '<table><tbody><tr>' + cells[i].content;
                    D.html(temp, '<table><tbody><tr>' + cells[i].content);
                    // 取 temp 的tbody
                    // temp = this.get('tbody', temp.firstChild);
                    temp = this.getTable('tbody', temp.firstChild);
                    // 取 tbody 的rows
                    newTr = temp.rows[0];
                    // 新的tr填充入tbody 
                    // tbody.appendChild(newTr);
                    D.append(newTr, tbody);
                }

                // 清除垃圾
                temp = tbody = th = row = selected = newTr = null;
        }
    }
  return KSortTable;


});




