import Swal from 'sweetalert2';

/**
 * 성공 알림
 * @param title 알림 제목
 * @param text 알림 내용
 */
export const showSuccessAlert = (title: string, text: string) => {
  Swal.fire({
    title,
    text,
    icon: 'success',
    confirmButtonText: '확인',
  });
};

/**
 * 에러 알림
 * @param title 알림 제목
 * @param text 알림 내용
 */
export const showErrorAlert = (title: string, text: string) => {
  Swal.fire({
    title,
    text,
    icon: 'error',
    confirmButtonText: '확인',
  });
};

/**
 * 경고 알림
 * @param title 알림 제목
 * @param text 알림 내용
 */
export const showWarningAlert = async (title: string, text: string) => {
  const result = await Swal.fire({
    title,
    text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: '확인',
    cancelButtonText: '취소',
  });

  return result.isConfirmed;
};