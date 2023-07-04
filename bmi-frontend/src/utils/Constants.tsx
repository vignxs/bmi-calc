export const TFStyle = {
  transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
  boxShadow:
    "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px",
  mb: 2,
  border: "2px solid #000000",
  padding: "20px",
  borderRadius: "5px",
  marginTop: "30px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  "& .MuiTextField-root": {
    mb: 3,
    // borderRadius:'15px',
    backgroundColor: "#fffffe",
    borderRadius: "2px",
  },
  "& .MuiInputBase-root": {
    background: "white",
    borderRadius: "4px",
  },
  "& .MuiOutlinedInput-root": {
    borderColor: "primary.main",
    "&:hover fieldset": {
      borderColor: "secondary.main",
    },
    "&.Mui-focused fieldset": {
      borderColor: "primary.main",
    },
  },
  '& input[type="number"]::-webkit-inner-spin-button, & input[type="number"]::-webkit-outer-spin-button':
    {
      appearance: "none",
      margin: 0,
    },
};

export interface BMIHistory {
  id: number;
  date: string;
  height: number;
  weight: number;
  bmi: number;
}

