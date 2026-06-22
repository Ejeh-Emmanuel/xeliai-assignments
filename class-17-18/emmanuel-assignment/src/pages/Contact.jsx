import { useForm } from "react-hook-form";
import { useState } from "react";

function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const [submitted, setSubmitted] = useState(false);

  async function onSubmit(data) {
    console.log("📩 Contact Form Submitted Successfully:");
    console.log(data);

    // simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setSubmitted(true);
    reset();

    console.log("✅ Form cleared after submission");
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">📩 Contact Us</h1>

      {submitted && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
          Message sent successfully!
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5 bg-white p-6 rounded-xl shadow"
      >
        {/* NAME */}
        <div>
          <label className="block text-sm font-medium">Full Name</label>

          <input
            type="text"
            className="w-full border rounded-lg p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-orange-400"
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 3,
                message: "Name must be at least 3 characters",
              },
            })}
          />

          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* EMAIL */}
        <div>
          <label className="block text-sm font-medium">Email</label>

          <input
            type="email"
            className="w-full border rounded-lg p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-orange-400"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address",
              },
            })}
          />

          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* MESSAGE */}
        <div>
          <label className="block text-sm font-medium">Message</label>

          <textarea
            rows="4"
            className="w-full border rounded-lg p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-orange-400"
            {...register("message", {
              required: "Message is required",
              minLength: {
                value: 10,
                message: "Message must be at least 10 characters",
              },
            })}
          />

          {errors.message && (
            <p className="text-red-500 text-sm mt-1">
              {errors.message.message}
            </p>
          )}
        </div>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`
            w-full py-3 rounded-lg text-white font-medium transition
            ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600 cursor-pointer"
            }
          `}
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}

export default Contact;
