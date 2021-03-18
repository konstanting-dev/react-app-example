import { useCallback, useState } from 'react';

export interface PopupContextType {
  handleOpen: () => void;
  handleClose: () => void;
  open: boolean;
}

/** Useful hook for different kinds of popups: dialogs, modals, tooltips, snackbars
 Shares popup's open state and open/close methods
 */
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
