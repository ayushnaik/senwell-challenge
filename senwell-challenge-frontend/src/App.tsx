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
    <div>
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
            {JSON.stringify(response?.data)}
          </p>
        </article>
      )}
    </div>
  )
}

export default App