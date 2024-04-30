import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useSchema } from "provider/Schema";
import {
  Button,
  Chip,
  Image,
  Modal,
  ModalContent,
  ScrollShadow,
  Spacer,
  Tooltip,
  User,
  useDisclosure,
} from "@nextui-org/react";
import { ArrowLeftIcon } from "app/assets/icons/ArrowLeft";
import { PropsWithChildren, useCallback } from "react";
import { ListIcon } from "app/assets/icons/List";
import { UsersIcon } from "app/assets/icons/Users";
import { ConfigIcon } from "app/assets/icons/Config";
import clsx from "clsx";
import { SearchInput, SearchProvider } from "../components/SearchInput";
import { BellIcon } from "app/assets/icons/Bell";
import { Bars3Icon } from "app/assets/icons/Bars3";
import { useAuth } from "provider/Auth";
import { useTheme } from "next-themes";
import { MoonIcon } from "app/assets/icons/Moon";
import { SunIcon } from "app/assets/icons/Sun";
import { CrossIcon } from "app/assets/icons/Cross";
import logo from "app/assets/images/logo.png";

export function Layout() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <SearchProvider>
      <div className="flex">
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          size="full"
          hideCloseButton
          disableAnimation
        >
          <ModalContent>
            {(onClose) => <Sidebar onClose={onClose} />}
          </ModalContent>
        </Modal>

        <div className="hidden md:block h-[100vh]">
          <Sidebar />
        </div>

        <div className="grow md:border-l-1">
          <nav className="flex gap-2 items-center py-4 px-3 md:px-6">
            <Button
              isIconOnly
              radius="full"
              variant="light"
              className="md:hidden"
              onClick={onOpen}
            >
              <Bars3Icon />
            </Button>
            <div className="grow">
              <SearchInput />
            </div>

            <Button isIconOnly radius="full" variant="flat">
              <BellIcon />
            </Button>

            <ThemeButton />
          </nav>
          <div className="px-3 md:px-6">
            <Outlet />
          </div>
        </div>
      </div>
    </SearchProvider>
  );
}

function Sidebar({ onClose }: { onClose?: Function }) {
  const { logout, account } = useAuth();

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const handleNavigate = useCallback(
    (to: string) => () => {
      if (!!onClose) onClose();
      navigate(to);
    },
    [navigate, onClose]
  );

  const { nodes } = useSchema();

  return (
    <div className="flex flex-col gap-2 p-5 h-[100%]">
      <div
        className="flex items-center cursor-pointer"
        onClick={handleNavigate("/")}
      >
        <div className="text-primary">
          <Image src={logo} width={35} />
        </div>
        <h1 className="ml-3 text-2xl font-bold tracking-wider grow">
          Graphify
        </h1>
        {onClose && (
          <Button
            isIconOnly
            size="sm"
            radius="full"
            variant="flat"
            onClick={() => onClose()}
          >
            <CrossIcon />
          </Button>
        )}
      </div>
      <Spacer className="m-6" />
      <h5 className="m-2 text-xs uppercase font-semibold">System</h5>

      <NavLink icon={<UsersIcon />} onClick={() => {}}>
        Admins
      </NavLink>

      <NavLink icon={<ConfigIcon />} onClick={() => {}}>
        Settings
      </NavLink>

      <Spacer className="m-6" />

      <div className="flex items-center justify-between">
        <h5 className="m-2 text-xs uppercase font-semibold leading-2">
          Collections
        </h5>
        <Chip size="sm">{Object.keys(nodes).length}</Chip>
      </div>

      <ScrollShadow className="grow flex flex-col gap-1">
        {Object.keys(nodes).map((name) => (
          <NavLink
            icon={<ListIcon />}
            onClick={handleNavigate("/" + name)}
            active={pathname.includes(name)}
          >
            {name}
          </NavLink>
        ))}
      </ScrollShadow>

      <div className="mt-4 p-4 rounded-xl bg-primary-50 flex items-center min-w-56">
        <User
          name={account?.firstName}
          description="Admin"
          avatarProps={{
            src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
          }}
        />
        <div className="m-2 grow"></div>
        <Tooltip content="Logout">
          <Button
            isIconOnly
            radius="full"
            variant="light"
            size="sm"
            onClick={logout}
          >
            <ArrowLeftIcon />
          </Button>
        </Tooltip>
      </div>
    </div>
  );
}

function NavLink({
  icon,
  active,
  children,
  onClick,
}: PropsWithChildren<{
  icon: JSX.Element;
  active?: boolean;
  onClick: Function;
}>) {
  return (
    <div
      className={clsx("flex items-center p-3 rounded-xl cursor-pointer", {
        "hover:bg-primary-100 hover:text-primary-700": !active,
        "bg-primary text-primary-foreground": active,
      })}
      onClick={() => onClick()}
    >
      {icon}
      <h4 className="ml-2 text-sm capitalize">{children}</h4>
    </div>
  );
}

function ThemeButton() {
  const { theme, setTheme } = useTheme();
  return (
    <>
      {theme === "light" && (
        <Button
          isIconOnly
          radius="full"
          variant="flat"
          onClick={() => setTheme("dark")}
        >
          <MoonIcon />
        </Button>
      )}
      {theme === "dark" && (
        <Button
          isIconOnly
          radius="full"
          variant="flat"
          onClick={() => setTheme("light")}
        >
          <SunIcon />
        </Button>
      )}
    </>
  );
}
