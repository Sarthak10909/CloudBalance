import Sidebar from '../../components/layout/Sidebar'
import Navbar from '../../components/layout/Navbar'
import { Outlet } from "react-router-dom"
import Footer from '../../components/layout/Footer'

function Dashboard() {
    return (
        <div>
            <Navbar />
            <div className="flex">
                <Sidebar />
                <div className="flex-1 p-6 bg-gray-100 min-h-[calc(100vh-112px)]">
                    <Outlet />
                    <div className="bottom-0 fixed">
                    <Footer />
                    </div>
                </div>

            </div>
        </div>
    )
}


export default Dashboard
