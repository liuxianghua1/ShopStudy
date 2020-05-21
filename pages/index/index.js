//Page Object
import { request } from "../../request/index.js";
Page({
  data: {
    swiperList: [],
    cateList: [],
  },
  // 页面加载的时候触发的页面
  onLoad: function (options) {
    this.getSwiperList();
    this.getCateList();
  },

  getSwiperList() {
    request({
      url: "https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata",
    }).then((res) => {
      this.setData({
        swiperList: res.data.message,
      });
    });
  },

  getCateList() {
    request({
      url: "https://api-hmugo-web.itheima.net/api/public/v1/home/catitems",
    }).then((res) => {
      this.setData({
        CateList: res.data.message,
      });
    });
  },
});
