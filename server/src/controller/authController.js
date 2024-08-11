const {
  registerService,
  loginService,
  getAllUserService,
} = require("../services/authService");

const register = async (req, res) => {
  const { email, password, username, image } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      EC: 1,
      EM: "Thiếu email hoặc mật khẩu",
    });
  }

  try {
    const data = await registerService(email, password, username, image);
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      EC: 1,
      EM: "Thiếu email hoặc mật khẩu",
    });
  }

  try {
    const data = await loginService(email, password);
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};
const getAllUser = async (req, res) => {
  try {
    const data = await getAllUserService();

    return res.status(200).json({
      data,
      user: req.user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};

module.exports = { register, login, getAllUser };
