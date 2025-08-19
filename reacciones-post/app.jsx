const { useState, useRef } = React;

function Post(){

  const [likes, setLikes] = useState(0);
  const [laughs, setLaughs] = useState(0);
  const [wows, setWows] = useState(0);

  const [comments, setComments] = useState([]);
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const likeRef = useRef();
  const laughRef = useRef();
  const wowRef = useRef();

  const MAX_LEN = 40;

  function bump(ref){
    if(!ref.current) return;
    ref.current.classList.add('pop');
    setTimeout(()=> ref.current && ref.current.classList.remove('pop'), 250);
  }

  function handleReact(kind){
    if(kind === 'like'){
      setLikes(l => l + 1);
      bump(likeRef);
    } else if(kind === 'laugh'){
      setLaughs(l => l + 1);
      bump(laughRef);
    } else if(kind === 'wow'){
      setWows(w => w + 1);
      bump(wowRef);
    }
  }

  function handleComment(e){
    e.preventDefault();
    const trimmed = input.trim();
    if(trimmed.length === 0){ setError('El comentario no puede estar vacío'); return; }
    if(trimmed.length > MAX_LEN){ setError(`Máximo ${MAX_LEN} caracteres`); return; }

    setComments(prev => [...prev, trimmed]);
    setInput('');
    setError('');
  }

  return (
    <div className="app">
      <div className="post-card">
        <div className="post-image" style={{backgroundImage: `url('https://images.unsplash.com/photo-1547721064-da6cfb341d50?auto=format&fit=crop&w=1200&q=60')`}} aria-hidden></div>
        <div className="post-text">¡Mi primer post en Reactbook! Probando reacciones y comentarios. 💬</div>

        <div className="reactions">
          <button ref={likeRef} className="react-btn" onClick={()=>handleReact('like')} aria-label="Me gusta">
            <span className="emoji">❤️</span>
            <span className="small-muted">Me gusta</span>
            <span className="react-count">{likes}</span>
          </button>

          <button ref={laughRef} className="react-btn" onClick={()=>handleReact('laugh')} aria-label="Me divierte">
            <span className="emoji">😂</span>
            <span className="small-muted">Me divierte</span>
            <span className="react-count">{laughs}</span>
          </button>

          <button ref={wowRef} className="react-btn" onClick={()=>handleReact('wow')} aria-label="Me sorprende">
            <span className="emoji">😮</span>
            <span className="small-muted">Me sorprende</span>
            <span className="react-count">{wows}</span>
          </button>
        </div>

        <form className="comment-form" onSubmit={handleComment}>
          <input aria-label="comentario" placeholder="Escribe un comentario (máx 40 chars)" value={input} onChange={e=> setInput(e.target.value)} />
          <button type="submit">Comentar</button>
        </form>
        {error && <div className="error-msg">{error}</div>}

        <div className="comments-list">
          {comments.length === 0 ? <div className="small-muted">Aún no hay comentarios. Sé el primero.</div> : comments.map((c,i)=>(
            <div className="comment-item" key={i}>{c}</div>
          ))}
        </div>

      </div>
    </div>
  );
}

ReactDOM.render(<Post />, document.getElementById('root'));
