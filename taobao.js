function ShuTaobao() {
  var insert_html =
    '<div class="tb-tabbar-wrap tb-clearfix">' +
    '<label for="count_start_dt">开始时间</label><input id="count_start_dt" type="text"/>' +
    '<label for="count_end_dt">结束时间</label><input id="count_end_dt" type="text"/>' +
    '<input id="start_count" type="submit" value="开始数"/>' +
    '</div>' +
    '<div class="tb-tabbar-wrap tb-clearfix">' +
    '<div id="count_sale_info">' +
    '<div id="count_cur_page"></div>' +
    '<div id="count_total_page"></div>' +
    '</div>' +
    '<div>快捷键: ctrl+shift+alt+N</div>';
  var $jTabBarWrap = $("#J_TabBarWrap");
  $jTabBarWrap.before(insert_html);

  var $monitorDiv = $("#deal-record");

  var count_start_dt = null; // 从输入框获取的开始时间字符串
  var count_end_dt = null; // 从输入框获取的结束时间字符串

  var $count_sale_info = $('#count_sale_info'); // 信息输出区域
  this.$count_cur_page = $count_sale_info.find('#count_cur_page'); // 信息输出区域 当前页销量
  this.$count_total_page = $count_sale_info.find('#count_total_page'); // 信息输出区域 总销量

  var $count_start_dt = $('#count_start_dt'); // 开始时间输入框
  var $count_end_dt = $('#count_end_dt'); // 结束时间输入框

  var timeNow = new Date();
  var default_start = new Date(timeNow.getTime() - 3600 * 24 * 30 * 1000); // 默认开始时间为当前时间往前一个月

  $count_start_dt.val(default_start.toISOString().replace(/(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2}:\d{2}).*/, '$1 $2'));
  $count_end_dt.val(timeNow.toISOString().replace(/(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2}:\d{2}).*/, '$1 $2'));

  /**
   * 当前页数,如果是0,表示还没有开始
   * @type {number}
   */
  this.page = 0;

  /**
   * 数出来的总销量
   * @type {number}
   */
  this.total_cnt = 0;

  var that = this;

  this.countOrder = function () {
    console.log('开始数本页销量');
    this.page = parseInt($('.page-cur').attr('page'));
    var cur_page_cnt = 0;
    var $trs = $monitorDiv.find('.tb-list-body tr');
    $trs.each(function (i, elem) {
      var cnt = parseInt($.trim($(elem).find('.tb-amount').text()));
      var order_time = $.trim($(elem).find('.tb-start').text());

      if (order_time <= count_end_dt && order_time >= count_start_dt) {
        cur_page_cnt += cnt;
      }
    });


    this.$count_cur_page.text('当前页销量: ' + cur_page_cnt);
    this.$count_total_page.text('总销量: ' + this.total_cnt);


    //<a class="J_TAjaxTrigger page-next" page="2" data-spm-anchor-id="2013.1.0.0"><span>下一页</span></a>
    // page-next 找不到,说明已经到了最后一页
    var $nextPageBtn = $monitorDiv.find('.tb-page-bottom .page-next');
    if (cur_page_cnt == 0) {
      if ($nextPageBtn.length == 0) {
        alert('当前页: ' + this.page + ', 销量: ' + cur_page_cnt + ', 翻到最后一页了');
      } else {
        alert('当前页: ' + this.page + ', 销量: ' + cur_page_cnt + ', 确认后跳转到下一页');
        this.total_cnt += cur_page_cnt;
        $nextPageBtn.find('span').click();
      }
    } else {
      if ($nextPageBtn.length == 0) {
        alert('当前页: ' + this.page + ', 销量: ' + cur_page_cnt + ', 翻到最后一页了');
      } else {
        alert('当前页: ' + this.page + ', 销量: ' + cur_page_cnt + ', 确认后跳转到下一页');
        this.total_cnt += cur_page_cnt;
        $nextPageBtn.find('span').click();
      }
    }
  };

  this.startCount = function () {
    count_start_dt = $.trim($('#count_start_dt').val());
    count_end_dt = $.trim($('#count_end_dt').val());
    that.countOrder();
  };

  $('#start_count').on('click', this.startCount);

  // 绑定键盘操作时间 ctrl+shift+alt+n
  //$(document).keydown(function (event) {
  //  if (event.ctrlKey && event.shiftKey && event.altKey && event.keyCode == 78) {
  //    $('#start_count').click();
  //    return false;
  //  }
  //});

}










