import React, { useEffect, useState } from 'react'
import oppurtunitiesData from "../opportunities.json"
import axios from "axios"
import { useNavigate } from 'react-router-dom'
export default function OppurtunitiesComponent() {
  const [appliedOppurtunities,setAppliedOppurtunities] =  useState([])
  useEffect(()=>{
    fetchAppliedOppurtunities()
  },[])
  const fetchAppliedOppurtunities=async()=>{
    try {
      const response =await axios.get("http://localhost:3000/auth/applied-oppurtunities")
    setAppliedOppurtunities(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="p-6 bg-gray-100">
  <h1 className="text-3xl font-bold mb-6 text-center">Internship Opportunities</h1>
  <div className="flex flex-wrap justify-center gap-6">
    {Object.values(oppurtunitiesData.internships_meta).map(oppurtunity => (
      <div key={oppurtunity.id} className="flex-shrink-0 w-80">
        <OppurtunityCard 
          oppurtunity={oppurtunity} 
          appliedOppurtunities={appliedOppurtunities} 
        />
      </div>
    ))}
  </div>
</div>

  )
}

const OppurtunityCard = ({oppurtunity,appliedOppurtunities})=>{
  const navigate = useNavigate()
  const {
     id,
     profile_name,
     company_name,
     stipend,
     start_date,
     locations,
     duration
  } = oppurtunity
 const isApplied =Array.isArray(appliedOppurtunities) && appliedOppurtunities.some(item=>item.id === id)

  const applyForOppurtunity= (oppurtunity)=>{
      try {
         axios.post("http://localhost:3000/auth/apply",{oppurtunity}).then((res)=>{
          console.log(res)
         })
         navigate("/dashboard")

      } catch (error) {
        console.log(error)
      }
  }
  return(
    <div className="p-4 bg-white shadow-sm rounded-md border border-gray-200 max-w-xs mx-auto">
  <h1 className="text-xl font-semibold mb-2">{profile_name}</h1>
  <p className="text-gray-700 text-sm mb-1"><strong>Company: </strong>{company_name}</p>
  <p className="text-gray-700 text-sm mb-1"><strong>Stipend: </strong>{stipend.salary}</p>
  <p className="text-gray-700 text-sm mb-1"><strong>Location: </strong>{locations.map(location => location.string).join(', ')}</p>
  <p className="text-gray-700 text-sm mb-1"><strong>Duration: </strong>{duration}</p>
  <p className="text-gray-700 text-sm mb-3"><strong>Start Date: </strong>{start_date}</p>
  {isApplied ? (
    <button
      disabled
      className="bg-gray-400 text-white px-3 py-1 rounded-md cursor-not-allowed text-sm"
    >
      Applied
    </button>
  ) : (
    <button
      onClick={() => applyForOppurtunity(oppurtunity)}
      className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition text-sm"
    >
      Apply Now
    </button>
  )}
</div>



  )
}
