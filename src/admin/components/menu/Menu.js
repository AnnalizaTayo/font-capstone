import { Link } from "react-router-dom";
import { AiFillDashboard } from 'react-icons/ai';
import { BiSolidBusiness, BiSolidTShirt } from 'react-icons/bi';
import { FaUserAlt, FaPowerOff } from 'react-icons/fa';
import { TiGroup } from 'react-icons/ti';
import {RiQuestionnaireFill} from 'react-icons/ri'
import "./menu.scss";
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/reducers/authReducer';
import { resetCompanyData  } from '../../../redux/reducers/compDataReducer';

const menu = [
  {
    id: 1,
    title: "main",
    listItems: [
      {
        id: 1,
        title: "Dashboard",
        url: "/admin-dashboard",
        icon: <AiFillDashboard/>,
      },
      {
        id: 2,
        title: "Company",
        url: "/admin-dashboard/company",
        icon: <BiSolidBusiness/>,
      },
    ],
  },
  {
    id: 2,
    title: "lists",
    listItems: [
      {
        id: 1,
        title: "Collections",
        url: "/admin-dashboard/collections",
        icon: <BiSolidTShirt/>,
      },
      {
        id: 2,
        title: "Employees",
        url: "/admin-dashboard/users",
        icon: <FaUserAlt/>,
      },
      {
        id: 3,
        title: "Subscribers",
        url: "/admin-dashboard/subscribers",
        icon: <TiGroup/>,
      },
      {
        id: 4,
        title: "Faqs",
        url: "/admin-dashboard/faqlist",
        icon: <RiQuestionnaireFill/>,
      }
    ],
  }
];

const Menu = () => {
  const dispatch = useDispatch();

  const handleLogout = async() => {
    try {
      await fetch('/users/logout', { method: 'POST' });
      dispatch(logout());
      dispatch(resetCompanyData());
    } catch (error) {
      console.error('Logout failed', error);
    }
    
  }

  return (
    <div className="menu">
      {menu.map((item) => (
        <div className="item" key={item.id}>
          <span className="title">{item.title}</span>
          {item.listItems.map((listItem) => (
            <Link
              to={listItem.url}
              className="listItem"
              key={listItem.id}
            >
              <div className="menu-icons">{listItem.icon}</div>
              <span className="listItemTitle">{listItem.title}</span>
            </Link>
          ))}
        </div>
      ))}
      <div className="item">
        <span className="title">General</span>
          <button className="listItem" onClick={handleLogout}>
            <div className="menu-icons"><FaPowerOff/></div>
            <span className="listItemTitle">Logout</span>
          </button>
      </div>
    </div>
  );
};

export default Menu;