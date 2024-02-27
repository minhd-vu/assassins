export default function PartyCard({
  children,
  code,
}: {
  children: React.ReactNode;
  code: string;
}) {
  return (
    <div className="card w-96 bg-base-200 shadow-xl">
      <div className="card-body">
        <h1 className="card-title text-3xl">Code: {code.toUpperCase()}</h1>
        {children}
      </div>
    </div>
  );
}
