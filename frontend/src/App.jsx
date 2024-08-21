import { Routes,Route } from "react-router-dom";
import Navbar from "./components/Navbar/navbar.component";
import Userauthform from "./components/UserAuthpage/Userauthform";
// import Editor from "./components/Editor_page/editor.pages";

const App = () => {
    return (
        <Routes>
            {/* <Route path="/editor" element={<Editor/>}/> */}
            <Route path="/" element={<Navbar/>}>
                <Route path="signin" element={<Userauthform type="signin"/>}/>
                <Route path="signup" element={<Userauthform type="signup"/>}/>
            </Route>
        </Routes>
        
    )
}

export default App;