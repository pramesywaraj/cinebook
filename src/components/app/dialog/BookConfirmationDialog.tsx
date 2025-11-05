import { forwardRef, useImperativeHandle, useState } from 'react';
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from '@/components/ui/AlertDialog';

export type BookConfirmationDialogHandle = {
    open: () => void;
    close: () => void;
};

interface Props {
    onConfirm: () => void;
}

const BookConfirmationDialog = forwardRef<BookConfirmationDialogHandle, Props>(
    ({ onConfirm }, ref) => {
        const [isOpen, setIsOpen] = useState(false);

        const setOpen = (next: boolean) => {
            setIsOpen(next);
        };

        useImperativeHandle(ref, () => ({
            open: () => setOpen(true),
            close: () => setOpen(false),
        }));

        return (
            <AlertDialog open={isOpen} onOpenChange={setOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Confirm Your Seats</AlertDialogTitle>
                        <AlertDialogDescription>
                            Once confirmed, your seat selection can't be
                            changed. Do you want to proceed?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={onConfirm}>
                            Confirm
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        );
    }
);

export default BookConfirmationDialog;
