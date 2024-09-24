import React from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { Input } from "@nextui-org/react";

export default function CustomInput({
  type,
  placeholder,
  variant,
  label,
  register,
  errors,
  isRequired,
  name,
  icon,
  labelstyle,
  radius,
  classStyle,
}) {
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <>
      <Input
        label={label && <label className={labelstyle}>{label}</label>}
        variant={variant}
        radius={radius}
        placeholder={placeholder}
        startContent={icon}
        labelPlacement="outside"
        endContent={
          type === "password" ? (
            <button
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}
              aria-label="toggle password visibility"
            >
              {isVisible ? (
                <EyeSlashIcon className="size-5 text-default-400 pointer-events-none" />
              ) : (
                <EyeIcon className="size-5 text-default-400 pointer-events-none" />
              )}
            </button>
          ) : null
        }
        type={type === "password" ? (isVisible ? "text" : "password") : type}
        className={` ${classStyle}`}
        classNames={{
          inputWrapper: ["shadow-xl border-default  ", " group-data-[focus=true]:border-primary "],
        }}
        isInvalid={errors[name]?.message}
        isRequired={isRequired}
        errorMessage={errors[name]?.message}
        {...register(name)}
      />
    </>
  );
}
