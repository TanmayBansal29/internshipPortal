import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
export default function Dashboard() {
    const [appliedOppurtunites,setAppliedOppurtunities] = useState([])
    const navigate = useNavigate()
    useEffect(()=>{
        axios.get("http://localhost:3000/auth/verify").then((res)=>{
           if(!res.data.status){
            navigate("/login")
           } else {
            fetchAppliedOppurtunities()
           }
        })
    },[navigate])
    const fetchAppliedOppurtunities =async()=>{
        try {
            const response = await axios.get("http://localhost:3000/auth/applied-oppurtunities")
            setAppliedOppurtunities(response.data)
        } catch (error) {
            
        }
    }
    const handleLogout=()=>{
        axios.get("http://localhost:3000/auth/logout")
        .then((res)=>{
            if(res.data.status){
                navigate("/login")
            }
        }).catch((err)=>{
            console.log(err)
        })
    }
  return (
    <div className="p-6 bg-gray-100 min-h-[90vh]">
  <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
  <h2 className="text-xl font-semibold mb-4">Applied Opportunities</h2>
  <button
    onClick={handleLogout}
    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
  >
    Logout
  </button>
  <div className="mt-6 space-y-4">
    {appliedOppurtunites.map((opportunity, index) => (
      <div
        key={index}
        className="bg-white p-4 shadow-lg rounded-lg border border-gray-200"
      >
        <h3 className="text-2xl font-semibold mb-2">{opportunity.profile_name}</h3>
        <p className="text-gray-700"><strong>Company: </strong>{opportunity.company_name}</p>
        <p className="text-gray-700"><strong>Stipend: </strong>{opportunity.stipend}</p>
        <p className="text-gray-700"><strong>Duration: </strong>{opportunity.duration}</p>
      </div>
    ))}
  </div>
</div>
  )
}
