import { useCallback, useState, SyntheticEvent, ChangeEvent } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import UIWCodeEditor from "@uiw/react-textarea-code-editor";
import languages from "../types/language";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Request from "../utils/Request";
import QueryKeys from "../types/QueryKeys";

interface Props {
  open: boolean;
  onClose: (language?: string) => void;
}

interface SnippetData {
  language: string;
  code: string;
  description: string;
}

const defaultSnippetDataValues: SnippetData = {
  language: "js",
  code: "",
  description: "",
};

const AddSnippetDialog = ({ open, onClose }: Props) => {
  const queryClient = useQueryClient();
  const [snippetData, setSnippetData] = useState<SnippetData>(
    defaultSnippetDataValues
  );

  const onLanguageChange = useCallback(
    (_: SyntheticEvent, value: string | null) => {
      if (value) {
        setSnippetData((prev) => ({ ...prev, language: value }));
      }
    },
    []
  );

  const onCodeChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      setSnippetData((prev) => ({ ...prev, code: event?.target?.value ?? "" }));
    },
    []
  );

  const onDescriptionChange = useCallback(
    (
      event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | undefined
    ) => {
      setSnippetData((prev) => ({
        ...prev,
        description: event?.target?.value ?? "",
      }));
    },
    []
  );

  const resetSnippetData = useCallback(() => {
    setSnippetData(defaultSnippetDataValues);
  }, []);

  const addSnippetMutation = useMutation<undefined, undefined, SnippetData>({
    mutationFn: (requestData) =>
      Request.post(`${import.meta.env.VITE_BASE_URL}snippets/add`, requestData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.SNIPPETS],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.LANGUAGES],
      });
    },
  });

  const onSubmit = useCallback(() => {
    try {
      addSnippetMutation.mutate(snippetData);
    } catch (err) {
      console.error(err);
    } finally {
      resetSnippetData();
      onClose(snippetData.language);
    }
  }, [addSnippetMutation, onClose, resetSnippetData, snippetData]);

  return (
    <Dialog
      open={open}
      onClose={() => onClose()}
      PaperProps={{
        sx: { scrollbarGutter: "stable" },
      }}
      fullWidth
    >
      <DialogTitle>Add new snippet</DialogTitle>
      <DialogContent>
        <Autocomplete
          value={snippetData.language}
          options={languages}
          onChange={onLanguageChange}
          sx={{ width: 150, marginTop: 1 }}
          renderInput={(params) => <TextField {...params} label="Language" />}
          disablePortal
        />
        <Box sx={{ height: 150, overflowY: "scroll" }}>
          <UIWCodeEditor
            value={snippetData.code}
            onChange={onCodeChange}
            language={snippetData.language}
            padding={15}
            style={{
              minHeight: 150,
              fontSize: 16,
              fontFamily:
                "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
            }}
          />
        </Box>
        <TextField
          value={snippetData.description}
          onChange={onDescriptionChange}
          fullWidth
          label="Description"
          rows={2}
          sx={{ marginTop: 1 }}
          multiline
        />
      </DialogContent>
      <DialogActions>
        <Button color="warning" onClick={() => onClose()}>
          Cancel
        </Button>
        <Button variant="contained" onClick={onSubmit}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddSnippetDialog;
