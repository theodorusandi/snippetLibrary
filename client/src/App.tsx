import { Box, CssBaseline } from "@mui/material";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import MainSection from "./components/MainSection";
import { useState } from "react";
import AddSnippetDialog from "./components/AddSnippetDialog";

const App = () => {
  const [language, setLanguage] = useState<string>("");
  const [query, setQuery] = useState<string>("");
  const [addSnippetDialogOpen, setAddSnippetDialogOpen] =
    useState<boolean>(false);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Navbar
        onAddNew={() => setAddSnippetDialogOpen(true)}
        onQueryChange={setQuery}
      />
      <Sidebar setLanguage={setLanguage} language={language} />
      <MainSection language={language} query={query} />
      <AddSnippetDialog
        open={addSnippetDialogOpen}
        onClose={(language) => {
          setAddSnippetDialogOpen(false);
          if (language) {
            setLanguage(language);
          }
        }}
      />
    </Box>
  );
};

export default App;
