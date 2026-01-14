import { LoginForm } from "@features/auth";

export default function LoginPage() {
  return (
    <div className="relative w-screen h-screen overflow-hidden flex flex-col md:flex-row">
      <div
        className="absolute top-0 left-0 w-full h-full md:relative md:w-1/2 z-0 bg-gray-900 flex items-center justify-center"
        style={{
          backgroundImage: "url('/path-to-your-image.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-black/50 md:bg-transparent"></div>

        <span className="text-gray-300 text-xl md:text-3xl md:hidden">
          Some Image Here
        </span>
      </div>

      <div className="relative w-full md:w-1/2 flex items-center justify-center p-6 md:p-12 z-10 bg-white md:bg-transparent">
        <LoginForm />
      </div>
    </div>
  );
}
