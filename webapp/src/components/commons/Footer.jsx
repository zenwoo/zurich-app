export default function Footer({ children }) {
  return (
    <footer className="bg-zurich-primary text-white p-4 text-center">
      {
        children
        ?? (
          <p>
            &copy;
            {new Date().getFullYear()}
            All rights reserved.
          </p>
        )
      }
    </footer>
  );
}
