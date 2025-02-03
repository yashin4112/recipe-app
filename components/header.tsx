// import React from "react";
// import styles from "./header.module.css"; // Import the CSS module

// const Header = ({ headerData }: { headerData: any }) => {
//   const { logo, navigation_menu = [], title = "Default Title" } = headerData || {};

//   return (
//     <header className={styles.header}>
//       <div className={styles["header-container"]}>
//         {logo && (
//           <img
//             src={logo?.url}
//             alt={logo?.title || "Logo"}
//             className={styles.logo}
//             height={50}
//           />
//         )}
//         <h1 className={styles.title}>{title}</h1>
//         <nav>
//           <ul className={styles.nav}>
//             {navigation_menu.map((item: any, index: number) => (
//               <li key={index} className={styles["nav-item"]}>
//                 <a href={item.page_reference?.[0]?.url || "#"} className={styles["nav-link"]}>
//                   {item.label || "Menu Item"}
//                 </a>
//               </li>
//             ))}
//           </ul>
//         </nav>
//       </div>
//     </header>
//   );
// };

// export default Header;

'use client'

import React, { useState } from "react";

const Header = ({ headerData }: { headerData: any }) => {
  const { logo, navigation_menu = [], title = "Default Title" } = headerData || {};
  const [menuVisible, setMenuVisible] = useState(false); // State to toggle the navigation menu

  const toggleMenu = () => {
    setMenuVisible(!menuVisible); // Toggle visibility
  };

  return (
    <header className="header">
      <div className="header-container">
        {logo && (
          <img
            src={logo?.url}
            alt={logo?.title || "Logo"}
            className="logo"
            height={50}
          />
        )}
        <h1 className="title">{title}</h1>
        {/* Dropdown button for mobile */}
        <button className="menu-button" onClick={toggleMenu}>
          &#9776; {/* Hamburger icon */}
        </button>

        {/* Navigation links */}
        <nav className={`nav ${menuVisible ? "show" : ""}`}>
          <ul>
            {navigation_menu.map((item: any, index: number) => (
              <li key={index} className="nav-item">
                <a href={item.page_reference?.[0]?.url || "#"} className="nav-link">
                  {item.label || "Menu Item"}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
