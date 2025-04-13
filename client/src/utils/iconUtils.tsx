import {
  FaDocker,
  FaDatabase,
  FaRobot,
  FaServer,
  FaNetworkWired,
  FaComment,
  FaCogs,
  FaSearch,
} from "react-icons/fa";
import { MdStorage, MdMessage } from "react-icons/md";
import { AiFillApi } from "react-icons/ai";
import React from "react";

export const getServiceIcon = (iconName: string): React.ReactNode => {
  const iconSize = 24;

  switch (iconName) {
    case "docker":
      return <FaDocker size={iconSize} color="#1D63ED" />;
    case "database":
      return <FaDatabase size={iconSize} color="#336791" />;
    case "storage":
      return <MdStorage size={iconSize} color="#FF9900" />;
    case "message":
      return <MdMessage size={iconSize} color="#FF6B6B" />;
    case "automation":
      return <FaCogs size={iconSize} color="#00C7B7" />;
    case "infrastructure":
      return <FaServer size={iconSize} color="#6C757D" />;
    case "bot":
      return <FaRobot size={iconSize} color="#6F42C1" />;
    case "support":
      return <FaComment size={iconSize} color="#20C997" />;
    case "api":
      return <AiFillApi size={iconSize} color="#FD7E14" />;
    case "search":
      return <FaSearch size={iconSize} color="#0dcaf0" />;
    default:
      return <FaNetworkWired size={iconSize} color="#6C757D" />;
  }
};
