$(function () {
  const form = layui.form;
  // 自定义校验规则
  form.verify({
    nickname: val => {
      if (val.length > 6) return '昵称长度必须在 1 ~ 6 个字符之间！';
    },
  });

  // 获取用户数据
  const layer = layui.layer;
  const initUserInfo = () => {
    $.ajax({
      type: 'GET',
      url: '/my/userinfo',
      success: res => {
        const { data, message, status } = res;
        if (status !== 0) return layer.msg('获取用户信息失败！');
        // 调用 form.val() 方法为表单赋值
        form.val('formUserInfo', res.data);
      },
    });
  };
  // 重置功能
  $('#btn-reset').click(e => {
    e.preventDefault();
    initUserInfo();
  });

  // 更新用户信息
  $('.layui-form').submit(function (e) {
    e.preventDefault();
    $.ajax({
      type: 'POST',
      url: '/my/userinfo',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) return layer.msg('Errors');
        // 调用父页面渲染函数
        window.parent.getUserInfo();
      },
    });
  });

  initUserInfo();
});
