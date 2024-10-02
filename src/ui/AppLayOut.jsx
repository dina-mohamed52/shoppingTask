import { Outlet } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"

function AppLayOut() {
    return (
        <div className="flex flex-col min-h-screen" >
            <header>
                <Header cartItemCount={5}/>
            </header>
            <main className="flex-grow" >
                <Outlet/>
            </main>
            <Footer/>
       
        </div>
    )
}

export default AppLayOut