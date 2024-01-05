import React, { useState, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { generationConfig, safetySettings } from "../constants/constants";
import Markdown from "react-markdown";
import user from "../assets/images/user.png";
import bot from "../assets/images/bot.png";
import copy from "../assets/images/copy.png";

const Chat = () => {
  const [text, setText] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(null);
  const [arr, setArr] = useState([]);
  //   const [isCopied, setIsCopied] = useState(false);
  const [copied, setCopied] = useState(Array(arr.length).fill(false));
  const containerRef = useRef(null);

  const MODEL_NAME = "gemini-pro";
  const API_KEY = "AIzaSyC4tkrca_vCgJObjLKHvTNS_7l6w5eg1MA";

  const handleClick = async (prompt) => {
    // Save user's input (prompt) immediately
    setArr([...arr, { text: prompt }]);
    setText("");
    setLoading(true);

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const parts = [
      {
        text: prompt,
      },
    ];

    try {
      const result = await model.generateContent({
        contents: [{ role: "user", parts }],
        generationConfig,
        safetySettings,
      });

      const aiResult = result.response;

      // Save AI's response
      setArr([...arr, { text: prompt, response: aiResult.text() }]);
      setResponse(aiResult.text());
    } catch (error) {
      console.error("Error generating response:", error);
      // Handle error if needed
    } finally {
      // Clear loading state after response is received or an error occurs
      setLoading(false);

      // Scroll to the bottom
      const container = containerRef.current || document.documentElement;
      container.scrollTop = container.scrollHeight;
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      // Call the search function when Enter key is pressed
      handleClick(text);
    }
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  //Copy the generated response
  const handleCopy = (index) => {
    setCopied((prevCopied) => {
      const newCopied = [...prevCopied];
      newCopied[index] = true;
      return newCopied;
    });
    navigator.clipboard.writeText(arr[index].response);

    setTimeout(() => {
      setCopied((prevCopied) => {
        const newCopied = [...prevCopied];
        newCopied[index] = false;
        return newCopied;
      });
    }, 2000);
  };

  return (
    <div className="flex flex-col gap-5 items-center bg-[#060606] text-white min-h-screen w-full pb-0">
      <div className="text-3xl md:text-5xl self-start pl-4 pt-4">Coadapt</div>
      <div
        className="w-5/6 md:w-3/4 z-50 max-h-[27rem] xl:max-h-[32rem] overflow-y-scroll overflow-x-auto"
        ref={containerRef}
      >
        {arr.length > 0 ? (
          arr?.map((item, index) => {
            return (
              <div key={index} className="w-full">
                <div className="flex gap-4 border rounded-lg p-3 md:p-5 bg-black bg-opacity-80">
                  <img
                    src={user}
                    alt="User"
                    className="w-8 h-8 md:w-12 md:h-12"
                  />
                  <div className="w-full self-center text-red-300">
                    {item.text}
                  </div>
                </div>
                <div className="flex gap-4 border rounded-lg p-3 md:p-5 bg-black bg-opacity-80 items-start w-full">
                  <img
                    src={bot}
                    alt="Bot"
                    className="w-8 h-8 md:w-12 md:h-12"
                  />
                  {loading && arr.indexOf(item) === arr.length - 1 && (
                    <div className="text-white text-2xl">Loading....</div>
                  )}
                  {arr.indexOf(item) !== arr.length && (
                    <div className="self-center">
                      <Markdown className="w-full">{item.response}</Markdown>
                    </div>
                  )}
                  <div className="flex flex-col w-56 items-end">
                    <img
                      src={copy}
                      alt="copy"
                      className="cursor-pointer text-white w-14 md:w-10"
                      onClick={() => handleCopy(index)}
                    />
                    <div className="text-center text-xs">
                      {copied[index] && "Copied"}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-white text-5xl text-center">
            Start a new chat
          </div>
        )}
      </div>
      <div className="mb-6 flex gap-4 md:gap-6 absolute bottom-0 justify-center items-center w-5/6 md:w-2/3 bg-[#060606]">
        <textarea
          type="text"
          rows={1}
          value={text}
          onKeyDown={handleKeyPress}
          placeholder="Seach with Coadapt..."
          onChange={(e) => handleChange(e)}
          className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <div>
          <button
            onClick={() => handleClick(text)}
            type="button"
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Search
          </button>
        </div>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 3000 1000"
        preserveAspectRatio="xMidYMid meet"
        className="absolute top-48 md:top-24"
      >
        <defs>
          <clipPath id="__lottie_element_2">
            <rect width="3000" height="1000" x="0" y="0"></rect>
          </clipPath>
          <g id="__lottie_element_4">
            <g
              transform="matrix(1,0,0,1,1500,498.75)"
              opacity="1"
              style={{ display: "block" }}
            >
              <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                <path
                  fill="rgb(255,255,255)"
                  fillOpacity="1"
                  d=" M141.7908477783203,0 C141.7908477783203,0 141.7908477783203,0 141.7908477783203,0 C141.7908477783203,26.65040397644043 120.15278625488281,48.2884635925293 93.50238037109375,48.2884635925293 C93.50238037109375,48.2884635925293 -93.50238037109375,48.2884635925293 -93.50238037109375,48.2884635925293 C-120.15278625488281,48.2884635925293 -141.7908477783203,26.65040397644043 -141.7908477783203,0 C-141.7908477783203,0 -141.7908477783203,0 -141.7908477783203,0 C-141.7908477783203,-26.65040397644043 -120.15278625488281,-48.2884635925293 -93.50238037109375,-48.2884635925293 C-93.50238037109375,-48.2884635925293 93.50238037109375,-48.2884635925293 93.50238037109375,-48.2884635925293 C120.15278625488281,-48.2884635925293 141.7908477783203,-26.65040397644043 141.7908477783203,0z"
                ></path>
              </g>
            </g>
          </g>
        </defs>
        <g clipPath="url(#__lottie_element_2)">
          <g
            transform="matrix(2,0,0,-2,1500,500)"
            opacity="1"
            style={{ display: "block" }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="miter"
              fillOpacity="0"
              strokeMiterlimit="4"
              stroke="rgb(255,183,197)"
              strokeOpacity="1"
              strokeWidth="3"
              d=" M-627.9580078125,-155.6320037841797 C-513.8419799804688,-153.3560028076172 -429.78900146484375,-140.62899780273438 -357,-74.90599822998047 C-297.345458984375,-20.92789649963379 -277.79559326171875,-18.42678451538086 -238,-12.12510871887207 C-205.6255340576172,-6.497852325439453 -200.96914672851562,3.04654598236084 -180.15647888183594,7.438414096832275 C-158.87539672851562,11.873819351196289 -148.84140014648438,1.0975841283798218 -125.93190002441406,-10.245728492736816 C-98.68862915039062,-24.36565399169922 -81.81523895263672,8.31717300415039 -62,14.469816207885742 C-39.6379508972168,21.635587692260742 -23.00064468383789,-1.3221853971481323 0,-12.28383731842041 C23.00064468383789,-23.2454891204834 44.50491714477539,8.161741256713867 64,14.594707489013672 C82.69055938720703,20.68297004699707 95.8862075805664,1.7343170642852783 120,-10.034481048583984 C144.74742126464844,-21.93461799621582 163.9978485107422,6.25343656539917 187.3124542236328,6.938841819763184 C208.3535919189453,7.7788801193237305 214.82681274414062,0.4338032901287079 237.03147888183594,-7.492920398712158 C257.4330139160156,-14.621999740600586 293.72100830078125,-10.166999816894531 345.9440002441406,-49.250999450683594"
            ></path>
            <g opacity="1" transform="matrix(1,0,0,1,0,0)"></g>
          </g>
          <g
            transform="matrix(2,0,0,-2,1500,500)"
            opacity="1"
            style={{ display: "block" }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="miter"
              fillOpacity="0"
              strokeMiterlimit="4"
              stroke="rgb(255,221,183)"
              strokeOpacity="1"
              strokeWidth="3"
              d=" M-609.47900390625,-77.21600341796875 C-495.7550048828125,-75.06400299072266 -424.2879943847656,-66.97699737548828 -357,-36.59000015258789 C-307.8102722167969,-14.373177528381348 -268.1795959472656,-9.423844337463379 -238,-5.0583343505859375 C-214.22389221191406,-1.4951330423355103 -204.2693328857422,11.781867980957031 -180.07252502441406,3.1220996379852295 C-156.1050262451172,-5.624707221984863 -141.05291748046875,-19.931896209716797 -120,-6.222387790679932 C-102.02204132080078,5.557836055755615 -84.75,24.125322341918945 -62,11.172961235046387 C-40.613834381103516,-1.5507702827453613 -23.5620174407959,-23.25 0,-10.30782699584961 C23.5620174407959,2.634345293045044 38.56459426879883,27.33063507080078 64,9.661773681640625 C86.7741928100586,-6.3090500831604 97.75386810302734,-20.479623794555664 120,-11.424250602722168 C142.2461395263672,-2.3688771724700928 156.25030517578125,17.99040412902832 187.125,6.059761047363281 C210.62911987304688,-2.316678285598755 210.54483032226562,-7.69257116317749 237.25064086914062,-5.674737453460693 C269.2525634765625,-2.6854054927825928 309.6773681640625,-6.938266754150391 374.678955078125,-37.74994659423828 C391.98699951171875,-45.88199996948242 409.3039855957031,-52.39500045776367 428.2090148925781,-57.60599899291992"
            ></path>
            <g opacity="1" transform="matrix(1,0,0,1,0,0)"></g>
          </g>
          <g
            transform="matrix(2,0,0,2,1500,500)"
            opacity="1"
            style={{ display: "block" }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="miter"
              fillOpacity="0"
              strokeMiterlimit="4"
              stroke="rgb(177,197,255)"
              strokeOpacity="1"
              strokeWidth="3"
              d=" M-586.177001953125,-0.009999999776482582 C-480.5920104980469,-0.026000000536441803 -418.7659912109375,-0.057999998331069946 -357,-0.09700000286102295 C-309.2179260253906,-0.12611085176467896 -263.3443298339844,-4.4548444747924805 -238,2.5700182914733887 C-214.74806213378906,9.001289367675781 -199.19522094726562,5.228263854980469 -180.125,-3.418862819671631 C-154.47415161132812,-15.05628776550293 -140.62338256835938,-11.95015811920166 -120,4.22036075592041 C-99.87071228027344,19.79148292541504 -85.87437438964844,20.33254051208496 -62,0.5056933164596558 C-34.5,-22.501934051513672 -22.078588485717773,-17.454301834106445 -0.08371526002883911,0.567172646522522 C23.16213035583496,19.578487396240234 39.377899169921875,22.242910385131836 64,-1.4214407205581665 C88.6248550415039,-25.109844207763672 105.00386810302734,-12.618877410888672 120,-3.276747465133667 C143.1982421875,11.28353214263916 153.1317596435547,20.494199752807617 187.125,-0.29418498277664185 C209.45632934570312,-13.986398696899414 224.1899871826172,-5.173159599304199 237,-1.8260987997055054 C264.1573181152344,5.176044940948486 319.7424621582031,0.1698879897594452 378,0.10022944211959839 C425.2829895019531,0.041999999433755875 469.3059997558594,0.07400000095367432 541.8400268554688,0.1120000034570694"
            ></path>
            <g opacity="1" transform="matrix(1,0,0,1,0,0)"></g>
          </g>
          <g
            transform="matrix(2,0,0,2,1500,500)"
            opacity="1"
            style={{ display: "block" }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="miter"
              fillOpacity="0"
              strokeMiterlimit="4"
              stroke="rgb(79,171,255)"
              strokeOpacity="1"
              strokeWidth="3"
              d=" M-556.8510131835938,-75.40399932861328 C-474.7560119628906,-71.49299621582031 -413.6510009765625,-61.66999816894531 -357,-36.99700164794922 C-298.63763427734375,-11.594114303588867 -270.5006408691406,-10.902093887329102 -238,-6.888476848602295 C-209.77552795410156,-3.4048144817352295 -203.0336151123047,9.79675579071045 -180.09347534179688,6.373174667358398 C-157.71261596679688,3.3468592166900635 -140.2497100830078,-18.23720932006836 -120,-11.61495304107666 C-101.6854476928711,-6.194727897644043 -84.87489318847656,19.06706428527832 -62,14.654845237731934 C-40.91014099121094,11.110869407653809 -23.75,-18.098737716674805 0,-14.030167579650879 C23.75,-9.961597442626953 39.623390197753906,22.31792449951172 64,13.935728073120117 C86.47469329833984,6.687504291534424 98.51155853271484,-15.547673225402832 120,-13.562552452087402 C142.7508544921875,-11.838208198547363 158.71661376953125,14.628758430480957 187.1874542236328,7.81190824508667 C208.3524169921875,3.56950306892395 218.0889892578125,-3.935060739517212 237,-5.667917728424072 C262.6266174316406,-7.699064254760742 308.4684143066406,-5.396045684814453 378,-38.10812759399414 C446.9630126953125,-70.4020004272461 516.22802734375,-77.02400207519531 693.7509765625,-77.95700073242188"
            ></path>
            <g opacity="1" transform="matrix(1,0,0,1,0,0)"></g>
          </g>
          <g
            transform="matrix(2,0,0,2,1500,500)"
            opacity="1"
            style={{ display: "block" }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="miter"
              fillOpacity="0"
              strokeMiterlimit="4"
              stroke="rgb(7,110,255)"
              strokeOpacity="1"
              strokeWidth="3"
              d=" M-518.4569702148438,-147.093994140625 C-457.0060119628906,-137.28900146484375 -403.89898681640625,-116.97599792480469 -357,-75.11399841308594 C-304.8283386230469,-28.506790161132812 -283.0532531738281,-14.754124641418457 -238,-11.501289367675781 C-205.33213806152344,-9.374032974243164 -199.2350311279297,-1.5802080631256104 -180.17703247070312,5.5232014656066895 C-161.11952209472656,12.626611709594727 -147.0265655517578,10.992392539978027 -130.421875,-1.732150912284851 C-98.25837707519531,-26.372743606567383 -90.72264099121094,-11.075981140136719 -62,8.81588363647461 C-37.6240348815918,25.875967025756836 -23.369522094726562,8.553494453430176 0,-7.660913467407227 C23.369522094726562,-23.875322341918945 37.3465461730957,-9.93221378326416 64,8.920260429382324 C87.75,25.875967025756836 97.5812759399414,8.863797187805176 120,-4.702306747436523 C152.58457946777344,-24.419292449951172 166.25064086914062,0.06813937425613403 187.375,4.356632232666016 C208.49935913085938,8.645124435424805 212.06216430664062,3.9535233974456787 237.07247924804688,-6.065920352935791 C262.0827941894531,-16.085363388061523 312.7012023925781,-13.438002586364746 378,-77.33589935302734 C453.6150817871094,-150.5194549560547 530,-156 750,-156"
            ></path>
            <g opacity="1" transform="matrix(1,0,0,1,0,0)"></g>
          </g>
        </g>
      </svg>
    </div>
  );
};

export default Chat;
