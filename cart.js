var keyLocalStorageItemCart = "DANHSACHITEMCART";

//                 Tao doi tương
function taoDoiTuongItemGioHang(idSanPham, soLuong) {
  var itemGioHang = new Object();
  itemGioHang.idSanPham = idSanPham;
  itemGioHang.soLuong = soLuong;
  return itemGioHang;
}

// Luu  du lieu khi click vào gio hang vao local sttory
function luuDanhSachItemGioHangVaoLocalStorage(danhsachItemGioHang) {
  var jsonDanhSachItemGioHang = JSON.stringify(danhsachItemGioHang);
  localStorage.setItem(keyLocalStorageItemCart, jsonDanhSachItemGioHang);
}
// xóa thông tin

function deleteProduct(index) {
  let listProductCart = layDanhSachItemGioHang();
  var listDeleteProduct = listProductCart.splice(index, 1);
  luuDanhSachItemGioHangVaoLocalStorage(listProductCart);
  let listItemCart = layDanhSachItemGioHang();
  var dataCartProduct = getListProductCart();
  if (dataCartProduct.length == 0) {
    productOpen.style.display = "none";
    productClose.style.display = "block";
  }
  getDataCartProduct(dataCartProduct);
}
// lay danh sach các item gio hang duoc luu trong local
function layDanhSachItemGioHang() {
  var danhsachItemGioHang = new Array();
  var jsonDanhSachItemGioHang = localStorage.getItem(keyLocalStorageItemCart);
  if (jsonDanhSachItemGioHang != null)
    danhsachItemGioHang = JSON.parse(jsonDanhSachItemGioHang);
  return danhsachItemGioHang;
}
var listItemCart = layDanhSachItemGioHang();
console.log("span pham trong gio hang ", listItemCart);

var productOpen = document.getElementById("productOpen");
var productClose = document.getElementById("productClose");
if (listItemCart.length > 0) {
  productOpen.style.display = "block";
  productClose.style.display = "none";
} else {
  productOpen.style.display = "none";
  productClose.style.display = "block";
}

var listProduct = layDanhSachSanPhamDuoiLocalStorage();
console.log("san pham ", listProduct);

// truy xuat lay ra theo id
function getListProductCart() {
  var listItemCart = layDanhSachItemGioHang();
  let listProductCart = listItemCart?.map((item) => {
    const findItem = listProduct.find(
      (e) => e.id?.toString() === item.idSanPham?.toString()
    );
    return {
      ...findItem,
      soLuong: item.soLuong,
    };
  });
  return listProductCart;
}
getListProductCart();
var dataCartProduct = getListProductCart();
// tinh tong
var totalPriceProduct = document.querySelector("#total");
var totalPrice = dataCartProduct.reduce((total, item) => {
  return total + item.soLuong * item.price;
}, 0);
totalPriceProduct.innerText = `Total: ${totalPrice}`;

console.log("tong cong", totalPrice);
// hienThiDanhSachItemGioHang();

console.log(totalPriceProduct);
// // chuyen mot doi tuong thanh html
function getDataCartProduct(dataCartProduct) {
  var nodeGioHang = document.querySelector("#product_cart");
  nodeGioHang.innerHTML = "";
  dataCartProduct.map((item, index) => {
    const totalProduct = item.soLuong * item.price;
    const newQuantity = item.quantity - item.soLuong;
    nodeGioHang.innerHTML += `
   <tr>
   <td class="img">
   <div><img src="${item.img}" alt="" style="width: 100px;height: 60px;" ></div>
   <div>
     <div class="product_cart--name">${item.name}</div>
     <div class="product_cart--qyt">quantity: ${newQuantity}</div>
   </div>
 </td>
 <td>
   <div class="buttons_added">
  <input class="minus is-form" type="button" value="-" onclick="handleMinus(${item.id})">
  <input aria-label="quantity" class="input-qty" id="qty" max="Số tối đa" min="Số tối thiểu" name="" type="number" value="${item.soLuong}">
  <input class="plus is-form" type="button" value="+" onclick="handlePlus(${item.id})">
</div>
 </td>
 <td>${item.price}đ</td>
 <td>${totalProduct}đ</td>
 
 <td>
   <button class="x" onclick="deleteProduct(${index})">x</button>
 </td>
 </tr>
    `;
  });
}
getDataCartProduct(dataCartProduct);

function laySanPhamTheoId() {
  var sanpham = new Object();

  return sanpham;
}
console.log("danh sach", laySanPhamTheoId());

//lay danh sach san pham  duoi local storage
function layDanhSachSanPhamDuoiLocalStorage() {
  var danhSachSanPham = JSON.parse(localStorage.getItem(keyLocalStorageListSP));
  return danhSachSanPham;
}

// xử lý cộng trừ
function handleMinus(index) {
  let listProductCart = layDanhSachItemGioHang();
  const indexItem = listProductCart.findIndex(
    (item) => item.idSanPham === index
  );
  if (listProductCart[indexItem].soLuong > 1) {
    listProductCart[indexItem].soLuong -= 1;
    luuDanhSachItemGioHangVaoLocalStorage(listProductCart);
    let listItemCart = layDanhSachItemGioHang();
    var dataCartProduct = getListProductCart();
    getDataCartProduct(dataCartProduct);
    var totalPriceProduct = document.querySelector("#total");
    var totalPrice = dataCartProduct.reduce((total, item) => {
      return total + item.soLuong * item.price;
    }, 0);
    totalPriceProduct.innerText = `Total: ${totalPrice}`;
  }
}
function handlePlus(index) {
  let listProductCart = layDanhSachItemGioHang();
  const listProduct = getListProductCart();
  const listProductItem = listProduct.find((item) => item.id === index);
  const quantity = listProductItem.quantity;
  const indexItem = listProductCart.findIndex(
    (item) => item.idSanPham === index
  );
  if (listProductCart[indexItem].soLuong < quantity) {
    listProductCart[indexItem].soLuong += 1;
    luuDanhSachItemGioHangVaoLocalStorage(listProductCart);
    let listItemCart = layDanhSachItemGioHang();
    var dataCartProduct = getListProductCart();
    getDataCartProduct(dataCartProduct);
    var totalPriceProduct = document.querySelector("#total");
    var totalPrice = dataCartProduct.reduce((total, item) => {
      return total + item.soLuong * item.price;
    }, 0);
    totalPriceProduct.innerText = `Total: ${totalPrice}`;
  }
}
