import { GridColDef } from "@mui/x-data-grid";

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

const getResultTextColor = (result: string) => {
  switch (result) {
    case "normal":
      return "rgb(17, 141, 87)"; // Green
    case "overweight":
      return "rgb(183, 110, 0)"; // Orange
    case "underweight":
      return "rgb(13, 71, 161)"; // Blue
    case "obese":
      return "rgb(183, 29, 24)"; // Red
    default:
      return "";
  }
};

const getResultBackgroundColor = (result: string) => {
  switch (result) {
    case "normal":
      return "rgba(34, 197, 94, 0.16)"; // Green
    case "overweight":
      return "rgba(255, 171, 0, 0.16)"; // Orange
    case "underweight":
      return "rgba(13, 71, 161, 0.16)"; // Blue
    case "obese":
      return "rgba(255, 86, 48, 0.16)"; // Red
    default:
      return "";
  }
};

export const columns: GridColDef[] = [
  {
    field: "id",
    align: "center",
    headerAlign: "center",
    headerName: "ID",
    width: 50,
  },
  {
    field: "name",
    align: "center",
    headerAlign: "center",
    headerName: "Name",
    width: 150,
  },
  {
    field: "mobile",
    align: "center",
    headerAlign: "center",
    headerName: "Mobile",
    width: 100,
  },
  {
    field: "age",
    align: "center",
    headerAlign: "center",
    headerName: "Age",
    width: 50,
  },
  {
    field: "height",
    align: "center",
    headerAlign: "center",
    headerName: "Height",
    width: 90,
  },
  {
    field: "weight",
    align: "center",
    headerAlign: "center",
    headerName: "Weight",
    width: 90,
  },
  {
    field: "bmi",
    align: "center",
    headerAlign: "center",
    headerName: "BMI",
    width: 80,
  },
  {
    field: "result",
    align: "center",
    renderCell: (params) => (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: getResultTextColor(params.value as string),
          backgroundColor: getResultBackgroundColor(params.value as string),
          borderRadius: 6,
          padding: "8px",
          fontFamily:"Poppins",
          textTransform:"capitalize", 
          fontSize: "0.75rem",
          fontWeight: 700,  
        }}
      >
        {params.value}
      </div>
    ),
    headerAlign: "center",
    headerName: "Result",
    width: 150,
  },
];
