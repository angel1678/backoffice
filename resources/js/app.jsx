import './bootstrap';
import '../sass/app.scss';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

import * as dayjs from 'dayjs';
import * as weekday from 'dayjs/plugin/weekday';
import { es } from "dayjs/locale/es";

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

dayjs.extend(weekday);
dayjs.locale("es");

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
  setup({ el, App, props }) {
    const root = createRoot(el);

    root.render(<App {...props} />);
  },
  progress: {
    color: '#a5f3fc',
  },
});
