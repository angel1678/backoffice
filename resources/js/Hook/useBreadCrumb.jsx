import { create } from 'zustand';

const useBreadCrumb = create((set) => ({
  home: { icon: 'home', label: 'Inicio' },
  setHome: home => set(state => ({ ...state, home })),
}));

export default useBreadCrumb;
