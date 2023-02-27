const listDataProduct = data;
console.log(listDataProduct);
const infoUserProduct = fetch("http://localhost:3000/productCart")
  .then(function (response) {
    return response.json();
  })
  .then((data) => {
    const listProduct = document.querySelector("#product_user");
    console.log(listProduct);
    data.map((item) => {
      console.log(item);
      listProduct.innerHTML += ` <tr class="coures-item-${item.id}">
      <td>${item.id}
      <div>
          <p style="display: flex;" >Details
              <i class="fa fa-chevron-down " aria-hidden="true" id="down-${
                item.id
              }" style="margin-left: 5px;" onclick="handerDetailsDown(${
        item.id
      })"></i>
              <i class="fa fa-chevron-up" aria-hidden="true" id="up-${
                item.id
              }" style="display: none;margin-left: 5px;" onclick="handerDetailsUp(${
        item.id
      })"></i>
          </p>
      </div>
      <div id="productDetails-${item.id}" style="display:none;">
          <table class="w3-table w3-bordered">
              <thead>
              <tr class="title-product">
                  <th>Ảnh</th>
                  <th>Tên SP</th>
                  <th>Giá Tiền</th>
                  <th>SL</th>
                  <th>Tổng</th>
              </tr></thead>
              <tbody id="product_details">
              ${
                item.listOrderProduct.length > 0 &&
                item.listOrderProduct
                  .map(
                    (item) =>
                      `
                <tr>
                <td><img src="${
                  item.img
                }" style="width: 100px;height: 60px;" alt=""></td>
                <td>${item.name}</td>
                <td>${item.price}</td>
                <td>${item.soLuong}</td>
                <td>${item.soLuong * item.price}</td></tr>`
                  )
                  .join(" ")
              }
              </tbody>
          </table>
      </div>
  </td>
  <td>${item.fullname}</td>
  <td>${item.date}</td>
  <td>${item.listOrderProduct?.length}</td>
  <td>${item.total}</td>
  <td>
      <div class="x" onClick=deleteOrder(${item.id})>
          x
      </div>
  </td>
  </tr>
        `;
    });
  })
  .catch(function (error) {
    console.log(error);
  });

function handerDetailsDown(id) {
  var productDetails = document.getElementById(`productDetails-${id}`);
  var up = document.getElementById(`up-${id}`);
  var down = document.getElementById(`down-${id}`);
  productDetails.style.display = "block";
  down.style.display = "none";
  up.style.display = "block";
}
function handerDetailsUp(id) {
  var productDetails = document.getElementById(`productDetails-${id}`);
  var up = document.getElementById(`up-${id}`);
  var down = document.getElementById(`down-${id}`);
  productDetails.style.display = "none";
  down.style.display = "block";
  up.style.display = "none";
}
function deleteOrder(id) {
  var option = {
    method: "DELETE",
    headers: {
      "COntent-Type": "application/json",
    },
  };

  fetch("http://localhost:3000/productCart")
    .then((res) => res.json())
    .then((data) => {
      console.log(id);
      console.log(data);
      console.log(listDataProduct);
      data.map((item) => {
        if (item.id == id) {
          item.listOrderProduct.map((index) => {
            listDataProduct.map((item) => {
              if (item.id == index.id) {
                item.quantity = item.quantity + index.soLuong;
                console.log(item.quantity);
              }
            });
            console.log(listDataProduct);
            localStorage.setItem(
              keyLocalStorageListSP,
              JSON.stringify(listDataProduct)
            );
          });
        }
      });
    })
    .catch((error) => {
      console.log(error);
    });

  fetch(`http://localhost:3000/productCart/${id}`, option)
    .then((res) => res.json())
    .then(function (data) {
      var courseItem = document.querySelector(".coures-item-" + id);
      if (courseItem) {
        courseItem.remove();
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
