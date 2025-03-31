
import { useTextInput } from "./use-text-input";
import { useAttachments } from "./use-attachments";
import { useClipboard } from "./use-clipboard";
import { useRecording } from "./use-recording";
import { useCamera } from "./use-camera";
import { AttachmentFile } from "@/types/chat-input";

export function useChatInput(onSendMessage: (content: string, attachments?: File[]) => void) {
  const {
    message,
    textareaRef,
    handleMessageChange,
    handleKeyPress: handleKeyPressBase,
    resetMessage
  } = useTextInput();

  const {
    attachments,
    fileInputRef,
    handleFileUpload,
    triggerFileInput,
    removeAttachment,
    clearAttachments
  } = useAttachments();

  const addAttachments = (files: AttachmentFile[]) => {
    files.forEach(file => {
      const fileList = new DataTransfer();
      fileList.items.add(file);
      handleFileUpload({ target: { files: fileList.files } } as unknown as React.ChangeEvent<HTMLInputElement>);
    });
  };

  const {
    isPasteMenuOpen,
    togglePasteMenu,
    handlePaste,
    handleDirectPaste
  } = useClipboard(setMessage => {
    const textInput = useTextInput();
    textInput.setMessage(setMessage);
    textInput.adjustTextareaHeight();
  }, addAttachments);

  const {
    isRecording,
    startRecording,
    stopRecording
  } = useRecording(setMessage => {
    const textInput = useTextInput();
    textInput.setMessage(setMessage);
    textInput.adjustTextareaHeight();
  });

  const { openCamera } = useCamera();
  
  const handleSend = () => {
    if (message.trim() || attachments.length > 0) {
      onSendMessage(message, attachments);
      resetMessage();
      clearAttachments();
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    handleKeyPressBase(e, handleSend);
  };

  const canSend = message.trim().length > 0 || attachments.length > 0;
  
  return {
    message,
    attachments,
    isRecording,
    isPasteMenuOpen,
    fileInputRef,
    textareaRef,
    canSend,
    handleSend,
    handleKeyPress,
    handleFileUpload,
    handlePaste,
    handleDirectPaste,
    triggerFileInput,
    togglePasteMenu,
    startRecording,
    stopRecording,
    openCamera,
    removeAttachment,
    handleMessageChange
  };
}
