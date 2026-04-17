// import frameworkData from "./framework.json";

// export default function FrameworkList() {
//     return (
//         <div className="p-8">
//             {frameworkData.map((item) => (
// 		            <div key={item.id} className="border p-4 mb-4 rounded-lg shadow-md bg-white">
// 		                <h2 className="text-lg font-bold text-gray-800">{item.name}</h2>
// 		                <p className="text-gray-600">{item.description}</p>
//                         <p className="text-sm text-gray-600">developed by: <span className = "font-bold text-gray-800 text-sm"> {item.details.developer}</span> ({item.details.releaseYear})</p>
//                         <a href={item.details.officialWebsite} target="_blank" rel="noopener noreferrer" className=" text-blue-500">Kunjungi Website Resmi</a>

//                          {item.tags.map((tag,index)=>(
//             <span key={index} className="bg-gray-200 text-gray-700 px-2 py-1 text-xs rounded-full mr-2">
//             {tag}
//             </span>
//             ))}
//                     </div>
//             ))}
            
//         </div>
//     )
// }

import frameworkData from "./framework.json";

export default function FrameworkList() {
    return (
        <div className="p-8 bg-[#0f1923] min-h-screen font-sans selection:bg-[#ff4655] selection:text-white">
            {/* Header dengan efek dekoratif Valorant */}
            <div className="mb-16 relative">
                <div className="absolute -left-4 top-0 h-full w-1 bg-[#ff4655] shadow-[0_0_15px_#ff4655]"></div>
                <h1 className="text-6xl font-black text-white uppercase italic tracking-tighter leading-none">
                    Framework <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff4655] to-[#ff4655]/50">Roster</span>
                </h1>
                <div className="flex items-center gap-4 mt-2">
                    <p className="text-gray-500 text-xs tracking-[0.3em] font-bold uppercase">Tactical Stack // Authorized Only</p>
                    <div className="h-[1px] flex-grow bg-gray-800"></div>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {frameworkData.map((item) => (
                    <div 
                        key={item.id} 
                        className="group relative bg-[#1f2326] transition-all duration-300 transform hover:-skew-x-2 shadow-2xl"
                    >
                        {/* 1. Aksesoris Sudut (Badass Detail) */}
                        <div className="absolute top-0 right-0 w-8 h-8 bg-[#ff4655] clip-path-slant opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                        
                        {/* 2. Glow Effect pada Background saat Hover */}
                        <div className="absolute inset-0 bg-[#ff4655]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                        <div className="p-8 relative border-l border-t border-white/5">
                            {/* Nomor Seri Agent */}
                            <div className="absolute top-4 right-6 font-mono text-gray-700 group-hover:text-[#ff4655] transition-colors duration-300 text-sm font-bold tracking-widest">
                                [ AGENT {item.id} ]
                            </div>

                            {/* Tags dengan gaya Tactical Badge */}
                            <div className="flex flex-wrap gap-2 mb-6">
                                {item.tags.map((tag, index) => (
                                    <span key={index} className="bg-transparent border border-gray-700 group-hover:border-[#ff4655]/50 text-gray-500 group-hover:text-white px-2 py-0.5 text-[10px] uppercase font-bold transition-all duration-300">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {/* Nama dengan Efek Underline Cinematic */}
                            <div className="relative inline-block mb-4">
                                <h2 className="text-3xl font-black text-white uppercase italic tracking-tight relative z-10 group-hover:translate-x-3 transition-transform duration-300">
                                    {item.name}
                                </h2>
                                <div className="absolute bottom-1 left-0 w-0 h-2 bg-[#ff4655]/30 group-hover:w-full transition-all duration-500 -rotate-2"></div>
                            </div>
                            
                            <p className="text-gray-400 text-sm leading-relaxed mb-8 h-12 overflow-hidden border-l-2 border-gray-800 group-hover:border-[#ff4655] pl-4 transition-colors duration-300">
                                {item.description}
                            </p>

                            <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-6">
                                <div>
                                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Developer</p>
                                    <p className="text-sm text-white font-bold group-hover:text-[#ff4655] transition-colors uppercase italic">{item.details.developer}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Year</p>
                                    <p className="text-lg text-white font-black italic italic leading-none">{item.details.releaseYear}</p>
                                </div>
                            </div>
                        </div>

                        {/* 3. Execute Button dengan Animasi Fill */}
                        <a 
                            href={item.details.officialWebsite} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="relative block w-full overflow-hidden group/btn py-4 bg-transparent border-t border-white/10 text-center"
                        >
                            <span className="absolute inset-0 w-0 bg-[#ff4655] group-hover/btn:w-full transition-all duration-300 ease-out"></span>
                            <span className="relative z-10 text-xs font-black uppercase tracking-[0.4em] text-white group-hover/btn:text-white flex justify-center items-center gap-2">
                                Execute Operation <span className="text-lg">→</span>
                            </span>
                        </a>
                    </div>
                ))}
            </div>

            {/* Efek Garis-Garis Background (Scanlines) */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]"></div>
        </div>
    );
}

