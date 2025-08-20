import React, {useState} from 'react';
import CharacterList from './CharacterList';
import CharacterDetail from './CharacterDetail';
import { Container, Button } from 'semantic-ui-react';

export default function App(){
  const [selected, setSelected] = useState(null);
  const [lang, setLang] = useState('es'); 

  function handleSelect(character){
    setSelected(character);
  }

  function handleBack(){
    setSelected(null);
  }

  return (
    <Container style={{padding: '24px'}}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <h1>{lang === 'es' ? 'Personajes Rick y Morty' : 'Rick and Morty Characters'}</h1>
        <div>
          <Button primary onClick={() => setLang(l => l === 'es' ? 'en' : 'es')}>
            {lang === 'es' ? 'Idioma: ES' : 'Language: EN'}
          </Button>
        </div>
      </div>

      {selected ? (
        <div>
          <Button onClick={handleBack} secondary>{lang === 'es' ? 'Volver' : 'Back'}</Button>
          <CharacterDetail character={selected} lang={lang} />
        </div>
      ) : (
        <CharacterList onSelect={handleSelect} lang={lang} />
      )}
    </Container>
  );
}
