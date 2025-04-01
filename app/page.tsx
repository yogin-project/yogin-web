'use client';

import { Divider, Stack } from '@mui/material';

import { BREAKPOINTS } from './libs/theme';
import CTA from './_components/CTA';
import Feature1 from './_components/Feature1';
import Feature2 from './_components/Feature2';
import Footer from './_components/Footer';
import Hero from './_components/Hero';
import React from 'react';
import Subscription from './_components/Subscription';
import Testimonial from './_components/Testimonial';
import Feature3 from './_components/Feature3';

function Home() {
  return (
    <Stack width="100%" display="flex" flexDirection="column">
      <Hero />
      <Testimonial />

      <Divider
        sx={{ mx: 'auto', width: '100%', maxWidth: BREAKPOINTS.tablet }}
      />

      <Feature1 />
      <Feature2 />
      <Feature3 />
      <CTA />
      <Subscription />
      <Footer />
    </Stack>
  );
}

export default Home;
