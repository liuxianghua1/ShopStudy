//Page Object
import { request } from "../../request/index.js";
Page({
  data: {
    swiperList: [],
    cateList: [],
    floorList: [],
  },
  // 页面加载的时候触发的页面
  onLoad: function (options) {
    this.getSwiperList();
    this.getCateList();
    this.getFloorList();

  },

  getSwiperList() {
    request({
      url: "/home/swiperdata",
    }).then((res) => {
      this.setData({
        swiperList: res.data.message,
      });
    });
  },

  getCateList() {
    request({
      url: "/home/catitems",
    }).then((res) => {
      this.setData({
        cateList: res.data.message,
      });
    });
  },

  getFloorList() {
    request({
      url: "/home/floordata",
    }).then((res) => {
      this.setData({
        floorList: res.data.message,
      });
    });
  },
});
