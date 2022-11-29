var p = 'product';

let currentPage = 1; //trang hien tai
let perPage = 8; //so san pham cua 1 trang
let start = 0;
let end = perPage;
let productArray = JSON.parse(localStorage.getItem('product'));
let totalPage = 0;

function createProduct() {
  if (localStorage.getItem('product') === null) {
    productArray = [
      { productId: 1001, brand: 'AD', img: './ao_so_mi/ao_so_mi_AD_1.jpg', name: 'Ao so mi AD', price: 300000, type: 'ao' },
      { productId: 1002, brand: 'AD', img: './ao_so_mi/ao_so_mi_AD.jpg', name: 'Ao so mi AD', price: 250000, type: 'ao' },
      { productId: 1003, brand: 'CO', img: './ao_so_mi/ao_so_mi_CO.jpg', name: 'Ao so mi CO', price: 200000, type: 'ao' },
      { productId: 1004, brand: 'DF', img: './ao_so_mi/ao_so_mi_DF.jpg', name: 'Ao so mi DF', price: 210000, type: 'ao' },
      { productId: 1005, brand: 'CO', img: './ao_so_mi/ao_so_mi_Gent.jpg', name: 'ao so mi Gent', price: 230000, type: 'ao' },
      { productId: 1006, brand: 'MB', img: './ao_so_mi/ao_so_mi_MB.jpg', name: 'ao so mi MB', price: 230000, type: 'ao' },
      { productId: 1007, brand: 'MB', img: './ao_so_mi/ao_so_mi_MB_1.jpg', name: 'ao so mi MB', price: 220000, type: 'ao' },
      { productId: 1008, brand: 'MB', img: './ao_so_mi/ao_so_mi_MB_2.jpg', name: 'ao so mi MB', price: 140000, type: 'ao' },
      { productId: 1009, brand: 'MB', img: './ao_so_mi/ao_so_mi_MB_3.jpg', name: 'ao so mi MB', price: 250000, type: 'ao' },
      { productId: 1010, brand: 'MB', img: './ao_so_mi/ao_so_mi_MB_4.jpg', name: 'ao so mi MB', price: 190000, type: 'ao' },
      { productId: 1011, brand: 'MB', img: './ao_so_mi/ao_so_mi_MB_5.jpg', name: 'ao so mi MB', price: 310000, type: 'ao' },
    ];
    localStorage.setItem('product', JSON.stringify(productArray));
  }
}

function renderProduct(array, n) {
  if (localStorage.getItem(n) === null) {
    return false;
  }
  array = JSON.parse(localStorage.getItem(n));
  var div = '';
  array.map((item, index) => {
    if (index >= start && index < end) {
      div += '<div class="box">' + '<img src="' + item.img + '" onclick="cart_display(\'' + item.productId + '\')">' + '<h3 class="item__name">' + item.name + '</h3><div class="price">' + item.price + '</div></div>';
    }
  })
  document.getElementById('product').innerHTML = div;
}

function getCurrentPage(index) {
  start = (index - 1) * perPage;
  end = index * perPage;
}

function renderListPage(array) {
  totalPage = Math.ceil(array.length / perPage);
  let html = '';
  for (let i = 1; i <= totalPage; i++) {
    html += `<li class="btn">${i}</li>`;
  }
  document.getElementById('numb').innerHTML = html;
}

function changePage(array, n) {
  let current = document.querySelectorAll('.wrapper li');
  for (let i = 0; i < current.length; i++) {
    current[i].addEventListener('click', () => {
      let c = i + 1;
      getCurrentPage(c);
      renderProduct(array, n);
    });
  }
}

function showProduct() {
  document.getElementById('title').innerHTML = `Tất Cả Sản Phẩm`;
  renderProduct(productArray, p);
  renderListPage(productArray);
  changePage(productArray, p);
}
var ao = 'ao';
var quan = 'quan';

function getroductOfType(array, typeItem) {
  productArray.map(item => {
    if (item.type == typeItem) {
      array.push(item);
    }
  })
  localStorage.setItem(typeItem, JSON.stringify(array));

}
let btnAo = document.getElementById('buttonAo');
btnAo.addEventListener('click', () => {
  let arrayAo = [];
  getroductOfType(arrayAo, ao);
  document.getElementById('title').innerHTML = `<h2> Ao Nam <h2/>`;
  renderProduct(arrayAo, ao);
  renderListPage(arrayAo);
  changePage(arrayAo, ao);
})
let btnQuan = document.getElementById('buttonQuan');
btnQuan.addEventListener('click', () => {
    let arrayQuan = [];
    getroductOfType(arrayQuan, quan);
    document.getElementById('title').innerHTML = `<h2> Quan Nam <h2/>`;
    renderProduct(arrayQuan, quan);
    renderListPage(arrayQuan);
    changePage(arrayQuan, quan);
  })
  //search
let searchBtn = document.getElementById('searchBtn');
let searchText = document.querySelector('.searchBar input');
let s = 'search';
searchBtn.addEventListener('click', () => {
  let arraySearch = localStorage.getItem(s) ? JSON.parse(localStorage.getItem(s)) : [];
  productArray.forEach(item => {
    if (item.name.toLocaleLowerCase().indexOf(searchText.value.toLocaleLowerCase()) != -1) {
      arraySearch.push(item);
    }
  })
  localStorage.setItem('search', JSON.stringify(arraySearch));
  document.getElementById('title').innerHTML = `<h2>San Pham Tim Kiem<h2/>`;
  renderProduct(arraySearch, s);
  renderListPage(arraySearch);
  changePage(arraySearch, s);
})
searchText.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    event.preventDefault();
    searchBtn.click();
  }
})

function openFilter() {
  document.getElementById("filterProduct").style.display = 'flex';
  document.getElementById('filterClose').style.display = 'block';
  document.getElementById('filter_click').style.display = 'none';
}
let f = "filter";

function filterProduct() {
  let p1 = document.getElementById('pr1').value
  let p2 = document.getElementById('pr2').value;
  let arrayFilter = localStorage.getItem(f) ? JSON.parse(localStorage.getItem(f)) : [];
  productArray.map(item => {
    if (item.price >= p1 && item.price <= p2) {
      arrayFilter.push(item);
    }
  })
  localStorage.setItem('filter', JSON.stringify(arrayFilter));
  document.getElementById('title').innerHTML = `<h2>Sản Phẩm Đã Lọc<h2/>`;
  renderProduct(arrayFilter, f);
  renderListPage(arrayFilter);
  changePage(arrayFilter, f);
  document.getElementById("filterProduct").style.display = 'none';
  document.getElementById('filterClose').style.display = 'none';
  document.getElementById('filter_click').style.display = 'flex';
}

function closeFilter() {
  document.getElementById("filterProduct").style.display = 'none';
  document.getElementById('filterClose').style.display = 'none';
  document.getElementById('filter_click').style.display = 'flex';
}


// TRUONG
/*CART*/
var keystorageitemgio = 'danhsachitemgiohang';


function showcart() {
  event.preventDefault();
  if (trangThai.type == "kh") {
    document.getElementById("signup").style.display = "none";
    document.getElementById("login").style.display = "none";
    document.getElementById("cart").style.display = "flex";
    hienthids();
  } else if (trangThai.type == "") {
    alert("Bạn chưa đăng nhập");
  } else {
    alert("Admin không được mua");
  }

}

function closeFormcart(e) {
  event.preventDefault();
  document.getElementById("cart").style.display = "none";
}

function add_item() {
  cart_soluong = ++document.getElementById("number-product").value;
  return cart_soluong;
}

function sub_item() {
  if (document.getElementById("number-product").value == 0) {
    alert("Không thể giảm");
  } else
    cart_soluong = --document.getElementById("number-product").value;
  return cart_soluong;
}

function addItemToCart(productId) {
  var cart_soluong = parseInt(document.getElementById("number-product").value);
  var e = document.getElementById('size');
  var size = e.value;
  if (trangThai.type == "kh") {
    var dsitem = laydsitem();
    var cotontai = false;
    for (var i = 0; i < dsitem.length; i++) {
      var itemgiohanghientai = dsitem[i];
      if (itemgiohanghientai.idsanpham == productId && itemgiohanghientai.username == trangThai.username && itemgiohanghientai.size == size) {
        alert("hello");
        cotontai = true;
        dsitem[i].soluong += cart_soluong;
      }
    }
    if (cotontai == false) {
      var itemgiohang = taoitem(productId, cart_soluong, trangThai.username, size);
      dsitem.push(itemgiohang);
      cart_soluong = 0;
    }
    luuvaolocal(dsitem);
    alert("Thêm vào giỏ thành công");
  } else {
    alert("Bạn chưa đăng nhập");
  }
}

function luuvaolocal(dsitem) {
  /*b1 chuyen json*/
  var jsondsitem = JSON.stringify(dsitem);
  /*b2 luu vao local*/
  localStorage.setItem(keystorageitemgio, jsondsitem);
}


/*tạo ra dt item giỏ hàng
input id sp,sl
output đối tượng item giỏ hàng*/
function taoitem(idsanpham, soluong, username, size) {
  var itemgiohang = {
    idsanpham: idsanpham,
    soluong: soluong,
    username: username,
    size: size,
  };
  return itemgiohang;
}
/*lấy all item giỏ được lưu trong local*/
function laydsitem() {
  var dsitem = [];
  /*b1 lấy chuỗi json trong local*/
  var JSONdsitem = localStorage.getItem(keystorageitemgio);
  /*b2 chuyển từ json qua item giỏ*/
  if (JSONdsitem != null)
    var dsitem = JSON.parse(JSONdsitem);
  return dsitem;
}
/*mô tả chuyển đối tượng thành html*/
function chuyenitemgiohangsanghtml() {
  var itemgiohang = {
    idsanpham: "",
    soluong: "",
    username: "",
    size: "",
  };
  itemgiohang = JSON.parse(localStorage.getItem(keystorageitemgio));
  console.log(itemgiohang);
  let html = '';
  console.log(itemgiohang.length);
  for (let i = 0; i < itemgiohang.length; i++) {
    let sanpham = laysptheoid(itemgiohang[i].idsanpham);
    if (itemgiohang[i].username == trangThai.username) {
      html += `<div class="hinhgio mb-10"><div class="img-gio"><img src="${sanpham.img}"/></div></div>\n
            <div class="name mb-10 font-24">` + sanpham.name + `</div>\n
            <div class="gia mb-10 font-24">` + sanpham.price + `</div>\n
            <div class="soluong mb-10 font-24">${itemgiohang[i].soluong}</div>\n
          <div class="giacuoi mb-10 font-24">${sanpham.price*itemgiohang[i].soluong}</div>\n
          <div class="size mb-10 font-24">${itemgiohang[i].size}</div>\n
           <div class="tg mb-10 font-24"><button class="btn-gh-xoa" onclick="xoa(${sanpham.productId})">xóa</button></div>\n
         </div>`
    }
  }
  console.log(html);
  return html;
}

function hienthids() {
  var html = chuyenitemgiohangsanghtml();
  document.getElementById("inner").innerHTML = html;
}

function laysptheoid(Id) {
  var sanpham = new Object();
  // var dssp=laydsspduoilocal();
  // console.log(dssp);
  for (let i = 0; i < productArray.length; i++) {
    if (productArray[i].productId == Id) {
      sanpham = productArray[i];
    }
  }
  return sanpham;
}


function xoa(id) {
  var dsitem = laydsitem();
  for (var i = 0; i < dsitem.length; i++) {
    if (dsitem[i].idsanpham == id && dsitem[i].username == trangThai.username) {
      dsitem.splice(i, 1);
    }
    luuvaolocal(dsitem);
    hienthids();
  }
}

function kiemtragio() {
  var kt = 0;
  var JSONdsitem = laydsitem();
  for (var i = 0; i < JSONdsitem.length; i++) {
    if (JSONdsitem[i].username == trangThai.username)
      kt = 1;
  }
  return kt;
}

function muahang(e) {
  event.preventDefault(); // Dùng để xóa hành vi mặc định
  var tam = kiemtragio();
  console.log(tam + "tam");
  if (tam == 1) {
    event.preventDefault();
    document.getElementById("signup").style.display = "none";
    document.getElementById("login").style.display = "none";
    document.getElementById("cart").style.display = "none";
    document.getElementById("muahang").style.display = "flex";
  } else {
    alert("Giỏ hàng trống");
    document.getElementById("signup").style.display = "none";
    document.getElementById("login").style.display = "none";
    document.getElementById("cart").style.display = "none";
    document.getElementById("muahang").style.display = "none";
  }
}

function closeFormmuahang(e) {
  event.preventDefault();
  document.getElementById("muahang").style.display = "none";
}

function checkThongTinMuaHang() {
  if (document.getElementById("fullname").value == "") {
    alert("Tên không được trống");
    document.getElementById("fullname").focus();
    return false;
  }
  if (document.getElementById("dc").value == "") {
    alert("Địa chỉ không được trống");
    document.getElementById("dc").focus();
    return false;
  }
  if (document.getElementById("sdt").value == "") {
    alert("Sđt không được trống");
    document.getElementById("sdt").focus();
    return false;
  }
  return true;
}

function hoantat(e) {
  event.preventDefault();
  var donhangArray = localStorage.getItem("dathang") ? JSON.parse(localStorage.getItem("dathang")) : [];

  dsdonhang = laydsitem();
  var fullname = document.getElementById("fullname").value;
  var diachi = document.getElementById("dc").value;
  var sdt = document.getElementById("sdt").value;
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  today = mm + '/' + dd + '/' + yyyy;
  var kt = checkThongTinMuaHang();
  if (kt == true) {
    document.getElementById("signup").style.display = "none";
    document.getElementById("login").style.display = "none";
    document.getElementById("cart").style.display = "none";
    document.getElementById("muahang").style.display = "none";
    document.getElementById("hoantat").style.display = "flex";
    for (var i = 0; i < dsdonhang.length; i++) {
      if (dsdonhang[i].username == trangThai.username) {
        var tmp = laysptheoid(dsdonhang[i].idsanpham)
        var dathang = {
          loai: tmp.type,
          idsanpham: dsdonhang[i].idsanpham,
          soluong: dsdonhang[i].soluong,
          username: dsdonhang[i].username,
          tensp: tmp.name,
          gia: dsdonhang[i].soluong * tmp.price,
          type: "kh",
          status: "chua_xu_ly",
          fullname: fullname,
          diachi: diachi,
          sdt: sdt,
          size: dsdonhang[i].size,
          date: today,
        };
        donhangArray.push(dathang);
        localStorage.setItem("dathang", JSON.stringify(donhangArray));
      }
    }
    for (var i = 0; i < dsdonhang.length; i++) {
      if (dsdonhang[i].username == trangThai.username) {
        xoa(dsdonhang[i].idsanpham);
      }
      // localStorage.setItem("danhsachitemgiohang", dsdonhang);
    }
  }
}

function closeFormhoantat() {
  event.preventDefault();
  document.getElementById("hoantat").style.display = "none";
}

// hien thi chi tiet san pham
function cart_display(Id) {
  var dsitem = laydsitem();
  var itemgiohang = JSON.parse(localStorage.getItem('product'));
  let html = '';
  console.log(itemgiohang.length);
  for (let i = 0; i < itemgiohang.length; i++) {
    // if (itemgiohang[i].username == trangThai.username) {
    if (itemgiohang[i].productId == Id) {
      let sanpham = laysptheoid(itemgiohang[i].productId);
      html += '<div class="l-product-container">' +
        '<img src="' + sanpham.img + '">' + '</div>' +
        '<div class="r-product-container">' +
        '<div class = "name-product" > Tên sản phẩm: ' + sanpham.name + '</div>' +
        '<span class="price-product"><span>Giá: </span>' + sanpham.price + '</span>' +
        '<span class="count-product">Số lượng</span>' +
        '<div class="input-product">' +
        '<button class="btn-product" onclick="sub_item()">-</button>' +
        '<input type="number" name="" id="number-product" step="1" value="1">' +
        '<button class="btn-product" onclick="add_item()">+</button>' +
        '<span class="size-product">Size<span>' +
        '</div>' + '<select name="" id="size">' +
        '<option value="S">S</option>' +
        '<option value="M">M</option>' +
        '<option value="L">L</option>' +
        '<option value="XL">XL</option>' +
        '<option value="XXL">XXL</option>' +
        '</select>' +
        '<button class="button_add_product" onclick="addItemToCart(\'' + sanpham.productId + '\');close_cart_display();">' + 'Thêm vào giỏ' + '</button>' + '</div>' +
        '<a class="close-display-cart" onclick="close_cart_display()"><i class="fa-solid fa-xmark"></i></a>' + '</div>';
      // }
    }
  }
  // document.getElementById("product-container").style.display = "none";
  document.getElementById("product-container").style.display = "flex";
  document.getElementById("product-container").innerHTML = html;

}

function close_cart_display(e) {
  event.preventDefault();
  document.getElementById("product-container").style.display = "none";
}