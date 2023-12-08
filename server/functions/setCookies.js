import cookie from "cookie";

const setCookie = (res, name, value, maxAge, options) => {
  res.setHeader(
    "Set-Cookie",
    cookie.serialize(name, value, {
      httpOnly: options?.httpOnly !== false,
      secure: process.env.NODE_ENV !== "development",
      maxAge: maxAge || 60 * 60 * 24 * 7,
      sameSite: options?.sameSite || "none",
      path: "/",
      domain:
        process.env.NODE_ENV === "development"
          ? "localhost"
          : "todo-frontend-webapp.vercel.app",
    })
  );
};

export default setCookie;
