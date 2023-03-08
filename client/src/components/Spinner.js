import React from "react";
// import { MDBSpinner } from 'mdb-react-ui-kit'
import { Helmet, HelmetProvider } from "react-helmet-async";

const Spinner = () => {
  return (
    // <MDBSpinner color='success' style={{ width: '3rem', height: '3rem', marginTop: '100px' }}>
    //     <span className='visually-hidden'>Loading...</span>
    // </MDBSpinner>
    <div
      id="loading-test-5"
      style={{ height: "300px", width: "100%", marginTop: "100px" }}
    >
      <HelmetProvider>
        <Helmet>
          <title>Loading...</title>
        </Helmet>
      </HelmetProvider>
      <div className="loading" data-mdb-parent-selector="#loading-test-5">
        <div className="fas fa-spinner fa-spin fa-2x"></div>
        <span className="loading-text visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
