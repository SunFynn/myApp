import html2canvas from 'html2canvas';

// 下载图片
export const downloadCanvesToImage = async (id: string): Promise<void> => {
  // html2canves将页面元素转化为canves画布
  let canvas;
  if (id.startsWith('.')) {
    canvas = await html2canvas(document.querySelector(id) as HTMLElement);
  } else {
    canvas = await html2canvas(document.getElementById(id) as HTMLElement);
  }
  console.log(canvas, '====');

  /**
   * 方法1：canves转化为base64模式
   * HTMLCanvesElement.toDataURL(type?, quality?) 将canves画布转化的为base64格式。
   * @param type  可选 图片格式，默认为 image/png
   * @param quality  可选 图片质量，取值范围0 - 1
   */
  const shareUrl = canvas.toDataURL('image/png'); // 例 data:image/jpeg;base64,/9j/4AAQSkZJRgABAQ...9oADAMBAAIRAxEAPwD/AD/6AP/Z"
  downloadBase64File(shareUrl, '二维码');

  /**
   * 方法2：canves转化为blob
   * HTMLCanvasElement.toBlob(callback, type?, quality?) 将canves画布转化的为blob格式
   * @param callback  回调函数，可获得一个单独的 Blob 对象参数。如果图像未被成功创建，可能会获得 null 值
   * @param type  可选 图片格式，默认为 image/png
   * @param quality  可选 图片质量，取值范围0 - 1
   */
  // canvas.toBlob(
  //   async (Blob: any) => {
  //     downLoadBlobFile(Blob, '二维码');
  //   },
  //   'image/png',
  //   1,
  // );
};

/** 下载base64文件 */
export function downloadBase64File(data: string, fileName = '文件') {
  const a = document.createElement('a');
  a.download = fileName;
  a.href = data; // href属性对应的是base64格式就可以正常下载了，  href如果是图片网址路径，即使设置了download，也可能不生效，只是打开图片网址 【兼容问题】
  const handle = new MouseEvent('click');
  a.dispatchEvent(handle);
}

/**
 * 下载blob文件
 * @param data :BolBStream
 * @param fileName:文件名称
 * @param fileType ：content-Type，文件类型 image/png
 *
 * URL.createObjectURL(object) 静态方法会创建一个 DOMString。
 * @param object 用于创建 URL 的 File 对象、Blob 对象或者 MediaSource 对象；
 *
 * URL.revokeObjectURL(DOMString)  释放之前URL.createObjectURL创建的DOMString。
 * @param DOMString 之前URL.createObjectURL创建的DOMString
 */
export function downLoadBlobFile(
  data: any,
  fileName = '文件',
  fileType = 'application/vnd.ms-excel',
) {
  let blob;
  if (Object.prototype.toString.call(data) == '[object Blob]') {
    blob = data;
  } else {
    blob = new Blob([data], { type: `${fileType}; charset=utf-8` });
  }
  const a = document.createElement('a');
  a.download = fileName;
  console.log(blob, URL.createObjectURL(blob)); // Blob{size: 10731, type: 'image/png'}  'blob:http://192.168.1.199:8001/fd48dc96-8b32-4c45-b866-d7f9c031e25b'
  a.href = URL.createObjectURL(blob);
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  URL.revokeObjectURL(a.href); // 释放URL DOMstring对象
  document.body.removeChild(a);
}

/** base64格式转换为blob类型 */
export function base64ToBlob(base64String: string, fileType?: string) {
  const type = fileType || 'jpg';
  const base64Arr: any[] = base64String.split(',');
  const mime: any = base64Arr[0].match(/:(.*?);/)[1] || `image/${type}`;
  const bytes = window.atob(base64Arr[1]); // 去掉url的头，并转化为byte
  const ab = new window.ArrayBuffer(bytes.length); // 处理异常,将ascii码小于0的转换为大于0
  const ia = new window.Uint8Array(ab); // 生成视图（直接针对内存）：8位无符号整数，长度1个字节
  for (let i = 0; i < bytes.length; i++) {
    ia[i] = bytes.charCodeAt(i);
  }
  const blobObject = new window.Blob([ab], {
    type: mime,
  });
  return blobObject;
}

/** blob转化为file文件 */
export function convertBlobToFile(blob: any, fileName: string) {
  // 创建File对象
  const file = new File([blob], fileName, { type: blob.type });

  return file;
}

/** 下载指定网址的图片或文件 */
export function downloadFileZip(
  output: any,
  downloadFileName = '未命名文件',
  handleCancel: Function = () => {},
) {
  let fileName = downloadFileName;

  if (!output) {
    handleCancel();
    return;
  }
  fetch(output, {
    // @ts-ignore
    responseType: 'blob',
  })
    .then((res) => res.blob())
    .then((res) => {
      const navigator: any = window.navigator;
      if (navigator?.msSaveBlob) {
        const suffix = output.split('.').pop();
        fileName = downloadFileName === '未命名文件' ? `${fileName}.${suffix}` : fileName;
        try {
          navigator?.msSaveBlob?.(res, fileName);
          handleCancel();
        } catch (e) {
          handleCancel();
        }
      } else {
        fileName = output || downloadFileName;
        const originName: string = fileName.slice(fileName.lastIndexOf('/') + 1, fileName.length);
        const aTag = document.createElement('a');
        const newType = originName.slice(originName.lastIndexOf(',') + 1, originName.length);
        const fileType = `application/${newType}`;
        const blob = new Blob([res], { type: fileType });
        aTag.download =
          downloadFileName + fileName.slice(fileName.lastIndexOf('.'), fileName.length);
        aTag.href = URL.createObjectURL(blob);
        aTag.click();

        if (handleCancel) {
          handleCancel();
        }
      }
    })
    .catch((e) => {
      console.error(e);
    });
}

/** 上传静态图片 */
export function uploadImg() {
  const input = document.createElement('input');
  input.setAttribute('type', 'file');
  input.setAttribute('accept', 'image/*');
  input.setAttribute('multiple', 'multiple');
  input.click();
  input.onchange = async () => {
    Array.from((input as any).files).forEach(async (item) => {
      const formData = new FormData();
      formData.append('file', item as any);
      // 上传图片
      console.log(formData, 'formData');
    });
  };
}
