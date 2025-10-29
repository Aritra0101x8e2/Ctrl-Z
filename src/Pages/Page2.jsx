
import image from "../Images/bgimg.jpg"

function NavPage() {
    return (
        <>

            <div className=" flex flex-cols-3 gap-0 mt-10 ">
                <div className="md:w-7 w-1  h-180  bg-[#231b17]"></div>

                <div className=" w-screen border-2 bg-[#100A06]"> /
                    {/* Main content area  */}
                    <div className="h-screen ">
                        Second Page
                    </div>
                    {/* Main content area ends */}

                </div>
                <div className="md:w-7 w-1 h-180 bg-[#231b17]"></div>
            </div>
        </>
    )
}
export default NavPage;