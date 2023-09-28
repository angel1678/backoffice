import { Head, router } from '@inertiajs/react';
import PropTypes from 'prop-types';

import { Menubar } from 'primereact/menubar';

import ApplicationLogo from '@/Components/ApplicationLogo';
import BackButton from '@/Components/BackButton';
import BreadCrumb from '@/Components/BreadCrumb';
import Dropdown from '@/Components/Dropdown';
import Icon from '@/Components/Icon';

export default function Authenticated({
  auth, title, errors, children, breadCrumb, urlBack
}) {

  const command = (data) => router.visit(route(data.item.route));

  const items = [
    { label: 'Inicio', className: 'font-semibold', icon: (<Icon name="home" className="h-6 mr-2" />), route: 'dashboard', command },
    {
      label: 'Judicial', className: 'font-semibold', icon: (<Icon name="judicial" className="h-6 mr-2" />), items: [
        { label: 'Activo', route: 'proceso.index', command },
        { label: 'Detenido', route: 'proceso-detenido.index', command, visible: auth.isAdmin },
      ]
    },
    { label: 'Coactiva', className: 'font-semibold', icon: (<Icon name="coactiva" className="h-6 mr-2" />), route: 'coercive.clients.index', command },
    { label: 'Reporteria', className: 'font-semibold', icon: (<Icon name="reporteria" className="h-6 mr-2" />), route: 'process.report.index', command },
    { label: 'Gestíon', className: 'font-semibold', route: 'management.index', command },
  ];

  return (
    <div className="min-h-screen bg-fondo">
      <Head title={title} />

      <section className="flex bg-loyalis h-14">
        <div className="flex items-center justify-center text-white w-56">
          <div className="flex gap-2 items-center">
            <ApplicationLogo className="block h-auto w-auto fill-current text-white" />
          </div>
        </div>
        <div className="flex justify-between w-full">
          <Menubar model={items} />
          <div className="flex items-center p-1 gap-1">
            <div className="flex justify-center items-center p-3 text-white rounded-md hover:bg-blue-800 active:bg-blue-900">
              <Icon name="notificacion" className="h-6" />
            </div>
            <div className="relative">
              <Dropdown>
                <Dropdown.Trigger>
                  <span className="inline-flex rounded-md">
                    <button
                      type="button"
                      className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium text-white rounded-md hover:bg-blue-800 active:bg-blue-900 focus:outline-none transition ease-in-out duration-150"
                    >
                      <Icon name="perfil" className="h-6" />
                      <span className="ml-3 mr-1">
                        {auth.user.name}
                      </span>
                      <i className="pi pi-angle-down" />
                    </button>
                  </span>
                </Dropdown.Trigger>

                <Dropdown.Content>
                  <Dropdown.Link href={route('profile.edit')} className="!text-base">Mi Información</Dropdown.Link>
                  {auth.isAdmin &&
                    <Dropdown.Link href={route('setting.edit')} className="!text-base">Configuración</Dropdown.Link>
                  }
                  <Dropdown.Link href={route('logout')} className="!text-base" method="post" as="button">
                    Cerrar Sesión
                  </Dropdown.Link>
                </Dropdown.Content>
              </Dropdown>
            </div>
          </div>
        </div>
      </section >
      <main className="mt-3 px-3">
        <div className="mb-6">
          {breadCrumb.length > 0 && <BreadCrumb items={breadCrumb} />}

          {urlBack && (
            <BackButton onClick={() => router.visit(urlBack)} />
          )}
        </div>

        {children}
      </main>
    </div >
  );
}

Authenticated.propTypes = {
  auth: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  breadCrumb: PropTypes.array,
  errors: PropTypes.object,
  hiddenBreadCrumb: PropTypes.bool,
  urlBack: PropTypes.string,
}

Authenticated.defaultProps = {
  breadCrumb: [],
  hiddenBreadCrumb: false,
};
