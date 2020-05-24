// pages/cart/index.js
import Dialog from "../../miniprogram_npm/@vant/weapp/dialog/dialog";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    CartData: [],
    addRess: {},
    totalPrice: 0,
    totalNum: 0,
  },
  onShow: function () {
    let addRess = wx.getStorageSync("address");
    console.log(addRess);
    let CartData = wx.getStorageSync("cart") || [];
    CartData = CartData.filter((v) => v.checked);
    let totalPrice = 0;
    let totalNum = 0;
    CartData.forEach((v) => {
      totalPrice += v.num * v.goods_price;
      totalNum += v.num;
    });
    totalPrice = parseInt(totalPrice.toString() + "00" + ".00");
    this.setData({
      CartData,
      addRess,
      totalPrice,
      totalNum,
    });
  },

  handlePay() {},
});
