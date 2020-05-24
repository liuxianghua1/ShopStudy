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
    allChecked: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},
  onShow: function () {
    let data = wx.getStorageSync("cart") || [];
    let AddRess = wx.getStorageSync("address");
    // 计算提交订单栏全选
    // const allChecked = data.length ? data.every((v) => v.checked) : false;
    let allChecked = true;
    let totalPrice = 0;
    let totalNum = 0;
    data.forEach((v) => {
      if (v.checked) {
        totalPrice += v.num * v.goods_price;
        totalNum += v.num;
      } else {
        allChecked = false;
      }
    });
    allChecked = data.length != 0 ? allChecked : false;
    totalPrice = parseInt(totalPrice.toString() + "00" + ".00");
    this.setData({
      addRess: AddRess,
      CartData: data,
      totalPrice,
      allChecked,
      totalNum,
    });
  },
  handleNumChange(event) {
    let id = event.currentTarget.dataset.id;
    let { CartData } = this.data;
    const index = CartData.findIndex((v) => v.goods_id === id);
    CartData[index].num = event.detail;
    let totalPrice = 0;
    let totalNum = 0;
    CartData.forEach((v) => {
      if (v.checked) {
        totalPrice += v.num * v.goods_price;
        totalNum += v.num;
      }
    });
    totalPrice = parseInt(totalPrice.toString() + "00" + ".00");
    this.setData({
      CartData,
      totalPrice,
      totalNum,
    });
    wx.setStorageSync("cart", CartData);
  },
  goDetail(event) {
    console.log(event);
    wx.navigateTo({
      url:
        "/pages/good_detail/index?goods_id=" + event.currentTarget.dataset.id,
    });
  },
  onDelete(event) {
    if (event.detail === "cell") {
      // 购物车点击商品跳转detail页面
    } else if (event.detail === "right") {
      Dialog.confirm({
        title: "删除确认",
        message: "确定要删除该商品吗",
      })
        .then(() => {
          let { CartData, allChecked } = this.data;
          const index = CartData.findIndex(
            (v) => v.goods_id === event.target.dataset.id
          );
          CartData.splice(index, 1);
          let totalPrice = 0;
          let totalNum = 0;
          CartData.forEach((v) => {
            if (v.checked) {
              totalPrice += v.num * v.goods_price;
              totalNum += v.num;
            }
          });
          allChecked = CartData.length != 0 ? allChecked : false;
          totalPrice = parseInt(totalPrice.toString() + "00" + ".00");
          this.setData({
            CartData,
            totalPrice,
            totalNum,
            allChecked,
          });
          wx.setStorageSync("cart", CartData);
        })
        .catch(() => {});
    }
  },
  handleItemAllChange() {
    let { CartData, allChecked } = this.data;
    allChecked = !allChecked;
    CartData.forEach((v) => (v.checked = allChecked));
    let totalPrice = 0;
    let totalNum = 0;
    CartData.forEach((v) => {
      if (v.checked) {
        totalPrice += v.num * v.goods_price;
        totalNum += v.num;
      } else {
        allChecked = false;
      }
    });
    allChecked = CartData.length != 0 ? allChecked : false;
    totalPrice = parseInt(totalPrice.toString() + "00" + ".00");
    this.setData({
      CartData,
      totalPrice,
      allChecked,
      totalNum,
    });
    wx.setStorageSync("cart", CartData);
  },
  handleItemChange(e) {
    const goods_id = e.currentTarget.dataset.id;
    let { CartData } = this.data;
    let index = CartData.findIndex((v) => v.goods_id === goods_id);
    CartData[index].checked = !CartData[index].checked;
    wx.setStorageSync("cart", CartData);
    let allChecked = true;
    let totalPrice = 0;
    let totalNum = 0;
    CartData.forEach((v) => {
      if (v.checked) {
        totalPrice += v.num * v.goods_price;
        totalNum += v.num;
      } else {
        allChecked = false;
      }
    });
    allChecked = CartData.length != 0 ? allChecked : false;
    totalPrice = parseInt(totalPrice.toString() + "00" + ".00");
    this.setData({
      CartData,
      totalPrice,
      allChecked,
      totalNum,
    });
  },
  handlePay() {
    let { addRess } = this.data;
    if (!addRess.userName) {
      Dialog.alert({
        message: "请选择收获地址",
      });
      return;
    }
    if (this.data.totalNum === 0) {
      Dialog.alert({
        message: "请选择结算商品",
      });
      return;
    }
    wx.navigateTo({
      url:'/pages/pay/index'
    })
  },
  handleChooseAddress() {
    wx.getSetting({
      success: (result) => {
        let scopeAddress = result.authSetting["scope.address"];
        if (scopeAddress === true || scopeAddress === undefined) {
          wx.chooseAddress({
            success: (result1) => {
              wx.setStorageSync("address", result1);
            },
          });
        } else {
          // 曾经取消过
          wx.openSetting({
            success: (result2) => {
              wx.chooseAddress({
                success: (result3) => {
                  wx.setStorageSync("address", result3);
                },
              });
            },
          });
        }
      },
    });
  },
});
