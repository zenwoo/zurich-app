import Unauthorised from '../../components/security/Unauthorised';

export default function UnauthorisedPage() {
  return (
    <main className="bg-gray-400 h-full">
      <div className="container flex h-full items-center justify-center mx-auto">
        <Unauthorised />
      </div>
    </main>
  );
}
