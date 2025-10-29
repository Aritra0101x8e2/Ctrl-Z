// import React from "react";
import Navbar from "./components/Navbar.jsx"
import LandingPage from "./Pages/LandingPage.jsx"
import Gallary from "./components/Gallary.jsx"
// import Page2 from "./Pages/Page2.jsx"
// import SecNav from "./components/SecNav.jsx"
import Page4 from "./Pages/Page4.jsx"
// import Page5 from "./Pages/Page5.jsx"
import Page6 from "./Pages/Page6.jsx"
import Page7 from "./Pages/Page7.jsx"
// import Page3 from "./Pages/Page3.jsx"
import UpcomingEvents from "./components/UpcomingEvents.jsx"
import FeaturedProjects from "./components/FeaturedProjects.jsx"
import Footer from "./Pages/Footer.jsx"



function App() {






  return (
    <>
      <div className=" overflow-hidden">
        {/* <div className="bg-[#052e16]   "> */}
        <div
  className="bg-green-950" // This class will be overridden by the style prop

>
 

          <Navbar />
          <LandingPage />
          {/* <Page2 /> */}
          {/* <SecNav /> */}

          {/* <Page3 /> */}


          <Page4 />

          {/* <Page5 /> */}
          <Page6 />
          <Page7 />
          <UpcomingEvents />
          <FeaturedProjects />
          <Gallary/>
          <Footer />






        </div>
      </div>

    </>
  );
}

export default App
