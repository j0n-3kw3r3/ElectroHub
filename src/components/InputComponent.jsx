export function InputComponent({ name, type }) {
  return (
    <div className=" w-full ">
      <label className="block text-gray-700 capitalize text-sm font-bold mb-1" htmlFor="name">
        {name}
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="name"
        type={type}
        placeholder={`Your ${name}`}
      />
    </div>
  );
}
