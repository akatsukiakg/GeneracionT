import React, {useEffect, useState} from 'react';
import { Card, Grid, Image, Input, Dropdown, Button } from 'semantic-ui-react';

export default function CharacterList({onSelect, lang='es'}){
  const [chars, setChars] = useState([]);
  const [loading, setLoading] = useState(true);

  const [query, setQuery] = useState('');
  const [speciesFilter, setSpeciesFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(1);
  const pageSize = 9;

  useEffect(()=>{
    let mounted = true;
    fetch('https://rickandmortyapi.com/api/character')
      .then(r=> r.json())
      .then(data=>{
        if(mounted){
          setChars(data.results || []);
          setLoading(false);
        }
      })
      .catch(()=>{
        if(mounted){ setChars([]); setLoading(false); }
      });
    return ()=> mounted = false;
  },[]);

  const speciesOptions = [{key:'all', text:'Todos', value:'all'}, ...Array.from(new Set(chars.map(c=>c.species))).map(s=>({key:s, text:s, value:s}))];
  const statusOptions = [{key:'all', text:'Todos', value:'all'}, ...Array.from(new Set(chars.map(c=>c.status))).map(s=>({key:s, text:s, value:s}))];

  if(loading) return <div className="no-results">{lang === 'es' ? 'Cargando personajes...' : 'Loading characters...'}</div>;

  const filtered = chars.filter(c=>{
    const matchesQuery = c.name.toLowerCase().includes(query.toLowerCase());
    const matchesSpecies = speciesFilter === 'all' ? true : c.species === speciesFilter;
    const matchesStatus = statusFilter === 'all' ? true : c.status === statusFilter;
    return matchesQuery && matchesSpecies && matchesStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageSafe = Math.min(page, totalPages);
  const visible = filtered.slice((pageSafe-1)*pageSize, pageSafe*pageSize);

  return (
    <div>
      <div className="top-bar">
        <div className="filter-panel">
          <Input className="search-input" icon='search' placeholder={lang === 'es' ? 'Buscar por nombre...' : 'Search by name...'} value={query} onChange={(e)=>{setQuery(e.target.value); setPage(1);}} />
          <Dropdown placeholder={lang === 'es' ? 'Especies' : 'Species'} selection options={speciesOptions} value={speciesFilter} onChange={(e,{value})=>{setSpeciesFilter(value); setPage(1);}} style={{marginLeft:8}} />
          <Dropdown placeholder={lang === 'es' ? 'Estado' : 'Status'} selection options={statusOptions} value={statusFilter} onChange={(e,{value})=>{setStatusFilter(value); setPage(1);}} style={{marginLeft:8}} />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="no-results">{lang === 'es' ? 'No se encontraron personajes con esos filtros.' : 'No characters found for those filters.'}</div>
      ) : (
        <Grid doubling columns={3} stackable>
          {visible.map(c=> (
            <Grid.Column key={c.id}>
              <Card className="card-custom" onClick={()=> onSelect(c)}>
                <Image src={c.image} wrapped ui={false} />
                <Card.Content>
                  <Card.Header>{c.name}</Card.Header>
                  <Card.Meta>{c.species} - {c.status}</Card.Meta>
                </Card.Content>
              </Card>
            </Grid.Column>
          ))}
        </Grid>
      )}

      <div className="pagination">
        <Button disabled={pageSafe <= 1} onClick={()=> setPage(p => Math.max(1, p-1))}>{lang === 'es' ? 'Anterior' : 'Previous'}</Button>
        <div className="small-muted">{lang === 'es' ? 'Página' : 'Page'} {pageSafe} / {totalPages}</div>
        <Button disabled={pageSafe >= totalPages} onClick={()=> setPage(p => Math.min(totalPages, p+1))}>{lang === 'es' ? 'Siguiente' : 'Next'}</Button>
      </div>
    </div>
  );
}
