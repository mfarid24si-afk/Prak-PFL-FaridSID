export default function TailwindsCSS(){
    return (
        <div>
            <FlexboxGrid/>
            <h1 class="border m-4">Belajar TailwindCSS 4</h1>
            <button className="bg-blue-950 text-yellow-600
                                px-4 py-2 mx-4 rounded
                                shadow-lg">Click Me</button>
            <Spacing/>
            <Typography/>
            <BorderRadius/>
            <BackgroundColors/>
            <ShadowEffects/>
        </div>
    )
}

function Spacing(){
    return (
        <div className="m-4 bg-blue-950 shadow-lg p-6 m-4 rounded-lg">
            <h2 className="text-white text-lg font-semibold">Card Title</h2>
            <p className="mt-2 text-yellow-600">Ini adalah contoh penggunaan padding dan margin di Tailwind.</p>
        </div>
    )
}

function Typography(){
    return (
        <div>
            <h1 className=" m-4 text-3xl font-extrabold text-blue-950">Tailwind Typography</h1>
            <p className="text-gray-600 text-lg mt-2">Belajar Tailwind sangat menyenangkan dan cepat!</p>
        </div>
    )
}

function BorderRadius(){
    return (
        <button className="m-4 border-2 border-orange-300 text-orange-300
                            px-4 py-2 ml-4 rounded-l-2xl"> Klik Saya </button>

        // <button className="border-3 border-orange-300 text-orange-300
        //                     px-4 py-2 ml-4 rounded-r-2xl"> Klik Saya </button>
    )
}

function BackgroundColors(){
    return(
        <div className="m-4 bg-orange-300 text-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold">Tailwind Colors</h3>
            <p className="mt-2">Belajar Tailwind itu seru dan fleksibel!</p>
        </div>
    )
}

function FlexboxGrid(){
    return (
        <nav className="flex justify-between bg-blue-950 p-4 text-white">
            <h1 className="text-lg font-bold">MyWebsite</h1>
            <ul className="flex space-x-4">
                <li><a href="#">Home</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Contact</a></li>
            </ul>
            <h1 className="text-lg text-red-400 font-bold">Log Out</h1>
        </nav>
    )
}

function ShadowEffects(){
    return (
        <div className="bg-white m-4 shadow-lg p-6 rounded-lg hover:rotate-90 transition">
            <h3 className="text-xl font-semibold">Hover me!</h3>
            <p className="text-gray-600 mt-2">Lihat efek bayangan saat hover.</p>
        </div>
    )
}