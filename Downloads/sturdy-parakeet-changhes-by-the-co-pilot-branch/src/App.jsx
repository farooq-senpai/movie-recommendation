import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import AssignProblem from './pages/AssignProblem';
import ProblemList from './pages/ProblemList';
import SolveProblem from './pages/SolveProblem';
import Visualizer from './pages/Visualizer';

function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/assign" element={<AssignProblem />} />
                    <Route path="/problems" element={<ProblemList />} />
                    <Route path="/solve/:id" element={<SolveProblem />} />
                    <Route path="/visualizer" element={<Visualizer />} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;
