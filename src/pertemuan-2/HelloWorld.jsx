export default function HelloWorld(){
    const propsUserCard = {
        nama: "Goku",
        nim: "999999",
        tanggal: "2025-01-01"
    }

    return (
        <div>
            <h1>Hello World</h1>
            <p>Selamat Belajar ReactJs</p>
            
            <GreetingBinjai />
            <QuoteText />
            <UserCard nama="Farid" nim="2457301079" tanggal="2026-03-13" />
            <UserCard nama="Far" nim="2457301079" tanggal="2026-03-13" />
            <UserCard nama="rid" nim="2457301079" tanggal="2026-03-13" />
            <UserCard {...propsUserCard}/>
            
            {/* PERBAIKAN DI SINI: Tambahkan garis miring / di akhir tag img */}
            <img src="img/images.jpg" alt="ikan" /> 
        </div>
    )
}

function GreetingBinjai(){
    return (
        <small>Salam dari Binjai</small>
    )
}

function QuoteText() {
    const text = "Mulutmu Cihuy lah";
    const text2 = "Aku ingin jadi Rich";
    return (
        <div>
            <hr/>
            <p>{text.toLowerCase()}</p>
            <p>{text2.toUpperCase()}</p>
        </div>
    )
}

function UserCard(props){
    return (
        <div>
            <hr/>
            <h3>Nama: {props.nama}</h3>
            <p>NIM: {props.nim}</p>
            <p>Tanggal: {props.tanggal}</p>
        </div>
    )
}