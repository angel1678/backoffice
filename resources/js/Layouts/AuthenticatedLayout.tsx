import React, { PropsWithChildren, useEffect, useState } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import axios from 'axios';

import { Menubar } from 'primereact/menubar';
import { ScrollPanel } from 'primereact/scrollpanel';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { MenuItem } from 'primereact/menuitem';
import { classNames } from 'primereact/utils';

import ApplicationLogo from '@/Components/ApplicationLogo';
import BackButton from '@/Components/BackButton';
import BreadCrumb from '@/Components/BreadCrumb';
import Dropdown from '@/Components/Dropdown';
import Icon from '@/Components/Icon';
import useNotification from '@/Hook/useNotification';
import { PageProps } from '@/types';


type Props = PageProps & PropsWithChildren & {
  title: string;
  breadCrumb?: any[];
  showBack?: boolean;
  titleBack?: string;
  subMenu?: MenuItem[];
};

export default function Authenticated({ auth, title, errors, children, breadCrumb = [], showBack, titleBack, subMenu }: Props) {
  const { props: { urlPrev } } = usePage<PageProps>();
  const setCommentId = useNotification(state => state.setCommentId);
  const [notifications, setNotifications] = useState<any>(auth.notifications);

  const command = (data: any) => router.visit(route(data.item.route));

  const items = [
    { label: 'Inicio', className: 'font-semibold', icon: (<Icon name="home" className="h-6 mr-2" />), route: 'dashboard', command },
    { label: 'Judicial', className: 'font-semibold', icon: (<Icon name="judicial" className="h-6 mr-2" />), route: 'judicial.dashboard', command },
    { label: 'Coactiva', className: 'font-semibold', icon: (<Icon name="coactiva" className="h-6 mr-2" />), route: 'coercive.clients.index', command },
    { label: 'Configuración', className: 'font-semibold', route: 'configuration.index', command },
  ];

  const handleNoification = (notification: any) =>
    async (e: any) => {
      e.preventDefault();
      setCommentId(notification.comentarioId);
      const { data: { success } } = await axios.get(route('user.notification.show', notification.id));

      if (success) {
        setNotifications((state: any) => state.filter((item: any) => item.id != notification.id));
        if (window.location.href !== route('proceso.movimiento.show', notification?.movimientoId)) {
          router.visit(route('proceso.movimiento.show', notification?.movimientoId));
        }
      }
    };

  const heightBySubMenu = () => subMenu ? "calc(100vh - 7rem)" : "calc(100vh - 3.5rem)";

  useEffect(() => {
    window.Echo.private(`App.Models.User.${auth.user.id}`)
      .listen('.Illuminate\\Notifications\\Events\\BroadcastNotificationCreated', (e: any) => {
        if (e.event === 'CommentNotification') {
          setNotifications((state: any) => [...state, e]);
        }
      })
      .error((status: any) => console.log("AuthenticatedLayout", status));
  }, []);

  return (
    <>
      <ConfirmDialog />
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
                        notifications.map((notification: any) => (
                          <Dropdown.Link
                            key={notification.id}
                            href="#"
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
        </section>
        {subMenu && (
          <div className="flex justify-center items-center gap-32 font-extrabold bg-[#8bdefc] h-14 w-full">
            {
              subMenu?.map((item, index) => (
                <Link key={`submenu_${index}`}
                  href={item.url ? route(item.url) : '#'}
                  className={classNames({ "border-b-2 border-blue-800": route().current() === item.url })}
                >
                  {item.label}
                </Link>
              ))
            }
          </div>
        )}
        <div style={{ overflow: "scroll", height: heightBySubMenu() }}>
          <main className="mt-[1.75rem] px-[2.75rem]">
            <div className="mb-6">
              {breadCrumb && <BreadCrumb items={breadCrumb} />}

              {showBack && (
                <div className="flex gap-4 items-center">
                  <BackButton disabled={!urlPrev} onClick={() => urlPrev && router.visit(urlPrev)} />
                  <label className="text-2xl font-extrabold">{titleBack}</label>
                </div>
              )}
            </div>

            {children}
          </main>
        </div>
      </div>
    </>
  );
}
