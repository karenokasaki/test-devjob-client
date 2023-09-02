export default function handleLogout(e) {
   e.preventDefault();
   localStorage.removeItem("userToken");
   navigate("/login");
}