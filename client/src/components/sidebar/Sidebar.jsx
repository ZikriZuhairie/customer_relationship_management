import React, { useEffect, useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { Menu } from "primereact/menu";
import  logo  from '../../assets/codebridge.png';

import "./sidebar.css";
import { useLocation } from "react-router-dom";

const SidebarLayout = () => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  useEffect(() => {
    setActive(pathname.substring());
  }, [pathname]);
  const [visible, setVisible] = useState(true);
  let items = [
    {
      label: "Dashboard",
      icon: "pi pi-fw pi-home",
      command: (e) => {
        window.location = "/home";
      },
    },
    {
      label: "Contact",
      icon: "pi pi-fw pi-id-card",
      command: (e) => {
        window.location = "/contact";
      },
    },
    {
      label: "Task",
      icon: "pi pi-fw pi-check-square",
      command: (e) => {
        window.location = "/task";
      },
    },
    {
      label: 'Sales',
      items: [{label: 'Overview', icon: 'pi pi-fw pi-chart-bar',command:()=>{ window.location="/overview"; }},
      {label: 'Daily', icon: 'pi pi-fw pi-calendar',command:()=>{ window.location="/daily"; }},
      {label: 'Monthly', icon: 'pi pi-fw pi-calendar',command:()=>{ window.location="/monthly"; }},]
  },
  ];

  return (
    <div>
      <div>
        <Sidebar
          visible={visible}
          onHide={() => setVisible(false)}
          modal={false}
          dismissable={false}
          showCloseIcon={false}
          closeOnEscape={false}
          style={{ width: "15em" }}
        >
          <div><img src={logo} alt="codebridge logo"/></div>
          <Menu model={items} onClick= {active}/>
        </Sidebar>
        </div>
    </div>
  );
};

export default SidebarLayout;
