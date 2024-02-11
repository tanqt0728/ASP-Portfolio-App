import axios from "axios";
import React, { useState, useEffect } from "react";
import { Input, Button } from "@nextui-org/react";
import Link from "next/link";
import { API_HOST, create_page } from "./api/api";

const Portfolio = () => {
  const [name, setName] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [pages, setPages] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async () => {
    try {
      if (!name) {
        setIsValid(false);
        return;
      }

      const newPage = await create_page(name);

      setName("");
      setPages([...pages, newPage]);
      setIsValid(true);
      setSubmitSuccess(true);
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("Error submitting form. Please try again later.");
    }
  };

  useEffect(() => {
    async function getAllPages() {
      try {
        const response = await axios.get(`${API_HOST}/`);
        console.log("API Response:", response.data);
        setPages(response.data);
      } catch (error) {
        console.error("Error fetching pages:", error);
        setError("Error fetching pages. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    getAllPages();
  }, [submitSuccess]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 mt-5">
          <form id="create-page">
            <div className="modal-body">
              <div className="col-auto">
                <label htmlFor="name" className="form-label">
                  Create Page
                </label>
                <Input
                  type="text"
                  size="small"
                  status={isValid ? "default" : "error"}
                  id="name"
                  name="name"
                  placeholder="Name of Page"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {!isValid && (
                  <div className="invalid-feedback">
                    Please provide a valid name.
                  </div>
                )}
              </div>
            </div>
            <div className="modal-footer">
              <Button
                type="button"
                variant="secondary"
                size="small"
                onClick={() => {
                  setName("");
                }}
              >
                Clear
              </Button>
              <Button
                type="button"
                variant="primary"
                size="small"
                onClick={handleSubmit}
              >
                Save
              </Button>
            </div>
          </form>
        </div>
        <div className="col-12 my-2">
          {error && (
            <div role="alert" className="alert alert-primary">
              {error}
            </div>
          )}
          {loading ? (
            <p>Loading...</p>
          ) : (
            <table className="table table-bordered table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Slug</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(pages) && pages.length > 0 ? (
                  pages.map((page) => (
                    <tr key={page._id}>
                      <td>{page._id}</td>
                      <td>{page.name}</td>
                      <td>{page.slug}</td>
                      <td>
                        <Link href={`/editor/${page._id}`}>
                          <span className="edit-link">Edit</span>
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">Create a New Page</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
