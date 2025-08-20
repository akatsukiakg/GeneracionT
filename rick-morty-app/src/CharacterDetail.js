import React from 'react';
import { Segment, Image, List } from 'semantic-ui-react';

export default function CharacterDetail({character, lang='es'}){
  if(!character) return null;

  const labels = {
    especie: lang === 'es' ? 'Especie' : 'Species',
    status: lang === 'es' ? 'Estado' : 'Status',
    genero: lang === 'es' ? 'Género' : 'Gender',
    origen: lang === 'es' ? 'Origen' : 'Origin',
    ubicacion: lang === 'es' ? 'Ubicación' : 'Location'
  };

  return (
    <Segment style={{background: 'linear-gradient(90deg, rgba(255,255,255,0.02), rgba(0,0,0,0.06))', color:'#e6eef8'}}>
      <Image src={character.image} size="small" floated="left" />
      <h2 style={{color:'#fff'}}>{character.name}</h2>
      <List relaxed>
        <List.Item><strong>{labels.especie}:</strong> {character.species}</List.Item>
        <List.Item><strong>{labels.status}:</strong> {character.status}</List.Item>
        <List.Item><strong>{labels.genero}:</strong> {character.gender}</List.Item>
        <List.Item><strong>{labels.origen}:</strong> {character.origin && character.origin.name}</List.Item>
        <List.Item><strong>{labels.ubicacion}:</strong> {character.location && character.location.name}</List.Item>
      </List>
    </Segment>
  );
}
