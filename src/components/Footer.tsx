import "../styles/Footer.scss";

export function Footer() {
  return (
    <footer>
      &copy; {new Date().getFullYear()} by{" "}
      <a href="https://github.com/atefBB">Atef Ben Ali</a>.
    </footer>
  );
}
