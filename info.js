// thanh pho
fetch("https://provinces.open-api.vn/api/p/")
  .then(function (response) {
    return response.json();
  })
  .then((provinceData) => {
    // console.log(provinceData);
    let listProvinceItems =
      `<option value="">--Chọn Tỉnh/Thành phố--</option>` +
      provinceData.map(function (province) {
        return `<option value=${province.code}>${province.name}</option>`;
      });
    document.getElementById("province").innerHTML = listProvinceItems;
  })
  .catch(function (error) {
    console.log(error);
  });
//quan huyen
function onChangeProvince() {
  const getProvinceValue = document.getElementById("province").value;
  fetch("https://provinces.open-api.vn/api/d/")
    .then(function (response) {
      return response.json();
    })
    .then((districtData) => {
      const getDistrictsByProvinceID = districtData.filter(
        (item) => item.province_code.toString() === getProvinceValue
      );
      let listDistrictItems =
        `<option value="" >--Chọn Huyện/Quận--</option>` +
        getDistrictsByProvinceID.map((district) => {
          return `<option value=${district.code}>${district.name}</option>`;
        });
      document.getElementById("district").innerHTML = listDistrictItems;
    })
    .catch(function (error) {
      console.log(error);
    });
}

// phương

function onChangeDistrict() {
  const getDistrictValue = document.getElementById("district").value;
  fetch("https://provinces.open-api.vn/api/w/")
    .then(function (response) {
      return response.json();
    })
    .then((dataWard) => {
      console.log("xa", dataWard);
      const getWardsByDistrictsID = dataWard.filter(
        (item) => item.district_code.toString() === getDistrictValue
      );
      let listWardItems =
        `<option value="" >--Chọn Huyện/Quận--</option>` +
        getWardsByDistrictsID.map((ward) => {
          return ` <option value=${ward.code}>${ward.name}</option>`;
        });
      document.getElementById("ward").innerHTML = listWardItems;
    })
    .catch(function (error) {
      console.log(error);
    });
}
