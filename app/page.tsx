"use client";

import CTA from "./_components/CTA";
import Footer from "./_components/Footer";
import Hero from "./_components/Hero";
import LoanFeature from "./_components/LoanFeature";
import React from "react";
import RndFeature from "./_components/RndFeature";
import ServiceList from "./_components/ServiceList";
import { Stack } from "@mui/material";

function Home() {
  return (
    <Stack
      width="100%"
      maxHeight="100vh"
      display="flex"
      flexDirection="column"
      sx={{
        overflowY: "scroll",
        scrollSnapType: "y mandatory",
        WebkitOverflowScrolling: "touch",
        overscrollBehaviorY: "auto",
      }}
    >
      <Hero />
      <LoanFeature />
      <RndFeature />
      <Stack
        id="feature-service"
        width="100%"
        height="fit-content"
        minHeight="100vh"
        sx={{
          scrollSnapAlign: "start",
        }}
      >
        <Stack
          mx="auto"
          width="100%"
          flexGrow="1"
          pt="80px"
          justifyContent="center"
          position="relative"
          bgcolor="action.hover"
        >
          <ServiceList />
          <CTA />
        </Stack>

        <Footer />
      </Stack>
    </Stack>
  );
}

export default Home;
