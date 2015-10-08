// TODO: 翻页的时候如果弹出验证登陆框,会导致无限循环????



console.log('AAAAAAAAAAAAa');

console.log(window.location.href);

//str = '<div>AAAAAAAAAAAAAAAAAAAAAAAAAAAA</div>';
//
//
//var $deal_record = $('#deal-record');
//console.log($deal_record);
//$deal_record.prepend(str);

/**
 * 当前页数,如果是0,表示还没有开始
 * @type {number}
 */
var page = 0;

var total_cnt = 0;

var count_start_dt = null;
var count_end_dt = null;


insert_html =
  '<div class="tb-tabbar-wrap tb-clearfix">' +
  '<label for="count_start_dt">开始时间</label><input id="count_start_dt" type="text"/>' +
  '<label for="count_end_dt">结束时间</label><input id="count_end_dt" type="text"/>' +
  '<input id="start_count" type="submit" value="开始数"/></div>';

var $jTabBarWrap = $("#J_TabBarWrap");

$jTabBarWrap.before(insert_html);

var $monitorDiv = $("#deal-record");

function countOrder() {
  console.log('ajax返回完毕,开始数本页销量');
  var cur_page_cnt = 0;
  var $trs = $monitorDiv.find('.tb-list-body tr');
  $trs.each(function (i, elem) {
    var cnt = parseInt($.trim($(elem).find('.tb-amount').text()));
    var order_time = $.trim($(elem).find('.tb-start').text());
    console.log('order_time' + order_time);
    if (order_time <= window.count_end_dt && order_time >= window.count_start_dt) {
      cur_page_cnt += cnt;
      window.total_cnt += cnt;
    }
  });
  console.log("当前页数: " + window.page + " 条数: " + cur_page_cnt);

  //<a class="J_TAjaxTrigger page-next" page="2" data-spm-anchor-id="2013.1.0.0"><span>下一页</span></a>
  // page-next 找不到,说明已经到了最后一页
  var $nextPageBtn = $monitorDiv.find('.tb-page-bottom .page-next');

  if ($nextPageBtn.length == 0) {
    console.log('翻页完毕,结果 ' + window.total_cnt);
    return;
  } else {
    console.log($nextPageBtn);
    // var nextPage = parseInt($.trim($nextPageBtn.attr('page')));
    $nextPageBtn.find('span').click();
  }

}
$monitorDiv.bind('DOMNodeInserted', function (e) {
  // 监控这个元素的dom插入事件,如果有变化,并且页数有变化,说明新的数据来了
  //alert('element now contains: ' + $(e.target).html());
  var $pageCur = $('#deal-record .page-cur');
  if ($pageCur.length <= 0) {
    // 第一次点击tab的时候,cur page 元素还未存在
    return;
  }
  var new_page = parseInt($.trim($pageCur.text()));
  if (new_page != page) {
    console.log(new_page + ' 页数据来了');
    setTimeout(countOrder, 1);
  }
});

$('#start_count').on('click', function () {
  window.count_start_dt = $.trim($('#count_start_dt').val());
  window.count_end_dt = $.trim($('#count_end_dt').val());

  var count_start = new Date(window.count_start_dt); // 带时区
  var count_end = new Date(window.count_start_dt); // 带时区
  console.log('clicked');
  console.log('count_start_dt: ' + count_start_dt);
  console.log(count_start);
  console.log('count_end_dt: ' + count_end_dt);
  console.log(count_end);


  // alert('点击tab');
  console.log($jTabBarWrap.find('#J_TabBar li:nth-child(3) a').html());
  var $chengjiaojilu = $jTabBarWrap.find('#J_TabBar li:nth-child(3) a');
  var $link_em = $chengjiaojilu.find('em');
  $link_em.click();


  // console.log($chengjiaojilu.text());
  //var $x = $chengjiaojilu.click();
  //console.log(x);
  // $jTabBarWrap.find('#J_TabBar ul:nth-child(3)').click();
});

