import Header from '../components/commons/Header';
import Footer from '../components/commons/Footer';

export default function Home() {
  return (
    <>
      <Header title="Dashboard" />
      <main className="flex h-full justify-center items-center">
        <h1 className="bg-yellow-200 shadow-md p-4 font-semibold text-2xl">
          This page has been intentionally left blank.
          Under normal circumstances, this page is not displayed.
        </h1>
      </main>
      <Footer />
    </>

  );
}
