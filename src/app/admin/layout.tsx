import React from "react";

function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main>{children}</main>
    </>
  );
}

export default AdminLayout;
