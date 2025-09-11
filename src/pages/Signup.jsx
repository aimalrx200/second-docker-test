import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router";
import { signup } from "../api/users";
import { Input } from "../components/reuseable-components/Input";

export function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const signupMutation = useMutation({
    mutationFn: () => signup({ username, password }),
    onSuccess: () => navigate("/login"),
    onError: () => alert("failed to signup!"),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    signupMutation.mutate();
  };

  return (
    <>
      <div className="bg-green-50 h-screen flex items-center justify-center">
        <form
          className="p-5 flex flex-col gap-5 rounded shadow bg-white"
          onSubmit={handleSubmit}
        >
          <div className="flex items-center justify-end">
            <button
              type="button"
              className="text-blue-500 cursor-pointer hover:underline"
              onClick={() => navigate(-1)}
            >
              Go back
            </button>
          </div>
          <h1 className="font-bold text-2xl">Sign Up For This Blog Site</h1>
          <h2 className="font-bold text-xl">Form</h2>
          <div>
            <Input
              label="Username"
              name="create-username"
              id="create-username"
              value={username}
              onChange={setUsername}
            />
          </div>
          <div>
            <Input
              label="Password"
              type="password"
              name="create-password"
              id="create-password"
              value={password}
              onChange={setPassword}
            />
          </div>
          <div>
            <button
              className={`${!username || !password || signupMutation.isPending ? "cursor-not-allowed bg-gray-300 text-black" : "cursor-pointer bg-blue-500 hover:bg-blue-600"} p-2 w-full rounded text-white mt-2 transition-colors`}
              type="submit"
              disabled={!username || !password || signupMutation.isPending}
            >
              {signupMutation.isPending ? "Signing up..." : "Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
