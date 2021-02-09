import React from "react";

const NavbarRender = (props) => {
  return (
    <div className="button-group">
      <button
        type="button"
        className="btn header__signin"
        // eslint-disable-next-line
        onClick={() => props.history.push("/sign-in")}
      >
        Sign in
      </button>
      <button
        type="button"
        className="btn header__signup"
        // eslint-disable-next-line
        onClick={() => props.history.push("/sign-up")}
      >
        Sign up
      </button>
    </div>
  );
};

export default NavbarRender;
