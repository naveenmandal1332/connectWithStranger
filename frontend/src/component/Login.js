import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const initialState = {
    username: "",
    gender: "",
  };
  const [formData, setFormData] = useState(initialState);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("name: ", formData.username);
    console.log("gender: ", formData.gender);

    // Empty input field:
    setFormData(initialState);
    navigate("/chat", { state: formData });
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="/"
          className="flex text-gray-900 dark:text-white items-center mb-6 text-2xl font-semibold"
        >
          <img
            className="h-8 w-8 mr-2"
            src={
              "https://is5-ssl.mzstatic.com/image/thumb/Purple126/v4/1f/76/70/1f767010-5546-710c-87a1-d4dcbda8ad3d/AppIcon-0-0-1x_U007emarketing-0-0-0-5-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/512x512bb.jpg"
            }
            alt="connect-with-stranger-logo"
          />
          Connect With Stranger
        </a>
        <div className="bg-white w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Start chat with stranger!
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <label
                  for="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your Name
                </label>
                <input
                  type="username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  name="username"
                  id="username"
                  value={formData.username}
                  onChange={handleInput}
                  required=""
                />
              </div>
              <div>
                <label
                  for="gender"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your Gender
                </label>
                <input
                  type="gender"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  name="gender"
                  id="gender"
                  value={formData.gender}
                  onChange={handleInput}
                  required=""
                />
              </div>
              <button
                type="submit"
                onClick={onSubmit}
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Start Chat
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
