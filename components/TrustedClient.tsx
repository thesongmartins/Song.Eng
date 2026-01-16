import { VelocityScrollLogos } from "./scroll-based-velocity";

const logos = [
  {
    src: "/image.png",
    alt: "Ubuntu Portal",
    width: 120,
    height: 40,
  },

  {
    src: "/omnifood-logo.png",
    alt: "OmniFood",
    width: 120,
    height: 40,
  },
];

export default function TrustedPartners() {
  return (
    <section className=" ">
      <div className=" mx-auto md:px-5">
        <VelocityScrollLogos
          logos={logos}
          baseVelocity={8}
          className="py-4  rounded-lg shadow-md"
        />
      </div>
    </section>
  );
}
