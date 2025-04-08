import NavbarComponent from "@/components/NavbarComponent";


export default function Home() {


  return (
    <div className="flex flex-col">
      <NavbarComponent />
      <div className="w-full bg-[url(/assets/mp-hero-1.jpeg)] bg-cover bg-no-repeat bg-center min-h-180 flex justify-center items-end">
        <div className="relative flex justify-center items-end bottom-40">
          <input className="bg-white py-2 px-5 text-3xl border-1 rounded-4xl w-180 " type="text" placeholder="Search Location"/>
        </div>
      </div>
      <div>
      <iframe width='100%' height='800px' src="https://api.mapbox.com/styles/v1/tvang/cm98rdc1400dn01sxevgj93is.html?title=false&access_token=pk.eyJ1IjoidHZhbmciLCJhIjoiY205NzhjeDU4MDR2YjJsb2pvaGxuZnZ0eiJ9.nRf1lWYQP-I8W6cqHJjvww&zoomwheel=false#2/38/-34" title="Chicago Parks"></iframe>
      </div>
    </div>
  );
}
