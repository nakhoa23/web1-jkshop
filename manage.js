function resetInput() {
  document.getElementById('name').value = '';
  document.getElementById('price').value = '';
  document.getElementById('img').value = '';
  document.getElementById('brand').value = '';
  document.getElementById('type').value = '';
}
let currentPage = 1; //trang hien tai
let perPage = 6; //so san pham cua 1 trang
let start = 0;
let end = perPage;
let totalPage = 0;
let productArray = JSON.parse(localStorage.getItem('product'));

function render() {
  if (localStorage.getItem('product') === null) {
    return false;
  }
  productArray = JSON.parse(localStorage.getItem('product'));
  var tr = '<tr><th>STT</th><th>Tên sản phẩm</th><th>Giá</th><th>Hình ảnh</th><th>Thương hiệu</th><th>Loại</th><th>Xóa/Sửa</th></tr>';
  productArray.map((item, index) => {
    if (index >= start && index < end) {
      tr += '<tr><td>' + (index + 1) + '</td><td>' + item.name + '</td><td>' + item.price + '</td><td>' + '<img src="' + item.img + '">' + '</td><td>' + item.brand + '</td><td>' + item.type + '</td><td><div class="button" onclick="deleteProduct(\'' + index + '\')">Xóa</div><div class="button" onclick="editProduct(\'' + index + '\')">Sửa</div></td></tr>';
    }
  })
  document.getElementById('show_product').innerHTML = tr;
  document.getElementById('update').style.display = 'none';
}

function getCurrentPage(index) {
  start = (index - 1) * perPage;
  end = index * perPage;
}

function renderListPage() {
  totalPage = Math.ceil(productArray.length / perPage);
  let html = '';
  for (let i = 1; i <= totalPage; i++) {
    html += `<li class="btn">${i}</li>`;
  }
  document.getElementById('numb').innerHTML = html;
}

function changePage() {
  let current = document.querySelectorAll('.wrapper li');
  for (let i = 0; i < current.length; i++) {
    current[i].addEventListener('click', () => {
      let c = i + 1;
      getCurrentPage(c);
      render();
    });
  }
}

function renderAll() {
  render();
  renderListPage();
  changePage();
}

function checkAddProduct() {
  // document.getElementById('name').value = productArray[index].name;
  // document.getElementById('price').value = productArray[index].price;
  // document.getElementById('img').value = productArray[index].img;
  // document.getElementById('brand').value = productArray[index].brand;
  // document.getElementById('type').value = productArray[index].type;
  // document.getElementById('index').value = index;
  if (document.getElementById('name').value == "") {
    alert("Tên sản phẩm không được trống");
    document.getElementById('name').focus();
    return false;
  }
  if (document.getElementById('img').value == "") {
    alert("Link hình ảnh không được trống");
    document.getElementById('img').focus();
    return false;
  }
  if (document.getElementById('price').value == "") {
    alert("Giá sản phẩm không được trống");
    document.getElementById('price').focus();
    return false;
  }
  if (document.getElementById('brand').value == "") {
    alert("Thương hiệu sản phẩm không được trống");
    document.getElementById('brand').focus();
    return false;
  }
  if (document.getElementById('type').value == "") {
    alert("Loại sản phẩm không được trống");
    document.getElementById('type').focus();
    return false;
  }
  return true;
}

function createnewproduct() {
  kt = checkAddProduct();
  if (kt == true) {
    productArray = JSON.parse(localStorage.getItem('product'));
    var product1 = { productId: productArray[productArray.length - 1].productId + 1, brand: document.getElementById('brand').value, img: document.getElementById("img").value, name: document.getElementById("name").value, price: document.getElementById("price").value, type: document.getElementById('type').value };
    if (confirm('Bạn muốn thêm sản phẩm?')) {
      productArray.push(product1);
      alert("Thêm thành công");
    }
    localStorage.setItem('product', JSON.stringify(productArray));
    resetInput();
    renderAll();
  }
}

function deleteProduct(index) {
  productArray = JSON.parse(localStorage.getItem('product'));
  if (confirm('Bạn muốn xóa sản phẩm này?')) {
    productArray.splice(index, 1);
  }
  localStorage.setItem('product', JSON.stringify(productArray));
  render();
}

function editProduct(index) {
  productArray = JSON.parse(localStorage.getItem('product'));
  document.getElementById('name').value = productArray[index].name;
  document.getElementById('price').value = productArray[index].price;
  document.getElementById('img').value = productArray[index].img;
  document.getElementById('brand').value = productArray[index].brand;
  document.getElementById('type').value = productArray[index].type;
  document.getElementById('index').value = index;

  document.getElementById('add').style.display = 'none';
  document.getElementById('update').style.display = 'inline-block';
}

function changeProduct() {
  productArray = JSON.parse(localStorage.getItem('product'));
  let index = document.getElementById('index').value;
  productArray[index] = {
    name: document.getElementById('name').value,
    price: document.getElementById('price').value,
    img: document.getElementById("img").value,
    brand: document.getElementById('brand').value,
    type: document.getElementById('type').value,
  }
  localStorage.setItem('product', JSON.stringify(productArray));
  document.getElementById('add').style.display = 'inline-block';
  document.getElementById('update').style.display = 'none';
  render();
  resetInput();
}

function slAo() {
  var sl = 0;
  productArray.map(item => {
    if (item.type == "ao") {
      sl++;
    }
  })
  document.getElementById('aoCount').innerHTML = `<div class="count">${sl}</div>`;
}

function slSanPham() {
  document.getElementById('allProduct').innerHTML = `<div class="count">${productArray.length}</div>`;
}

function slQuan() {
  var sl = 0;
  productArray.map(item => {
    if (item.type == "quan") {
      sl++;
    }
  })
  document.getElementById('quanCount').innerHTML = `<div class="count">${sl}</div>`;
}

function statistical() {
  var slao = 0;
  var slquan = 0;
  var total = 0;
  var billArray = JSON.parse(localStorage.getItem('dathang'));
  for (var i = 0; i < billArray.length; i++) {
    if (billArray[i].status == "da_xu_ly") {
      if (billArray[i].loai == "ao") {
        slao += billArray[i].soluong;
      }
      if (billArray[i].loai == "quan") {
        slquan += billArray[i].soluong;
      }
      total += billArray[i].gia;
    }
  }
  document.getElementById('aodaban').innerHTML = `<div class="count">${slao}</div>`;
  document.getElementById('quandaban').innerHTML = `<div class="count">${slquan}</div>`;
  document.getElementById('doanhthu').innerHTML = `<div class="cost">${total}đ</div>`;
  document.getElementById('daban').innerHTML = `<div class="count">${slao + slquan}</div>`;
}