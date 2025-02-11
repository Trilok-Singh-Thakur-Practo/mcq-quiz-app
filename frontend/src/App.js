import {Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import QuizPage from './Pages/QuizPage';
import CreateQuizPage from './Pages/CreateQuizPage';
import InviteUsers from './Pages/InviteUsers';
import TakeQuiz from './Pages/TakeQuiz';
import UserLoginPage from './Pages/UserLoginPage';
import ScorePage from './Pages/ScorePage';
import Header from './Pages/Header';

function App() {
  return (
    <Router>
      <Header /> 
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/quizzes/user-login" element={<UserLoginPage />} />
        <Route path="/quizzes" element={<QuizPage />} />
        <Route path="/quizzes/create-quiz" element={<CreateQuizPage />} />
        <Route path="/quizzes/invite-users" element={<InviteUsers />} />
        <Route path="/quizzes/take-quiz" element={<TakeQuiz />} />
        <Route path="/quizzes/score" element={<ScorePage />} />
      </Routes>
    </Router>
  );
}

export default App;