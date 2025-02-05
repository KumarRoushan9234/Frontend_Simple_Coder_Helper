// import React from "react";
// import Header from "./common/Header";
// import Footer from "./common/Footer";

// const LandingPage = () => {
//   return (
//     <div className="min-h-screen flex flex-col">
//       {/* Header Component */}
//       {/* <Header /> */}

//       {/* Main Content */}
//       <main className="flex-grow flex flex-col items-center justify-center text-center p-6">
//         <h2 className="text-3xl font-bold">Discover Amazing Features</h2>
//         <p className="text-gray-600 mt-4 max-w-lg">
//           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui
//           mauris.
//         </p>
//         <a href="/login">
//           <button className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
//             Get Started
//           </button>
//         </a>
//       </main>
//       {/* Footer Component */}
//       {/* <Footer /> */}
//     </div>
//   );
// };

// export default LandingPage;

import React from "react";

const LandingPage = () => {
  return (
    <div>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage:
            "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
            <p className="mb-5">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <a href="/login">
              <button className="btn btn-primary">Get Started</button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
