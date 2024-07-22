import React, { useState } from 'react'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'
export default function Signup() {
    const [username,setUsername] =useState("")
    const [password,setPassword] =useState("")
    const [email,setEmail] =useState("")
    const [error,setError] = useState("")
    const navigate = useNavigate()
    function handleSubmit(e){
        e.preventDefault()
        if(!username || !email || !password){
            setError("Please fill all fields")
            return;
        }
        Axios.post("http://localhost:3000/auth/signup",{
            username,
            email,
            password
        }).then((response)=>{
            if(response.data.status){
              navigate("/login")
            } 
        }).catch(()=>{
            setError("Internal error occured, please try again.")
        })
    }
  return (
    <div className="flex items-center justify-center min-h-[90vh] bg-gray-100 p-6">
  <div className='w-full max-w-md bg-white p-8 rounded-lg shadow-md'>
  <h2 className="text-2xl font-bold mb-6 text-center">SignUp</h2>
  <form onSubmit={handleSubmit} className="space-y-4">
    <div>
      <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username:</label>
      <input 
        type="text" 
        id="username" 
        placeholder="Username" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <div>
      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email:</label>
      <input 
        type="email" 
        id="email" 
        placeholder="Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <div>
      <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password:</label>
      <input 
        type="password" 
        id="password" 
        placeholder="Password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <button 
      type="submit" 
      className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
    >
      SignUp
    </button>
    <div className="text-center">
      <p className="text-sm text-gray-600">Already have an account?</p>
      <button 
        onClick={() => navigate("/login")} 
        className="text-blue-500 hover:underline"
      >
        Login
      </button>
    </div>
    {error && <p className="text-red-500 text-center">{error}</p>}
  </form>
  </div>
</div>

  )
}
