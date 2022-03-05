import { Routes, Route } from 'react-router-dom';
import App from './App';
import List from './screens/ListScreen';

const Router = () => {
    return (
        <Routes>
            <Route path="/app" element={<App/>}/>
            <Route path="/list" element={<List/>}/>
        </Routes>
    );
};

export default Router;