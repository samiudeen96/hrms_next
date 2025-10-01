import React from "react";

type Option = {
  label: string;
  value: string | number;
};

type FormFieldProps = {
  label: string;
  name: string;
  value?: string | number | boolean;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  placeholder?: string;
  type?:
    | "text"
    | "email"
    | "password"
    | "number"
    | "textarea"
    | "select"
    | "checkbox"
    | "radio"
    | "date"
    | "file";
  options?: Option[];
  required?: boolean;
};

export default function FormField({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  options = [],
  required = false,
}: FormFieldProps) {
  return (
    <div
      className={`${
        type === "checkbox" ? "flex items-center gap-2 text-xs" : "mb-4"
      }`}
    >
      {/* Label */}
      {type !== "radio" && type !== "checkbox" && (
        <label
          htmlFor={name}
          className="block font-medium text-gray-700 text-sm mb-1"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      {/* Textarea */}
      {type === "textarea" && (
        <textarea
          id={name}
          name={name}
          value={value as string}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className="w-full p-2 border-2 border-outline rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
          rows={4}
        />
      )}

      {/* Select */}
      {type === "select" && (
        <select
          id={name}
          name={name}
          value={value as string}
          onChange={onChange}
          required={required}
          className="w-full p-2 border-2 border-outline rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
        >
          <option value="">-- Select --</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      )}

      {/* Checkbox */}
      {type === "checkbox" && (
        <label htmlFor={name} className="flex items-center gap-2 text-xs">
          <input
            id={name}
            name={name}
            type="checkbox"
            checked={Boolean(value)}
            onChange={onChange}
            className="h-4 w-4 text-blue-600 border rounded focus:ring-primary"
          />
          <span>
            {label} {required && <span className="text-red-500">*</span>}
          </span>
        </label>
      )}

      {/* Radio */}
      {type === "radio" &&
        options.map((opt) => (
          <label
            key={opt.value}
            htmlFor={`${name}-${opt.value}`}
            className="flex items-center space-x-2 mb-1"
          >
            <input
              id={`${name}-${opt.value}`}
              type="radio"
              name={name}
              value={opt.value}
              checked={value === opt.value}
              onChange={onChange}
              className="h-4 w-4 text-blue-600 border focus:ring-primary"
            />
            <span>{opt.label}</span>
          </label>
        ))}

      {/* File */}
      {type === "file" && (
        <input
          id={name}
          name={name}
          type="file"
          onChange={onChange}
          className="w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 
            file:rounded-md file:border-0 file:text-sm file:font-semibold 
            file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      )}

      {/* Default Input (text, email, password, number, date) */}
      {["text", "email", "password", "number", "date"].includes(type) && (
        <input
          id={name}
          name={name}
          type={type}
          value={value as string}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className="w-full p-2 border-2 border-outline rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
        />
      )}
    </div>
  );
}
