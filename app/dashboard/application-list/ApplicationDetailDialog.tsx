import {
  APPLICATION_STATES_OBJ,
  APPLICATION_TYPES_OBJ,
  FUND_REQUIREMENTS_OBJ,
} from "@/app/libs/contstant";
import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Stack,
  Typography,
} from "@mui/material";

import FUNDApplication from "./FUNDApplication";
import RNDApplication from "./RNDApplication";

interface ApplicationDetailDialogProps {
  onClose: () => void;
  open: boolean;
  item: any;
}

export default function ApplicationDetailDialog({
  onClose,
  open,
  item,
}: ApplicationDetailDialogProps) {
  if (!item) return null;

  const { type, state } = item || {};
  return (
    <Dialog
      open={open}
      onClose={onClose}
      scroll="paper"
      fullWidth
      maxWidth="md"
    >
      <Stack component={DialogTitle} flexDirection="row">
        <Stack flexDirection="row" width="100%" gap={1}>
          <Chip
            label={
              APPLICATION_TYPES_OBJ[type as keyof typeof APPLICATION_TYPES_OBJ]
            }
            color={type === "RND" ? "primary" : "secondary"}
            size="small"
          />

          <Typography variant="h6">{item.corpName}</Typography>
        </Stack>
        <Typography whiteSpace="pre">
          {APPLICATION_STATES_OBJ[state as keyof typeof APPLICATION_STATES_OBJ]}
        </Typography>
      </Stack>

      <DialogContent dividers>
        {type == "RND" ? (
          <RNDApplication item={item} />
        ) : type == "FUND" ? (
          <FUNDApplication item={item} />
        ) : (
          <p></p>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>닫기</Button>
      </DialogActions>
    </Dialog>
  );
}
