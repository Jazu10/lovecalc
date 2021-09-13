import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { easeQuadInOut } from "d3-ease";
import AnimatedProgressProvider from "../components/AnimatedProgressProvider";
import { db } from "../components/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

function Home() {
   const initialState = {
      uname: "",
      hname: "",
   };

   const router = useRouter();
   const [userData, setUserData] = useState(initialState);

   const { uname, hname } = userData;

   const handleChangeInput = (e) => {
      const { name, value } = e.target;
      setUserData({ ...userData, [name]: value });
   };
   const [lovdata, setLovdata] = useState(0);

   function sleep(milliseconds) {
      const date = Date.now();
      let currentDate = null;
      do {
         currentDate = Date.now();
      } while (currentDate - date < milliseconds);
   }

   const reset = () => {
      setUserData(initialState);
      setLovdata(null);
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      if (!uname || !hname) {
         alert("Please enter all the fields");
      } else {
         let sum1 = 0;
         let sum2 = 0;
         let sum3 = 0;
         const love = ["l", "o", "v", "e"];
         const hisname = uname.toLowerCase().split("");
         const hername = hname.toLowerCase().split("");
         for (let i = 0; i < hisname.length; i++) {
            sum1 += hisname[i].charCodeAt() % 10;
         }
         for (let i = 0; i < hername.length; i++) {
            sum2 += hername[i].charCodeAt() % 10;
         }
         for (let i = 0; i < love.length; i++) {
            sum3 += love[i].charCodeAt() % 10;
         }
         sum1 = sum1 + sum2 + sum3;
         if (sum1 === 70) sum1 = 98;
         else if (sum1 > 40 && sum1 <= 50) sum1 = sum1 + 41;
         else if (sum1 > 50 && sum1 <= 60) sum1 += 29;
         else if (sum1 > 60 && sum1 <= 70) sum1 = sum1 + 21;
         else if (sum1 > 70 && sum1 <= 80) sum1 = sum1 + 23;
         else if (sum1 > 100 && sum1 <= 110) sum1 = sum1 - 26;
         else if (sum1 > 110 && sum1 <= 120) sum1 -= 25;
         else if (sum1 > 120 && sum1 <= 130) sum1 -= 29;
         else if (sum1 > 130 && sum1 <= 140) sum1 -= 42;
         else if (sum1 > 140 && sum1 <= 150) sum1 -= 55;
         else if (sum1 > 150 && sum1 <= 160) sum1 -= 61;
         else if (sum1 > 160 && sum1 <= 170) sum1 -= 72;
         else if (sum1 > 170 && sum1 <= 180) sum1 -= 87;
         else if (sum1 > 180 && sum1 <= 190) sum1 -= 96;
         else if (sum1 > 190 && sum1 <= 200) sum1 -= 107;

         setLovdata(sum1);
         try {
            const docRef = await addDoc(collection(db, "lovedata"), {
               name: uname,
               crush: hname,
               createdAt: serverTimestamp(),
            });
         } catch (e) {
            console.error("Error adding document: ", e);
         }
      }
   };

   return (
      <>
         <Head>
            <title>Love Calculator</title>
         </Head>
         <form onSubmit={handleSubmit} id="form">
            <div className="items-center justify-center text-white h-screen max-w-screen-lg bg-gradient-to-r from-red-500 to-red-400 m-auto">
               <h1 className=" w-full pt-12 font-cocogoose md:text-4xl text-3xl text-center">
                  Love ♡ Calculator
               </h1>
               <p className=" text-center font-cocogoose text-xs pt-4">
                  Get your love results instatly*
               </p>
               <div className="justify-items-center px-10 md:px-20">
                  <div className="mt-10 xs:mt-5 text-center font-cocogoose">
                     Enter your name
                  </div>
                  <input
                     type="text"
                     name="uname"
                     value={uname}
                     onChange={handleChangeInput}
                     className="w-full uppercase focus:outline-none md:mt-5 mt-2 rounded-full bg-opacity-30 bg-white h-10 text-white text-center font-cocogoose focus:bg-opacity-20 shadow-lg"
                  />
                  <div className="text-center font-cocogoose text-6xl md:mt-10 mt-5">
                     ❤
                  </div>
                  <div className="mt-6 text-center font-cocogoose">
                     Enter His\Her name
                  </div>
                  <input
                     type="text"
                     name="hname"
                     value={hname}
                     onChange={handleChangeInput}
                     className="w-full uppercase md:mt-5 mt-2 focus:outline-none rounded-full bg-opacity-30 bg-white h-10 text-white text-center font-cocogoose focus:bg-opacity-20 shadow-lg"
                  />
                  <div className="justify-center flex">
                     <button className="font-cocogoose bg-white text-red-500 p-3 md:px-4 px-10 rounded-full md:mt-10 mt-5 hover:bg-red-200 hover:text-red-500">
                        Calculate
                     </button>
                  </div>
                  <div className="justify-center flex">
                     {lovdata ? (
                        <div style={{ width: 95, height: 95 }}>
                           <AnimatedProgressProvider
                              valueStart={0}
                              valueEnd={lovdata}
                              duration={3}
                              easingFunction={easeQuadInOut}>
                              {(value) => {
                                 const roundedValue = Math.round(value);
                                 return (
                                    <CircularProgressbar
                                       value={value}
                                       className="mt-5"
                                       text={`${roundedValue}%`}
                                       styles={buildStyles({
                                          pathTransition: "none",
                                          pathColor: "white",
                                          textColor: "white",
                                          trailColor: "pink",
                                       })}
                                    />
                                 );
                              }}
                           </AnimatedProgressProvider>
                        </div>
                     ) : userData ? null : null}
                  </div>
                  <div className="justify-center flex">
                     {uname && hname ? (
                        <button
                           type="reset"
                           onClick={reset}
                           className="font-cocogoose text-white md:px-4 px-10 rounded-full mt-10 hover:text-red-300">
                           reset
                        </button>
                     ) : null}
                  </div>
               </div>
            </div>
         </form>
      </>
   );
}

export default Home;
