/** @format */

import image from "/Form Image.jpg";
import { useState } from "react";
import bcrypt from "bcryptjs";
import { send, init } from "emailjs-com";

export default function Form() {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    phonenumber: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const [hashedPassword, setHashedPassword] = useState("");

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    phonenumber: "",
    email: "",
    password: "",
    confirmpassword: "",
    nationality: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;

    let error = "";
    if (!value) {
      error = `${name} is required`;
    }

    setErrors({ ...errors, [name]: error });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (values.password !== values.confirmpassword) {
      alert("Passwords do not match");
      return;
    }
    const salt = bcrypt.genSaltSync(10);
    const hashed = bcrypt.hashSync(values.password, salt);
    setHashedPassword(hashed);
    
    const submissionData = {
      ...values,
      password: hashed,
      confirmpassword: undefined,
    };

    console.log("Form Values:", submissionData);

    send("service_q2khyld", "template_7mp71o3", submissionData, "ew3YK7a8J2kH0RSWe")
      .then((response) => {
        console.log("Email sent successfully!", response.status, response.text);
        alert("Your data has been sent successfully!");
      })
      .catch((error) => {
        console.error("Failed to send email:", error);
        alert("Failed to send email. Please try again.");
      });
  };

  return (
    <>
      <div className="bg-gray-200  min-h-screen  w-screen flex justify-center items-center text-gray-800 min-w-[300px] py-10 lg:py-0">
        <div className="h-auto w-5/6 grid grid-cols-8 shadow-lg ">
          <section className="lg:col-span-4 col-span-8 bg-blue-200 h-full relative rounded-l-md">
            <img
              src={image}
              alt=""
              className="h-full object-cover w-full object-left rounded-l-md"
            />
            <div className="w-full h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 absolute top-0 opacity-70 rounded-l-md flex justify-start items-start pl-10 pt-10">
              <h2 className="font-normal text-xl mb-3 text-white">
                CRYPTO KING
              </h2>
            </div>
          </section>

          <section className="lg:col-span-4 col-span-8 bg-white h-full px-12 py-10 rounded-r-md">
            <h1 className="font-semibold text-3xl mb-3 text-indigo-600">
              Sign Up
            </h1>
            <form onSubmit={handleSubmit}>
              <fieldset className="mb-4 mt-8 text-gray-600">
                <div className="md:grid md:grid-cols-2 gap-5">
                  <div className="flex flex-col">
                    <label
                      htmlFor="FirstName"
                      id="firstName"
                      name="firstName"
                      className="font-semibold text-sm pb-2 "
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      required
                      id="firstName"
                      name="firstName"
                      value={values.firstName}
                      onChange={handleChange}
                      placeholder="Enter your first name"
                      className="border-b-gray-500 border-b-[1.9px]  p-1 focus:outline-none focus:border-b-2 focus:border-b-indigo-500 transition duration-200"
                      onBlur={handleBlur}
                    />
                    {errors.firstName && (
                      <span className="text-red-500 text-sm font-semibold">
                        {errors.firstName}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="LastName"
                      className="font-semibold text-sm pb-2"
                    >
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      value={values.lastNameName}
                      onChange={handleChange}
                      className="border-b-gray-500 border-b-[1.9px]  p-1 focus:outline-none focus:border-b-2 focus:border-b-indigo-500 transition duration-200"
                      placeholder="Please enter your last name"
                      onBlur={handleBlur}
                    />
                    {<errors className="lastName"></errors> && (
                      <span className="text-red-500 text-sm font-semibold">
                        {errors.lastName}
                      </span>
                    )}
                  </div>
                </div>
                <div className="md:grid md:grid-cols-2 gap-5">
                  <div className="flex flex-col">
                    <label
                      htmlFor="PhoneNumber"
                      className="font-semibold text-sm pb-2 mt-5"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phonenumber"
                      value={values.phonenumber}
                      onChange={handleChange}
                      className="border-b-gray-500 border-b-[1.9px]  p-1 focus:outline-none focus:border-b-2 focus:border-b-indigo-500 transition duration-200"
                      placeholder="Enter your phone number"
                      required
                      onBlur={handleBlur}
                    />
                    {<errors className="phonenumber"></errors> && (
                      <span className="text-red-500 text-sm font-semibold">
                        {errors.phonenumber}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="Age"
                      className="font-semibold text-sm pb-2 mt-5"
                    >
                      Age
                    </label>
                    <input
                      type="number"
                      className="border-b-gray-500 border-b-[1.9px]  p-1 focus:outline-none focus:border-b-2 focus:border-b-indigo-500 transition duration-200"
                      placeholder="Enter your age"
                    />
                  </div>
                </div>
                <div className="md:grid md:grid-cols-2 gap-5">
                  <div className="flex flex-col">
                    <label
                      htmlFor="Nationality"
                      className="font-semibold text-sm pb-2 mt-5"
                    >
                      Nationality
                    </label>
                    <select
                      type="text"
                      value={values.nationality}
                      onChange={handleChange}
                      className="border-b-gray-500 border-b-[1.9px]  p-1 focus:outline-none focus:border-b-2 focus:border-b-indigo-500 transition duration-200 cursor-pointer disabled:bg-gray-200 disabled:cursor-not-allowed"
                    >
                      <option value="" disabled className="text-gray-500">
                        {" "}
                        Select Country
                      </option>
                      <option value="Nigeria">Nigeria</option>
                      <option value="South Africa">South Africa</option>
                      <option value="Ghana">Ghana</option>
                      <option value="Egypt">Egypt</option>
                      <option value="Morocco">Morocco</option>
                      <option value="Algeria">Algeria</option>
                      <option value="Tunisia">Tunisia</option>
                      <option value="Kenya">Kenya</option>
                      <option value="Ethiopia">Ethiopia</option>
                      <option value="Tanania">Tanzania</option>
                      <option value="Uganda">Uganda</option>
                      <option value="Cameroon">Cameroon</option>
                      <option value="Congo">Congo</option>
                      <option value="Zambia">Zambia</option>
                      <option value="Zimbabwe">Zimbabwe</option>
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="FirstName"
                      className="font-semibold text-sm pb-2 mt-5"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      className="border-b-gray-500 border-b-[1.9px]  p-1 focus:outline-none focus:border-b-2 focus:border-b-indigo-500 transition duration-200"
                      placeholder="Please Enter your Email"
                      required
                      onBlur={handleBlur}
                    />
                    {<errors className="email"></errors> && (
                      <span className="text-red-500 text-sm font-semibold">
                        {errors.email}
                      </span>
                    )}
                  </div>
                </div>
                <div className="md:grid md:grid-cols-2 gap-5">
                  <div className="flex flex-col">
                    <label
                      htmlFor="FirstName"
                      className="font-semibold text-sm pb-2 mt-5"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      className="border-b-gray-500 border-b-[1.9px] mb-1 p-1 focus:outline-none focus:border-b-2 focus:border-b-indigo-500 transition duration-200"
                      required
                      placeholder="Enter Password"
                      onBlur={handleBlur}
                    />
                    {<errors className="password"></errors> && (
                      <span className="text-red-500 text-sm font-semibold">
                        {errors.password}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="FirstName"
                      className="font-semibold text-sm pb-2 mt-5"
                    >
                      Confirm Password
                    </label>
                    <input
                      name="confirmpassword"
                      type="password"
                      value={values.confirmpasswordpassword}
                      onChange={handleChange}
                      className="border-b-gray-500 border-b-[1.9px] mb-1 p-1 focus:outline-none focus:border-b-2 focus:border-b-indigo-500 transition duration-200"
                      placeholder="Confirm Password"
                      required
                      onBlur={handleBlur}
                    />
                    {<errors className="confirmpassword"></errors> && (
                      <span className="text-red-500 text-sm font-semibold">
                        {errors.confirmpassword}
                      </span>
                    )}
                  </div>
                </div>
              </fieldset>
              <div className="flex items-center mb-6 md:mb-0 ">
                <div className="flex flex-col items-center">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      className="h-4 w-4 checkbox mr-2 "
                      required
                    />
                    <label htmlFor="" className="text-center">
                      I agree to the{" "}
                      <a href="#" className="text-blue-500 font-semibold">
                        {" "}
                        Terms of User{" "}
                      </a>
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex md:justify-end justify-center">
                <button
                  type="submit"
                  className="bg-indigo-500 text-white px-10 font-semibold py-2 rounded-md hover:bg-indigo-700 "
                >
                  Sign Up
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </>
  );
}
