import React, { useState, useEffect } from "react";
import UserPageTemplate from "../templates/UserPageTemplate";
import Sidebar from "../components/Sidebar/Sidebar";
import { toast } from "react-toastify";
import Axios from "axios";

const Summary = ({ setAuth }) => {
  const [name, setName] = useState("");

  async function getName() {
    //   try {
    //     const response = await Axios.post("/user/dashboard", {
    //       token: localStorage.token,
    //     });
    //     console.log("reSPONSOREK summary:");

    //     console.log(response);
    //     console.log(response.data);
    //     setName(response.data.login);
    //   } catch (e) {
    //     console.log("Erorek Guninorek:");
    //     console.log(e);
    //   }
    // }

    try {
      const response = await fetch("/user/dashboard", {
        method: "POST",
        headers: { token: localStorage.token },
      });
      console.log(`response: ${response}`);
      const parseRes = await response.json();
      setName(parseRes.login);
      console.log(parseRes);
    } catch (err) {
      console.error(err.message);
    }
  }
  const logout = async (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setAuth(false);
      toast.success("Logout successfully");
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getName();
  }, []);
  return (
    <>
      <Sidebar setAuth={setAuth} logout={logout} />
      <UserPageTemplate pageContext="summary">
        <h2>Welcome {name}</h2>
      </UserPageTemplate>
    </>
  );
};

export default Summary;
