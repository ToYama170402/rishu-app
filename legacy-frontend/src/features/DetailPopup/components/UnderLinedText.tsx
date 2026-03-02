import Box from "@mui/material/Box";

const UnderLinedText = ({
  children,
  color,
}: {
  children: React.ReactNode;
  color: string;
}) => {
  return (
    <Box
      sx={{ display: "inline-block", position: "relative" }}
      width={"fit-content"}
    >
      <Box position={"relative"} zIndex={1}>
        {children}
      </Box>
      <Box
        width={"100%"}
        height={"50%"}
        position={"absolute"}
        top={"50%"}
        left={0}
        zIndex={0}
        sx={{
          backgroundImage: `repeating-linear-gradient(135deg, #00000000, ${color} 0px 5px, #00000000 5px 10px)`,
        }}
      ></Box>
    </Box>
  );
};
export default UnderLinedText;
