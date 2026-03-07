import { useEffect, useState } from "react";

function checkLogin() {


  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const storedUser = window.localStorage.getItem("user");
    const user = JSON.parse(storedUser);
    const login = user.loggedIn;
    if (!user) {
      setLoggedIn(false);
    }
    setLoggedIn(login);
  }, [])

  return isLoggedIn;
}

export default checkLogin