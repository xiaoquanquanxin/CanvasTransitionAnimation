
//  获取图片的原始信息
function getImageData(ctx, config) {
	return ctx.getImageData(0, 0, config.width, config.height);
}
