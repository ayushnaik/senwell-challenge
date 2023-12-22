import './App.css'
import useAxios from './hooks/useAxios'

function App() {
  const { response, loading, error } = useAxios({
    method: "GET",
    url: `/products/1`,
    headers: {
      accept: '*/*'
    }
  });

  return (
    <div className='backgroundImage'>
      <h1>Senwell Challenge.</h1>
      {loading && (
        <p>Loading...</p>
      )}
      {error && (
        <p>{error.message}</p>
      )}
      {!loading && !error && (
        <article >
          <h3 >{response?.data.title}</h3>
          <p >
            <pre>{JSON.stringify(response?.data, null, 2) }</pre>
          </p>
        </article>
      )}
    </div>
  )
}

export default App
