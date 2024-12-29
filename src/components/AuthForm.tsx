import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { Toaster } from "sonner";
interface AuthFormProps {
  onSubmit: (values: {
    email: string;
    password: string;
    name?: string;
  }) => Promise<void>;
  isSignUp: boolean;
}

export default function AuthForm({ onSubmit, isSignUp }: AuthFormProps) {
  const initialValues = {
    email: "",
    password: "",
    name: isSignUp ? "" : undefined,
  };

  const validationSchema = yup.object({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    ...((isSignUp && { name: yup.string().required("Name is required") }) ||
      {}),
  });

  const fields = [
    ...(isSignUp
      ? [
          {
            id: "name",
            name: "name",
            type: "text",
            label: "Name",
          },
        ]
      : []),
    {
      id: "email",
      name: "email",
      type: "email",
      label: "Email Address",
    },
    {
      id: "password",
      name: "password",
      type: "password",
      label: "Password",
    },
  ];

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          {isSignUp ? "Create an Account" : "Welcome Back"}
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form className="space-y-6">
            <Toaster position="top-right" />
            {fields.map((field) => (
              <div key={field.id}>
                <label
                  htmlFor={field.id}
                  className="block text-sm font-medium text-gray-700"
                >
                  {field.label}
                </label>

                <Field
                  id={field.id}
                  name={field.name}
                  type={field.type}
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder={`Enter your ${field.label.toLowerCase()}`}
                />
                <ErrorMessage
                  name={field.name}
                  component="div"
                  className="mt-1 text-red-500 text-sm"
                />
              </div>
            ))}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg shadow hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
            >
              {isSignUp ? "Sign Up" : "Sign In"}
            </button>
          </Form>
        </Formik>
        <p className="text-sm text-gray-500 text-center mt-6">
          {isSignUp ? (
            <>
              Already have an account?{" "}
              <a
                href="/login"
                className="text-blue-600 hover:underline font-medium"
              >
                Sign In
              </a>
            </>
          ) : (
            <>
              Don’t have an account?{" "}
              <a
                href="/signup"
                className="text-blue-600 hover:underline font-medium"
              >
                Sign Up
              </a>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
