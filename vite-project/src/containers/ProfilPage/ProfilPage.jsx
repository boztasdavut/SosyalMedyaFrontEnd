import React, { useEffect, useState } from "react";
import "./ProfilPage.css";
import { me } from "../../services/Me";
import SabitSolMenu from "../SabitSolMenu/SabitSolMenu";
import Message from "../../components/Message/Message";
import ProfilPagePersonalInfo from "../../components/ProfilPagePersonalInfo/ProfilPagePersonalInfo";
import ProfilPageAltMenuler from "../../components/ProfilPageAltMenuler/ProfilPageAltMenuler";

function ProfilPage() {
  return (
    <div>
      <SabitSolMenu />
      <Message />
      <ProfilPagePersonalInfo />
      <ProfilPageAltMenuler />
    </div>
  );
}

export default ProfilPage;
