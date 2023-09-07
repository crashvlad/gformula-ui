import { sidebarConfig } from '@/config/sidebar';
import { SidebarItem } from './sidebar-item';

export function Sidebar() {
  return (
    <div className="fixed top-14 hidden h-[calc(100vh-3.5rem)] w-56 border-r bg-background lg:block">
      <aside className="flex-col px-4 py-3 space-y-1" id="auth-sidebar">
        {sidebarConfig.map((c) => (
          <SidebarItem
            id={c.id}
            key={c.path}
            path={c.path}
            icon={c.icon}
            title={c.title}
          />
        ))}
      </aside>
    </div>
  );
}
