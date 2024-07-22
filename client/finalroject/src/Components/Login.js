import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Axios from "axios"
export default function Login() {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [error,setError] = useState("")
    const navigate = useNavigate()
    Axios.defaults.withCredentials = true
    const handleSubmit = (e) => {
        e.preventDefault()
        if(!email || !password){
            setError("Please fill all the fields")
            return
        }
        Axios.post("http://localhost:3000/auth/login",{
            email,
            password
        }).then(response =>{
            if(response.data.status){
                navigate("/")
            }
        }).catch(err=>{
            setError("Error occured,please try later")
        })
    }
  return (
    <div className="flex items-center justify-center min-h-[90vh] bg-gray-100 p-6">
  <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
    <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col">
        <label htmlFor="email" className="font-medium mb-1">Email:</label>
        <input
          type="email"
          id="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
          required
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="password" className="font-medium mb-1">Password:</label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
      >
        Login
      </button>
      <div className="mt-4 text-center">
        <p className="text-gray-600">Already have an account?</p>
        <button
          type="button"
          onClick={() => navigate("/signup")}
          className="text-blue-500 hover:underline mt-2"
        >
          SignUp
        </button>
      </div>
      {error && <p className="text-red-500 text-center mt-2">{error}</p>}
    </form>
  </div>
</div>

  )
}
