import { HashRouter, Routes, Route } from "react-router-dom"
import Login from "./Component/Auth/Login";
import { Provider } from "react-redux";
import store from "./Store/store";
import 'tailwindcss/tailwind.css';
import './App.css'
import Projects from "./Component/Projects/Projects";

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <Routes>
          <Route path='/Login' element={<Login />} />
          <Route path="/" element={<Projects />} />
          <Route path="/hello" element={<h1>Hello</h1>}></Route>
        </Routes>
      </HashRouter>
    </Provider>
  );
}

export default App;
