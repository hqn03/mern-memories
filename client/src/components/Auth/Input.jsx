import { FormControl, Grid2, IconButton, InputAdornment, OutlinedInput, TextField, InputLabel } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function Input({ half, name, handleChange, label, autoFocus, type, handleShowPassword }) {
  return (
    <Grid2 size={{ xs: 12, sm: half ? 6 : 12 }}>
      <FormControl fullWidth>
        <InputLabel>{label}</InputLabel>
        <OutlinedInput
          name={name}
          onChange={handleChange}
          required
          label={label}
          autoFocus={autoFocus}
          type={type}
          endAdornment={
            name === "password" ? (
              <InputAdornment position="end">
                <IconButton onClick={handleShowPassword}>{type === "password" ? <Visibility /> : <VisibilityOff />}</IconButton>
              </InputAdornment>
            ) : (
              <></>
            )
          }
        />
      </FormControl>
    </Grid2>
  );
}

export default Input;
