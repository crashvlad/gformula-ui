import Link from 'next/link';

export function NavLink({ href, children }) {
  return (
    <Link
      href={href}
      scroll={false}
      className="inline-block px-3 py-2 text-base rounded-lg hover:bg-secondary"
    >
      {children}
    </Link>
  );
}
