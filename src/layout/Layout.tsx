import React from "react";
import Head from "next/head";
import styled from "styled-components";

// TODO apply theme here
const Container = styled.div`
  display: flex;
  flex-flow: column;
  min-height: 100vh;
  font-family: ${({ theme }) => theme.font}, Helvetica, sans-serif;
  color: ${({ theme }) => theme.textColor};
  background-color: transparent;
`;

const StyledContent = styled.div`
  flex: 1 1 auto;
  position: relative;
  margin: 1em auto;
  width: 100%;
  max-width: 50em;
`;

const StyledFooter = styled.div`
  flex: 0 1 auto;
  margin: 0 auto;
  max-width: 50em;
`;

const MainLayout = ({ children }: baseProps) => {
  // use router and useSelector to add selected world name/version to title
  return (
    <>
      <Head>
        <title>Test MongoDB</title>
      </Head>
      <Container>
        <StyledContent>{children}</StyledContent>
        <StyledFooter>Test Footer</StyledFooter>
      </Container>
    </>
  );
};

export default MainLayout;
