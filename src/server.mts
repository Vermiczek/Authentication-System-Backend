const { MongoClient } = require("mongodb");
const fastify = require("fastify");
const mongoose = require("mongoose");
const uri =
  "mongodb+srv://babi458:Lol235!@cluster0.uxls6.mongodb.net/MagicEvents?retryWrites=true&w=majority";
mongoose.connect(uri);
const db = mongoose.connection;
console.log("Welcome!");
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to DB"));
const client = new MongoClient(uri);
const PORT = 3001;

const server = fastify();
server.register(require("fastify-cors"), {
  origin: "http://localhost:3000",
  methods: "GET,PUT,POST,DELETE",
  credentials: true,
});

server.register(require("fastify-jwt"), {
  secret: "supersecret",
  cookie: {
    cookieName: "token",
  },
});


server.register(require("fastify-cookie"));

server.register(require("./routes/users.mts"));

// server.post('/ping', async (request, reply) => {
//  const user = User({name: "xdd", password:"lol"});
//  user.save();
//  reply.send("xd");
//  return "xd";
// })

// server.post('/check', async (request, reply) => {
//   console.log(request.body)
//   const data = await request.body;
//   const users = await User.find();
//   reply.header("Access-Control-Allow-Origin", "*");
//   reply.header("Access-Control-Allow-Methods", "POST");
//   const user = User({name: data.username, password: data.password});
//   user.save();
//   reply.send(user)
//  })

db.on("error", (error) => console.error(error));

const start = async () => {
  try {
    await server.listen(PORT);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
start();

module.exports = server;
