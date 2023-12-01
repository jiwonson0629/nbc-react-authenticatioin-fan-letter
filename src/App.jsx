import { useDispatch } from "react-redux";
import Router from "shared/Router";
import { useEffect } from "react";
import { __getLetters } from "redux/modules/letters";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("app useEffect render");
    dispatch(__getLetters());
  }, []);
  return <Router />;
}

export default App;
