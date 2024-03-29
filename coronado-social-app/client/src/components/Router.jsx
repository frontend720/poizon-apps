import React from "react";
import { NavContainer } from "../../StyleSheet";
import cabin from "../cabin_FILL0_wght400_GRAD0_opsz24.svg";
import search from "../search.svg";
import chat from "../chat.svg";
import account from "../account.svg";
import "./Router.css";

export default function Router() {
  return (
    <div>
      <NavContainer>
        <li>
          <span class="material-symbols-outlined cabin">cottage</span>
        </li>
        <li>
          <span class="material-symbols-outlined search">search</span>
        </li>
        <li>
          <span class="material-symbols-outlined add">add</span>
        </li>
        <li>
          <span class="material-symbols-outlined forum">forum</span>
        </li>
        <li>
          <span class="material-symbols-outlined person">account_circle</span>
        </li>
      </NavContainer>
    </div>
  );
}
