## KSortTable

KSortTable是一个小巧精简的表格排序组件。

* 版本：1.0
* 作者：晨辰
* 标签：表格排序
* demo：[http://gallery.kissyui.com/KSortTable/1.0/demo/index.html](http://gallery.kissyui.com/KSortTable/1.0/demo/index.html)

## 初始化组件

    S.use('gallery/KSortTable/1.0/index', function (S, KSortTable) {
        new KSortTable('#id');
    })

## 使用说明
* 1、对将要排序的表格添加自定义属性 data-sorttable="true"
* 2、要排序列的th添加 data-sorttable="default"
* 3、初始化 new KSortTable('#J_tab');
----
* 对于日期的排序，因为日期格式问题，暂未处理

## TODO
* 添加初始化立即排序
* 日期排序
* 对KISSY处理table的方法封装