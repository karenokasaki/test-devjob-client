import { useState, useEffect } from "react";
import api from "../axios/api";
import { Link } from "react-router-dom";

export default function JobsPage() {
   const [jobs, setJobs] = useState([]);

   useEffect(() => {
      async function getJobs() {
         const response = await api.get("/job/all/open");
         setJobs(response.data);
      }

      getJobs();
   }, []);

   console.log(jobs);

   return (
      <>
         <h1 className="text-4xl text-center font-bold tracking-wider mb-8">
            Vagas
         </h1>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {jobs.map((job) => {
               return (
                  <div
                     key={job._id}
                     className="bg-white rounded-lg shadow-sm p-2 ring-1 ring-offset-2 ring-gray-200 transform hover:scale-95 transition-transform duration-300"
                  >
                     <h2 className="font-bold text-lg">{job.title}</h2>
                     <p className="text-xs">Local: {job.city}</p>
                     <div className="flex gap-4 my-2">
                        <p className="bg-purple-50 px-2 py-1 text-xs text-purple-700 rounded-md font-semibold">
                           {job.model}
                        </p>
                        <p className="bg-indigo-50 px-2 py-1 text-xs text-indigo-700 rounded-md font-semibold">
                           Salário: R${job.salary},00
                        </p>
                     </div>

                     <div className="border-t pt-1">
                        <Link
                           to={`/jobs/${job._id}`}
                           className="text-sm font-semibold leading-6 text-gray-800 hover:underline"
                        >
                           Ver detalhes &rarr;
                        </Link>
                     </div>
                  </div>
               );
            })}
         </div>
      </>
   );
}
