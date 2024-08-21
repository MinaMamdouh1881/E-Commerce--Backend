const userModule = require('../modules/users');
const loginHandler = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({ success: false, msg: 'Please Provide Your Info' });
  }

  try {
    const check = await userModule.findOne({ email });
    if (!check) {
      return res.json({ success: false, msg: 'Wrong Email' });
    }

    if (check.password === password) {
      return res.json({
        success: true,
        email: check.email,
        cartItems: check.cartItems,
      });
    }
    return res.json({ success: false, msg: 'Wrong Password' });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { loginHandler };
