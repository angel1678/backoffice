import { useEffect, useState } from 'react';
import { Head, router } from '@inertiajs/react';
import PropTypes from 'prop-types';

import { Menubar } from 'primereact/menubar';
import { ScrollPanel } from 'primereact/scrollpanel';

import ApplicationLogo from '@/Components/ApplicationLogo';
import BackButton from '@/Components/BackButton';
import BreadCrumb from '@/Components/BreadCrumb';
import Dropdown from '@/Components/Dropdown';
import Icon from '@/Components/Icon';
import useNotification from '@/Hook/useNotification';
import axios from 'axios';

export default function Authenticated({
  auth, title, errors, children, breadCrumb, urlBack
}) {
  const setCommentId = useNotification(state => state.setCommentId);
  const [notifications, setNotifications] = useState(auth.notifications);

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

  const handleNoification = (notification) =>
    async (e) => {
      e.preventDefault();
      setCommentId(notification.comentarioId);
      const { data: { success } } = await axios.get(route('user.notification.show', notification.id));

      if (success) {
        setNotifications(state => state.filter(item => item.id != notification.id));
        if (window.location.href !== route('proceso.movimiento.show', notification?.movimientoId)) {
          router.visit(route('proceso.movimiento.show', notification?.movimientoId));
        }
      }
    };

  useEffect(() => {
    Echo.private(`App.Models.User.${auth.user.id}`)
      .listen('.Illuminate\\Notifications\\Events\\BroadcastNotificationCreated', e => {
        if (e.event === 'CommentNotification') {
          setNotifications(state => [...state, e]);
        }
      });
  }, []);

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
            <div className="relative">
              <Dropdown>
                <Dropdown.Trigger>
                  <span className="inline-flex rounded-md">
                    <button
                      type="button"
                      className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium text-white rounded-md hover:bg-blue-800 active:bg-blue-900 focus:outline-none transition ease-in-out duration-150"
                    >
                      <Icon name="notificacion" className="h-6" />
                      {notifications && notifications.length > 0 && (
                        <span className="bg-orange-400 py-0.5 px-1.5 rounded-full fixed mb-4 ml-3.5">{notifications.length}</span>
                      )}
                    </button>
                  </span>
                </Dropdown.Trigger>
                <Dropdown.Content className="w-[20rem] bg-white">
                  <ScrollPanel style={{ width: '100%', maxHeight: '20rem' }}>
                    {
                      notifications.map(notification => (
                        <Dropdown.Link
                          key={notification.id}
                          className="!text-base ml-2.5"
                          onClick={handleNoification(notification)}
                        >
                          {notification.message}
                        </Dropdown.Link>
                      ))
                    }
                  </ScrollPanel>
                </Dropdown.Content>
              </Dropdown>
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
      <main className="mt-[1.75rem] px-[2.75rem]">
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
