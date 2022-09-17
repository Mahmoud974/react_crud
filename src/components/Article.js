import axios from "axios";
import React, { useState } from "react";

const Article = ({ article }) => {
  const [editContent, setEditContent] = useState("");
  const [activeContent, setActiveContent] = useState(false);
  const [err, setErr] = useState(false);
  const dateFormater = (date) => {
    let newDate = new Date(date).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
    return newDate;
  };

  const handleEdit = () => {
    if (editContent.length < 140) {
      setErr(true);
    } else {
      const data = {
        author: article.author,
        content: editContent ? editContent : article.content,
        date: article.date,
        updatedDate: Date.now(),
      };

      axios
        .put("http://localhost:3004/articles/" + article.id, data)
        .then(() => {
          setActiveContent(false);
        })
        .then(() => setErr(false));
    }
  };
  const handleDelete = () => {
    axios.delete("http://localhost:3004/articles/" + article.id);

    window.location.reload();
  };
  return (
    <li
      className="relative block p-8 border border-gray-100 shadow-xl rounded-xl "
      href=""
    >
      <div className="flex justify-between">
        <h5 className="mt-4 text-xl font-bold text-gray-900">
          {article.author}
        </h5>
        <span className="flex items-center rounded-full px-3  bg-green-100 text-green-600 font-medium text-xs">
          {dateFormater(article.date)}
        </span>
      </div>
      <div className="mt-4 text-gray-500 sm:pr-8">
        {activeContent ? (
          <textarea
            defaultValue={editContent ? editContent : article.content}
            autoFocus
            className={err ? "border-2 border-red-400" : ""}
            onChange={(e) => setEditContent(e.target.value)}
          ></textarea>
        ) : (
          <p className="hidden mt-2 text-sm sm:block">
            {editContent ? editContent : article.content}
          </p>
        )}
      </div>
      {err && <p className="text-red-600">Binding 140 caraters</p>}
      <div className="flex justify-end space-x-2">
        {activeContent ? (
          <button
            onClick={() => handleEdit()}
            className="inline-block px-6 py-3 text-sm font-medium text-emerald-800 border border-emerald-700 rounded hover:bg-emerald-700 hover:text-white  "
          >
            Valider
          </button>
        ) : (
          <button
            onClick={() => setActiveContent(true)}
            className="inline-block px-6 py-3 text-sm font-medium text-amber-400 border border-amber-400 rounded hover:bg-amber-400 hover:text-white active:bg-red-500 "
          >
            Modifier
          </button>
        )}

        <button
          onClick={() => {
            if (window.confirm("Do you want delete it?")) {
              handleDelete();
            }
          }}
          className="inline-block px-6 py-3 text-sm font-medium text-red-600 border border-red-600 rounded hover:bg-red-600 hover:text-white active:bg-red-500 focus:outline-none"
        >
          Supprimer
        </button>
      </div>
    </li>
  );
};

export default Article;
