import React from "react";
import "./add.scss";

const Add = ({ isUpdate, slug, columns, setOpen, onFormSubmit, handleChange, formData, onFileChange, uploading}) => {
  return (
    <div className="add">
      <div className="modal">
        <span className="close" onClick={() => setOpen(false)}>
          X
        </span>
        <h1>{isUpdate ? "Update " : "Add new "}{slug}</h1>
        <form onSubmit={onFormSubmit}>
          {columns
            .filter((column) => column.field !== "id" && column.field !== "createdAt")
            .map((column) => (
            <div className="item" key={column.field}>
              <label>{column.headerName}:</label>
              {column.type === "file" ? (
                <>
                  <input
                    type="file"
                    className="form-control"
                    id={column.field}
                    name={column.field}
                    onChange={onFileChange}
                    required={column.required}
                  />
                  {formData[column.field] && (
                    <img
                      src={URL.createObjectURL(formData[column.field])}
                      alt=""
                      className="preview-image"
                    />
                  )}
                </>
              ) : (
                <input
                  type={column.type || "text"}
                  className="form-control"
                  id={column.field}
                  name={column.field}
                  value={formData[column.field] || ""}
                  onChange={handleChange}
                  required={column.required}
                />
              )}
            </div>
          ))}
          <button type="submit">{uploading ? "Uploading..." : `${isUpdate ? "Update " : "Add new "}${slug}`}</button>
        </form>
      </div>
    </div>
  );
};

export default Add;
