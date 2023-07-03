import { Paper, PaperProps } from "@mui/material";

type StyledPaperProps = PaperProps;

export const StyledPaper: React.FC<StyledPaperProps> = (props) => {
  return (
    <Paper
      sx={{
        "&:hover": {
          "& svg": {
            transform: "scale(1.2)",
            transition: "transform 0.3s ease",
            transformOrigin: "center center",
          },
        },
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100px",
        width: "100px",
        color: "#000000",
      }}
      elevation={3}
      {...props}
    />
  );
};