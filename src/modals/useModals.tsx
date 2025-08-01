import { CreateChatModal } from "@/modals/CreateChatModal/CreateChatModal";
import { useModalStore, ModalType } from "@/store/useModalStore";

export const useModals = () => {
  const { openModal } = useModalStore();

  const openCreateChatModal = () => {
    openModal(ModalType.DEFAULT, {
      title: "Create Chat",
      content: <CreateChatModal />,
      onConfirm: () => {
        console.log("Confirmed");
      },
      confirmText: "Create",
      cancelText: "Cancel",
    });
  };

  return { openCreateChatModal };
};
