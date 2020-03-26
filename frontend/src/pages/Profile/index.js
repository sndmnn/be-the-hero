import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import api from '../../services/api'

import './styles.css'
import logoImg from '../../assets/logo.svg'
import { FiPower, FiTrash2 } from 'react-icons/fi'

export default function Profile() {
  const history = useHistory()

  const [incidents, setIncidents] = useState([]) 

  const ngoId = localStorage.getItem('ngoId')
  const ngoName = localStorage.getItem('ngoName')

  useEffect(() => {
    api.get('profile', {
      headers: {
        Authorization: ngoId
      }
    }).then(response => {
      setIncidents(response.data)
    })
  }, [ngoId])

  async function handleDeleteIncident(id) {
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: ngoId
        }
      })
      setIncidents(incidents.filter(incident => incident.id !== id))
    }
    catch(err) {
      console.log(err)
      alert("Erro ao deletar o caso")
    }
  }

  function handleLogout() {
    localStorage.clear()

    history.push('/')
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be The Hero" />
        
        <span>Bem Vinda, {ngoName}</span>

        <Link to="/incidents/new" className="button">
          Cadastrar novo caso
        </Link>

        <button 
          type="button"
          onClick={handleLogout}  
        >
          <FiPower size={18} color="e02041" />
        </button>
      </header>

      <h1>Casos Cadastrados</h1>

      <ul>
        {
          incidents.map(incident => (
              <li key={incident.id}>
                <strong>CASO: </strong>
                <p>{incident.title}</p>

                <strong>DESCRIÇÃO: </strong>
                <p>{incident.description}</p>

                <strong>VALOR: </strong>
                <p>{
                  Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
                    .format(incident.value) 
                }</p>

                <button 
                  type="button"
                  onClick={() => handleDeleteIncident(incident.id)}>
                  <FiTrash2 size={20} color="#a8a8b3" />
                </button>
              </li>
          ))
        }
        
      </ul>
    </div>
  )
}