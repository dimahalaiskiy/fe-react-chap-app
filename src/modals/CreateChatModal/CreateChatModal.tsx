import { SearchBar } from "@/components/search-users/SearchUsers";
import { CreateChatModalWrapper } from "./createChatModal.styled";

export const CreateChatModal = () => {
  return (
    <CreateChatModalWrapper>
      <SearchBar />
    </CreateChatModalWrapper>
  );
};
