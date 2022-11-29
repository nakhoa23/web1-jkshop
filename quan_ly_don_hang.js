window.onload = function() {
  showbilllist();
}

function showbilllist() {
  var s = '<tr><th>STT</th><th>NGÀY</th><th>TÊN SẢN PHẨM</th><th>TÊN NGƯỜI MUA</th><th>SỐ LƯỢNG</th><th>GIÁ</th><th>ĐỊA CHỈ</th><th>SĐT</th><th>SIZE</th><th>Trạng Thái</th></tr>';
  var billArray = JSON.parse(localStorage.getItem('dathang'));
  for (var i = 0; i < billArray.length; i++) {
    if (billArray[i].status == "chua_xu_ly") {
      s += '<tr onClick="showinfobill(' + i + ')">' +
        '<td>' + (i + 1) + '</td>' +
        '<td>' + billArray[i].date + '</td>' +
        '<td>' + billArray[i].tensp + '</td>' +
        '<td>' + billArray[i].fullname + '</td>' +
        '<td>' + billArray[i].soluong + '</td>' +
        '<td>' + billArray[i].gia + '</td>' +
        '<td>' + billArray[i].diachi + '</td>' +
        '<td>' + billArray[i].sdt + '</td>' +
        '<td>' + billArray[i].size + '</td>' +
        '<td style="color: red">Chưa Xử Lý</td>' +
        '</tr>';
    } else {
      s += '<tr onClick="showinfobill(' + i + ')">' +
        '<td>' + (i + 1) + '</td>' +
        '<td>' + billArray[i].date + '</td>' +
        '<td>' + billArray[i].tensp + '</td>' +
        '<td>' + billArray[i].fullname + '</td>' +
        '<td>' + billArray[i].soluong + '</td>' +
        '<td>' + billArray[i].gia + '</td>' +
        '<td>' + billArray[i].diachi + '</td>' +
        '<td>' + billArray[i].sdt + '</td>' +
        '<td>' + billArray[i].size + '</td>' +
        '<td style="color: blue">Đã Xử Lý</td>' +
        '</tr>';
    }
  }
  document.getElementById('billlist').innerHTML = s;
}

function showinfobill(id) {
  document.getElementById('info').style.display = 'flex';
  var billArray = JSON.parse(localStorage.getItem('dathang'));
  var s = '';
  for (var i = 0; i < billArray.length; i++) {
    if (i == id) {
      s += '<div onclick="closeinfobill();" class="close"><i class="fa-solid fa-x"></i></div>' +
        '<h4>STT:' + (i + 1) + '</h4>' +
        '<h4>Ngày tạo đơn hàng:</h4>' +
        '<p>' + billArray[i].date + '</p>' +
        '<h4>Tên khách hàng:</h4>' +
        '<p>' + billArray[i].fullname + '</p>' +
        '<h4>Địa chỉ:</h4>' +
        '<p>' + billArray[i].diachi + '</p>' +
        '<h4>Số điện thoại liên lạc:</h4>' +
        '<p>' + billArray[i].sdt + '</p>' +
        '<h4>Tên sản phẩm:</h4>' +
        '<p>' + billArray[i].tensp + '</p>' +
        '<h4>Số lượng:</h4>' +
        '<p>' + billArray[i].soluong + '</p>' +
        '<h4>Tổng giá tiền:</h4>' +
        '<p>' + billArray[i].gia + '</p>' +
        '<h4>Size:</h4>' +
        '<p>' + billArray[i].tensp + '</p>';
      if (billArray[i].status == "chua_xu_ly") {
        s += '<span id="status"></span><div class="okay">Xác Nhận: <label class="switch"><input type="checkbox" onchange="changeStatus(this,' + i + ');  closeinfobill();" ><span class="slider round"></span></label></div>';
      }
    }
  }
  document.getElementById('info').innerHTML = s;
}

function closeinfobill() {
  document.getElementById('info').style.display = 'none';
}

function changeStatus(checkbox, id) {
  var billArray = JSON.parse(localStorage.getItem('dathang'));
  if (checkbox.checked == true) {
    for (var i = 0; i < billArray.length; i++) {
      if (i == id) {
        billArray[i].status = 'da_xu_ly';
      }
    }
  } else {
    for (var i = 0; i < billArray.length; i++) {
      if (billArray[i].id == id) {
        billArray[i].status = 'chua_xu_ly';
      }
    }
  }
  localStorage.setItem('dathang', JSON.stringify(billArray));
  showbilllist();
}