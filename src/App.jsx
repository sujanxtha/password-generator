import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numAllowed, SetNumAllowed] = useState(false)
  const [charAllowed, SetCharAllowed] = useState(false)
  const [password, SetPassword] = useState("")
 
  let [colorBtn, SetcolorBtn] = useState("bg-blue-400")

  
  const passwordGenerator = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*()_+"
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    SetPassword(pass)

  }, [length, numAllowed, charAllowed, SetPassword])

  useEffect(() => {passwordGenerator()}, [length, numAllowed, charAllowed, passwordGenerator])
  const passRef = useRef(null)
  const copyToClipboard = ()=>{
    window.navigator.clipboard.writeText(password)
    
    passRef.current?.select();
    SetcolorBtn ("bg-blue-600")
    setTimeout(()=>{
      SetcolorBtn("bg-blue-400");
    },400);
    
  }

  return (
    <>
      
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-white bg-gray-700 pb-2">
      <h1 className='text-2xl text-center mt-4 mb-2 text-'>Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input type="text" value={password} className='outline-none w-full py-1 px-3 bg-white text-black' placeholder='Password'ref={passRef} readOnly/>
          <button className={`outline-none ${colorBtn} px-3 py-1 shrink-0 cursor-pointer`} onClick={copyToClipboard}>Copy</button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input type="range" min={8} max={24} className='cursor-pointer' value={length} onChange={
              (e)=> setLength(e.target.value)
            } />
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input type="checkbox" name="isNum" id="isNum" defaultChecked= {numAllowed} onChange={()=>{
              SetNumAllowed((prev)=>!prev)
            }} />
            <label htmlFor="isNum">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input type="checkbox" name="isChar" id="isChar" defaultChecked= {charAllowed} onChange={()=>{
              SetCharAllowed((prev)=>!prev)
            }} />
            <label htmlFor="isNum">Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
