import html2canvas from 'html2canvas';

// 下载canves图片
export const downloadCanvesToImage = async (id: string): Promise<void> => {
  let canvas;
  if (id.startsWith('.')) {
    canvas = await html2canvas(document.querySelector(id) as HTMLElement);
  } else {
    canvas = await html2canvas(document.getElementById(id) as HTMLElement);
  }

  // 方法1：转化为base64模式下载
  // const shareUrl = canvas.toDataURL('image/png');
  // const a = document.createElement('a');
  // const handle = new MouseEvent('click');
  // a.download = '二维码.png';
  // a.href = shareUrl;
  // a.dispatchEvent(handle);

  // 方法2：转化为blob
  canvas.toBlob(
    async (Blob: any) => {
      const a = document.createElement('a');
      a.download = '二维码.png';
      a.style.display = 'none';
      a.type = 'image/png';
      a.href = URL.createObjectURL(Blob);
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(a.href);
      document.body.removeChild(a);
    },
    'image/png',
    1,
  );
};
