import { FormLabel, Stack, TextField } from "@mui/material";
import type { SxProps, Theme } from "@mui/material";

import { BREAKPOINTS } from "@/app/libs/theme";

export function CustomStackGrid({
  gridColumn = 1,
  children,
  sx,
  ...attr
}: {
  gridColumn: number;
  children?: React.ReactNode;
  sx?: SxProps<Theme>;
}) {
  return (
    <Stack
      display="grid"
      rowGap={0.5}
      columnGap={1}
      gridColumn={gridColumn}
      gridTemplateColumns={Array.from({ length: gridColumn })
        .map(() => "1fr")
        .join(" ")}
      gridAutoRows="2.5rem"
      sx={{
        [`@media (max-width:${BREAKPOINTS.tablet}px)`]: {
          gridColumn: 1,
          gridTemplateColumns: "auto",
        },
        "& label": {
          display: "inline-flex",
          alignItems: "center",
          p: 1,
          bgcolor: "action.hover",
          fontWeight: 600,
        },
        "& .MuiInputBase-root": {
          height: "100%",
          px: 1,
        },
        "input[type=checkbox]": {
          cursor: "default",
        },
        ".MuiFormControlLabel-root": {
          cursor: "default",
        },
      }}
    >
      {children}
    </Stack>
  );
}

export function CustomStackGridColumn({
  start,
  end,
  label,
  value,
  name,
  children,
  sx,
}: {
  start?: number;
  end?: number;
  label?: string | number;
  value?: string;
  name?: string;
  children?: React.ReactNode;
  sx?: SxProps<Theme>;
}) {
  return (
    <Stack
      display="grid"
      rowGap={0.5}
      gridColumn={2}
      gridTemplateColumns="1fr 2fr"
      gridAutoRows="2.5rem"
      sx={{
        gridColumnStart: start || 1,
        gridColumnEnd: end,
        [`@media (max-width:${BREAKPOINTS.tablet}px)`]: {
          gridColumnStart: 1,
          gridColumnEnd: 2,
        },
      }}
    >
      {label && (
        <FormLabel
          htmlFor={name}
          sx={{
            gridColumnStart: 1,
            borderTopWidth: 1,
            borderTopStyle: "solid",
            borderTopColor: "action.hover",
            borderBottomWidth: 1,
            borderBottomStyle: "solid",
            borderBottomColor: "action.hover",
          }}
        >
          {label}
        </FormLabel>
      )}
      {children ? (
        children
      ) : (
        <TextField
          id={name}
          autoComplete="off"
          fullWidth
          name={name}
          hiddenLabel
          value={value}
          variant="standard"
          slotProps={{
            input: {
              readOnly: true,
              disableUnderline: true,
            },
          }}
          sx={{
            gridColumnStart: 2,
          }}
        />
      )}
    </Stack>
  );
}
