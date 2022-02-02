import { PropsWithChildren, useState } from 'react';
import ReactDom from 'react-dom';

export const NavBar = ({ children }: PropsWithChildren<{}>) => (
  <nav className="sticky top-0 left-0 w-full bg-white border-neutral-400 border-b-2 p-1 flex flex-wrap z-50">
    <div data-navbar-left className="order-first"></div>
    {children}
    <div data-navbar-center className="mx-auto order-last sm:order-1 w-full sm:w-fit flex justify-center"></div>
    <div data-navbar-right className="ml-auto order-2"></div>
  </nav>
);

export const Portal = ({
  children,
  selector,
}: PropsWithChildren<{
  selector: string;
}>) => {
  let [element, setElement] = useState(document.querySelector(selector));
  if (element) {
    return ReactDom.createPortal(children, element);
  } else {
    setTimeout(() => {
      setElement(document.querySelector(selector));
    }, 200);
    return null;
  }
};

export const NavBarLeft = ({ children }: PropsWithChildren<{}>) => (
  <Portal children={children} selector="div[data-navbar-left]" />
);
export const NavBarCenter = ({ children }: PropsWithChildren<{}>) => (
  <Portal children={children} selector="div[data-navbar-center]" />
);
export const NavBarRight = ({ children }: PropsWithChildren<{}>) => (
  <Portal children={children} selector="div[data-navbar-right]" />
);
