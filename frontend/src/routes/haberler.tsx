import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/haberler")({
  component: () => <Outlet />,
});
