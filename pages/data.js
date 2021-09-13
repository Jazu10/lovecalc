import Head from "next/head";
import { useRouter } from "next/router";
import { db } from "../components/firebase";
import { collection, getDocs, orderBy, doc, query } from "firebase/firestore";
import { useEffect, useState } from "react";

function Data() {
   useEffect(() => {
      getData();
   }, []);

   const router = useRouter();
    const data = [];
    const [datas, setDatas] = useState([]);

   async function getData() {
      //   const querySnapshot = await getDocs(collection(db, "lovedata"));
      //   querySnapshot.forEach((doc) => {
      //    const name = doc.data().name;
      //    const crush = doc.data().crush;
      //    data.push({ name, crush});
      //   });
      const q = query(collection(db, "lovedata"), orderBy("createdAt", "desc"));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
         const name = doc.data().name;
          const crush = doc.data().crush;
          const timestamp = doc.data().createdAt;
         data.push({ name, crush,timestamp });
         //  doc.data() is never undefined for query doc snapshots
         //  console.log(doc.id, " => ", doc.data());
      });
       setDatas(data);
    }

   return (
       <>
           <Head>
               <title>Love calculator</title>
           </Head>
         <div className="items-start font-cocogoose  flex justify-center min-h-screen max-w-screen-lg bg-gradient-to-r from-red-500 to-red-400 m-auto">
            <div className="flex flex-col w-10/12">
               <div className="mt-10  justify-evenly rounded-t-xl flex flex-row p-4 bg-white">
                  <div className=" text-red-500  text-xl">Name</div>
                  <div className="">|</div>
                  <div className="text-xl text-red-500">Crush</div>
               </div>
               {datas.map(({ timestamp, name, crush }) => (
                  <div
                     key={timestamp}
                     className=" justify-evenly flex text-3xl p-4 bg-pink-100">
                     <div className="text-lg text-red-500  ">
                        {name.toUpperCase()}
                     </div>
                     <div className="border border-red-500"></div>
                     <div className="text-lg text-red-500">
                        {crush.toUpperCase()}
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </>
   );
}

// export async function getServerSideProps() {
//     const querySnapshot = await getDocs(collection(db, "lovedata"));
//     console.log(querySnapshot.data());
//    return {
//       props: {
//         //  name: res.subjects,
//         //  crush: res.result,
//       },
//    };
// }

export default Data;
