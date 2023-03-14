import styled from "styled-components"
import { FaSearch } from 'react-icons/fa'
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Search = () => {
  const [input, setInput] = useState('')
  const navigate = useNavigate()

  const submitHandler = (e) => {
    e.preventDefault();
    navigate('/searched/'+input)
  }

  return (
    <FormStyle onSubmit={submitHandler}>
      <div>
        <FaSearch />
        <input value={input} onChange={(e) => setInput(e.target.value)} type="text" />
      </div>
    </FormStyle>
  )
}


const FormStyle = styled.form`
  margin: 2rem 20rem 0;
  position: relative;
  div{
    width: 100%;
  }

  input{
    border: none;
    background: linear-gradient(45deg, #494949, #313131);
    font-size: 1.5rem;
    border-radius: 1rem;
    color: #fff;
    padding: 1rem 3rem;
    outline: none;
    width: 100%;
  }
  svg{
    position: absolute;
    top: 50%;
    left: 0;
    transform: translate(100%, -50%);
    color: #fff;
  }
`

export default Search