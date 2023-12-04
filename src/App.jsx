import { useDispatch } from "react-redux";
import Router from "shared/Router";
import { useEffect } from "react";
import { __getLetters } from "redux/modules/letters";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(__getLetters());
  }, []);
  return <Router />;
}

export default App;
