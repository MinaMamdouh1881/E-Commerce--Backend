const userModule = require('../modules/users');
const savecart = async (req, res) => {
  const { email, cartItems } = req.body;

  if (!email || !cartItems)
    return res.json({ success: false, mgs: 'Provide Your Info' });

  try {
    const user = await userModule.findOne({ email });
    await userModule.findByIdAndUpdate(user._id, { cartItems });
    return res.json({ success: true, mgs: 'Your Cart Saved' });
  } catch (error) {
    console.log('Error in savecart');
  }
};

module.exports = { savecart };
