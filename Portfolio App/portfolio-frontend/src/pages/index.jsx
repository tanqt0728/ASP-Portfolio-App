import * as React from "react";
import Head from "next/head";
import FunFact from "../components/FunFact";
import Hero from "../components/Hero";
import Layout from "../components/Layout";
import Spacing from "../components/Spacing";
import PortfoliosExplore from "../components/PortfoliosExplore";

export default function Home() {
  return (
    <>
      <Head>
        <title>Home - Pixel Projects</title>
        <meta
          name="description"
          content="Create your personalized portfolio with Pixel Projects today."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        {/* Start Hero Section */}
        <Hero
          title="Unleash Your Creativity.<br>Every Pixel Tells Your Story."
          subtitle="Empower your online presence with our innovative portfolio creation platform. Showcase your skills, achievements, and creativity effortlessly."
          bgImageUrl="/images/hero_bg.jpg"
        />
        {/* End Hero Section */}

        {/* Start FunFact Section */}
        <Spacing lg="60" md="60" />
        <div className="container">
          <FunFact
            variant="cs-type1"
            title="Craft Your Digital Identity"
            subtitle="Create your personalized portfolio with Pixel Projects today."
            data={[]}
            btnLink="/portfolio/edit"
            btnText="Start Now"
          />
        </div>

        {/* Start Portfolio Section */}
        <Spacing lg="60" md="60" />
        <PortfoliosExplore
          title="Explore Portfolio's"
          subtitle="Find Talent"
          variant="cs-style1 text-center"
          btnLink="search"
          btnText="Search Here"
        />
      </Layout>
    </>
  );
}
