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
        <div className="p-8 bg-[#0f1923] min-h-screen font-sans">
            {/* Header bergaya Valorant */}
            <div className="mb-12 border-l-4 border-[#ff4655] pl-4">
                <h1 className="text-5xl font-black text-white uppercase tracking-tighter italic">
                    Framework <span className="text-[#ff4655]">Protocol</span>
                </h1>
                <p className="text-gray-400 text-sm tracking-widest uppercase mt-2">Select your stack // Roster 2024</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {frameworkData.map((item) => (
                    <div 
                        key={item.id} 
                        className="group relative bg-[#1f2326] border-b-4 border-transparent hover:border-[#ff4655] transition-all duration-200 overflow-hidden"
                    >
                        {/* Efek Garis Dekoratif Khas Valorant */}
                        <div className="absolute top-0 right-0 p-2 opacity-10 text-white font-bold text-4xl italic select-none">
                            0{item.id}
                        </div>

                        <div className="p-6">
                            {/* Tags dengan gaya Badge Militer */}
                            <div className="flex flex-wrap gap-2 mb-4">
                                {item.tags.map((tag, index) => (
                                    <span key={index} className="border border-gray-600 text-gray-400 px-2 py-0.5 text-[9px] uppercase tracking-widest font-bold">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <h2 className="text-2xl font-black text-white uppercase italic tracking-tight mb-2 group-hover:translate-x-2 transition-transform italic">
                                {item.name}
                            </h2>
                            
                            <p className="text-gray-400 text-sm leading-relaxed mb-6 h-12 overflow-hidden border-l border-gray-700 pl-3">
                                {item.description}
                            </p>

                            <div className="flex justify-between items-end">
                                <div>
                                    <p className="text-[10px] text-[#ff4655] font-bold uppercase tracking-[0.2em]">Origin</p>
                                    <p className="text-sm text-gray-200 font-medium">{item.details.developer}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] text-gray-500 font-bold uppercase">Released</p>
                                    <p className="text-sm text-gray-200 italic font-bold">{item.details.releaseYear}</p>
                                </div>
                            </div>
                        </div>

                        {/* Tombol Akses ala Valorant Store */}
                        <a 
                            href={item.details.officialWebsite} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="block w-full bg-white hover:bg-[#ff4655] text-black hover:text-white py-3 text-center text-xs font-black uppercase tracking-widest transition-colors duration-300"
                        >
                            Execute // Website
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}
