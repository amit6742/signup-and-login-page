const bcrypt = require("bcrypt");
const User = require("../model/model");
const jwt = require("jsonwebtoken");
const QrCode = require("qrcode");

exports.scanQrcode = (req, res) => {
  const url = req.body.url;
  if (url.length === 0) {
    res.send("empty data");
  }
  QrCode.toDataURL(url, function (err, url) {
    console.log(url);
    res.send(url);
  });
};
exports.createUser = async (req, res) => {
  const { name, email, phone, password, url } = req.body;

  try {
    const hashPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({
      name,
      email,
      phone,
  

      password: hashPassword,
    });
    

    var token = jwt.sign({ email: req.body.email }, process.env.SECRET);
    newUser.token = token;

    const saveUser = await newUser.save();
    res.status(201).json(saveUser);
    console.log(saveUser);
  } catch (error) {
    res.status(409).json(error);
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  await User.findOne({ email: email }).then((saveUser) => {
    if (saveUser) {
      if (saveUser.password === password) {
        res.json("success");

        console.log(saveUser);
      } else {
        res.json("invalid password");
      }
    } else {
      res.json("already exists");
    }
  });
};
//   get all find
exports.getUser = async (req, res) => {
  const query = User.find();
  try {
    if (req.query) {
      const user = await query.sort(req.query).exec();
      console.log(user);
      res.status(200).json(user);
    } else {
      const user = await query.exec();
      console.log(user);
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
//  get user find by id base

//  delete user
exports.deleteUser = async (req, res) => {
  const id = req.params.id;

  console.log(id);
  try {
    const doc = await User.findOneAndDelete({ _id: id });

    res.status(201).json(doc);
  } catch (error) {
    res.status(400).json(error);
  }
};
