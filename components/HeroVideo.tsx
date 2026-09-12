export default function HeroVideo() {
  return (
    <div className="relative mx-auto max-w-7xl overflow-hidden rounded-2xl bg-black">
      <video
        src="/images/trakway-tech.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="aspect-video w-full object-cover"
      />
    </div>
  );
}
