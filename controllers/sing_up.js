const userModule = require('../modules/users');

const signUpHandler = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    if (!userName || !email || !password)
      return res.json({
        success: false,
        msg: 'Please Provide Your Information',
      });

    const check = await userModule.findOne({ email: email });

    if (check) {
      return res.json({ success: false, msg: 'Email Already Taken' });
    }
    await userModule.create({ userName, email, password });
    return res.json({ success: true, email, cartItems: [] });
  } catch (error) {
    console.log('Error in signUpHandler');
  }
};

module.exports = { signUpHandler };
