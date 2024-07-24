import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface NotificationType {
  commentId: number;
  setCommentId: (commentId: number) => void;
}

const useNotification = create<NotificationType>()(
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
