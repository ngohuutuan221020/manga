const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const registerService = async (email, password, username, image) => {
  try {
    const emailUser = await User.findOne({ email });
    if (emailUser) {
      return {
        EC: 1,
        EM: "Email đã tồn tại",
      };
    }
    let hashPassword = await bcrypt.hash(password, saltRounds);
    if (!hashPassword) {
      return {
        EC: 1,
        EM: "Lỗi mã hóa mật khẩu",
      };
    }
    const user = await User.create({
      email: email,
      password: hashPassword,
      username: username,
      image:
        "https://moderncat.com/wp-content/uploads/2015/12/Ragdoll-640x436.jpg",
      role: "USER",
    });
    if (!user) {
      return {
        EC: 1,
        EM: "Tạo người dùng không thành công",
      };
    }
    return {
      EC: 0,
      EM: "Tạo người dùng thành công",
      DATA: user,
    };
  } catch (error) {
    console.error(error);
    return {
      EC: 1,
      EM: "Server error",
    };
  }
};
const loginService = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return {
        EC: 1,
        EM: "Không tìm thấy người dùng",
      };
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return {
        EC: 1,
        EM: "Sai mật khẩu",
      };
    }
    const resData = {
      _id: user._id,
      email: user.email,
      username: user.username,
      image: user.image,
      role: user.role,
    };
    const token = jwt.sign(resData, process.env.SECRET_KEY);
    return {
      EC: 0,
      EM: "Đăng nhập thành công",
      DATA: resData,
      ACCESSTOKEN: token,
    };
  } catch (error) {
    console.error(error);
    return {
      EC: 1,
      EM: "Server error",
    };
  }
};
const getAllUserService = async () => {
  try {
    const user = await User.find();
    if (!user) {
      return {
        EC: 1,
        EM: "Không tìm thấy người dùng",
      };
    }
    return {
      EC: 0,
      EM: "Lấy danh sách người dùng thành công",
      DATA: user,
    };
  } catch (error) {
    console.error(error);
    return {
      EC: 1,
      EM: "Server error",
    };
  }
};

module.exports = {
  loginService,
  registerService,
  getAllUserService,
};
