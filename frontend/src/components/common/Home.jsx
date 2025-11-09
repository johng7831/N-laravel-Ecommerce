import React from 'react'
import './Shop.css'
import Layout from './Layout'
import Hero from './Hero'
import LatestProduct from './LatestProduct'

const Home = () => {
  return (
    <Layout>
      <div className="home-page">
        <Hero/> 
        <LatestProduct/>
      </div>
    </Layout>
  )
}

export default Home
