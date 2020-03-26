import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import api from '../../services/api'

import './styles.css'
import { FiLogIn } from 'react-icons/fi'
import logoImg from '../../assets/logo.svg'
import heroesImg from '../../assets/heroes.png'

export default function Logon() {
  const [ngoId, setId] = useState()
  const history = useHistory()

  async function handleLogon(event) {
    event.preventDefault()

    try {
      const response = await api.post('sessions', { ngoId })

      localStorage.setItem('ngoId', ngoId)
      localStorage.setItem('ngoName', response.data.name)

      history.push('profile')
    }
    catch(err) {
      alert("Falha no logon")
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="Be The Hero" />

        <form onSubmit={handleLogon}>
          <h1>Faça seu logon</h1>

          <input 
            placeholder="Seu ID"
            value={ngoId}
            onChange={e => setId(e.target.value)}
          />

          <button className="button" type="submit">Entrar</button>

          <Link to="/register" className="back-link">
            <FiLogIn size={16} color="#e02041" />
            Não tenho cadastro
          </Link>
        </form>
      </section>

      <img src={heroesImg} alt="An image of people embracing each other" />
    </div>
  )
}