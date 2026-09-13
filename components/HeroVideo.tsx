export default function HeroVideo() {
  return (
    <div className="mx-auto lg:max-w-7xl px-4">
      <div className="relative overflow-hidden rounded-2xl bg-black">
        <video
          src="/images/trakway-tech.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="aspect-video w-full object-cover"
        />
      </div>
    </div>
  );
}
