import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
} from "@mui/material";
import { drawerWidth } from "../types/const";
import { useQuery } from "@tanstack/react-query";
import QueryKeys from "../types/QueryKeys";
import Request from "../utils/Request";

interface Props {
  language: string;
  setLanguage: (language: string) => void;
}

const Sidebar = ({ language: activeLanguage, setLanguage }: Props) => {
  const { data } = useQuery({
    queryKey: [QueryKeys.LANGUAGES],
    queryFn: () =>
      Request.get<{ languages: string[] }>(
        `${import.meta.env.VITE_BASE_URL}languages/get`
      ),
  });

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar />
      <Divider />
      <List>
        {data?.languages.map((language) => (
          <ListItem key={language} disablePadding>
            <ListItemButton
              selected={language === activeLanguage}
              onClick={() => setLanguage(language)}
            >
              <ListItemText primary={language} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
