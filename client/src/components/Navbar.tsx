import { AppBar, Button, InputBase, Toolbar, Typography } from "@mui/material";
import { drawerWidth } from "../types/const";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { debounce } from "../utils/Common";
import { useCallback } from "react";

interface Props {
  onAddNew: () => void;
  onQueryChange: (query: string) => void;
}

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const Navbar = ({ onAddNew, onQueryChange }: Props) => {
  const debouncedOnQueryChange = useCallback(
    debounce((e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      onQueryChange(e.target.value);
    }),
    []
  );
  return (
    <AppBar
      position="fixed"
      color="default"
      sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          Snippet Library
        </Typography>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            onChange={debouncedOnQueryChange}
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>
        <Button onClick={onAddNew} variant="contained">
          Add New
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
