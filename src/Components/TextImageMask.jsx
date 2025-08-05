import { useNavigate } from "react-router-dom";
import Image from "../assets/image.jpg";

export default function TextImageMask() {
  const Navigate = useNavigate()
  return (
    <div>
      <div className="w-full flex items-center justify-center">
        <h1
          className=" text-[25vw]  sm:text-[20vw] font-extrabold uppercase text-center leading-none bg-cover bg-center text-transparent bg-clip-text tracking-tighter"
          style={{
            backgroundImage: `url(${Image})`,
          }}
        >
          Voices
          <br />
          United
        </h1>
      </div>
      <div className="flex justify-center items-center">
        <button className="px-6 py-2 text-3xl bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg active:scale-95" onClick={()=>Navigate('/donation')} >Donate Now</button>
      </div>
    </div>
  );
}
