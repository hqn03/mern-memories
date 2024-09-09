import postsRoute from "./posts.js";
import authRoute from "./auth.js";
import usersRoute from "./users.js";
export default function routeControll(app) {
  app.use("/posts", postsRoute);
  app.use("/auth", authRoute);
  app.use("/users", usersRoute);
}
