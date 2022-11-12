import Icon1 from "../../../assets/images/icon1.svg";
import Icon2 from "../../../assets/images/icon2.svg";
import Icon3 from "../../../assets/images/icon3.svg";
import tw from "tailwind-styled-components";
import React from "react";

const Container = tw.div`w-full lg:col-span-1 col-span-2 lg:mx-0 mx-auto lg:order-1 order-2`;
const Background = tw.div`bg-indigo-900 justify-center rounded-2xl border-indigo-900 border-4 flex h-index px-12 items-center bg-center bg-no-repeat`;

export const ReadyJourney = () => {
  return (
    <Container>
      <div className="animate-fadeInLtoR lg:border-b-0 lg:border-t-0 bg-green-500 rounded-3xl mx-6 lg:mx-0 md:px-2 px-1 md:py-2 py-1">
        <div className="h-[620px] overflow-y-scroll block object-cover mx-auto">
          <Background
            style={{
              backgroundImage: `url(${require("../../../assets/images/spacetrip.gif")})`,
            }}
          >
            <div className="mx-auto grid grid-cols-1 border-t-2 border-b-2 border-dashed border-white place-content-center h-full py-40">
              <h3 className="w-full block text-2xl text-center font-heading text-yellow-500">
                Ready for your Journey?
              </h3>
              <div className="w-full grid grid-cols-3 md:my-6 py-4 place-items-center px-12">
                <div className="col-span-1">
                  <img
                    className="block h-20 object-cover rounded-md"
                    alt=""
                    src={Icon1}
                  />
                </div>
                <div className="col-span-1">
                  <img
                    className="block h-20 object-cover rounded-md"
                    alt=""
                    src={Icon2}
                  />
                </div>
                <div className="col-span-1">
                  <img
                    className="block h-20 object-cover rounded-md"
                    alt=""
                    src={Icon3}
                  />
                </div>
              </div>
              <h3 className="w-full block text-base text-center text-white font-medium leading-normal px-12">
                Click any lessons on the right.You’ll see the overview plan for
                each trip.
              </h3>
            </div>
          </Background>
        </div>
      </div>
    </Container>
  );
};
