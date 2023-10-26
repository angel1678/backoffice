import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useNotification = create(
  persist(
    (set) => ({
      commentId: 0,
      setCommentId: commentId => set(state => ({ ...state, commentId })),
    }),
    {
      name: 'notification-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
);

export default useNotification;
