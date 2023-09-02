import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
export default function HomePage() {
   const [jobs, setJobs] = useState([]);
   const [search, setSearch] = useState("");
   const [selectedModel, setSelectedModel] = useState("");

   useEffect(() => {
      async function getJobs() {
         const response = await axios.get(
            "http://localhost:4000/job/all/open/public"
         );
         setJobs(response.data);
      }

      getJobs();
   }, []);

   function handleSearch(e) {
      setSearch(e.target.value);
   }

   function handleModelFilter(e) {
      setSelectedModel(e.target.value);
   }

   console.log(selectedModel);

   return (
      <main>
         <div className="relative mb-4">
            <img
               className="h-32 w-full object-cover rounded-md"
               src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2669&q=80"
            />

            <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-70 rounded-md">
               <p className="text-white text-3xl font-mono text-center">
                  Encontre aqui sua próxima vaga de emprego no mundo da
                  tecnologia.
               </p>
            </div>
         </div>

         {/* SEARCH */}
         <div className="mb-4 flex gap-2">
            <input
               type="text"
               placeholder="Busque por vagas"
               className="border border-gray-300 rounded-md px-4 py-2 w-full"
               value={search}
               onChange={handleSearch}
            />

            <select
               className="border border-gray-300 rounded-md px-4 py-2 pr-8"
               onChange={handleModelFilter}
            >
               <option value="">Todos</option>
               <option value="PRESENCIAL">Presencial</option>
               <option value="REMOTO">Remoto</option>
               <option value="HIBRIDO">Hibrido</option>
            </select>
         </div>

         {/* aqui vai mostrar os cards */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {jobs
               .filter((job) => {
                  return job.title.toLowerCase().includes(search.toLowerCase());
               })
               .filter((job) => {
                  if (selectedModel === "") {
                     return true;
                  }
                  return job.model === selectedModel;
               })
               .map((job) => {
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
                              to={`/jobs/public/${job._id}`}
                              className="text-sm font-semibold leading-6 text-gray-800 hover:underline"
                           >
                              Ver detalhes &rarr;
                           </Link>
                        </div>
                     </div>
                  );
               })}
         </div>
      </main>
   );
}
