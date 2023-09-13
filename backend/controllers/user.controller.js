const User = require("../model/user.model");
const Monhoc = require("../model/subject.model");
const Question = require("../model/question.model");
const sha256 = require("sha256");
const { json } = require("body-parser");
const { setImage } = require("../helpers/helpfunction");

const adminController = {
  //register
  Register: async (req, res) => {
    try {
      //Create new User
      // console.log(req.body);
      const hashed = await sha256(req.body.Password);
      const newUser = new User({
        Username: req.body.Username,
        Email: req.body.Email,
        Name: req.body.Name,
        Password: hashed,
      });
      //Save to DB
      console.log(newUser);
      const user = await newUser.save();
      console.log(user)
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //Login
  Login: async (req, res) => {
    try {
      const user = await User.findOne({ Username: req.body.Username });
      if (!user) {
        res.status(404).json("Tài khoản không đúng!");
        return;
      }
      if(user.Locked == true)
      {
        res.status(404).json("Tài khoản bi khoa'!");
        return;
      }
      const hashed = await sha256(req.body.Password);
      const isPassword = user.Password === hashed ? true : false;
      if (!isPassword) {
        res.status(404).json("Mật khẩu không chính xác.");
        return;
      }
      if (user && isPassword) {
        res.status(200).json(user);
        return;
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
  laythongtincanhan: async (req, res) => {
    try {
      const user = await User.findById(req.params.id)
      // console.log(post)
      if (!user) {
        return res.status(404).json("Không tìm thấy nguoi dung");
      }
      // console.log(user)
      return res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  khoataikhoan: async (req, res) => {
    const user = await User.findByIdAndUpdate(req.body.id, {
        Locked: true
    })
    console.log(user.Locked)
    if (!user) {
        return res.status(403).json("Rỗng")
    }
    return res.status(200).json(user)
},

mokhoataikhoan: async (req, res) => {
    const user = await User.findByIdAndUpdate(req.body.id, {
      Locked: false
    })
    if (!user) {
        return res.status(403).json("Rỗng")
    }
    return res.status(200).json(user)

  },
  // 
  themmonhoc: async (req, res) => {
    try {
      // console.log(data)
      const newMonhoc = new Monhoc({
        Name: req.body.subject,
      });

      const monhoc = await newMonhoc.save();
      res.status(200).json(monhoc);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  themmonhocyeuthich: async (req, res) => {
    try {
      await User.findOneAndUpdate(
        { _id: req.body.id },
        {
          $push: {
            Favorite: req.body.subject,
          },
        }
      );
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  themcauhoi: async (req, res) => {
    // console.log(req.body)
    try {
      const newQuestion = new Question({
        isYesnoquestion: false,
        Question: req.body.question,
        Answers: req.body.answer,
        Subject: req.body.subject,
      });

      const question = await newQuestion.save();
      // console.log(question)
      await Monhoc.findByIdAndUpdate(
        { _id: req.body.subject },
        {
          $push: {
            Questions: question._id,
          },
        }
      );
      res.status(200).json("Them thanh cong");
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // find all tags
  laymonhoc: async (req, res) => {
    try {
      const monhoc = await Monhoc.find();
      res.status(200).json(monhoc);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  Findalluser: async (req, res) => {
    try {
      const user = await User.find();
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
}
module.exports = adminController;
