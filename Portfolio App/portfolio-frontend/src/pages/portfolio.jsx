import React from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import PageHeading from "../components/PageHeading"
import Div from "../components/Div";
import UserDetails from "../components/User"
import Spacing from '../components/Spacing';

const UserPage = () => {
  const userData = {
    username: "somePerson",
    userDescription: "Some personal statement",
    userBanner: "/images/user_banner.png",
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
        <title>Portfolio - Portfolify </title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <PageHeading 
          bgSrc={userData.userBanner} 
          />
        <Spacing lg="30" md="20"/>
        <Div className="container">
          <UserDetails 
            username={userData.username}
            userStatement={userData.userDescription}
            profileImg={userData.userProfilePicture}
            viewing={true}
          />
        </Div>
        <Spacing lg="30" md="20"/>
        <Div className="container cs-portfolio_items">
          <Div className="cs-portfolio_item_container cs-radius_7">
            <h3>Experience</h3>
            <p>Title: {userExperience.title}</p>
            <p>Company: {userExperience.company}</p>
            <p>Time period: {userExperience.startDate} - {userExperience.endDate}</p>
            <p>Description: {userExperience.description}</p>
          </Div>
          <Div className="cs-portfolio_item_container cs-radius_7">
            <h3>Education</h3>
            <p>Institution: {userEductation.institution}</p>
            <p>{userEductation.degree} {userEductation.fieldOfStudy}</p>
            <p>Time period: {userEductation.startDate} - {userEductation.endDate}</p>
          </Div>
          <Div className="cs-portfolio_item_container cs-radius_7">
            <h3>Reference</h3>
            <p>{userReference.name}</p>
            <p>Contact details: {userReference.contactInfo}</p>
            <p>Relationship: {userReference.relationship}</p>
          </Div>
        </Div>
      </Layout>
    </>
  )
}

export default UserPage
