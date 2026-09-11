import { Outlet, useNavigate } from "react-router-dom";

const Layout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-slate-50">

            <header className="h-16 border-b border-slate-200 bg-white">
                <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

                    <h1 className="text-lg font-bold tracking-tight text-slate-800">
                        Visitor Management
                    </h1>

                    <button
                        onClick={handleLogout}
                        className="rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
                    >
                        Logout
                    </button>
                </div>
            </header>

            <main>
                <Outlet />
            </main>

        </div>
    );
};

export default Layout;