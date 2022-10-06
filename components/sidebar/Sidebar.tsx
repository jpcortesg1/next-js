import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useState } from "react";
import { AiOutlineRight, AiOutlineClose } from "react-icons/ai";
import { FiUsers } from "react-icons/fi";
import { IoIosAdd } from "react-icons/io";
import styles from "./Sidebar.module.css";
import Link from "next/link";

type Anchor = "top" | "left" | "bottom" | "right";

export default function TemporaryDrawer() {
  const [state, setState] = useState({
    left: false,
  });

  const items = [
    {
      text: "All users",
      icon: <FiUsers />,
      link: "/",
    },
    {
      text: "Create User",
      icon: <IoIosAdd />,
      link: "/form/Form",
    },
  ];

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div className={styles.containerIconClose}>
        <AiOutlineClose
          className={styles.iconClose}
          onClick={toggleDrawer("left", false)}
        />
      </div>
      <h1 className={styles.title}>Users</h1>
      <List className={styles.list}>
        {items.map((item, index) => (
          <ListItem key={index} disablePadding>
            <Link href={item.link}>
              <ListItemButton>
                <ListItemIcon className={styles.iconItem}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer("left", true)}>
        <span className={styles.icon}>
          <AiOutlineRight />
        </span>
      </Button>
      <Drawer
        anchor={"left"}
        open={state["left"]}
        onClose={toggleDrawer("left", false)}
      >
        {list("left")}
      </Drawer>
    </div>
  );
}
