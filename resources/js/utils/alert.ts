import Swal from 'sweetalert2';

export const showSuccess = (title: string, text?: string) => {
    return Swal.fire({
        icon: 'success',
        title: title,
        text: text,
        showConfirmButton: false,
        timer: 2000,
    });
};

export const showError = (title: string, text?: string) => {
    return Swal.fire({
        icon: 'error',
        title: title,
        text: text,
        confirmButtonColor: '#ea580c',
    });
};

export const showConfirm = async (title: string, text: string, confirmText: string = 'Ya, konfirmasi') => {
    const result = await Swal.fire({
        icon: 'warning',
        title: title,
        text: text,
        showCancelButton: true,
        confirmButtonColor: '#ff0000',
        cancelButtonColor: '#334155',
        confirmButtonText: confirmText,
        cancelButtonText: 'Cancel',
        reverseButtons: true,
    });

    return result.isConfirmed;
};
