// 获取用户信息 getUserInfo
function getUserInfo() {
  $.ajax({
    type: 'GET',
    url: '/my/userinfo',
    // headers: {
    //   Authorization: localStorage.getItem('token'),
    // },
    success: function (res) {
      const { data, message, status } = res;
      if (status !== 0) return layer.msg(message);
      layer.msg(message);
      renderAvatar(data);
    },
    complete: res => {
      // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
      if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //  强制清空 token
        localStorage.removeItem('token');
        // 强制跳转到登录页面
        location.href = '/login.html';
      }
    },
  });
}

// 渲染用户头像
const renderAvatar = user => {
  // 获取用户名字
  let uname = user.nickname || user.username;
  // 设置欢迎文本
  $('#welcome').html(`欢迎 ${uname}`);
  // 按需渲染用户头像
  if (user.user_pic !== null) {
    $('.layui-nav-img').attr('src', user.user_pic);
    $('.text-avatar').hide();
  } else {
    $('.layui-nav-img').hide();
    $('.text-avatar').html(uname[0].toUpperCase());
  }
};

$('#btnLogout').on('click', () => {
  layer.confirm('确定退出登录？', { icon: 3, title: '' }, function (index) {
    // 清空本地存储里面的 token
    localStorage.removeItem('token');
    // 重新跳转到登录页面
    location.href = '/login.html';
  });
});
getUserInfo();
