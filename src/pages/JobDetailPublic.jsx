import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function JobDetailPublic() {
   const [job, setJob] = useState({});

   const params = useParams();

   useEffect(() => {
      async function getJob() {
         const response = await axios.get(
            `http://localhost:4000/job/${params.id_job}/public`
         );

         setJob(response.data);
      }

      getJob();
   }, [params.id_job]);

   console.log(job);

   return (
      <div className="border rounded-lg shadow-sm p-4 bg-white">
         <h1 className="text-2xl font-semibold">{job.title}</h1>
         <p className="text-sm">
            Local: {job.city}, {job.state}
         </p>
         <p className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10">
            {job.model}
         </p>
         <pre className="mt-4 whitespace-pre-line font-sans">
            {job.description}
         </pre>
         <p className="mt-2"> R$ {job.salary}</p>
         <p className="mt-2">Status: {job.status}</p>
         <div className="mt-4 mb-4">
            <h2 className="text-lg font-semibold">Empresa</h2>
            <p className="text-sm">{job.business?.name}</p>
            <p className="text-sm">{job.business?.description}</p>
         </div>

         <Link
            to="/signup"
            className=" bg-indigo-500 py-2 px-4 rounded-lg text-white hover:bg-indigo-600"
         >
            Tem interesse? Cadastre-se no nosso site
         </Link>
      </div>
   );
}
