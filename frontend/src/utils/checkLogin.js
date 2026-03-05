import { useEffect, useState } from "react";

function checkLogin() {


  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = window.localStorage.getItem("isLoggedIn")
    setLoggedIn(loggedIn);
  }, [])

  return isLoggedIn;
}

export default checkLogin