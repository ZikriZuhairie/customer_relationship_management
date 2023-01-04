import { Menubar } from "primereact/menubar";
import { Button } from 'primereact/button';
import "./navbar.css";

const Navbarlayout = () => {
  const fullName = "Zikri Zuhairie";
  // const user = useSelector((state) => state.user);
  // const fullName = `${user.firstName} ${user.lastName}`;
 
  const end = 
  <div className="user_menubar">
    <Button label={fullName} className="p-button-outlined" disabled={true} />
  </div>

  return <Menubar end={end} />;
};

export default Navbarlayout;
