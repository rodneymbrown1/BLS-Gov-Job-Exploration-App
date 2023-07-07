export default function Navbar() {
    return (
      <div>
      <nav className="flex items-center justify-between bg-black text-white py-4 px-8">
        <div className="flex items-center">
          <h1>JobTrendsPro</h1>
        </div>
        <ul className="flex space-x-4">
        <li className="navbar-link transition-transform transform hover:scale-105">
        <a href="/">Home</a>
          </li>

        </ul>
      </nav></div>
    );
  }