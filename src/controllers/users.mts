const User = require("../user.mts");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");

{
  const loginUser = async (request, reply) => {
    const user = await User.find({ name: request.body.username });
    if (user == null) {
      return reply.status(400).send("Cannot find user");
    }

    console.log(user[0].password);
    try {
      if (user.status != "Active") {
        return reply.code(401).send({
          message: "Pending Account. Please Verify Your Email!",
        });
      }
      if (await bcrypt.compare(request.body.password, user[0].password)) {
        const token = require("../server.mts").jwt.sign({
          username: request.body.name,
        });
        reply
          .code(200)
          .setCookie("token", token, {
            domain: "localhost",
            path: "/",
          })
          .send({
            message: "Login succesful!",
            successful: true,
            username: request.body.username,
            token: { token },
          });
      } else {
        reply.code(200).send({ message: "Wrong password!", successful: false });
      }
    } catch (e) {
      reply.status(500).send(e);
    }
  };

  const registerUser = async (request, reply) => {
    
const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
let confirmationCode = '';
for (let i = 0; i < 25; i++) {
    confirmationCode += characters[Math.floor(Math.random() * characters.length )];
}
    console.log(request.body);
    const data = await request.body;
    let takenUsername = false;
    let takenEmail = false;
    let invalid = false;
    const users = await User.find({ name: data.username });
    if (users.length > 0) {
      takenUsername = true;
    }
    const mails = await User.find({ email: data.email });
    if (mails.length > 0) {
      takenEmail = true;
    }
    if(data.password === "" || data.username === "" ||data.password === null || data.username === null ||typeof data.password === 'undefined' || typeof data.username === 'undefined')
    {
       invalid = true;
    }


    reply.header("Access-Control-Allow-Origin", "*");
    reply.header("Access-Control-Allow-Methods", "POST");

    if (!takenUsername&&!takenEmail) {
      try {
        const hashedPassword = await bcrypt.hash(request.body.password, 10);
        const user = User({
          name: data.username,
          email: data.email,
          password: hashedPassword,
          confirmationCode: confirmationCode
        });
        user.save();
        reply.code(201).send({
          message: "User created",
          successful: true,
          username: data.username,
        });
      } catch {
        reply.code(500).send();
      }
    }
    if(invalid)
    reply.code(200).send({ message: "Credentials data invalid!", succesful: false });
    if(takenUsername)
    reply.code(200).send({ message: "Username taken!", succesful: false });
    if(takenEmail)
    reply.code(200).send({ message: "Email taken!", succesful: false });
  };

  module.exports = { registerUser, loginUser };
}
