export default function AuthIllustration({ image, title, description }) {
  return (
    <div className="hidden md:flex w-1/2 bg-[#E8F5E9] items-center justify-center p-10">
      <div className="max-w-md text-center">
        <img
          src={image}
          alt="Login Illustration"
          className="w-80 mx-auto mb-6"
        />
        <h2 className="text-2xl font-heading font-semibold text-[#124734] mb-3">
          {title}
        </h2>
        <p className="text-[#5B7065] text-sm">{description}</p>
      </div>
    </div>
  );
}
