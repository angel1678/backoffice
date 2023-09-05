import { Head, Link, router } from '@inertiajs/react';
import { Menubar } from 'primereact/menubar';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function Authenticated({ auth, title, header, children }) {
  const command = (data) => {
    router.visit(route(data.item.route));
  };

  const items = [
    { label: 'Inicio', route: 'dashboard', command },
    {
      label: 'Portafolio', items: [
        { label: 'Procesos Judiciales', route: 'proceso.index', command },
        { label: 'Procesos Judiciales Detenidos', route: 'proceso-detenido.index', command, visible: auth.isAdmin },
        { label: 'Coactiva', route: 'coercive.accounts.index', command },
      ]
    },
    { label: 'Reporteria', route: 'process.report.index', command },
    { label: 'Gestíon', route: 'management.index', command },
    {
      label: 'Sistemas', items: [
        { label: 'Cliente', route: 'system.client.index', command }
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Head title={title} />

      <section className="flex bg-blue-700 h-12">
        <div className="flex items-center justify-center text-white w-56">
          <Link href="/" className="flex gap-2 items-center">
            <ApplicationLogo className="block h-9 w-auto fill-current text-white" />
            <span className="text-lg">Loyalis</span>
          </Link>
        </div>
        <div className="flex justify-between w-full">
          <Menubar model={items} className="menu-bar" />
          <div className="flex items-center p-1">
            <Link
              href={route('profile.edit')}
              className="flex justify-center items-center p-3 py-2 text-white rounded-md hover:bg-blue-800 active:bg-blue-900">
              <div className="text-white"><i className="pi pi-user mr-2" />{auth.user.name}</div>
            </Link>
            {auth.isAdmin &&
              <Link
                href={route('setting.edit')}
                data-pr-tooltip="Configuraciones"
                data-pr-position="left"
                className="flex justify-center items-center p-3 text-white rounded-md hover:bg-blue-800 active:bg-blue-900 tooltip-general">
                <i className="pi pi-cog" />
              </Link>
            }
            <Link
              href={route('logout')}
              method="post"
              as="button"
              data-pr-tooltip="Cerrar sesion"
              data-pr-position="left"
              className="flex justify-center items-center p-3 text-white rounded-md hover:bg-blue-800 active:bg-blue-900 tooltip-general">
              <i className="pi pi-sign-out" />
            </Link>
          </div>
        </div>
      </section>
      <main className="mt-3">
        {children}
      </main>
    </div>
  );
}
