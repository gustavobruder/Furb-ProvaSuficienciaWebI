import React from 'react';
import { Routes, Route } from 'react-router-dom';
import App from './App';
import List from './screens/ListScreen';
import Header from './components/Header/Header';

const Router = () => {
    return (
        <React.Fragment>
            <Header></Header>
            <Routes>
                <Route path="/" element={<App/>}/>
                <Route path="/home" element={<App/>}/>
                <Route path="/list" element={<List/>}/>
            </Routes>
        </React.Fragment>
    );
};

export default Router;