import { Formik, Form, Field, ErrorMessage } from "formik";
import { div } from "framer-motion/client";
import React from "react";
import { MdEmail } from "react-icons/md";
import * as yup from "yup";
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
    email: yup.string().email().required(),
    password: yup.string().required(),
    ...((isSignUp && { name: yup.string().required("name is required") }) ||
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
      label: "Email",
    },
    {
      id: "password",
      name: "password",
      type: "password",
      label: "Password",
    },
  ];
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form className="flex flex-col gap-4">
        {fields.map((field) => (
          <div key={field.id} className="flex flex-col gap-1">
            <label htmlFor={field.id}>{field.label}</label>
            <Field
              id={field.id}
              name={field.name}
              type={field.type}
              className="border p-2 rounded-md"
            />
            <ErrorMessage
              name={field.name}
              component="div"
              className="text-red-500"
            />
          </div>
        ))}
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
          {isSignUp ? "SignUp" : "Signin"}
        </button>
      </Form>
    </Formik>
  );
}
