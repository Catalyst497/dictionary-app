export default function Extra({ title, arr = [] }) {
  if (arr.length === 0) return;
  return (
    <div className="py-2">
      <span className="name text-[#84849a]">{title}: </span>
      {arr.map((x, index) => (
      
          <span key={index} className="text-[#9e35e9]">
            {x + `${index !== arr.length - 1 ? "," : "."}` + " "}
          </span>
        
      ))}
    </div>
  );
}
