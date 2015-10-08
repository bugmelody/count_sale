var url = window.location.href;
console.log('url-----------------');
console.log(url);
if (url.indexOf('item.taobao.com') > 0) {
  console.log('tao-----------------');
  var shutaobao = new ShuTaobao();
} else if (url.indexOf('detail.tmall.com/item.htm') > 0) {
  console.log('tmall-----------------');
  var shutmall = new ShuTmall();
}