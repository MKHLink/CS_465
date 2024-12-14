const passport = require('passport');
const mongoose = require('mongoose');
require('../models/user');
const User = mongoose.model('users');

const register = async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res.status(400).json({ message: "All fields required" });
  }

  try{
    const user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.setPassword(req.body.password);

    await user.save();
    const token = user.generateJwt();
    return res.status(200).json({ token });

  }catch(e){
    return res.status(400).json(e);
  }
};

const login = (req, res) => {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({ message: "All fields required" });
    }
  
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return res.status(404).json(err);
      }
      if (user) {
        const token = user.generateJwt();
        return res.status(200).json({ token });
      } else {
        return res.status(401).json(info);
      }
    })(req, res);
  };
  

module.exports = {
  register,
  login
};