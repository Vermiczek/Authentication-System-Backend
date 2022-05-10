const { registerUser, loginUser } = require("../controllers/users.mts");

const registerOpts = {
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          username: { type: "string" },
          message: { type: "string" },
          succesful: { type: "boolean" },
        },
      },
    },
  },
  handler: registerUser,
};

const loginOpts = {
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          username: { type: "string" },
          message: { type: "string" },
          succesful: { type: "boolean" },
          token: { type: "string" },
        },
      },
    },
  },
  handler: loginUser,
};

const userRoutes = (server, options, done) => {
  // server.post('/ping', async (request, reply) => {
  //  const user = User({name: "xdd", password:"lol"});
  //  user.save();
  //  reply.send("xd");
  //  return "xd";
  // })

  server.post("/register", registerOpts);

  server.post("/login", loginOpts);

  server.get("/verifycookie", async (request, reply) => {
    try {
      await request.jwtVerify();
      reply.send({ code: "OK", message: "it works!" });
    } catch (error) {
      reply.send(error);
    }
  });

  server.get("/logout", async (request, reply) => {
    try {
      reply.clearCookie('token', {path: '/'})
      reply.send({status: "Logout succesful"});
    } catch (error) {
      reply.send(error);
    }
  });

  server.get("/downloadevents", async (request, reply) => {
    try {
      reply.clearCookie('token', {path: '/'})
      reply.send({status: "Logout succesful"});
    } catch (error) {
      reply.send(error);
    }
  });

  done();
};
module.exports = userRoutes;
