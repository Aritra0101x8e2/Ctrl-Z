import React from "react";

const Page4 = () => {
  return (
    <>
      <div
        className="relative w-full min-h-screen text-white"
        style={{
          background: "linear-gradient(to bottom, #000000, #000000ff)",
        }}
      >
        {/* MOBILE GRID */}
        <div className="grid w-60 h-160 m-auto grid-rows-6 grid-cols-4 sm:hidden">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="col-span-1 h-15 mt-12 row-span-1 border border-cyan-700"
            ></div>
          ))}

          <div className="col-span-4 row-span-4 row-start-2 border border-cyan-700/50">
            <div className="text-cyan-300 text-5xl text-center font-medium pt-20 pl-4 pr-4 border-t border-cyan-400">
              Loved by the best data teams
            </div>
            <div className="flex justify-center text-cyan-400 text-center mt-10 px-3">
              Hex helps companies of all sizes do more with their data.
            </div>
          </div>

          {[...Array(4)].map((_, i) => (
            <div
              key={`bottom-${i}`}
              className="col-span-1 h-15 row-span-1 border border-cyan-700"
            ></div>
          ))}
        </div>

        {/* DESKTOP GRID */}
        <div className="hidden sm:grid h-[600px] w-auto text-white box-border border-[#00ffff30] lg:px-50 md:mx-25 md:mt-35 bg-transparent sm:grid-cols-5 sm:grid-rows-5 gap-0 lg:pt-50 lg:mt-20">
          <div className="sm:grid sm:grid-rows-2 sm:col-span-3 sm:row-span-3 sm:col-start-2 sm:row-start-2 font-bold">
            <div className="sm:flex justify-center text-3xl md:text-6xl text-center md:m-6 text-cyan-300">
              Loved by the <br /> best data teams
            </div>
            <div className="flex justify-center text-cyan-400 mt-8">
              Hex helps companies of all sizes do more with their data.
            </div>
          </div>
        </div>

        {/* COMPANY CARDS */}
        <div className="sm:grid sm:grid-border-2 h-auto sm:grid-cols-4 text-cyan-50 lg:px-50 md:mx-25 mt-20">
          {[
            {
              img: "https://clipground.com/images/stubhub-png-1.png",
              title: "Lorem ipsum dolor",
              desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis laudantium sed.",
            },
            {
              img: "https://sparkwise.ca/wp-content/uploads/2020/07/logo-dark-small-transparent.png",
              title: "Lorem ipsum dolor",
              desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint a veritatis laudantium sed quasi quis!",
            },
            {
              img: "https://assets.website-files.com/60859bd6bcdbd1376fd8504b/629ec8c9c0dab932080bee96_notion-logo-rect.png",
              title: "Lorem ipsum dolor",
              desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint a veritatis laudantium sed quasi quis!",
            },
            {
              img: "https://www.jpmorgan.com/content/dam/jpm/cib/complex/content/treasury-services/payments-unbound/volume2/logo-modern-treasury2x.png",
              title: "Lorem ipsum dolor",
              desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint a veritatis laudantium sed quasi quis!",
            },
          ].map((card, index) => (
            <div
              key={index}
              className="border bg-[#001133]/60 shadow-cyan-800/50 shadow-2xl hover:scale-95 duration-300 border-cyan-800/50 m-auto mt-4 grid justify-start w-60 h-65 sm:h-full sm:w-full rounded-lg"
            >
              <img
                src={card.img}
                alt=""
                className="m-auto mt-4 md:relative top-10 h-10"
              />
              <div className="pt-5 text-[22px] font-semibold text-center sm:text-2xl h-20 sm:h-25">
                {card.title}
              </div>
              <div className="px-5 mb-8 text-[15px] text-center text-cyan-200">
                {card.desc}
              </div>
            </div>
          ))}
        </div>

        {/* QUOTE SECTION */}
        <div className="hidden md:grid grid-cols-6 text-cyan-50 lg:px-50 md:mx-25 md:mt-20 lg:mb-20">
          <div className="border border-cyan-800/50 m-auto h-80 col-span-2 w-full grid grid-rows-4 bg-[#001133]/40 rounded-lg">
            <div className="row-span-3 p-4">
              <img
                src="https://images.ctfassets.net/mmgv7yhaaeds/6YeFcloKHpe0I7Ax0ihCah/df75892072dc00db9f5865be3a493e33/G2_Badges_Q3_2023.webp"
                className="h-full w-full object-contain rounded-md"
              />
            </div>
            <div className="row-span-1 text-3xl font-medium pl-4 text-cyan-300">
              Users love Hex
            </div>
            <div className="row-span-1 pb-5 pl-4 text-cyan-200">
              Rated on G2 as an industry leader based on customer reviews. Check them out.
            </div>
          </div>

          <div className="border border-cyan-800/50 m-auto col-span-4 h-80 w-full grid grid-rows-4 bg-[#001133]/40 rounded-lg">
            <div className="row-span-1 flex items-center justify-start pl-10">
              <img
                src="https://images.ctfassets.net/mmgv7yhaaeds/45K7YZyXLDrOeeYIN7Vi3y/d20ebb5f53a1f1bf6e5a061d828f2b09/Notion.svg"
                className="h-8"
                alt="Notion"
              />
            </div>
            <div className="row-span-2 text-xl lg:text-2xl font-medium px-10 text-cyan-100">
              “Our vision for Notion’s data team is that anyone, regardless of technical proficiency,
              is comfortable using data to answer their own questions — and Hex enables that.”
            </div>
            <div className="pl-10 flex items-center">
              <div className="h-8 w-8 mr-4 rounded-full border border-cyan-300 overflow-hidden">
                <img
                  src="https://images.ctfassets.net/mmgv7yhaaeds/5RiuLohiQMsh4b1JS12ZnY/5d04efeba4e1fbc5e491ac0735a89119/abhishek-modi-headshot.jpg"
                  alt="Abhishek Modi"
                />
              </div>
              <span className="text-cyan-200">
                Abhishek Modi · Software Engineer at Notion
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page4;
