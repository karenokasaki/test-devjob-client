import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import api from "../axios/api";
import { AuthContext } from "../contexts/AuthContext";
import {
   DocumentTextIcon,
   PaperAirplaneIcon,
   PhoneIcon,
} from "@heroicons/react/24/outline";
import { Disclosure } from "@headlessui/react";

export default function JobDetailPage() {
   const params = useParams();

   const { role } = useContext(AuthContext);

   const [alreadyApply, setAlreadyApply] = useState(false);

   const id = localStorage.getItem("userId");

   // o id do job está em -> params.id_job

   const navigate = useNavigate();

   const [job, setJob] = useState({});

   useEffect(() => {
      async function getJob() {
         const response = await api.get(`/job/${params.id_job}`);
         setJob(response.data);

         //conferindo se o id do user que está logado, existe dentro da array de candidatos para essa vaga
         const job = response.data.candidates.find((candidate) => {
            return candidate._id === id;
         });

         if (job) {
            setAlreadyApply(true);
         } else {
            setAlreadyApply(false);
         }
      }

      getJob();
   }, []);

   async function handleApply() {
      try {
         await api.post(`/job/apply/${params.id_job}`);
         navigate("/profile");
      } catch (error) {
         console.log(error);
      }
   }

   async function handleSelectCandidate(id_user) {
      try {
         await api.post(`/job/approved-candidate/${params.id_job}/${id_user}`);
         navigate("/profile-business");
      } catch (error) {
         console.log(error);
      }
   }

   console.log(job);

   return (
      <>
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
            <div className="mt-4">
               <h2 className="text-lg font-semibold">Empresa</h2>
               <p className="text-sm">{job.business?.name}</p>
               <p className="text-sm">{job.business?.description}</p>
               <p className="text-sm">
                  Contato: {job.business?.email}, {job.business?.telefone}
               </p>
            </div>

            {/* Mostrar o botão de candidatar-se apenas se for USER */}
            {role === "USER" && alreadyApply === false && (
               <button
                  onClick={handleApply}
                  className="mt-4 bg-indigo-500 py-2 px-4 rounded-lg text-white hover:bg-indigo-600"
               >
                  Me candidatar
               </button>
            )}
            {role === "USER" && alreadyApply === true && (
               <button
                  className="mt-4 bg-indigo-500 py-2 px-4 rounded-lg text-white hover:bg-indigo-600"
                  disabled
               >
                  Você já se candidatou! Boa sorte!
               </button>
            )}
         </div>

         <div className="bg-white mt-8 p-4 rounded-lg shadow">
            {id === job.business?._id && (
               <>
                  <h1 className="font-bold tracking-wider text-lg text-center mb-2">
                     Candidatos
                  </h1>
                  <div className="flex flex-col gap-4">
                     {job.candidates?.map((candidate) => {
                        return (
                           <Disclosure key={candidate._id}>
                              <Disclosure.Button className="bg-gray-50 p-4">
                                 <h1 className="flex items-center justify-evenly">
                                    <span className="text-1xl font-semibold">
                                       {candidate.name}
                                    </span>
                                    <span className="flex gap-3">
                                       <PaperAirplaneIcon className="h-5 w-5" />
                                       {candidate.email}
                                    </span>
                                    <span className="flex gap-3">
                                       <PhoneIcon className="h-5 w-5" />{" "}
                                       {candidate.telefone}
                                    </span>
                                    <span>
                                       <DocumentTextIcon className="h-7 w-7 cursor-pointer" />
                                    </span>
                                    <button
                                       className="bg-indigo-500 py-2 px-4 rounded-lg text-white hover:bg-indigo-600"
                                       onClick={() =>
                                          handleSelectCandidate(candidate._id)
                                       }
                                    >
                                       Selecionar Candidato
                                    </button>
                                 </h1>
                              </Disclosure.Button>
                              <Disclosure.Panel className="bg-gray-50 px-4 mx-6">
                                 <pre className="mt-1 whitespace-pre-line font-sans">
                                    {candidate.curriculo
                                       ? candidate.curriculo
                                       : "Esse candidato não enviou um currículo"}
                                 </pre>
                              </Disclosure.Panel>
                           </Disclosure>
                        );
                     })}
                  </div>
               </>
            )}
         </div>
      </>
   );
}
