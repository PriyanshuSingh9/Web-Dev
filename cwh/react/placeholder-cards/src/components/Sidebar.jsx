import "./Sidebar.css";

const Sidebar = ({ user_arr, currentUser, setUser }) => {
  return (
    <div className="sidebar">
      <h2 className="filter">Choose User</h2>
      <ul>
        {user_arr.map((userName) => (
          <li
            key={userName}
            className={`side-item ${currentUser === userName ? "active" : ""
              }`}
            onClick={() => {
              setUser(userName);
              console.log(userName);
            }}
          >
            {userName}
          </li>
        ))}
        <button onClick={() => setUser("ALL")}
        >
          ALL USERS
        </button>
      </ul>
    </div>
  );
};

export default Sidebar;
