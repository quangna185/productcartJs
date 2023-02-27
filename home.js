var listData = [
  {
    id: 1,
    name: "Giày Thể Thao Nam AG0156",
    price: 400000,
    quantity: "10",
    img: "./img/giay2.jpg",
  },
  {
    id: 2,
    name: "Ecko Unltd giày thể thao nam IS22-24505",
    price: 500000,
    quantity: "5",
    img: "./img/giay3.jpg",
  },
  {
    id: 3,
    name: "GNMS49 Giày Sneaker Nam Cổ Thấp",
    price: 6000000,
    quantity: "10",
    img: "./img/giay4.jpg",
  },
  {
    id: 4,
    name: "Giày Thể Thao Nike Air Force 1 07 White",
    price: 7000000,
    quantity: "10",
    img: "./img/giay5.jpg",
  },
  {
    id: 5,
    name: "Giày Air Jordan 1 Low",
    price: 5500000,
    quantity: "2",
    img: "./img/giay6.jpg",
  },
  {
    id: 6,
    name: "Giày Sneaker Nam Tommy ",
    price: 2390000,
    quantity: "5",
    img: "./img/giay7.jpg",
  },

  {
    id: 7,
    name: "Giày Thể Thao Nam S121",
    price: 57000,
    quantity: "15",
    img: "./img/giay8.jpg",
  },
  {
    id: 8,
    name: "Giày Thể Thao Nam adđiass",
    price: 34500,
    quantity: "10",
    img: "./img/hinh-anh-giay-vans-17.jpg",
  },
];

var keyLocalStorageListSP = "DANHSACHSP";

//localStorage.setItem(keyLocalStorageListSP, JSON.stringify(listData));
var data = JSON.parse(localStorage.getItem(keyLocalStorageListSP));
// console.log("span pham", data);

const productData = document.querySelector("#product_list");

function getDataProduct(data) {
  data.map((item) => {
    productData.innerHTML += `
            <div class="product__list--item">
        <div class="product--img">
          <img src="${item.img}" alt=""/>
          <i class="fa fa-cart-arrow-down" aria-hidden="true" onclick="handleCart(${item.id},${item.quantity})"></i>
        </div>
      
        <div class="product--name">${item.name}</div>
        <div class="product--dec">
          <div class="product--price">Price:${item.price}đ</div>
          <div class="product--qty">Quantity:${item.quantity}</div>
        </div>
      </div>
    `;
  });
}
getDataProduct(data);

// //    Click vao gio hang
function handleCart(idSanPham, soLuongSP) {
  console.log(soLuongSP);
  alert("Thêm sản phẩm vào giỏ hàng với sản phẩm có ID là" + idSanPham);
  var danhsachItemGioHang = layDanhSachItemGioHang();
  console.log(danhsachItemGioHang);
  var coTonTaitrongDanhSachItemGioHang = false;
  for (var i = 0; i < danhsachItemGioHang.length; i++) {
    var itemGioHangHienTai = danhsachItemGioHang[i];
    console.log(itemGioHangHienTai);
    if (
      itemGioHangHienTai.idSanPham == idSanPham &&
      soLuongSP > itemGioHangHienTai.soLuong
    ) {
      danhsachItemGioHang[i].soLuong++;
      coTonTaitrongDanhSachItemGioHang = true;
    }
  }
  if (
    coTonTaitrongDanhSachItemGioHang == false &&
    soLuongSP > itemGioHangHienTai.soLuong
  ) {
    var itemGioHang = taoDoiTuongItemGioHang(idSanPham, 1);
    danhsachItemGioHang.push(itemGioHang);
  }
  //Luu tru lai vao local storage
  console.log(danhsachItemGioHang);
  luuDanhSachItemGioHangVaoLocalStorage(danhsachItemGioHang);
}
