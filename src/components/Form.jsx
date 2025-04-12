import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Form({ isEdit }) {
  const [formData, setFormData] = useState({
    title: "",
    descritpion: "",
    studio: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  const { data, loading, error, refetch } = useFetch(
    `https://playground-041-backend.vercel.app/animes/${id}`
  );

  useEffect(() => {
    if (isEdit && data) {
      setFormData({
        title: data?.title || "",
        descritpion: data?.descritpion || "",
        studio: data?.studio || "",
      });
    }
  }, [isEdit, id, data]);

  async function onSubmit(e) {
    e.preventDefault();

    try {
      if (isEdit) {
        const response = await fetch(
          `https://playground-041-backend.vercel.app/animes/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        if (response.ok) {
          navigate(`/details/${id}`);
          refetch();
        }
      } else {
        const response = await fetch(
          `https://playground-041-backend.vercel.app/animes`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        if (response.ok) {
          navigate(`/`);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="card shadow border-0">
      <div className="card-body p-4">
        <h2 className="card-title mb-4">
          {isEdit ? "Edit Anime Details" : "Add New Anime"}
        </h2>

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

        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              name="title"
              id="title"
              placeholder="e.g., One Piece"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="descritpion" className="form-label">
              Description
            </label>
            <textarea
              type="text"
              className="form-control"
              name="descritpion"
              id="descritpion"
              placeholder="e.g., A world about pirates"
              value={formData.descritpion}
              onChange={(e) =>
                setFormData({ ...formData, descritpion: e.target.value })
              }
              rows={8}
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="studio" className="form-label">
              Studio
            </label>
            <input
              type="text"
              className="form-control"
              name="studio"
              id="studio"
              placeholder="e.g., Toei Animation"
              value={formData.studio}
              onChange={(e) =>
                setFormData({ ...formData, studio: e.target.value })
              }
              required
            />
          </div>
          <div className="d-flex gap-2">
            <Link
              to={isEdit ? `/details/${id}` : "/"}
              className="btn btn-secondary"
            >
              Cancel
            </Link>
            <button type="submit" className="btn btn-primary">
              {isEdit ? "Save Changes" : "Add Anime"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
