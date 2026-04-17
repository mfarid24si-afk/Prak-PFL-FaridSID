// import { useState } from "react"; // 1. WAJIB IMPORT INI
// import frameworkData from "./framework.json";

// export default function FrameworkListSearchFilter() {
//     const [searchTerm, setSearchTerm] = useState("");
//     const [selectedTag, setSelectedTag] = useState("");

//     const _searchTerm = searchTerm.toLowerCase();
    
//     const filteredFrameworks = frameworkData.filter((framework) => {
//         const matchesSearch =
//             framework.name.toLowerCase().includes(_searchTerm) ||
//             framework.description.toLowerCase().includes(_searchTerm);

//         const matchesTag = selectedTag ? framework.tags.includes(selectedTag) : true;

//         return matchesSearch && matchesTag;
//     });

//     const allTags = [
//         ...new Set(frameworkData.flatMap((framework) => framework.tags)),
//     ];

//     return (
//         <div className="p-8 bg-[#0f1923] min-h-screen text-white">
//             <h1 className="text-3xl font-black uppercase italic mb-6 border-l-4 border-[#ff4655] pl-4">
//                 Protocol <span className="text-[#ff4655]">Finder</span>
//             </h1>

//             <div className="flex flex-col md:flex-row gap-4 mb-8">
//                 {/* Input Search */}
//                 <input
//                     type="text"
//                     placeholder="SEARCH PROTOCOL..."
//                     className="flex-grow p-3 bg-[#1f2326] border border-gray-700 focus:border-[#ff4655] outline-none transition-all uppercase tracking-widest text-sm"
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                 />

//                 {/* Dropdown Filter - PERBAIKAN DI SINI */}
//                 <select
//                     className="p-3 bg-[#1f2326] border border-gray-700 focus:border-[#ff4655] outline-none uppercase tracking-widest text-sm cursor-pointer"
//                     onChange={(e) => setSelectedTag(e.target.value)} // 2. PAKAI SETSELECTEDTAG
//                 >
//                     <option value="">All Categories</option>
//                     {allTags.map((tag, index) => (
//                         <option key={index} value={tag}>
//                             {tag}
//                         </option>
//                     ))}
//                 </select>
//             </div>

//             {/* List Result */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {filteredFrameworks.map((item) => (
//                     <div key={item.id} className="bg-[#1f2326] p-6 border-b-2 border-transparent hover:border-[#ff4655] transition-all group">
//                         <h2 className="text-xl font-bold uppercase italic group-hover:text-[#ff4655] transition-colors">
//                             {item.name}
//                         </h2>
//                         <p className="text-gray-400 text-sm my-3 line-clamp-2">{item.description}</p>
                        
//                         <div className="flex flex-wrap gap-2 mt-4">
//                             {item.tags.map((tag, index) => (
//                                 <span key={index} className="text-[10px] border border-gray-600 px-2 py-1 uppercase tracking-tighter">
//                                     {tag}
//                                 </span>
//                             ))}
//                         </div>
//                     </div>
//                 ))}
//             </div>

//             {/* Handle jika hasil kosong */}
//             {filteredFrameworks.length === 0 && (
//                 <div className="text-center py-20 border-2 border-dashed border-gray-800">
//                     <p className="text-gray-500 tracking-[0.5em] uppercase">No Data Found // 404</p>
//                 </div>
//             )}
//         </div>
//     );
// }

import { useState } from "react"; // Perbaikan 1: Import useState
import frameworkData from "./framework.json";

export default function FrameworkListSearchFilter() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedTag, setSelectedTag] = useState("");

    const _searchTerm = searchTerm.toLowerCase();
    
    const filteredFrameworks = frameworkData.filter((framework) => {
        const matchesSearch =
            framework.name.toLowerCase().includes(_searchTerm) ||
            framework.description.toLowerCase().includes(_searchTerm);

        const matchesTag = selectedTag ? framework.tags.includes(selectedTag) : true;

        return matchesSearch && matchesTag;
    });

    const allTags = [...new Set(frameworkData.flatMap((framework) => framework.tags))];

    return (
        <div className="max-w-6xl mx-auto p-8 bg-gray-50 min-h-screen">
            {/* Header Section */}
            <div className="mb-10 text-center">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Framework Explorer</h1>
                <p className="text-gray-600">Temukan library terbaik untuk proyek dokumentasi Anda</p>
            </div>

            {/* Filter Section */}
            <div className="flex flex-col md:flex-row gap-4 mb-10">
                <div className="relative flex-grow">
                    <input
                        type="text"
                        placeholder="Cari nama atau deskripsi..."
                        className="w-full p-4 pl-12 bg-white border border-gray-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <span className="absolute left-4 top-4 opacity-30 text-xl">🔍</span>
                </div>

                <select
                    className="p-4 bg-white border border-gray-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer min-w-[200px]"
                    onChange={(e) => setSelectedTag(e.target.value)} // Perbaikan 2: Pakai setSelectedTag
                >
                    <option value="">Semua Kategori</option>
                    {allTags.map((tag, index) => (
                        <option key={index} value={tag}>{tag}</option>
                    ))}
                </select>
            </div>

            {/* Grid List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredFrameworks.map((item) => (
                    <div key={item.id} className="bg-white border border-gray-100 p-6 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
                        <div className="flex-grow">
                            <div className="flex flex-wrap gap-2 mb-4">
                                {item.tags.map((tag, index) => (
                                    <span key={index} className="bg-blue-50 text-blue-600 px-3 py-1 text-[10px] font-bold uppercase rounded-lg">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <h2 className="text-xl font-bold text-gray-800 mb-2">{item.name}</h2>
                            <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                                {item.description}
                            </p>
                        </div>

                        <div className="mt-6 pt-6 border-t border-gray-50">
                            <div className="mb-4">
                                <p className="text-xs text-gray-400 uppercase font-semibold tracking-wider">Dikembangkan oleh</p>
                                <p className="text-sm font-bold text-gray-700">{item.details.developer} <span className="font-normal text-gray-400">({item.details.releaseYear})</span></p>
                            </div>
                            <a 
                                href={item.details.officialWebsite} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="block text-center py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors text-sm"
                            >
                                Kunjungi Website Resmi
                            </a>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {filteredFrameworks.length === 0 && (
                <div className="text-center py-20">
                    <p className="text-gray-400 text-lg italic">Tidak ada framework yang sesuai dengan pencarian Anda.</p>
                </div>
            )}
        </div>
    );
}
