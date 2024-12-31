const express = require("express");
const server = express();
const PORT = process.env.PORT || 3000;
const connection = require("./config/db.js");
const jwt = require("jsonwebtoken");
const productRouter = require("./routes/product.route.js");
const categoryRouter = require("./routes/category.route.js");
const brandRouter = require("./routes/brand.route.js");
const authRouter = require("./routes/auth.router.js");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
const userRouter = require("./routes/user.router.js");
const cartRouter = require("./routes/cart.router.js");
const orderRouter = require("./routes/order.router.js");
const userModel = require("./model/user.model.js");
const LocalStrategy = require("passport-local").Strategy;
const crypto = require("crypto");
const { isAuth, sanitizeUser } = require("./services/common.js");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const SECRET_KEY = "SECRET_KEY";

// JWT options
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "SECRET_KEY"; // TODO: SHOULD NOT BE IN CODE

// middleware

server.use(
  session({
    secret: "keyboard cat",
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
  })
);
server.use(passport.authenticate("session"));

server.use(
  cors({
    exposedHeaders: ["x-total-count"],
  })
);
server.use(express.json());
server.use("/products", isAuth(), productRouter);
server.use("/category", isAuth(),categoryRouter);
server.use("/brands", isAuth(), brandRouter);
server.use("/auth", authRouter);
server.use("/users", isAuth(),userRouter);
server.use("/cart", isAuth(), cartRouter);
server.use("/orders", isAuth(), orderRouter);

// Passport Strategy

passport.use(
  "local",
  new LocalStrategy(
    
    {usernameField: "email"},

    async function (email, password, done) {
    // By default uses username
    try {
      const user = await userModel.findOne({ email: email }).exec();
      if (!user) {
        done(null, false, { msg: `Invalid Credentials` }); // for safety
      }
      crypto.pbkdf2(
        password,
        user.salt,
        310000,
        32,
        "sha256",
        async function (err, hashedPassword) {
          if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
            //    done({id: user.id, email: user.email, name: user.name, role: user.role});
            return done(null, false, { msg: `Invalid Credentials` });
          }
          const token = jwt.sign(sanitizeUser(user), SECRET_KEY);
          done(null, token);
        }
      );
    } catch (error) {
      done(error);
    }
  })
);

passport.use(
  "jwt",
  new JwtStrategy(opts, async function (jwt_payload, done) {
    try {
      const user = await userModel.findOne({ id: jwt_payload.sub });
      if (user) {
        return done(null, sanitizeUser(user));
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    }
  })
);

// This creates session variable req.user on being called from callbacks

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, { id: user.id, role: user.role });
  });
});

// This changes session variable req.user when called from authorized request

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

server.listen(PORT, async () => {
  try {
    await connection;
    console.log(`Server is running at PORT ${PORT}`);
  } catch (error) {
    console.log(`Error occurred while running server`);
  }
});
