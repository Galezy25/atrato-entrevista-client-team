import { PropsWithChildren } from 'react';
import ReactDom from 'react-dom';

export const NavBar = ({ children }: PropsWithChildren<{}>) => (
  <nav className="sticky top-0 left-0 w-full bg-white flex flex-wrap">
    <div data-navbar-left></div>
    {children}
    <div data-navbar-center className="mx-auto"></div>
    <div data-navbar-right></div>
  </nav>
);

export const NavBarLeft = ({ children }: PropsWithChildren<{}>) =>
  ReactDom.createPortal(
    children,
    document.querySelector('div[data-navbar-left]') || document.body
  );
export const NavBarCenter = ({ children }: PropsWithChildren<{}>) =>
  ReactDom.createPortal(
    children,
    document.querySelector('div[data-navbar-center]') || document.body
  );
export const NavBarRight = ({ children }: PropsWithChildren<{}>) =>
  ReactDom.createPortal(
    children,
    document.querySelector('div[data-navbar-center]') || document.body
  );
