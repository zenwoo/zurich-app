import UserAccount from './header/UserAccount';

export default function Header({ title = 'Zurich customer portal' }) {
  return (
    <header>
      <div className="bg-zurich-primary flex text-white p-5 pl-16">
        <h1 className="text-3xl font-extrabold flex-1 font-sans">{title}</h1>
        <UserAccount />
      </div>
    </header>
  );
}
