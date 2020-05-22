// pages/category/index.js
import { request } from "../../request/index.js";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    leftMentList: [],
    rightContent: [],
    currentIndex: 0,
    scrollTop: 0,
  },
  Cates: [],
  onLoad: function (options) {
    // 先判断本地有无旧数据 没有就直接请求 有旧数据就使用旧数据
    const Cates = wx.getStorageSync("cates");
    if (!Cates) {
      // 不存在
      this.getCates();
    } else {
      // 有数据这时候
      if (Date.now() - Cates.time > 1000 * 300) {
        this.getCates();
      } else {
        this.Cates = Cates.data;
        let leftMentList = this.Cates.map((v) => v.cat_name);
        let rightContent = this.Cates[0].children;
        this.setData({
          leftMentList,
          rightContent,
        });
      }
    }
  },
  async getCates() {
    const res = await request({ url: "/categories" });
    this.Cates = res.data.message;
    // 接口存入本地
    wx.setStorageSync("cates", { time: Date.now(), data: this.Cates });

    let leftMentList = this.Cates.map((v) => v.cat_name);
    let rightContent = this.Cates[0].children;
    this.setData({
      leftMentList,
      rightContent,
    });
  },

  handleItemTap(e) {
    let { index } = e.target.dataset;

    let rightContent = this.Cates[index].children;
    this.setData({
      currentIndex: index,
      rightContent,
      scrollTop: 0,
    });
  },
});
