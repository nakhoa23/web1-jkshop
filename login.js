var userArray = []; // Mảng chứa tài khoản, mật khẩu người dùng
function createDefaut() {
  if (localStorage.getItem('user') === null) {
    // Thêm admin vào mảng userArray
    var admin = {
      username: "admin",
      password: "admin",
      type: "admin",
    };
    userArray.push(admin);
    localStorage.setItem("user", JSON.stringify(userArray));
    var trangThai = {
      username: "",
      type: "",
    };
    localStorage.setItem("trangThai", JSON.stringify(trangThai));
  }
}
// Chức năng đăng ký tài khoản
function signup(e) {
  event.preventDefault(); // Dùng để xóa hành vi mặc định
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  var comfirmPassword = document.getElementById("comfirm-password").value;
  var ktinput = checkFormSignUp(); // kiểm tra xem người dùng đã nhập hay chưa
  let kt = 1; // Biến dùng để kiểm tra xem có tồn tại username chưa
  // Kiểm tra tên người dùng đã tồn tại chưa
  // Nếu tồn tại kt = 0
  userArray = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : [];
  for (var i = 0; i < userArray.length; i++) {
    if (userArray[i].username == username) {
      kt = 0;
      alert("Tên người dùng đã tồn tại!");
      document.getElementById("username").focus();
    }
  }
  // Nếu chưa tồn tại thì thực hiện
  if (kt == 1 && ktinput == true) {
    if (password != comfirmPassword) {
      alert("Bạn đã nhập sai mật khẩu");
      document.getElementById("comfirm-password").focus();
    } else {
      var user = {
        username: username,
        password: password,
        type: "kh",
      };
      // Đẩy user vào trong mảng
      userArray.push(user);
      // Đưa user vào localStorage
      localStorage.setItem("user", JSON.stringify(userArray));
      alert("Đăng ký thành công");
    }
    // Reset form sau khi đăng ký thành công
    document.getElementById("signup-form").reset();
  }
}
var dem1 = 0; // biến dùng để show tên người dùng

// Chức năng đăng nhập
function login(e) {
  event.preventDefault(); // Dùng để xóa hành vi mặc định
  var username = document.getElementById("login-username").value;
  var password = document.getElementById("login-password").value;
  userArray = JSON.parse(localStorage.getItem("user"));
  var kt = checkFormLogin();
  var d = 0; // biến đếm kiểm tra tên người dùng đã tồn tại hay chưa nếu tồn tại d = 1
  if (kt == true) {
    for (var i = 0; i < userArray.length; i++) {
      // Nếu đăng nhập đúng tài khoản, mật khẩu
      if (
        username == userArray[i].username &&
        password == userArray[i].password
      ) {
        // check kiểu tài khoản admin
        if (userArray[i].type == "admin") {
          alert("Đăng nhập vào admin thành công");
          trangThai = {
            username: userArray[i].username,
            type: userArray[i].type,
          }
          localStorage.setItem("trangThai", JSON.stringify(trangThai));
          document.getElementById("login").style.display = "none";
          var admin_link = '<a href="admin.html" class="visit-admin">' + userArray[i].username + '</a>';
          document.getElementById("showUser").innerHTML = admin_link;
          ShowlogoutIcon();
          d = 1;
          dem1 = 1;
        }
        // check kiểu tài khoản user
        else if (userArray[i].type == "kh") {
          alert("Đăng nhập thành công");
          document.getElementById("login").style.display = "none";
          trangThai = {
            username: userArray[i].username,
            type: userArray[i].type,
          }
          localStorage.setItem("trangThai", JSON.stringify(trangThai));
          document.getElementById("showUser").innerHTML = userArray[i].username;
          var user_text = '<p class="user-text">' + userArray[i].username + '</p>';
          document.getElementById("showUser").innerHTML = user_text;
          d = 1;
          dem1 = 2;
          ShowlogoutIcon();
          break;
        }
      }
      // Nếu đăng nhập đúng tài khoản, sai mật khẩu
      else if (
        username == userArray[i].username &&
        password != userArray[i].password
      ) {
        alert("Bạn đã nhập sai mật khẩu");
        document.getElementById("login-password").focus();
        d = 1;
      }
    }
    // Nếu người dùng nhập 1 tài khoản chưa tồn tại
    if (d == 0) {
      alert("Tên người dùng không tồn tại");
      document.getElementById("login-username").focus();
    }
  }
}

// Show tên người dùng
if (dem1 == 1) {
  var admin_link = '<a href="admin.html" class="visit-admin">' + userArray[i].username + "</a>";
  document.getElementById("showUser").innerHTML = admin_link;
} else if (dem1 == 2) {
  var user_text = '<p class="user-text">' + userArray[i].username + '</p>';
  document.getElementById("showUser").innerHTML = user_text;
}

function ShowlogoutIcon() {
  if (trangThai.username != "") {
    var logout_icon = '<i class="header-icon-link fa-solid fa-right-from-bracket" id="logout-icon" onclick="logout();showUserInHeader();"></i>';
    document.getElementById("login-logout-icon").innerHTML = logout_icon;
    document.getElementById("login-icon").style.display = "none";


  } else if (trangThai.username == "") {
    document.getElementById("logout-icon").style.display = "none";
    document.getElementById("login-icon").style.display = "block";
  }
}

function logout() {
  var trangThai = JSON.parse(localStorage.getItem("trangThai"));
  trangThai.type = "";
  trangThai.username = "";
  localStorage.setItem("trangThai", JSON.stringify(trangThai));
  document.getElementById("logout-icon").style.display = "none";
  var login_icon = '<i class="header-icon-link fa-solid fa-user" id="login-icon" onclick="showFormLogin()"></i>';
  document.getElementById("login-logout-icon").innerHTML = login_icon;
  window.location.href = "index.html";
}

// Check form đăng ký
function checkFormSignUp() {
  if (document.getElementById("username").value == "") {
    alert("Vui lòng nhập tên đăng nhập");
    document.getElementById("username").focus();
    return false;
  }
  if (document.getElementById("password").value == "") {
    alert("Vui lòng nhập password");
    document.getElementById("password").focus();
    return false;
  }
  if (document.getElementById("comfirm-password").value == "") {
    alert("Vui lòng nhập lại password");
    document.getElementById("comfirm-password").focus();
    return false;
  }
  return true;
}

// Check form đăng nhập
function checkFormLogin() {
  if (document.getElementById("login-username").value == "") {
    alert("Vui lòng nhập tên đăng nhập");
    document.getElementById("login-username").focus();
    return false;
  }
  if (document.getElementById("login-password").value == "") {
    alert("Vui lòng nhập password");
    document.getElementById("login-password").focus();
    return false;
  }
  return true;
}

// Show form đăng nhập
function showFormLogin(e) {
  event.preventDefault(); // Dùng để xóa hành vi mặc định (load lại trang display thành none như cũ)
  document.getElementById("signup").style.display = "none";
  document.getElementById("login").style.display = "flex";
}
// Show form đăng ký
function showFormSignUp(e) {
  event.preventDefault(); // Dùng để xóa hành vi mặc định (load lại trang display thành none như cũ)
  document.getElementById("login").style.display = "none";
  document.getElementById("signup").style.display = "flex";
}

// Close form đăng nhập
function closeFormLogin(e) {
  event.preventDefault();
  document.getElementById("login").style.display = "none";
}
// Close form đăng ký
function closeFormSignup(e) {
  event.preventDefault();
  document.getElementById("signup").style.display = "none";
}

// Show password ở phần Login
function showPassWordLogin() {
  var x = document.getElementById("login-password");
  var show = document.getElementById("btn-show-password-login");
  var hide = document.getElementById("btn-hide-password-login");
  if (x.type === "password") {
    x.type = "text";
    hide.style.display = "none";
    show.style.display = "block";
  } else {
    x.type = "password";
    show.style.display = "none";
    hide.style.display = "block";
  }
}

// Show password ở phần đăng ký
function showPassWordSignUp() {
  alert("show password");
  var x = document.getElementById("password");
  var show = document.getElementById("btn-show-password-signup");
  var hide = document.getElementById("btn-hide-password-signup");
  if (x.type === "password") {
    x.type = "text";
    hide.style.display = "none";
    show.style.display = "block";
  } else {
    x.type = "password";
    show.style.display = "none";
    hide.style.display = "block";
  }
}

// Show password chỗ nhập lại mật khẩu
function showCPSignUp() {
  var x = document.getElementById("comfirm-password");
  var show = document.getElementById("btn-show-cp-login");
  var hide = document.getElementById("btn-hide-cp-login");
  if (x.type === "password") {
    x.type = "text";
    hide.style.display = "none";
    show.style.display = "block";
  } else {
    x.type = "password";
    show.style.display = "none";
    hide.style.display = "block";
  }
}

function showUserInHeader() {
  trangThai = JSON.parse(localStorage.getItem("trangThai"));
  if (trangThai.type == "admin") {
    var admin_link = '<a href="admin.html" class="visit-admin">' + trangThai.username + "</a>";
    document.getElementById("showUser").innerHTML = admin_link;
  } else if (trangThai.type == "kh") {
    var user_text = '<p class="user-text">' + trangThai.username + '</p>';
    document.getElementById("showUser").innerHTML = user_text;
  } else if (trangThai.type == "") {
    document.getElementById("showUser").innerHTML = "";
  }
}



// Xu ly js ben admin
function showUserList() {
  if (localStorage.getItem("user") === null) {
    return false;
  }
  userArray = JSON.parse(localStorage.getItem("user"));
  var tr =
    '<tr><th class="tb-user th-user">STT</th><th class="tb-user th-user">Tên đăng nhập</th><th class="tb-user th-user">Mật Khẩu</th><th class="tb-user th-user">Loại tài khoản</th><th class="tb-user th-user">Xóa tài khoản</th></tr>';
  for (var i = 0; i < userArray.length; i++) {
    tr +=
      '<tr><td class="tb-user">' +
      (i + 1) +
      '</td><td class="tb-user">' +
      userArray[i].username +
      '</td><td class="tb-user">' +
      userArray[i].password +
      '</td><td class="tb-user">' +
      userArray[i].type +
      '</td><td class="tb-user"><button class="delete-user button" onClick="deleteuser(\'' +
      userArray[i].username +
      "')\">Xóa</button></td></tr>";
  }
  document.getElementById("user-list").innerHTML = tr;
}

var user1;

function createnewuser() {
  var d = 1;
  userArray = JSON.parse(localStorage.getItem("user"));
  user1 = {
    username: document.getElementById("user").value,
    password: document.getElementById("pass").value,
    type: "admin",
  };
  if (document.getElementById("user").value == "") {
    alert("Tên đăng nhập không được rỗng");
    document.getElementById("user").focus();
    return false;
  }
  for (var i = 0; i < userArray.length; i++) {
    if (user1.username == userArray[i].username) {
      alert("Tên người dùng đã tồn tại");
      document.getElementById("user").focus();
      d = 0;
      break;
    }
  }
  if (d == 1) {
    userArray.push(user1);
  }
  localStorage.setItem("user", JSON.stringify(userArray));
  showUserList();
}

function deleteuser(usernamedelete) {
  var userArray = JSON.parse(localStorage.getItem("user"));
  for (var i = 0; i < userArray.length; i++) {
    if (userArray[i].username == usernamedelete) {
      if (confirm("Bạn có muốn xóa tài khoản này?")) {
        userArray.splice(i, 1);
      }
    }
  }
  localStorage.setItem("user", JSON.stringify(userArray));
  showUserList();
}