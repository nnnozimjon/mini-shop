import { registerUser } from "@entities/user";
import { Button, Input } from "@shared/ui";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export const RegisterForm = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(registerUser({ name, email, password }) as any)
    setTimeout(() => {
      location.replace('/login')
    }, 1500)
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-lg p-8 w-96 flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Register
        </h2>
        <Input
          label="Name"
          onChange={(value) => setName(value)}
          placeholder="Name"
          value={name}
          required
        />
        <Input
          label="Email"
          onChange={(value) => setEmail(value)}
          placeholder="Email"
          value={email}
          required
        />
        <Input
          type={"password"}
          label="Password"
          onChange={(value) => setPassword(value)}
          placeholder="Password"
          value={password}
          showPasswordToggle
          required
        />
        <Button rounded={false} variant="solid" color="purple">
          Register
        </Button>
        <div className="text-sm text-gray-500 text-center flex gap-1 justify-center">
          <p>You have an account?</p>
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};
