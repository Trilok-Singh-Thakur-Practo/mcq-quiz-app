import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const hideHeaderPaths = ["/", "/login", "/quizzes/user-login"];

  if (hideHeaderPaths.includes(location.pathname)) {
    return null; // Don't render header on login pages
  }

  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold">MCQ Quiz APP</h1>
      <nav>
        <ul className="flex space-x-6">
          <li><Link to="/quizzes" className="hover:underline ">Dashboard</Link></li>
          <li><Link to="/quizzes/create-quiz" className="hover:underline">Create Quiz</Link></li>
          <li><Link to="/quizzes/invite-users" className="hover:underline">Invite Users</Link></li>
          <li><Link to="/login" className="hover:underline text-red-300">Logout</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
