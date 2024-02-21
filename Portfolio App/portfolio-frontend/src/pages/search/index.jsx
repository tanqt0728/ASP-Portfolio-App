import React from 'react';
import Head from 'next/head';
import Layout from '../../components/Layout';
import PageHeading from "../../components/PageHeading";
import Div from "../../components/Div";
import UserDetails from "../../components/User"
import Spacing from '../../components/Spacing';
import SearchInput from '../../components/SearchInput';


export default function Search() {
    const userData = {
    username: "somePerson",
    userDescription: "Some personal statement",
    userBanner: "/images/blog_details_hero_bg.jpeg",
    userProfilePicture: "/images/portfolio_6.jpeg"
  }
  const userExperience = {
    title: "Job Position",
    company: "Company Name",
    startDate: "About a year ago",
    endDate: "Still ongoing",
    description: "I do things"
  }
  const userEductation = {
    institution: "Some university",
    degree: "Bachelors of Science (BSc.)",
    fieldOfStudy: "Random Field",
    startDate: "About 3 years ago",
    endDate: "Last year",
  }
  const userReference = {
    name: "Mr. Person",
    contactInfo: "Should probably be private",
    relationship: "Not my dad",
  }
  return (
    <>
      <Head>
        <title>Search - Portfolify </title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <PageHeading 
          bgSrc="/images/search_banner.png"
          />
        <Spacing lg="30" md="20"/>
        <Div className="container">
          <SearchInput />
        </Div>
      </Layout>
    </>
  )
}