function Footer() {
    const currentDate=new Date().toLocaleDateString("en-US", {day:'numeric',month: "long", year: "numeric"});
    return (
        <footer className="bg-[#525252] text-gray-100 p-4 text-center  w-full mt-auto">
                &copy;  {currentDate} - My E-Commerce App task
            </footer>
    )
}

export default Footer