import "../styles/App.css";
import { useSelector, useDispatch } from "react-redux";
import { notificationActions } from "../store/notificationslice";

function App() {
  const dispatch = useDispatch();
  const notificationDetails = useSelector((state) => state.notification);

  const submitHandler = async (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(notificationDetails),
    };
    const response = await fetch(
      "http://localhost:8000/api/notification/add",
      requestOptions
    );
    const data = await response.json();
    console.log(data);
  };

  const onChangeHandler = (object) => {
    dispatch(
      notificationActions.setField({
        field: object.target.id,
        value: object.target.value,
      })
    );
  };

  return (
    <div>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          value={notificationDetails.title}
          onChange={onChangeHandler}
        ></input>
        <label htmlFor="summary">summary</label>
        <input
          id="summary"
          value={notificationDetails.summary}
          onChange={onChangeHandler}
        ></input>
        <label htmlFor="contentType">contentType</label>
        <input
          id="contentType"
          value={notificationDetails.contentType}
          onChange={onChangeHandler}
        ></input>
        <label htmlFor="description">description</label>
        <input
          id="description"
          value={notificationDetails.description}
          onChange={onChangeHandler}
        ></input>
        <label htmlFor="url">url</label>
        <input
          id="url"
          value={notificationDetails.url}
          onChange={onChangeHandler}
        ></input>
        <button onClick={submitHandler}> Submit </button>
    </div>
  );
}

export default App;
