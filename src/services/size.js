/**
 * image size fit
 * @param  {number} boxWidth  박스 너비
 * @param  {number} boxHeight 박스 높이
 * @param  {number} width     원본 너비
 * @param  {number} height    원본 높이
 * @return {object}
 */
export function fitSize(boxWidth, boxHeight, width, height) {

  // 최대값
  const maxWidth = (width < boxWidth) ? width : boxWidth;
  const maxHeight = (height < boxHeight) ? height : boxHeight;

  // 비율
  const ratioWidth = Math.ceil((width / height) * maxHeight);
  const ratioHeight = Math.ceil(maxWidth / (width / height));

  // 기본값
  let size = {
    width: maxWidth,
    height: maxHeight,
    top: 0
  };

  // Landscape
  if (ratioWidth > ratioHeight) {
    if (height > ratioHeight) {
      size.width = maxWidth;
      size.height = ratioHeight;
    } else {
      size.width = ratioWidth;
      size.height = maxHeight;
    }
  }

  else if (ratioWidth < ratioHeight) {
    if (width > ratioWidth) {
      size.width = ratioWidth;
      size.height = maxHeight;
    } else {
      size.width = maxWidth;
      size.height = ratioHeight;
    }
  }

  size.top = boxHeight > ratioHeight ? ((boxHeight - size.height) / 2) : 0;
  size.left = boxWidth > ratioWidth ? ((boxWidth - size.width) / 2) : 0;

  return size;
}
