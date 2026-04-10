// export default function TailwindsCSS(){
//     return (
//         <div>
//             <FlexboxGrid/>
//             <h1 class="border m-4">Belajar TailwindCSS 4</h1>
//             <button className="bg-blue-950 text-yellow-600
//                                 px-4 py-2 mx-4 rounded
//                                 shadow-lg">Click Me</button>
//             <Spacing/>
//             <Typography/>
//             <BorderRadius/>
//             <BackgroundColors/>
//             <ShadowEffects/>
//         </div>
//     )
// }

// function Spacing(){
//     return (
//         <div className="m-4 bg-blue-950 shadow-lg p-6 m-4 rounded-lg">
//             <h2 className="text-white text-lg font-semibold">Card Title</h2>
//             <p className="mt-2 text-yellow-600">Ini adalah contoh penggunaan padding dan margin di Tailwind.</p>
//         </div>
//     )
// }

// function Typography(){
//     return (
//         <div>
//             <h1 className=" m-4 text-3xl font-extrabold text-blue-950">Tailwind Typography</h1>
//             <p className="text-gray-600 text-lg mt-2">Belajar Tailwind sangat menyenangkan dan cepat!</p>
//         </div>
//     )
// }

// function BorderRadius(){
//     return (
//         <button className="m-4 border-2 border-orange-300 text-orange-300
//                             px-4 py-2 ml-4 rounded-l-2xl"> Klik Saya </button>

//         // <button className="border-3 border-orange-300 text-orange-300
//         //                     px-4 py-2 ml-4 rounded-r-2xl"> Klik Saya </button>
//     )
// }

// function BackgroundColors(){
//     return(
//         <div className="m-4 bg-orange-300 text-white p-6 rounded-lg shadow-lg">
//             <h3 className="text-xl font-bold">Tailwind Colors</h3>
//             <p className="mt-2">Belajar Tailwind itu seru dan fleksibel!</p>
//         </div>
//     )
// }

// function FlexboxGrid(){
//     return (
//         <nav className="flex justify-between bg-blue-950 p-4 text-white">
//             <h1 className="text-lg font-bold">MyWebsite</h1>
//             <ul className="flex space-x-4">
//                 <li><a href="#">Home</a></li>
//                 <li><a href="#">About</a></li>
//                 <li><a href="#">Contact</a></li>
//             </ul>
//             <h1 className="text-lg text-red-400 font-bold">Log Out</h1>
//         </nav>
//     )
// }

// function ShadowEffects(){
//     return (
//         <div className="bg-white m-4 shadow-lg p-6 rounded-lg hover:rotate-90 transition">
//             <h3 className="text-xl font-semibold">Hover me!</h3>
//             <p className="text-gray-600 mt-2">Lihat efek bayangan saat hover.</p>
//         </div>
//     )
// }

export default function TailwindsCSS() {
  return (
    <div className="min-h-screen bg-[#0f1923] text-[#ece8e1] font-sans selection:bg-[#ff4655]">
      <FlexboxGrid />
      <div className="max-w-4xl mx-auto py-10 px-6 space-y-8">
        <h1 className="border-l-4 border-[#ff4655] pl-4 m-4 text-2xl font-black uppercase italic tracking-tighter">
          Belajar TailwindCSS 4
        </h1>
        <button className="bg-[#ff4655] text-[#0f1923] px-8 py-3 mx-4 rounded-sm font-black uppercase italic tracking-widest hover:bg-[#ece8e1] transition-all shadow-[4px_4px_0px_0px_rgba(236,232,225,0.2)]">
          Click Me
        </button>
        <Spacing />
        <Typography />
        <div className="flex gap-4 items-center">
            <BorderRadius />
        </div>
        <BackgroundColors />
        <ShadowEffects />
      </div>
    </div>
  )
}

function Spacing() {
  return (
    <div className="m-4 bg-[#1f2326] border border-white/10 shadow-xl p-6 rounded-none relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-1 h-full bg-[#ff4655]"></div>
      <h2 className="text-white text-xl font-black uppercase italic tracking-tight">Card Title</h2>
      <p className="mt-2 text-[#ff4655] font-bold uppercase text-sm">
        Ini adalah contoh penggunaan padding dan margin di Tailwind.
      </p>
    </div>
  )
}

function Typography() {
  return (
    <div className="m-4">
      <h1 className="text-5xl font-black italic tracking-tighter text-white uppercase leading-none">
        Tailwind Typography
      </h1>
      <p className="text-gray-400 text-lg mt-2 font-medium">
        Belajar Tailwind sangat menyenangkan dan cepat!
      </p>
    </div>
  )
}

function BorderRadius() {
  return (
    <button className="m-4 border-2 border-[#ff4655] text-[#ff4655] px-6 py-2 ml-4 rounded-l-2xl font-black uppercase italic hover:bg-[#ff4655] hover:text-white transition-all">
      Klik Saya
    </button>
  )
}

function BackgroundColors() {
  return (
    <div className="m-4 bg-[#ff4655] text-[#0f1923] p-8 rounded-none shadow-lg relative">
      <div className="absolute top-2 right-2 text-[10px] font-black opacity-30">DATA//COLOR</div>
      <h3 className="text-2xl font-black uppercase italic">Tailwind Colors</h3>
      <p className="mt-2 font-bold uppercase tracking-tight">
        Belajar Tailwind itu seru dan fleksibel!
      </p>
    </div>
  )
}

function FlexboxGrid() {
  return (
    <nav className="flex justify-between bg-[#111] border-b border-white/10 p-5 text-white items-center">
      <div className="flex items-center gap-4">
        <div className="w-6 h-6 bg-[#ff4655] rotate-45"></div>
        <h1 className="text-xl font-black uppercase italic tracking-[0.2em]">MyWebsite</h1>
      </div>
      <ul className="flex space-x-8 text-[11px] font-black uppercase tracking-widest text-gray-400">
        <li><a href="#" className="hover:text-[#ff4655] transition">Home</a></li>
        <li><a href="#" className="hover:text-[#ff4655] transition">About</a></li>
        <li><a href="#" className="hover:text-[#ff4655] transition">Contact</a></li>
      </ul>
      <h1 className="text-xs text-[#ff4655] font-black uppercase tracking-tighter cursor-pointer hover:underline">
        Log Out
      </h1>
    </nav>
  )
}

function ShadowEffects() {
  return (
    <div className="bg-[#ece8e1] m-4 shadow-[8px_8px_0px_0px_rgba(255,70,85,1)] p-8 rounded-none group cursor-help transition-all border border-black/10">
      <h3 className="text-2xl font-black uppercase italic text-[#0f1923]">Hover me!</h3>
      <p className="text-slate-600 mt-2 font-bold uppercase text-sm">
        Lihat efek bayangan saat hover.
      </p>
      <div className="mt-4 h-1 w-0 group-hover:w-full bg-[#ff4655] transition-all duration-500"></div>
    </div>
  )
}
