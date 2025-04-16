
const items = [
    {
        image: "tunde.svg",
        name: "Tunde Onakoya",
        role: "Founder, Chess in Slums Africa"
    },
    {
        image: "tonye.svg",
        name: "Tonye Cole",
        role: "Co-Founder, Sahara Groups"
    },
    {
        image: "tunde.svg",
        name: "Tunde Onakoya",
        role: "Founder, Chess in Slums Africa"
    },
    {
        image: "tunde.svg",
        name: "Tunde Onakoya",
        role: "Founder, Chess in Slums Africa"
    },
    {
        image: "tunde.svg",
        name: "Tunde Onakoya",
        role: "Founder, Chess in Slums Africa"
    },
    {
        image: "tunde.svg",
        name: "Tunde Onakoya",
        role: "Founder, Chess in Slums Africa"
    },

]


export default function Speakers() {
    return (
        <section className="flex flex-col items-center justify-center gap-12 px-4 py-20 md:px-16">
            <div className="flex flex-col items-center justify-center gap-4">
                <h3 className="font-poppins text-[#0076B2] font-bold text-3xl md:text-[3.125rem] leading-[1.2] ">Meet our Incredible Speakers</h3>
                <p className="text-center md:w-3/5 xl:w-[55%] font-normal md:text-[1.125rem] font-manrope text-[#52525B] ">Prepare to be inspired by a lineup of visionary leaders, innovators, and change-makers who are shaping the future of Nigeria and the global landscape.</p>
            </div>

            <div className="grid grid-cols-1 gap-4 xl:grid-cols-3 md:grid-cols-2">
                {items.map((item) => (
                    <div key={item.name} className="relative ">
                        <img src={item.image} alt={`${items.name}'s immage`} />
                        <div className="absolute flex items-end bottom-0 left-0 w-full h-64 rounded-b-[1.025rem] bg-gradient-to-t from-black to-transparent">

                            <div className="flex flex-col mb-5">
                                <h3 className="ml-5 text-base font-bold text-left text-white font-poppins">{item.name}</h3>
                                <p className="ml-5 font-manrope text-[.685rem]">{item.role}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

