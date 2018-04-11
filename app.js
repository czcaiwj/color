// 程序启动页

const { USER_LOGIN } = require('/utils/constant.js');

App({
    globalData: {
        cust_id: -1,
        openid: ''
    },

    onLaunch: function () {
        this.userLogin(this);
    },

    /**
     * 用户登录
     */
    userLogin(self) {
        const promise = new Promise((resolve, reject) => {
            wx.login({
                success: function (res) {
                    if (res.code) {
                        wx.request({
                            url: USER_LOGIN,
                            data: {
                                code: res.code
                            },
                            success: function (result) {
                                const data = result.data;
                                if (data.code == 0) {                                    
                                    const openid = data.data.openid;
                                    const cust_id = data.data.cust_id;
                                    wx.setStorageSync('cust_id', cust_id);
                                    wx.setStorageSync('openid', openid);      
                                    self.globalData.cust_id = cust_id;
                                    self.globalData.openid = openid;
                                }
                            }
                        })
                    }
                }
            });
        });
        return promise;
    }
})