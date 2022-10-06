import { Box } from "@mui/material";
import { Container } from "@mui/system";
import Sidebar from "./../sidebar/Sidebar";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Sidebar />
      <Box>
        <Container>{children}</Container>
      </Box>
    </>
  );
}
