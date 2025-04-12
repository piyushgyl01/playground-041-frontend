import useFetch from "../hooks/useFetch";
import { Link } from "react-router-dom";

export default function Home() {
  const { data, loading, error, refetch } = useFetch(
    "http://localhost:4000/animes"
  );

  async function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this anime?")) {
      try {
        const response = await fetch(`http://localhost:4000/animes/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          refetch();
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <main className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Anime List</h2>
        <Link to="/create" className="btn btn-success">
          Add New Anime
        </Link>
      </div>

      {loading && (
        <div className="d-flex justify-content-center align-items-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {error && (
        <div className="d-flex justify-content-center align-items-center">
          <div className="alert alert-danger">{error}</div>
        </div>
      )}

      <div className="row">
        {data &&
          data.map((anime) => (
            <div className="col-md-12 mb-4 list-group" key={anime._id}>
              <div className="list-group-item list-group-item-action">
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">
                    {anime.title} produced by {anime.studio}
                  </h5>
                  <small className="text-body-secondary">
                    {new Date(anime.createdAt).toLocaleDateString()}
                  </small>
                </div>
                <p className="mb-1">{anime.descritpion}</p>
                <Link
                  to={`/details/${anime._id}`}
                  className="btn btn-primary me-2 mt-2"
                >
                  View Details
                </Link>
                <button
                  className="btn btn-danger mt-2"
                  onClick={() => handleDelete(anime._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
    </main>
  );
}
