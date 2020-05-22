import { request } from "../../request/index.js";
import Toast from "../../miniprogram_npm/@vant/weapp/toast/toast";
// pages/goods_list/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: "综合",
        isActive: true,
      },
      {
        id: 1,
        value: "销量",
        isActive: false,
      },
      {
        id: 2,
        value: "价格",
        isActive: false,
      },
    ],
    goodsList: [],
  },
  QueryParams: {
    query: "",
    cid: "",
    pagenum: 1,
    pagesize: 10,
  },
  totalPages: 0,
  totalNum: 0,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(this.QueryParams);
    this.QueryParams.cid = options.cid;
    this.getGoodsList();
  },
  onReachBottom() {
    if (this.QueryParams.pagenum > this.totalNum) {
      Toast("没有下一页了~");
    } else {
      this.QueryParams.pagenum++;
      this.getGoodsList();
    }
  },
  async getGoodsList() {
    Toast.loading({
      mask: true,
      message: "加载中...",
    });
    const res = await request({ url: "/goods/search", data: this.QueryParams });
    // 获取条数
    const total = res.data.message.goods.nv_length;
    this.totalPages = Math.ceil(total / this.QueryParams.pagesize);
    this.totalNum = this.totalNum + this.totalPages;
    this.setData({
      goodsList: [...this.data.goodsList, ...res.data.message.goods],
    });
    Toast.clear();
  },

  handleTabsItemChange(e) {
    const { index } = e.detail;
    let { tabs } = this.data;
    tabs.forEach((v, i) =>
      i === index ? (v.isActive = true) : (v.isActive = false)
    );
    this.setData({
      tabs,
    });
  },

  // 下拉刷新时间
  onPullDownRefresh() {
    this.setData({
      goodsList: [],
    });
    this.QueryParams.pagenum = 1;
    this.totalNum = 0;
    this.getGoodsList();
    wx.stopPullDownRefresh()
  },
});
