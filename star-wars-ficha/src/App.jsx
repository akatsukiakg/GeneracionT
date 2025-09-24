import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [characters, setCharacters] = useState([])
  const [selectedCharacter, setSelectedCharacter] = useState('')
  const [characterDetails, setCharacterDetails] = useState(null)
  const [loading, setLoading] = useState(true)
  const [nickname, setNickname] = useState('')
  const [isFavorite, setIsFavorite] = useState(false)
  const [savedSheet, setSavedSheet] = useState(null)

  // Fetch characters on component mount
  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setLoading(true)
        const response = await fetch('https://swapi.dev/api/people/?page=1')
        const data = await response.json()
        setCharacters(data.results)
      } catch (error) {
        console.error('Error fetching characters:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCharacters()
  }, [])

  // Fetch character details when selection changes
  useEffect(() => {
    const fetchCharacterDetails = async () => {
      if (selectedCharacter) {
        try {
          const response = await fetch(selectedCharacter)
          const data = await response.json()
          setCharacterDetails(data)
        } catch (error) {
          console.error('Error fetching character details:', error)
          setCharacterDetails(null)
        }
      } else {
        setCharacterDetails(null)
      }
    }

    fetchCharacterDetails()
  }, [selectedCharacter])

  const handleCharacterChange = (event) => {
    const value = event.target.value
    setSelectedCharacter(value)
    setSavedSheet(null) // Clear previous saved sheet
    setNickname('') // Clear nickname when changing character
    setIsFavorite(false) // Reset favorite status
  }

  const handleSaveSheet = () => {
    if (characterDetails && nickname.trim()) {
      const sheet = {
        character: characterDetails,
        nickname: nickname.trim(),
        isFavorite
      }
      setSavedSheet(sheet)
    }
  }

  return (
    <div className="app">
      <h1>Ficha Galáctica - Star Wars</h1>
      
      {loading ? (
        <div className="loading">Cargando personajes...</div>
      ) : (
        <>
          {/* Character Selection */}
          <div className="character-selection">
            <label htmlFor="character-select">Selecciona un personaje:</label>
            <select 
              id="character-select"
              value={selectedCharacter} 
              onChange={handleCharacterChange}
            >
              <option value="">-- Elige un personaje --</option>
              {characters.map((character, index) => (
                <option key={index} value={character.url}>
                  {character.name}
                </option>
              ))}
            </select>
          </div>

          {/* Character Preview */}
          {characterDetails && (
            <div className="character-preview">
              <h2>Vista Previa del Personaje</h2>
              <div className="character-info">
                <p><strong>Nombre:</strong> {characterDetails.name}</p>
                <p><strong>Altura:</strong> {characterDetails.height} cm</p>
                <p><strong>Año de nacimiento:</strong> {characterDetails.birth_year}</p>
              </div>
            </div>
          )}

          {/* Form */}
          {characterDetails && (
            <div className="character-form">
              <h2>Crear Ficha</h2>
              <div className="form-group">
                <label htmlFor="nickname">Apodo en tu ficha:</label>
                <input
                  type="text"
                  id="nickname"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder="Ingresa un apodo"
                />
              </div>
              
              <div className="form-group">
                <label>
                  <input
                    type="checkbox"
                    checked={isFavorite}
                    onChange={(e) => setIsFavorite(e.target.checked)}
                  />
                  ¿Es tu favorito?
                </label>
              </div>

              <button 
                onClick={handleSaveSheet}
                disabled={!nickname.trim()}
                className="save-button"
              >
                Guardar Ficha
              </button>
            </div>
          )}

          {/* Saved Sheet Summary */}
          {savedSheet && (
            <div className="saved-sheet">
              <h2>Ficha Guardada</h2>
              <div className="sheet-summary">
                <h3>{savedSheet.character.name}</h3>
                <p><strong>Apodo:</strong> {savedSheet.nickname}</p>
                <p><strong>Altura:</strong> {savedSheet.character.height} cm</p>
                <p><strong>Año de nacimiento:</strong> {savedSheet.character.birth_year}</p>
                <p><strong>Es favorito:</strong> {savedSheet.isFavorite ? 'Sí' : 'No'}</p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default App
