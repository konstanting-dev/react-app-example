import { useCallback, useState } from 'react';

export interface PopupContextType {
  handleOpen: () => void;
  handleClose: () => void;
  open: boolean;
}

export default function usePopup(): PopupContextType {
  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return {
    open,
    handleOpen,
    handleClose,
  };
}
