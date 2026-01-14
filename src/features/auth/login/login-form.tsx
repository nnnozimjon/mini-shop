import { loginUser } from "@entities/user";
import { Button, Input } from "@shared/ui";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export const LoginForm = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(loginUser({ email, password }) as any);
    setTimeout(() => {
      location.reload();
    }, 1500);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-lg p-8 w-96 flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Welcome Back!
        </h2>
        <Input
          label="Email"
          onChange={(value) => setEmail(value)}
          placeholder="Email"
          value={email}
        />
        <Input
          type={"password"}
          label="Password"
          onChange={(value) => setPassword(value)}
          placeholder="Password"
          value={password}
          showPasswordToggle
        />
        <Link to="/forgot" className="text-sm text-gray-500">
          Forgot your password?
        </Link>
        <Button rounded={false} variant="solid" color="purple">
          Login
        </Button>
        <div className="text-sm text-gray-500 text-center flex gap-1 justify-center">
          <p>Don't have account?</p>
          <Link to="/register" className="text-blue-500">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
};
