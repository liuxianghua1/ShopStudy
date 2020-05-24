// pages/good_detail/index.js
// import Toast from '../../miniprogram_npm/@vant/weapp/dist/toast/toast';
import Toast from "../../miniprogram_npm/@vant/weapp/toast/toast";
import { request } from "../../request/index.js";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    goodsDetail: {},
    activeNames: ["1"],
  },
  goods_id: "",
  GoodsInfo: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let { goods_id } = options;
    this.goods_id = goods_id;
    this.getGoods();
  },
  handleCart() {
    Toast.loading({
      mask: true,
      message: '正在加入...',
    });
    let cart = wx.getStorageSync("cart") || [];
    let index = cart.findIndex((v) => v.goods_id === this.GoodsInfo.goods_id);
    if (index === -1) {
      // 不存在
      this.GoodsInfo.num = 1;
      this.GoodsInfo.checked = true;
      cart.push(this.GoodsInfo);
    } else {
      // 存在 数量加1
      cart[index].num++;
    }
    wx.setStorageSync('cart',cart);
    Toast.clear();
    Toast('加入购物车成功');
      

    
  },
  onChange(event) {
    this.setData({
      activeNames: event.detail,
    });
  },
  async getGoods() {
    const res = await request({
      url: "/goods/detail",
      data: {
        goods_id: this.goods_id,
      },
    });
    this.setData({
      goodsDetail: {
        goods_name: res.data.message.goods_name,
        goods_price: res.data.message.goods_price,
        pics: res.data.message.pics,
        goods_introduce: res.data.message.goods_introduce.replace(
          /\.webp/g,
          ".jpg"
        ),
        goods_number:res.data.message.goods_number
      },
    });
    this.GoodsInfo = res.data.message;
  },
  handlePrevewImage(e) {
    let urls = this.GoodsInfo.pics.map((v) => v.pics_mid);
    // console.log(urls)
    const current = e.currentTarget.dataset.url;
    wx.previewImage({
      current,
      urls,
    });
  },
});
