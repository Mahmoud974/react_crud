import axios from "axios";
import { useEffect, useState } from "react";
import Article from "./components/Article";

const App = () => {
  const [data, setData] = useState([]);
  const [content, setContent] = useState("");
  const [name, setName] = useState("");
  const [err, setErr] = useState(false);
  const blogData = () => {
    axios
      .get("http://localhost:3004/articles")
      .then((res) => setData(res.data));
  };

  useEffect(() => {
    blogData();
  }, []);
  const sendForm = (e) => {
    e.preventDefault();

    if (content.length < 140 || name.length === 0 || name.length <= 3) {
      alert("fucj");
    } else {
      axios.post("http://localhost:3004/articles", {
        author: name,
        content,
        date: Date.now(),
      });
      setContent("");
      setName("");
      blogData();
    }
  };
  return (
    <div className="">
      <div className="my-5">
        <h1 className="uppercase font-bold text-4xl text-center my-5">
          Send your Data
        </h1>
        <form
          className="flex flex-col mx-auto max-w-sm space-y-5"
          onSubmit={(e) => sendForm(e)}
        >
          <input
            type="text"
            placeholder="Write your name"
            className="border-2 border-green-100 round-xl"
            onInput={(e) => setName(e.target.value)}
          />
          <textarea
            placeholder="Write your message"
            className="border-2 border-green-100 round-xl"
            onInput={(e) => setContent(e.target.value)}
          ></textarea>
          <input
            type="submit"
            value="Envoyer"
            className="inline-block px-6 py-3 text-sm font-medium text-blue-700 border border-blue-700 rounded hover:bg-blue-700 hover:text-white active:bg-slate-50 active:text-blue-700  "
          />
        </form>
      </div>
      <div className="max-w-3xl flex justify-center  items-center mx-auto">
        <ul className="flex justify-center flex-col items-center space-y-5 my-10 ">
          {data
            .sort((a, b) => b.date - a.date)
            .map((article) => (
              <Article article={article} key={article.id} />
            ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
